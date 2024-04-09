import { useCallback } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '..'
import { IAuthState, ILoginEmailRequest, ILoginRequest } from './type'
import { signOut, resetStatus } from './slice'
import { getNonceThunk, login, loginByEmail } from './thunk'

type AuthLoginType = {
    authState: IAuthState
    // eslint-disable-next-line
    loginAction: (loginData: ILoginRequest) => void
    // eslint-disable-next-line
    loginByEmailAction: (loginData: ILoginEmailRequest) => void
    // eslint-disable-next-line
    getNonceAction: (walletAddress: string) => void
    logoutAction: () => void
    resetStatusAction: () => void
}

export const useAuthLogin = (): AuthLoginType => {
    const dispatch = useAppDispatch()
    const authState = useAppSelector((state: RootState) => state.auth)

    const loginAction = useCallback(
        (loginData: ILoginRequest) => {
            dispatch(login(loginData))
        },
        [dispatch],
    )

    const loginByEmailAction = useCallback(
        (loginData: ILoginEmailRequest) => {
            dispatch(loginByEmail(loginData))
        },
        [dispatch],
    )

    const getNonceAction = useCallback(
        (walletAddress: string) => {
            dispatch(getNonceThunk(walletAddress))
        },
        [dispatch],
    )

    const logoutAction = useCallback(() => {
        dispatch(signOut())
    }, [dispatch])

    const resetStatusAction = useCallback(() => {
        dispatch(resetStatus())
    }, [dispatch])

    return {
        authState,
        loginAction,
        loginByEmailAction,
        getNonceAction,
        logoutAction,
        resetStatusAction,
    }
}
