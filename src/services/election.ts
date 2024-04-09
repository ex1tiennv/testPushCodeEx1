import { IGetAllDataRequest } from '@/services/request.type'
import { IElectionResponse, IGetAllDataReponse } from '@/services/response.type'
import { get } from './fetcher'

const serviceElection = {
    getAllElection: async ({
        page,
        limit,
    }: IGetAllDataRequest): Promise<IElectionResponse[]> => {
        const payload = { page, limit }
        const response: { data: IGetAllDataReponse<IElectionResponse> } =
            await get('/elections', payload)
        return response.data.items
    },
}
export default serviceElection
