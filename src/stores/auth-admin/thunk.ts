import serviceUserSystem from '@/services/system-admin/user-system'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { FetchError } from '../type'
import { ILoginAdminRequest, ILoginAdminResponse } from './type'

export const loginAdmin = createAsyncThunk<
    ILoginAdminResponse,
    ILoginAdminRequest,
    {
        rejectValue: FetchError
    }
>('auth/login-admin', async (loginData, { rejectWithValue }) => {
    try {
        const loginResponse: ILoginAdminResponse =
            await serviceUserSystem.loginAdmin(loginData)
        const { accessToken, refreshToken, systemAdminData } = loginResponse
        serviceUserSystem.storeInfoSys(systemAdminData)
        serviceUserSystem.storeAccessTokenSys(accessToken)
        serviceUserSystem.storeRefreshTokenSys(refreshToken)
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
