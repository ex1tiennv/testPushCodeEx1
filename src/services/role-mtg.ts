import { IGetAllRoleMtgByTypeRequest } from '@/services/request.type'
import { IGetAllDataReponse, IRoleMtgResponse } from '@/services/response.type'
import { get } from './fetcher'

const serviceRoleMtg = {
    getAllRoleMtg: async ({
        page,
        limit,
        type,
    }: IGetAllRoleMtgByTypeRequest): Promise<IRoleMtgResponse[]> => {
        const payload = { page, limit, type }
        const response: { data: IGetAllDataReponse<IRoleMtgResponse> } =
            await get('/role-mtgs/types', payload)
        return response.data.items
    },
}

export default serviceRoleMtg
