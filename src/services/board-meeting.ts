import { ICreateBoardMeetingPayload } from '@/services/request.type'
import { get, post } from './fetcher'
import { IGetAllMeetingQuery, IMeeting } from '@/stores/meeting/types'
import { IGetAllDataReponse } from '@/services/response.type'

const serviceBoardMeeting = {
    getAllMeetings: async ({
        page,
        limit,
        type,
        filter,
        meetingType,
    }: IGetAllMeetingQuery): Promise<IGetAllDataReponse<IMeeting>> => {
        const payload = { page, limit, type, meetingType, ...filter }
        const response: { data: IGetAllDataReponse<IMeeting> } = await get(
            '/board-meetings',
            payload,
        )

        return response.data
    },
    createBoardMeeting: async (payload: ICreateBoardMeetingPayload) => {
        const response = await post<any>('/board-meetings', payload)
        return response.data
    },
}

export default serviceBoardMeeting
