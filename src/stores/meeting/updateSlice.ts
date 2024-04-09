import { IParticipants } from '@/components/participant-selector'
import { MeetingFileType, MeetingStatus } from '@/constants/meeting'
import { ResolutionType } from '@/constants/resolution'
import serviceMeeting from '@/services/meeting'
import {
    IUpdateMeeting,
    IUpdateMeetingState,
    KeyRoles,
} from '@/stores/meeting/types'
import { EActionStatus, FetchError } from '@/stores/type'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

const initialState: IUpdateMeetingState = {
    status: EActionStatus.Idle,
    error: undefined,
    meeting: {
        id: 0,
        title: '',
        note: '',
        meetingLink: '',
        status: MeetingStatus.NOT_HAPPEN,
        startTime: new Date().toISOString(),
        endTime: new Date().toISOString(),
        endVotingTime: new Date().toISOString(),
        meetingMinutes: [],
        meetingInvitations: [],
        resolutions: [
            {
                title: '',
                description: '',
                files: [],
                type: ResolutionType.RESOLUTION,
            },
            {
                title: '',
                description: '',
                files: [],
                type: ResolutionType.RESOLUTION,
            },
            {
                title: '',
                description: '',
                files: [],
                type: ResolutionType.RESOLUTION,
            },
            {
                title: '',
                description: '',
                files: [],
                type: ResolutionType.RESOLUTION,
            },
            {
                title: '',
                description: '',
                files: [],
                type: ResolutionType.RESOLUTION,
            },
        ],
        amendmentResolutions: [
            {
                title: '',
                description: '',
                oldDescription: '',
                files: [],
                type: ResolutionType.AMENDMENT_RESOLUTION,
            },
            {
                title: '',
                description: '',
                oldDescription: '',
                files: [],
                type: ResolutionType.AMENDMENT_RESOLUTION,
            },
            {
                title: '',
                description: '',
                oldDescription: '',
                files: [],
                type: ResolutionType.AMENDMENT_RESOLUTION,
            },
            {
                title: '',
                description: '',
                oldDescription: '',
                files: [],
                type: ResolutionType.AMENDMENT_RESOLUTION,
            },
            {
                title: '',
                description: '',
                oldDescription: '',
                files: [],
                type: ResolutionType.AMENDMENT_RESOLUTION,
            },
        ],
        hosts: [],
        controlBoards: [],
        directors: [],
        administrativeCouncils: [],
        shareholders: [],
    },
}

export const initUpdateMeeting = createAsyncThunk<
    IUpdateMeeting,
    number,
    {
        rejectValue: FetchError
    }
>('meeting/initUpdateMeeting', async (meetingId, { rejectWithValue }) => {
    try {
        const meetingDetail = await serviceMeeting.getDetailMeeting(meetingId)

        const getMeetingFilesByType = (type: MeetingFileType) => {
            return meetingDetail.meetingFiles
                .filter((file) => file.fileType === type)
                .map((file) => ({
                    id: file.id,
                    url: file.url,
                    fileType: file.fileType,
                    uid: file.id.toString(),
                }))
        }

        const getProposalsByType = (type: ResolutionType) => {
            return meetingDetail.proposals
                .filter((proposal) => proposal.type === type)
                .map((resolution) => ({
                    id: resolution.id,
                    title: resolution.title,
                    description: resolution.description,
                    oldDescription: resolution.oldDescription,
                    type: resolution.type,
                    files: resolution.proposalFiles.map((file) => ({
                        id: file.id,
                        url: file.url,
                        uid: file.id.toString(),
                    })),
                }))
        }

        const getParticipantsByRole = (role: KeyRoles) => {
            return meetingDetail[role].map(
                (userMeeting) =>
                    ({
                        users_defaultAvatarHashColor: userMeeting.user
                            .defaultAvatarHashColor as string,
                        users_avartar: userMeeting.user.avatar as string,
                        users_username: userMeeting.user.username as string,
                        users_id: userMeeting.user.id,
                    }) as IParticipants,
            )
        }

        return {
            id: meetingDetail.id,
            title: meetingDetail.title,
            note: meetingDetail.note,
            meetingLink: meetingDetail.meetingLink,
            status: meetingDetail.status,
            startTime: new Date(meetingDetail.startTime).toISOString(),
            endTime: new Date(meetingDetail.endTime).toISOString(),
            endVotingTime: new Date(meetingDetail.endVotingTime).toISOString(),
            meetingInvitations: getMeetingFilesByType(
                MeetingFileType.MEETING_INVITATION,
            ),
            meetingMinutes: getMeetingFilesByType(
                MeetingFileType.MEETING_MINUTES,
            ),
            resolutions: getProposalsByType(ResolutionType.RESOLUTION),
            amendmentResolutions: getProposalsByType(
                ResolutionType.AMENDMENT_RESOLUTION,
            ),
            hosts: getParticipantsByRole('hosts'),
            controlBoards: getParticipantsByRole('controlBoards'),
            directors: getParticipantsByRole('directors'),
            administrativeCouncils: getParticipantsByRole(
                'administrativeCouncils',
            ),
            shareholders: getParticipantsByRole('shareholders'),
        }
    } catch (error) {
        const err = error as AxiosError
        const responseData: any = err.response?.data
        return rejectWithValue({
            errorMessage: responseData?.message,
            errorCode: responseData?.code,
        })
    }
})

export const meetingUpdateSlice = createSlice({
    name: 'meetingUpdateSlice',
    initialState,
    reducers: {
        updateMeetingInformation: (
            state: IUpdateMeetingState,
            action: PayloadAction<IUpdateMeeting>,
        ) => {
            state.meeting = action.payload
        },
        resetUpdateMeetingData: () => {
            return initialState
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(initUpdateMeeting.pending, (state) => {
                state.status = EActionStatus.Pending
            })
            .addCase(initUpdateMeeting.fulfilled, (state, action) => {
                state.status = EActionStatus.Succeeded
                state.meeting = action.payload
            })
            .addCase(initUpdateMeeting.rejected, (state, action) => {
                state.status = EActionStatus.Failed
                state.error = action.payload
            })
    },
})

export const { updateMeetingInformation, resetUpdateMeetingData } =
    meetingUpdateSlice.actions

export default meetingUpdateSlice.reducer
