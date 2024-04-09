import {
    IAccountAdmin,
    ILoginAdminRequest,
    ILoginAdminResponse,
} from '@/stores/auth-admin/type'
import { Cookies } from 'react-cookie'
import { post } from '@/services/system-admin/fetcher-system'
const cookies = new Cookies()

const USER_SYS_INFO_STORAGE_KEY = 'usr_sys_if'
const USER_SYS_TOKEN_STORAGE_KEY = 'usr_sys_tk'
const USER_SYS_REFRESH_TOKEN_STORAGE_KEY = 'usr_sys_refresh_token'

const serviceUserSystem = {
    storeInfoSys: (user: IAccountAdmin | null) => {
        if (user) {
            cookies.set(USER_SYS_INFO_STORAGE_KEY, JSON.stringify(user), {
                path: '/',
            })
            return
        }
        cookies.remove(USER_SYS_INFO_STORAGE_KEY, { path: '/' })
    },
    storeAccessTokenSys: (token: string | null) => {
        if (token) {
            cookies.set(USER_SYS_TOKEN_STORAGE_KEY, JSON.stringify(token), {
                path: '/',
            })
            return
        }
        cookies.remove(USER_SYS_TOKEN_STORAGE_KEY, { path: '/' })
    },
    storeRefreshTokenSys: (token: string | null) => {
        if (token) {
            cookies.set(
                USER_SYS_REFRESH_TOKEN_STORAGE_KEY,
                JSON.stringify(token),
                {
                    path: '/',
                },
            )
            return
        }
        cookies.remove(USER_SYS_REFRESH_TOKEN_STORAGE_KEY, { path: '/' })
    },
    getInfoStorageSys: (): IAccountAdmin | null => {
        const userInfo = cookies.get(USER_SYS_INFO_STORAGE_KEY)
        return userInfo ? userInfo : null
    },
    getAccessTokenStorageSys: (): string | null => {
        const tokenString = cookies.get(USER_SYS_TOKEN_STORAGE_KEY)
        return tokenString ? tokenString : null
    },
    getRefreshTokenSys: async () => {
        const refreshToken = cookies.get(USER_SYS_REFRESH_TOKEN_STORAGE_KEY)
        const response = await post<{
            accessToken: string
        }>('/auths/system-admin/refresh-token', { refreshToken: refreshToken })
        const accessToken = response.data
        if (accessToken) {
            cookies.set(
                USER_SYS_TOKEN_STORAGE_KEY,
                JSON.stringify(accessToken),
                {
                    path: '/',
                },
            )
        }
        return accessToken
    },
    loginAdmin: async (
        payload: ILoginAdminRequest,
    ): Promise<ILoginAdminResponse> => {
        const response: { data: ILoginAdminResponse } = await post(
            '/auths/system-admin/login-by-password',
            payload,
        )
        return response.data
    },
}

export default serviceUserSystem
