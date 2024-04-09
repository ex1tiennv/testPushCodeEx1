import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { EActionStatus, FetchError } from '../type'
import { IDetailCompanyState, ICompanyDetail } from './type'
import serviceCompany from '@/services/system-admin/company'

const initialState: IDetailCompanyState = {
    status: EActionStatus.Idle,
    company: undefined,
    error: undefined,
}

export const getCompanyDetail = createAsyncThunk<
    ICompanyDetail,
    number,
    {
        rejectValue: FetchError
    }
>('company/getCompanyDetail', async (companyId, { rejectWithValue }) => {
    try {
        const companyDetail = await serviceCompany.getDetailCompany(companyId)
        return {
            id: companyDetail?.id,
            companyName: companyDetail?.companyName,
            address: companyDetail?.address,
            description: companyDetail?.description,
            email: companyDetail?.email,
            dateOfCorporation: companyDetail?.dateOfCorporation,
            phone: companyDetail?.phone,
            taxCompany: companyDetail?.taxNumber,
            fax: companyDetail.fax,
            businessType: companyDetail?.businessType,
            status: {
                id: companyDetail?.companyStatus?.id,
                status: companyDetail?.companyStatus?.status,
            },
            representativeUser: companyDetail?.representativeUser,
            servicePlan: {
                id: companyDetail?.servicePlan?.id,
                planName: companyDetail?.servicePlan?.planName,
            },
            superAdminInfo: {
                id: companyDetail?.superAdminInfo?.id,
                username: companyDetail?.superAdminInfo?.username,
                walletAddress: companyDetail?.superAdminInfo?.walletAddress,
                avatar: companyDetail?.superAdminInfo?.avatar,
                email: companyDetail?.superAdminInfo?.email,
                userStatus: {
                    id: companyDetail?.superAdminInfo?.userStatus?.id,
                    status: companyDetail?.superAdminInfo?.userStatus?.status,
                },
            },
        } as ICompanyDetail
    } catch (error) {
        const err = error as AxiosError
        const responseData: any = err.response?.data
        return rejectWithValue({
            errorMessage: responseData?.message,
            errorCode: responseData?.code,
        })
    }
})

const companyDetailSlice = createSlice({
    name: 'companyDetailSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCompanyDetail.pending, (state) => {
                state.status = EActionStatus.Pending
            })
            .addCase(getCompanyDetail.fulfilled, (state, action) => {
                state.status = EActionStatus.Succeeded
                state.company = action.payload
            })
            .addCase(getCompanyDetail.rejected, (state, action) => {
                state.status = EActionStatus.Failed
                state.error = action.payload
            })
    },
})

export default companyDetailSlice.reducer
