import { IAccountList } from '@/stores/account/type'
import { EActionStatus, FetchError } from '@/stores/type'
import { UserStatus } from '@/constants/user-status'
import { IUserRole as IUserRoleT } from '@/services/response.type'

export interface IShareholderList extends Omit<IAccountList, 'role'> {
    shareQuantity: number
}

export interface IGetAllShareholderQuery {
    page: number
    limit: number
    filter?: ListParamsFilter
}

export interface IShareholderState extends IGetAllShareholderQuery, FetchError {
    status: EActionStatus
    shareholderList: IShareholderList[]
    totalShareholderItem: number
}

export interface ListParamsFilter {
    searchQuery?: string
    sortOrder?: string
    sortField?: string
}

export interface IShareholderDetail {
    userName: string
    email: string
    walletAddress: string
    phone: string
    avatar: string
    shareQuantity: number
    defaultAvatarHashColor: string | null
    companyId: number
    companyName: string
    userStatusId: number
    userStatus: UserStatus
    roles: IUserRoleT[]
}

export interface IDetailShareholderState {
    status: EActionStatus
    shareholder?: IShareholderDetail
    error?: FetchError
}
