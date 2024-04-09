import { IGetAllDataRequest } from '@/services/request.type'
import { get } from './fetcher'
import { IGetAllDataReponse, IPlanResponse } from './response.type'

const servicePlan = {
    getAllPlan: async ({
        page,
        limit,
    }: IGetAllDataRequest): Promise<IPlanResponse[]> => {
        const payload = { page, limit }
        const response: { data: IGetAllDataReponse<IPlanResponse> } = await get(
            '/system-admin/plans',
            payload,
        )

        return response.data.items
    },
}

export default servicePlan
