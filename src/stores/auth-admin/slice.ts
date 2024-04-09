import serviceUserSystem from '@/services/system-admin/user-system'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { EActionStatus } from '../type'
import { loginAdmin } from './thunk'
import { IAuthAdminState, ILoginAdminResponse } from './type'

const initialState: IAuthAdminState = {
    status: EActionStatus.Idle,
    isAuthenticated: !!serviceUserSystem.getInfoStorageSys() ?? false,
    userAdminInfo: serviceUserSystem.getInfoStorageSys(),

    errCode: '',
    errMessage: '',
}

const authAdminSlice = createSlice({
    name: 'authAdmin',
    initialState,
    reducers: {
        resetStatus: (state: IAuthAdminState) => {
            state.status = EActionStatus.Idle
        },
        signOutSys: (state: IAuthAdminState) => {
            state.isAuthenticated = null
            state.userAdminInfo = null
            serviceUserSystem.storeInfoSys(null)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAdmin.pending, (state: IAuthAdminState) => {
                state.status = EActionStatus.Pending
            })
            .addCase(
                loginAdmin.fulfilled,
                (
                    state: IAuthAdminState,
                    action: PayloadAction<ILoginAdminResponse>,
                ) => {
                    state.status = EActionStatus.Succeeded
                    state.userAdminInfo = action.payload.systemAdminData
                    state.isAuthenticated = true
                },
            )
            .addCase(loginAdmin.rejected, (state: IAuthAdminState, action) => {
                state.status = EActionStatus.Failed
                state.errCode = action.payload?.errorCode ?? ''
                state.errMessage = action.payload?.errorMessage ?? ''
            })
    },
})

export const { resetStatus, signOutSys } = authAdminSlice.actions

export default authAdminSlice.reducer
