import { EActionStatus, FetchError } from '@/stores/type'
import { UserStatus } from '@/constants/user-status'
import { IUserRole as IUserRoleT } from '@/services/response.type'

export interface IUserStatus {
    id: number
    status: string
    description: string
}
export interface IRole {
    id: number
    roleName: string
    description: string
    companyId: number
}

export interface IUserRole {
    id: number
    userId: number
    roleId: number
    role: IRole
}

export interface IAccountList {
    id: number
    index: number
    username: string
    avatar: string
    companyId: number
    walletAddress: string
    defaultAvatarHashColor: string | null
    status: string
    role: string
}

export interface ListParamsFilter {
    searchQuery?: string
    sortOrder?: string
    sortField?: string
}

export interface IGetAllAccountQuery {
    page: number
    limit: number
    filter?: ListParamsFilter
}

export interface IAccountState extends IGetAllAccountQuery, FetchError {
    status: EActionStatus
    accountList: IAccountList[]
    totalAccountItem: number
}

export interface IAccountDetail {
    userName: string
    email: string
    walletAddress: string
    shareQuantity: number | null
    phone: string
    avatar: string
    defaultAvatarHashColor: string | null
    companyId: number
    companyName: string
    userStatusId: number
    userStatus: UserStatus
    roles: IUserRoleT[]
}

export interface IDetailAccountState {
    status: EActionStatus
    account?: IAccountDetail
    error?: FetchError
}
