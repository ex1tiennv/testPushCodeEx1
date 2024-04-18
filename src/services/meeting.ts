import { IGetAllMeetingQuery, IMeeting } from '@/stores/meeting/types'
import { get, patch, post } from './fetcher'
import { ICreateMeetingPayload, IUpdateMeetingPayload } from './request.type'
import {
    IGetAllDataReponse,
    IMeetingDetailResponse,
    IMeetingParticipantsResponse,
    IRoleMtgResponse,
} from './response.type'

const serviceMeeting = {
    getAllMeetings: async ({
        page,
        limit,
        type,
        filter,
        meetingType,
    }: IGetAllMeetingQuery): Promise<IGetAllDataReponse<IMeeting>> => {
        const payload = { page, limit, type, meetingType, ...filter }
        const response: { data: IGetAllDataReponse<IMeeting> } = await get(
            '/meetings',
            payload,
        )

        return response.data
    },
    createMeeting: async (payload: ICreateMeetingPayload) => {
        const response = await post<any>('/meetings', payload)
        return response.data
    },
    updateMeeting: async (
        meetingId: number,
        payload: IUpdateMeetingPayload,
    ) => {
        const response = await patch<any>(`/meetings/${meetingId}`, payload)
        return response.data
    },
    getDetailMeeting: async (meetingId: number) => {
        const response = await get<IMeetingDetailResponse>(
            `/meetings/${meetingId}`,
        )
        return response.data
    },

    getMeetingParticipants: async (meetingId: number, searchQuery: string) => {
        const response = await get<IMeetingParticipantsResponse>(
            `/meetings/${meetingId}/participants`,
            {
                searchQuery,
                page: 1, // just to test
                limit: 100, // just to test
            },
        )
        return response.data
    },
    sendMailInvitationShareholderMeeting: async (meetingId: number) => {
        const response = await post<any>(
            `/meetings/send-email/meeting/${meetingId}`,
        )
        return response.data
    },
    getRoleMtgs: async (meetingId: number) => {
        const response = await get<IRoleMtgResponse[]>(
            `/meetings/${meetingId}/roleMtgs`,
        )
        return response.data
    },
}

export default serviceMeeting
