import serviceUser from '@/services/user'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { FetchError } from '../type'
import { ILoginEmailRequest, ILoginRequest, ILoginResponse } from './type'

export const getNonceThunk = createAsyncThunk(
    'auth/getNonce',
    async (walletAddress: string) => {
        const nonce = await serviceUser.getNonce(walletAddress)
        return nonce
    },
)

export const login = createAsyncThunk<
    ILoginResponse,
    ILoginRequest,
    {
        rejectValue: FetchError
    }
>('auth/login', async (loginData, { rejectWithValue }) => {
    try {
        const loginResponse: ILoginResponse = await serviceUser.login(loginData)
        const { userData, accessToken, refreshToken } = loginResponse
        serviceUser.storeInfo(userData)
        serviceUser.storeAccessToken(accessToken)
        serviceUser.storeRefreshToken(refreshToken)
        return loginResponse
    } catch (error) {
        const err = error as AxiosError
        const responseData: any = err.response?.data
        return rejectWithValue({
            errorMessage: responseData?.info.message,
            errorCode: responseData?.code,
        })
    }
})

export const loginByEmail = createAsyncThunk<
    ILoginResponse,
    ILoginEmailRequest,
    {
        rejectValue: FetchError
    }
>('auth/login-by-password', async (loginData, { rejectWithValue }) => {
    try {
        const loginResponse: ILoginResponse = await serviceUser.loginUser(
            loginData,
        )
        const { userData, accessToken, refreshToken } = loginResponse
        serviceUser.storeInfo(userData)
        serviceUser.storeAccessToken(accessToken)
        serviceUser.storeRefreshToken(refreshToken)
        return loginResponse
    } catch (error) {
        const err = error as AxiosError
        const responseData: any = err.response?.data
        return rejectWithValue({
            errorMessage: responseData?.info.message,
            errorCode: responseData?.code,
        })
    }
})
