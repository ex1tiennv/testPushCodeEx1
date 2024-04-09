import { useCallback } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '..'
import { IForgotPasswordState } from './type'
import { ScreenForgotPassword } from '@/constants/forgot-password'
import { setCurrentScreen, setEmail } from './slice'

type ForgotPasswordType = {
    forgotPasswordState: IForgotPasswordState
    // eslint-disable-next-line
    setScreenForgotPassword: (screen: ScreenForgotPassword) => void
    // eslint-disable-next-line
    setEmailForgotPassword: (email: string) => void
}

export const useForgotPassword = (): ForgotPasswordType => {
    const dispatch = useAppDispatch()
    const forgotPasswordState = useAppSelector(
        (state: RootState) => state.forgotPassword,
    )

    const setScreenForgotPassword = useCallback(
        (screen: ScreenForgotPassword) => {
            dispatch(setCurrentScreen({ screen: screen }))
        },
        [dispatch],
    )

    const setEmailForgotPassword = useCallback(
        (email: string) => {
            dispatch(setEmail({ email: email }))
        },
        [dispatch],
    )
    return {
        forgotPasswordState,
        setScreenForgotPassword,
        setEmailForgotPassword,
    }
}
