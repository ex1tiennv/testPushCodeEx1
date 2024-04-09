import serviceUser from '@/services/user'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { EActionStatus } from '../type'
import { getNonceThunk, login, loginByEmail } from './thunk'
import { IAccount, IAuthState, ILoginResponse } from './type'

const initialState: IAuthState = {
    status: EActionStatus.Idle,
    nonce: '',
    userData: serviceUser.getInfoStorage(),
    isAuthenticated: !!serviceUser.getInfoStorage(),
    errorMessage: '',
    errorCode: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signOut: (state: IAuthState) => {
            state.status = EActionStatus.Idle
            state.isAuthenticated = null
            state.userData = null
            state.nonce = ''
            state.errorMessage = ''
            state.errorCode = ''
            serviceUser.storeInfo(null)
        },
        update: (state: IAuthState, action: PayloadAction<IAccount | null>) => {
            state.userData = action.payload
        },
        resetStatus: (state: IAuthState) => {
            state.status = EActionStatus.Idle
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state: IAuthState) => {
                state.status = EActionStatus.Pending
            })
            .addCase(
                login.fulfilled,
                (state: IAuthState, action: PayloadAction<ILoginResponse>) => {
                    state.status = EActionStatus.Succeeded
                    state.userData = action.payload.userData
                    state.isAuthenticated = true
                },
            )
            .addCase(login.rejected, (state: IAuthState, action) => {
                state.errorMessage = action.payload?.errorMessage || ''
                state.status = EActionStatus.Failed
            })
            .addCase(getNonceThunk.pending, (state: IAuthState) => {
                state.status = EActionStatus.Pending
            })
            .addCase(getNonceThunk.fulfilled, (state: IAuthState, action) => {
                state.status = EActionStatus.Succeeded
                state.nonce = action.payload
            })
            .addCase(getNonceThunk.rejected, (state: IAuthState) => {
                state.status = EActionStatus.Failed
            })
            .addCase(loginByEmail.pending, (state: IAuthState) => {
                state.status = EActionStatus.Pending
            })
            .addCase(
                loginByEmail.fulfilled,
                (state: IAuthState, action: PayloadAction<ILoginResponse>) => {
                    state.status = EActionStatus.Succeeded
                    state.userData = action.payload.userData
                    state.isAuthenticated = true
                },
            )
            .addCase(loginByEmail.rejected, (state: IAuthState, action) => {
                console.log('LoginByEmailReject: ', action.payload)
                state.errorMessage = action.payload?.errorMessage || ''
                state.status = EActionStatus.Failed
            })
    },
})

export const { signOut, update, resetStatus } = authSlice.actions

export default authSlice.reducer
