import { CompanyStatus } from '@/constants/company-status'
import { UserStatus } from '@/constants/user-status'

export interface ApiResponse<T = {}> {
    code: string | number
    data: T
    metadata: {
        timestamp: Date
        query: unknown
    }
}

export interface IMeta {
    totalItems: number
    itemCount: number
    itemsPerPage: number
    totalPages: number
    currentPage: number
}

export interface IGetAllDataReponse<T> {
    items: T[]
    meta: IMeta
}

export interface IListCompanyResponse {
    companys_id: number
    companys_company_name: string
    planName: string
    companys_representative_user: string
    totalCreatedAccount: string
    totalCreatedMTGs: string
    companyStatus: string
}

export interface ICompanyStatusResponse {
    id: number
    status: CompanyStatus
    description: string
}

export interface IUserStatusResponse {
    id: number
    status: UserStatus
    description: string
}

export interface IPlanResponse {
    id: number
    planName: string
    description: string
    maxStorage: number
    maxMeeting: number
    price: number
    maxShareholderAccount: number
}

export interface IUserResponse {
    id: number
    username: string
    email: string
    walletAddress: string
    avatar: string
    statusId: number
    companyId: number
    shareQuantity: number
    nonce: string
    defaultAvatarHashColor: string | null
    phone: string | null
    activeTime: string | null
    userStatus: IUserStatusResponse
}

export interface ICompanyDetailResponse {
    id: number
    companyName: string
    companyShortName: string
    description?: string
    address: string
    planId: number
    statusId: number
    representativeUser: string
    phone: string
    taxNumber: string
    email: string
    fax?: string
    dateOfCorporation: string
    businessType: string
    companyStatus: ICompanyStatusResponse
    superAdminInfo: IUserResponse
    servicePlan: IPlanResponse
}

export interface IListPlanResponse {
    id: number
    planName: string
    description: string
    maxStorage: number
    maxMeeting: number
    price: number
    maxShareholderAccount: number
}

export interface ICreatePlan {
    planName: string
    description?: string
    maxStorage: number
    maxMeeting: number
    price: number
    maxShareholderAccount: number
}

export interface IPlanDetailResponse {
    planName: string
    description?: string
    maxStorage: number
    maxMeeting: number
    price: number
    maxShareholderAccount: number
}

export interface IUpdatePlan extends ICreatePlan {}
