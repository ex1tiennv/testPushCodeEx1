import { patch } from './fetcher'
import { IUpdateProfile } from './response.type'

const serviceProfile = {
    updateProfile: async (id: number, payload: IUpdateProfile) => {
        const response = await patch<any>(`/users/profile/${id}`, payload)
        return response.data
    },
}

export default serviceProfile
