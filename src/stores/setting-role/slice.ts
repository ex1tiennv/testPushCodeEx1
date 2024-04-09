import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ISettingRole, ISettingRoleState, ParamsFilter } from './type'
import { EActionStatus, FetchError } from '../type'
import serviceSettingRole from '@/services/setting-role'
import { AxiosError } from 'axios'
import { IGetAllDataReponse } from '@/services/response.type'
import { CONSTANT_EMPTY_STRING } from '@/constants/common'

const initialState: ISettingRoleState = {
    status: EActionStatus.Idle,
    openModalRegisterRole: false,
    permissionRoleList: undefined,
    filter: {
        searchQuery: CONSTANT_EMPTY_STRING,
    },
}

export const getCombineRoleWithPermission = createAsyncThunk<
    IGetAllDataReponse<ISettingRole>,
    ParamsFilter,
    {
        rejectValue: FetchError
    }
>('meeting/getPassMeetingAll', async (param, { rejectWithValue }) => {
    try {
        const data = await serviceSettingRole.getCombineRoleWithPermission(
            param,
        )
        return { items: data.data } as IGetAllDataReponse<ISettingRole>
    } catch (error) {
        const err = error as AxiosError
        const responseData: any = err.response?.data
        return rejectWithValue({
            errorMessage: responseData?.info?.message,
            errorCode: responseData?.code,
        })
    }
})

const settingRoleSlice = createSlice({
    name: 'settingRoleSlice',
    initialState,
    reducers: {
        setOpenModalRegisterRole(
            state,
            action: PayloadAction<{ isOpenModal: boolean }>,
        ) {
            state.openModalRegisterRole = action.payload.isOpenModal
        },
        setFilter(state, action: PayloadAction<ParamsFilter>) {
            state.filter = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            // eslint-disable-next-line
            .addCase(getCombineRoleWithPermission.pending, (state, action) => {
                state.status = EActionStatus.Pending
            })
            .addCase(
                getCombineRoleWithPermission.fulfilled,
                (state, action) => {
                    state.status = EActionStatus.Succeeded
                    state.permissionRoleList = action.payload?.items ?? []
                },
            )
            // eslint-disable-next-line
            .addCase(getCombineRoleWithPermission.rejected, (state, action) => {
                state.status = EActionStatus.Failed
            })
    },
})

export const { setOpenModalRegisterRole, setFilter } = settingRoleSlice.actions

export default settingRoleSlice.reducer
