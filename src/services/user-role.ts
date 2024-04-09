import { IGetAllDataReponse, IUserRoleResponse } from './response.type'
import { IGetAllDataRequest } from './request.type'
import { get } from './fetcher'

const serviceUserRole = {
    getAllNormalUserRole: async ({
        page,
        limit,
    }: IGetAllDataRequest): Promise<IUserRoleResponse[]> => {
        const payload = { page, limit }
        const response: { data: IGetAllDataReponse<IUserRoleResponse> } =
            await get('/roles/normal-role', payload)

        return response.data.items
    },
}

export default serviceUserRole
