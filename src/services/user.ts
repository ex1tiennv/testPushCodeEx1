import { Cookies } from 'react-cookie'
import { get, post } from './fetcher'
import {
    IAccount,
    ILoginEmailRequest,
    ILoginRequest,
    ILoginResponse,
} from '@/stores/auth/type'
import { IAccountListResponse } from './response.type'
import { UserStatus } from '@/constants/user-status'
const cookies = new Cookies()

const USER_INFO_STORAGE_KEY = 'usr_if'
const USER_TOKEN_STORAGE_KEY = 'usr_tk'
const USER_REFRESH_TOKEN_STORAGE_KEY = 'usr_refresh_token'

const serviceUser = {
    storeInfo: (user: IAccount | null) => {
        if (user) {
            cookies.set(USER_INFO_STORAGE_KEY, JSON.stringify(user), {
                path: '/',
            })
            return
        }
        cookies.remove(USER_INFO_STORAGE_KEY, { path: '/' })
    },
    storeAccessToken: (token: string | null) => {
        if (token) {
            cookies.set(USER_TOKEN_STORAGE_KEY, JSON.stringify(token), {
                path: '/',
            })
            return
        }
        cookies.remove(USER_TOKEN_STORAGE_KEY, { path: '/' })
    },
    storeRefreshToken: (token: string | null) => {
        if (token) {
            cookies.set(USER_REFRESH_TOKEN_STORAGE_KEY, JSON.stringify(token), {
                path: '/',
            })
            return
        }
        cookies.remove(USER_REFRESH_TOKEN_STORAGE_KEY, { path: '/' })
    },
    getInfoStorage: (): IAccount | null => {
        const userInfo = cookies.get(USER_INFO_STORAGE_KEY)
        return userInfo ? userInfo : null
    },
    getAccessTokenStorage: (): string | null => {
        const tokenString = cookies.get(USER_TOKEN_STORAGE_KEY)
        return tokenString ? tokenString : null
    },
    getRefreshToken: async () => {
        const refreshToken = cookies.get(USER_REFRESH_TOKEN_STORAGE_KEY)
        const response = await post<{
            accessToken: string
        }>('/auths/user/refresh-token', { refreshToken: refreshToken })
        const accessToken = response.data
        if (accessToken) {
            cookies.set(USER_TOKEN_STORAGE_KEY, JSON.stringify(accessToken), {
                path: '/',
            })
        }
        return accessToken
    },
    getNonce: async (walletAddress: string) => {
        const response = await get('/users/get-nonce', {
            walletAddress,
        })
        const nonce = response.data

        return nonce
    },
    login: async (payload: ILoginRequest): Promise<ILoginResponse> => {
        const response: { data: ILoginResponse } = await post(
            '/auths/login',
            payload,
        )
        return response.data
    },

    loginUser: async (payload: ILoginEmailRequest): Promise<ILoginResponse> => {
        const response: { data: ILoginResponse } = await post(
            '/auths/login-by-password',
            payload,
        )
        return response.data
    },

    getAccountList: async (
        query?: string,
        page: number = 1,
        limit: number = 5,
    ): Promise<IAccountListResponse> => {
        const params = {
            searchQuery: query,
            limit,
            page,
        }
        const response = await get<any, { data: IAccountListResponse }>(
            '/users',
            params,
        )
        const filteredItems = response.data.items.filter(
            // eslint-disable-next-line no-undef
            (user) => user.userStatus_status === UserStatus.ACTIVE,
        )
        return {
            items: filteredItems,
            meta: response.data.meta,
        }
    },
}

export default serviceUser
