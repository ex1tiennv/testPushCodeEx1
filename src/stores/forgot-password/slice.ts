import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EActionStatus } from '../type'
import { IForgotPasswordState } from './type'
import { ScreenForgotPassword } from '@/constants/forgot-password'

const initialState: IForgotPasswordState = {
    status: EActionStatus.Idle,
    currentScreen: ScreenForgotPassword.SEND_MAIL,
    email: undefined,
    errorCode: '',
    errorMessage: '',
}

const forgotPasswordSlice = createSlice({
    name: 'forgotPasswordSlice',
    initialState,
    reducers: {
        setCurrentScreen(
            state,
            action: PayloadAction<{ screen: ScreenForgotPassword }>,
        ) {
            state.currentScreen = action.payload.screen
        },
        setEmail(state, action: PayloadAction<{ email: string }>) {
            console.log('slice', action.payload.email)
            state.email = action.payload.email
        },
    },
})

export const { setCurrentScreen, setEmail } = forgotPasswordSlice.actions

export default forgotPasswordSlice.reducer
