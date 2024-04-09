import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { EActionStatus, FetchError } from '../type'
import { IAccountDetail, IDetailAccountState } from './type'
import serviceAccount from '@/services/account'
import { AxiosError } from 'axios'

const initialState: IDetailAccountState = {
    status: EActionStatus.Idle,
    account: undefined,
    error: undefined,
}

export const getAccountDetail = createAsyncThunk<
    IAccountDetail,
    number,
    {
        rejectValue: FetchError
    }
>('company/getAccountDetail', async (accountId, { rejectWithValue }) => {
    try {
        const accountDetail = await serviceAccount.getDetailAccount(accountId)
        return {
            userName: accountDetail.username,
            email: accountDetail.email,
            walletAddress: accountDetail.walletAddress,
            shareQuantity: accountDetail.shareQuantity,
            phone: accountDetail.phone,
            avatar: accountDetail.avatar,
            defaultAvatarHashColor: accountDetail.defaultAvatarHashColor,
            companyId: accountDetail.company.id,
            companyName: accountDetail.company.companyName,
            userStatusId: accountDetail.userStatus.status,
            userStatus: accountDetail.userStatus.status,
            roles: accountDetail.roles,
        } as unknown as IAccountDetail
    } catch (error) {
        const err = error as AxiosError
        const responseData: any = err.response?.data
        return rejectWithValue({
            errorMessage: responseData?.message,
            errorCode: responseData?.code,
        })
    }
})

const accountDetailSlice = createSlice({
    name: 'accountDetailSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAccountDetail.pending, (state) => {
                state.status = EActionStatus.Pending
            })
            .addCase(getAccountDetail.fulfilled, (state, action) => {
                state.status = EActionStatus.Succeeded
                state.account = action.payload
            })
            .addCase(getAccountDetail.rejected, (state, action) => {
                state.status = EActionStatus.Failed
                state.error = action.payload
            })
    },
})

export default accountDetailSlice.reducer
