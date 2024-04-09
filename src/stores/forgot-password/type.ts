import { ScreenForgotPassword } from '@/constants/forgot-password'
import { EActionStatus, FetchError } from '../type'

export interface IForgotPasswordState extends FetchError {
    status: EActionStatus
    currentScreen: ScreenForgotPassword
    email?: string
}
