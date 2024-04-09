import { IGetAllDataRequest } from '@/services/request.type'
import { get } from './fetcher'
import { get as getSys } from './system-admin/fetcher-system'
import { IGetAllDataReponse, IUserStatusResponse } from './response.type'

const serviceUserStatus = {
    getAllUserStatus: async ({
        page,
        limit,
    }: IGetAllDataRequest): Promise<IUserStatusResponse[]> => {
        const payload = { page, limit }
        const response: { data: IGetAllDataReponse<IUserStatusResponse> } =
            await get('/user-status', payload)

        return response.data.items
    },
    getAllUserStatusSysAdmin: async ({
        page,
        limit,
    }: IGetAllDataRequest): Promise<IUserStatusResponse[]> => {
        const payload = { page, limit }
        const response: { data: IGetAllDataReponse<IUserStatusResponse> } =
            await getSys('/system-admin/user-status', payload)

        return response.data.items
    },
}

export default serviceUserStatus
