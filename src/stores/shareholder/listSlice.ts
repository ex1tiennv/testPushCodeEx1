import {
    IGetAllShareholderQuery,
    IShareholderList,
    IShareholderState,
    ListParamsFilter,
} from '@/stores/shareholder/type'
import { EActionStatus, FetchError } from '@/stores/type'
import { CONSTANT_EMPTY_STRING } from '@/constants/common'
import { SORT } from '@/constants/meeting'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IGetAllDataReponse } from '@/services/response.type'
import serviceShareholder from '@/services/shareholder'
import { AxiosError } from 'axios/index'
const initialState: IShareholderState = {
    status: EActionStatus.Idle,
    shareholderList: [],
    totalShareholderItem: 0,
    page: 1,
    limit: 10,
    filter: {
        searchQuery: CONSTANT_EMPTY_STRING,
        sortOrder: SORT.DESC,
    },
    errorCode: '',
    errorMessage: '',
}

export const getAllShareholder = createAsyncThunk<
    IGetAllDataReponse<IShareholderList>,
    IGetAllShareholderQuery,
    {
        rejectValue: FetchError
    }
>('shareholders/getShareholderAll', async (param, { rejectWithValue }) => {
    try {
        const data = await serviceShareholder.getAllShareholders(param)
        const mappedData = data.items.map((item, index) => {
            return {
                id: item.users_id,
                index: index + 1,
                username: item.users_username,
                avatar: item.users_avartar,
                email: item.users_email,
                defaultAvatarHashColor: item.users_defaultAvatarHashColor,
                walletAddress: item.users_wallet_address,
                status: item.userStatus_status,
                shareQuantity: item.users_share_quantity,
                companyId: item.users_company_id,
                listRoleResponse: item.listRoleResponse,
            }
        }) as unknown as IShareholderList[]
        return {
            ...data,
            items: mappedData,
        } as unknown as IGetAllDataReponse<IShareholderList>
    } catch (error) {
        const err = error as AxiosError
        const responseData: any = err.response?.data
        return rejectWithValue({
            errorMessage: responseData?.info?.message,
            errorCode: responseData?.code,
        })
    }
})

const shareholderListSlice = createSlice({
    name: 'shareholderListSlice',
    initialState,
    reducers: {
        setFilter(state, action: PayloadAction<ListParamsFilter>) {
            state.filter = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllShareholder.pending, (state) => {
                state.status = EActionStatus.Pending
            })
            .addCase(getAllShareholder.fulfilled, (state, action) => {
                state.status = EActionStatus.Succeeded
                state.shareholderList = action.payload?.items ?? []
                state.totalShareholderItem =
                    action.payload?.meta?.totalItems ?? 0
            })
            .addCase(getAllShareholder.rejected, (state, action) => {
                state.status = EActionStatus.Failed
                state.errorCode = action.payload?.errorCode ?? ''
                state.errorMessage = action.payload?.errorMessage ?? ''
            })
    },
})

export const { setFilter } = shareholderListSlice.actions
export default shareholderListSlice.reducer
