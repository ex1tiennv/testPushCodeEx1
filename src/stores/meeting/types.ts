import {
    MeetingFileType,
    MeetingStatus,
    MeetingTime,
    MeetingType,
} from '@/constants/meeting'
import { EActionStatus, FetchError } from '../type'
import { IParticipants } from '@/components/participant-selector'
import { ResolutionType, VoteProposalOption } from '@/constants/resolution'
import { UserMeetingStatusEnum } from '@/stores/attendance/type'

export interface ICreateMeeting {
    title: string
    meetingLink: string
    startTime: string
    endTime: string
    endVotingTime: string
    note: string
    meetingMinutes: IMeetingDocument[]
    meetingInvitations: IMeetingDocument[]
    resolutions: IMeetingResolution[]
    amendmentResolutions: IMeetingResolution[]
    hosts: IParticipants[]
    controlBoards: IParticipants[]
    directors: IParticipants[]
    administrativeCouncils: IParticipants[]
    shareholders: IParticipants[]
}

export interface IMeetingDocument {
    id?: number
    uid?: string
    url: string
    fileType: string
}

export interface IProposalFile {
    id?: number
    uid?: string
    url: string
}

export interface IMeetingResolution {
    id?: number
    title: string
    description: string
    oldDescription?: string
    files?: IProposalFile[]
    type: ResolutionType
}

export interface IMeeting {
    meetings_id: number
    meetings_title: string
    meetings_start_time: string
    meetings_note: string
    meetings_end_time: string
    meetings_meeting_link: string
    isJoined: number
    meetings_status: string
}

export interface ListParamsFilter {
    searchQuery?: string
    sortOrder?: string
    sortField?: string
}

export interface IGetAllMeetingQuery {
    page: number
    limit: number
    type: MeetingTime
    filter?: ListParamsFilter
    meetingType: MeetingType
}

export interface IMeetingState extends IGetAllMeetingQuery, FetchError {
    status: EActionStatus
    meetingFutureList: IMeeting[]
    meetingPassList: IMeeting[]
    totalFutureMeetingItem: number
    totalPassMeetingItem: number
}

export interface IMeetingFile {
    id: number
    url: string
    meetingId: number
    fileType: MeetingFileType
}

export interface IProposalCreator {
    username: string
    email: string
    avatar: string | null
    defaultAvatarHashColor: string | null
}

export interface IProposal {
    id: number
    title: string
    description: string
    oldDescription?: string
    type: ResolutionType
    votedQuantity: number | null
    unVotedQuantity: number | null
    notVoteYetQuantity: number | null
    voteResult: VoteProposalOption
    meetingId: number
    creator: IProposalCreator
    proposalFiles: IProposalFile[]
}

export interface IUserMeeting {
    id: number
    status: UserMeetingStatusEnum
    user: {
        id: number
        username: string
        email: string
        avatar: string | null
        defaultAvatarHashColor: string | null
    }
}

export interface IMeetingDetail {
    id: number
    title: string
    note: string
    startTime: string
    endTime: string
    endVotingTime: string
    meetingLink: string
    status: MeetingStatus
    companyId: number
    creatorId: number
    meetingFiles: IMeetingFile[]
    proposals: IProposal[]
    hosts: IUserMeeting[]
    controlBoards: IUserMeeting[]
    directors: IUserMeeting[]
    administrativeCouncils: IUserMeeting[]
    shareholders: IUserMeeting[]
    shareholdersTotal: number
    shareholdersJoined: number
    joinedMeetingShares: number
    totalMeetingShares: number
}

export type KeyRoles =
    | 'hosts'
    | 'controlBoards'
    | 'directors'
    | 'administrativeCouncils'
    | 'shareholders'

export interface IDetailMeetingState {
    status: EActionStatus
    meeting: IMeetingDetail | undefined
    error: FetchError | undefined
}

export interface IUpdateMeeting {
    id: number
    title: string
    note: string
    status: MeetingStatus
    meetingLink: string
    startTime: string
    endTime: string
    endVotingTime: string
    meetingMinutes: IMeetingDocument[]
    meetingInvitations: IMeetingDocument[]
    resolutions: IMeetingResolution[]
    amendmentResolutions: IMeetingResolution[]
    hosts: IParticipants[]
    controlBoards: IParticipants[]
    directors: IParticipants[]
    administrativeCouncils: IParticipants[]
    shareholders: IParticipants[]
}

export interface IUpdateMeetingState {
    status: EActionStatus
    meeting: IUpdateMeeting
    error: FetchError | undefined
}
