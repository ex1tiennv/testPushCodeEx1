import { EActionStatus } from '../type'

export interface IAuthAdminState {
    status: EActionStatus
    isAuthenticated: boolean | null
    userAdminInfo: IAccountAdmin | null
    errCode: string
    errMessage: string
}

export interface ILoginAdminRequest {
    email: string
    password: string
}

export interface ILoginAdminResponse {
    accessToken: string
    refreshToken: string
    systemAdminData: IAccountAdmin
}

export interface IAccountAdmin {
    id: number
    username: string
    email: string
    password: string
    resetPasswordToken: string
    resetPasswordExpireTime: Date
}
