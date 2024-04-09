import { EActionStatus, FetchError } from '../type'

export interface ListParamsFilter {
    searchQuery?: string
    sortOrder?: string
    sortField?: string
}

export interface IGetAllPlanQuery {
    page: number
    limit: number
    filter?: ListParamsFilter
}

export interface IPlanList {
    id: number
    planName: string
    description: string
    maxStorage: number
    maxMeeting: number
    price: number
    maxShareholderAccount: number
}

export interface IPlanState extends IGetAllPlanQuery, FetchError {
    status: EActionStatus
    planList: IPlanList[]
    totalPlanItem: number
}
