import { IParticipantsView } from '@/components/participants-detail'
import { MeetingFileType } from '@/constants/meeting'
import { ResolutionType, VoteProposalOption } from '@/constants/resolution'
import { RootState, useAppDispatch, useAppSelector } from '@/stores'
import { UserMeetingStatusEnum } from '@/stores/attendance/type'
import {
    resetCreateMeetingData,
    updateCreateMeetingInformation,
} from '@/stores/meeting/createSlice'
import { getMeetingDetail } from '@/stores/meeting/detailSlice'
import {
    ICreateMeeting,
    IMeetingDetail,
    KeyRoles,
    IGetAllMeetingQuery,
    IMeetingState,
    ListParamsFilter,
    IProposalCreator,
    IUpdateMeeting,
    IProposalFile,
} from '@/stores/meeting/types'
import { EActionStatus } from '@/stores/type'
import { getFileTypeByUrl } from '@/utils/file'
import { MeetingResource } from '@/views/meeting/meeting-detail/documents'
import { useCallback } from 'react'
import { getAllMeetings, getAllPassMeetings, setFilter } from './listSlice'
import {
    initUpdateMeeting,
    updateMeetingInformation,
} from '@/stores/meeting/updateSlice'

export function useCreateMeetingInformation(): [
    ICreateMeeting,
    // eslint-disable-next-line
    (data: ICreateMeeting) => void,
    () => void,
] {
    const dispatch = useAppDispatch()
    const data = useAppSelector((state: RootState) => state.meetingCreate)

    const setCreateMeetingInformation = useCallback(
        (data: ICreateMeeting) => {
            dispatch(updateCreateMeetingInformation(data))
        },
        [dispatch],
    )

    const resetData = useCallback(() => {
        dispatch(resetCreateMeetingData())
    }, [dispatch])

    return [data, setCreateMeetingInformation, resetData]
}

export function useMeetingDetail(): [
    {
        meeting: IMeetingDetail | undefined
        status: EActionStatus
    },
    // eslint-disable-next-line
    (meetingId: number) => void,
] {
    const dispatch = useAppDispatch()
    const { meeting, status } = useAppSelector(
        (state: RootState) => state.meetingDetail,
    )

    const fetchMeetingDetail = useCallback(
        (meetingId: number) => {
            dispatch(getMeetingDetail(meetingId))
        },
        [dispatch],
    )

    return [
        {
            meeting,
            status,
        },
        fetchMeetingDetail,
    ]
}

type ListMeetingType = {
    meetingState: IMeetingState
    // eslint-disable-next-line
    getListFutureMeetingAction: (data: IGetAllMeetingQuery) => void
    // eslint-disable-next-line
    getListPassMeetingAction: (data: IGetAllMeetingQuery) => void
    // eslint-disable-next-line
    setFilterAction: (data: ListParamsFilter) => void
}

export const useListMeeting = (): ListMeetingType => {
    const dispatch = useAppDispatch()
    const meetingState = useAppSelector((state: RootState) => state.meetingList)

    const getListFutureMeetingAction = useCallback(
        (data: IGetAllMeetingQuery) => {
            dispatch(getAllMeetings(data))
        },
        [dispatch],
    )

    const getListPassMeetingAction = useCallback(
        (data: IGetAllMeetingQuery) => {
            dispatch(getAllPassMeetings(data))
        },
        [dispatch],
    )

    const setFilterAction = useCallback(
        (data: ListParamsFilter) => {
            dispatch(setFilter(data))
        },
        [dispatch],
    )

    return {
        meetingState,
        getListFutureMeetingAction,
        getListPassMeetingAction,
        setFilterAction,
    }
}

export function useMeetingFiles(): {
    invitations: MeetingResource[]
    minutes: MeetingResource[]
} {
    const meeting = useAppSelector(
        (state: RootState) => state.meetingDetail.meeting,
    )

    if (!meeting)
        return {
            invitations: [],
            minutes: [],
        }

    const invitationsFile = meeting?.meetingFiles.filter(
        (file) => file.fileType === MeetingFileType.MEETING_INVITATION,
    )
    const minutesFile = meeting?.meetingFiles.filter(
        (file) => file.fileType === MeetingFileType.MEETING_MINUTES,
    )

    const invitations = invitationsFile.map((file) => ({
        url: file.url,
        type: getFileTypeByUrl(file.url),
    }))

    const minutes = minutesFile.map((file) => ({
        url: file.url,
        type: getFileTypeByUrl(file.url),
    }))

    return {
        invitations,
        minutes,
    }
}

export function useParticipants(): {
    hosts: IParticipantsView[]
    controlBoards: IParticipantsView[]
    directors: IParticipantsView[]
    administrativeCouncils: IParticipantsView[]
    shareholders: IParticipantsView[]
} {
    const meeting = useAppSelector(
        (state: RootState) => state.meetingDetail.meeting,
    )

    if (!meeting)
        return {
            hosts: [],
            controlBoards: [],
            directors: [],
            administrativeCouncils: [],
            shareholders: [],
        }

    const getParticipantsByRole = (role: KeyRoles) => {
        return meeting[role].map(
            (userMeeting) =>
                ({
                    defaultAvatarHashColor:
                        userMeeting.user.defaultAvatarHashColor,
                    avatar: userMeeting.user.avatar,
                    name: userMeeting.user.username,
                    joined:
                        userMeeting.status ===
                        UserMeetingStatusEnum.PARTICIPATE,
                }) as IParticipantsView,
        )
    }

    const hosts = getParticipantsByRole('hosts')
    const controlBoards = getParticipantsByRole('controlBoards')
    const directors = getParticipantsByRole('directors')
    const administrativeCouncils = getParticipantsByRole(
        'administrativeCouncils',
    )
    const shareholders = getParticipantsByRole('shareholders')

    return {
        hosts,
        controlBoards,
        directors,
        administrativeCouncils,
        shareholders,
    }
}

export function useResolutions(type: ResolutionType): {
    title: string
    content: string
    oldContent?: string
    percentVoted: number
    percentUnVoted: number
    percentNotVoteYet: number
    voteResult: VoteProposalOption
    creator: IProposalCreator
    id: number
    proposalFiles: IProposalFile[]
}[] {
    const meeting = useAppSelector(
        (state: RootState) => state.meetingDetail.meeting,
    )

    if (!meeting) {
        return []
    }

    const resolutions = meeting?.proposals.filter(
        (proposal) => proposal.type === type,
    )

    return resolutions.map((resolution) => {
        const notVoteYetQuantity = Number(resolution.notVoteYetQuantity)
        const votedQuantity = Number(resolution.votedQuantity)
        const unVotedQuantity = Number(resolution.unVotedQuantity)
        const totalShareholders =
            notVoteYetQuantity + votedQuantity + unVotedQuantity

        const percentVoted =
            totalShareholders === 0
                ? 0
                : (votedQuantity * 100) / totalShareholders
        const percentUnVoted =
            totalShareholders === 0
                ? 0
                : (unVotedQuantity * 100) / totalShareholders
        const percentNotVoteYet =
            totalShareholders === 0
                ? 0
                : (notVoteYetQuantity * 100) / totalShareholders
        return {
            id: resolution.id,
            title: resolution.title,
            content: resolution.description,
            oldContent: resolution.oldDescription,
            percentVoted,
            percentUnVoted,
            percentNotVoteYet,
            voteResult: resolution.voteResult,
            creator: resolution.creator,
            proposalFiles: resolution.proposalFiles,
        }
    })
}

export function useUpdateMeetingInformation(): [
    IUpdateMeeting,
    // eslint-disable-next-line
    (data: IUpdateMeeting) => void,
    EActionStatus,
    // eslint-disable-next-line
    (meetingId: number) => void,
] {
    const dispatch = useAppDispatch()
    const data = useAppSelector(
        (state: RootState) => state.meetingUpdate.meeting,
    )

    const status = useAppSelector(
        (state: RootState) => state.meetingUpdate.status,
    )

    const setUpdateMeetingInformation = useCallback(
        (data: IUpdateMeeting) => {
            dispatch(updateMeetingInformation(data))
        },
        [dispatch],
    )

    const initData = useCallback(
        (meetingId: number) => {
            dispatch(initUpdateMeeting(meetingId))
        },
        [dispatch],
    )

    return [data, setUpdateMeetingInformation, status, initData]
}
