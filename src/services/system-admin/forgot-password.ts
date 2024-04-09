import { post } from '@/services/system-admin/fetcher-system'
import { post as postUser } from '@/services/fetcher'

const servicePassword = {
    sendEmailForgotPassword: async (payload: { email: string }) => {
        const response = await post<any>(
            '/auths/system-admin/forgot-password',
            payload,
        )
        return response.data
    },

    createNewPassWord: async (
        token: string,
        payload: { password: string; conformPassword: string },
    ) => {
        const response = await post<any>(
            `/auths/system-admin/email/verify/${token}`,
            payload,
        )
        return response.data
    },

    changePassword: async (payload: {
        currentPassword: string
        newPassword: string
    }) => {
        const response = await post<any>(
            '/auths/system-admin/reset-password',
            payload,
        )
        return response.data
    },

    sendEmailForgotPasswordUser: async (payload: { email: string }) => {
        const response = await post<any>('/auths/user/forgot-password', payload)
        return response.data
    },
    createNewPassWordUser: async (
        token: string,
        payload: { password: string; conformPassword: string },
    ) => {
        const response = await post<any>(
            `/auths/user/email/verify/${token}`,
            payload,
        )
        return response.data
    },

    changePasswordUser: async (payload: {
        currentPassword: string
        newPassword: string
    }) => {
        const response = await postUser<any>(
            '/auths/user/change-password',
            payload,
        )
        return response.data
    },
}

export default servicePassword
