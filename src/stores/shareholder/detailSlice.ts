import {
    IDetailShareholderState,
    IShareholderDetail,
} from '@/stores/shareholder/type'
import { EActionStatus, FetchError } from '@/stores/type'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import serviceShareholder from '@/services/shareholder'
import { AxiosError } from 'axios/index'

const initialState: IDetailShareholderState = {
    status: EActionStatus.Idle,
    shareholder: undefined,
    error: undefined,
}
export const getShareholderDetail = createAsyncThunk<
    IShareholderDetail,
    number,
    { rejectValue: FetchError }
>('/shareholders/getSharholderDetail', async (param, { rejectWithValue }) => {
    try {
        const shareholderDetail = await serviceShareholder.getDetailShareholder(
            param,
        )
        return {
            userName: shareholderDetail.username,
            email: shareholderDetail.email,
            walletAddress: shareholderDetail.walletAddress,
            phone: shareholderDetail.phone,
            avatar: shareholderDetail.avatar,
            shareQuantity: shareholderDetail.shareQuantity,
            defaultAvatarHashColor: shareholderDetail.defaultAvatarHashColor,
            companyId: shareholderDetail.company.id,
            companyName: shareholderDetail.company.companyName,
            userStatusId: shareholderDetail.userStatus.id,
            userStatus: shareholderDetail.userStatus.status,
            roles: shareholderDetail.roles,
        } as unknown as IShareholderDetail
    } catch (error) {
        const err = error as AxiosError
        const responseData: any = err.response?.data
        return rejectWithValue({
            errorMessage: responseData?.message,
            errorCode: responseData?.code,
        })
    }
})
const shareholderDetailSlice = createSlice({
    name: 'shareholderDetailSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getShareholderDetail.pending, (state) => {
                state.status = EActionStatus.Pending
            })
            .addCase(getShareholderDetail.fulfilled, (state, action) => {
                state.status = EActionStatus.Succeeded
                state.shareholder = action.payload
            })
            .addCase(getShareholderDetail.rejected, (state, action) => {
                state.status = EActionStatus.Failed
                state.error = action.payload
                state.shareholder = undefined
            })
    },
})

export default shareholderDetailSlice.reducer
