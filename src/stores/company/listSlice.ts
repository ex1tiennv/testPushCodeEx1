import { CONSTANT_EMPTY_STRING } from '@/constants/common'
import { SORT } from '@/constants/meeting'
import serviceCompany from '@/services/system-admin/company'
import { IGetAllDataReponse } from '@/services/response.type'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { EActionStatus, FetchError } from '../type'
import {
    ICompanyList,
    ICompanyState,
    IGetAllCompanyQuery,
    ListParamsFilter,
} from './type'

const initialState: ICompanyState = {
    status: EActionStatus.Idle,
    companyList: [],
    totalCompanyItem: 0,
    page: 1,
    limit: 10,
    filter: {
        searchQuery: CONSTANT_EMPTY_STRING,
        sortOrder: SORT.DESC,
    },
    errorCode: '',
    errorMessage: '',
}

export const getAllCompany = createAsyncThunk<
    IGetAllDataReponse<ICompanyList>,
    IGetAllCompanyQuery,
    {
        rejectValue: FetchError
    }
>('company/getCompanyAll', async (param, { rejectWithValue }) => {
    try {
        const data = await serviceCompany.getAllCompanys(param)
        const mappedData = data.items.map((item, index) => {
            return {
                id: item.companys_id,
                index: index + 1,
                companyName: item.companys_company_name,
                servicePlan: item.planName,
                representative: item.companys_representative_user,
                totalCreatedAccount: item.totalCreatedAccount,
                totalCreatedMTGs: item.totalCreatedMTGs,
                status: item.companyStatus,
            }
        }) as ICompanyList[]

        return {
            ...data,
            items: mappedData,
        } as IGetAllDataReponse<ICompanyList>
    } catch (error) {
        const err = error as AxiosError
        const responseData: any = err.response?.data
        return rejectWithValue({
            errorMessage: responseData?.info?.message,
            errorCode: responseData?.code,
        })
    }
})

const companyListSlice = createSlice({
    name: 'companyListSlice',
    initialState,
    reducers: {
        setFilter(state, action: PayloadAction<ListParamsFilter>) {
            state.filter = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCompany.pending, (state) => {
                state.status = EActionStatus.Pending
            })
            .addCase(getAllCompany.fulfilled, (state, action) => {
                state.status = EActionStatus.Succeeded
                state.companyList = action.payload?.items ?? []
                state.totalCompanyItem = action.payload?.meta?.totalItems ?? 0
            })
            .addCase(getAllCompany.rejected, (state, action) => {
                state.status = EActionStatus.Failed
                state.errorCode = action.payload?.errorCode ?? ''
                state.errorMessage = action.payload?.errorMessage ?? ''
            })
    },
})

export const { setFilter } = companyListSlice.actions

export default companyListSlice.reducer
