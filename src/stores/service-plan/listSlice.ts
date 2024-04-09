import { CONSTANT_EMPTY_STRING } from '@/constants/common'
import { EActionStatus, FetchError } from '../type'
import {
    IGetAllPlanQuery,
    IPlanList,
    IPlanState,
    ListParamsFilter,
} from './type'
import { SORT } from '@/constants/meeting'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IGetAllDataReponse } from '@/services/response.type'
import servicePlan from '@/services/system-admin/service-plan'
import { AxiosError } from 'axios'

const initialState: IPlanState = {
    status: EActionStatus.Idle,
    planList: [],
    totalPlanItem: 0,
    page: 1,
    limit: 10,
    filter: {
        searchQuery: CONSTANT_EMPTY_STRING,
        sortOrder: SORT.DESC,
    },
    errorCode: '',
    errorMessage: '',
}

export const getAllPlan = createAsyncThunk<
    IGetAllDataReponse<IPlanList>,
    IGetAllPlanQuery,
    {
        rejectValue: FetchError
    }
>('plan/getAllPlan', async (param, { rejectWithValue }) => {
    try {
        const data = await servicePlan.getAllPlans(param)
        const mapData = data.items.map((item) => {
            return {
                id: item.id,
                planName: item.planName,
                description: item.description,
                maxStorage: item.maxStorage,
                maxMeeting: item.maxMeeting,
                price: item.price,
                maxShareholderAccount: item.maxShareholderAccount,
            }
        }) as IPlanList[]

        return {
            ...data,
            items: mapData,
        } as IGetAllDataReponse<IPlanList>
    } catch (error) {
        const err = error as AxiosError
        const responseData: any = err.response?.data
        return rejectWithValue({
            errorMessage: responseData?.info?.message,
            errorCode: responseData?.code,
        })
    }
})

const planListSlice = createSlice({
    name: 'planListSlice',
    initialState,
    reducers: {
        setFilter(state, action: PayloadAction<ListParamsFilter>) {
            state.filter = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPlan.pending, (state) => {
                state.status = EActionStatus.Pending
            })
            .addCase(getAllPlan.fulfilled, (state, action) => {
                state.status = EActionStatus.Succeeded
                state.planList = action.payload.items ?? []
                state.totalPlanItem = action.payload?.meta?.totalItems
            })
            .addCase(getAllPlan.rejected, (state, action) => {
                state.status = EActionStatus.Failed
                state.errorCode = action.payload?.errorCode ?? ''
                state.errorMessage = action.payload?.errorMessage ?? ''
            })
    },
})

export const { setFilter } = planListSlice.actions
export default planListSlice.reducer
