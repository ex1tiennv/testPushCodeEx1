import { EActionStatus, FetchError } from '../type'

export interface ICompanyList {
    id: number
    index: number
    companyName: string
    servicePlan: string
    representative: string
    totalCreatedAccount: string
    totalCreatedMTGs: string
    status: string
}

export interface ListParamsFilter {
    searchQuery?: string
    sortOrder?: string
    sortField?: string
}

export interface IGetAllCompanyQuery {
    page: number
    limit: number
    filter?: ListParamsFilter
}

export interface ICompanyState extends IGetAllCompanyQuery, FetchError {
    status: EActionStatus
    companyList: ICompanyList[]
    totalCompanyItem: number
}
export interface ICompanyDetail {
    id: number
    companyName: string | null
    address: string
    description: string
    email: string
    dateOfCorporation: string
    phone: string
    taxCompany: string
    fax: string | null
    businessType: string
    status: {
        id: number
        status: string
    }
    representativeUser: string
    servicePlan: {
        id: number
        planName: string
    }
    superAdminInfo: {
        id: number
        username: string
        walletAddress: string
        avatar: string
        userStatus: {
            id: number
            status: string
        }
        email: string
    }
}

export interface IDetailCompanyState {
    status: EActionStatus
    company?: ICompanyDetail
    error?: FetchError
}
