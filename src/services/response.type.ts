import { IParticipants } from '@/components/participant-selector'
import { IParticipantsView } from '@/components/participants-detail'
import { MeetingFileType, MeetingStatus } from '@/constants/meeting'
import { ResolutionType, VoteProposalOption } from '@/constants/resolution'
import { UserStatus } from '@/constants/user-status'
import { UserMeetingStatusEnum } from '@/stores/attendance/type'
import { ICompanyStatusResponse } from './system-admin/response.type'
import { ElectionEnum } from '@/constants/election'

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

export interface ApiResponse<T = {}> {
    code: string | number
    data: T
    metadata: {
        timestamp: Date
        query: unknown
    }
}

export interface IUploadResponse {
    uploadUrls: string[]
}

export interface IAccountListResponse {
    items: IParticipants[]
    meta: IMeta
}

export interface IMeetingFileResponse {
    id: number
    url: string
    meetingId: number
    fileType: MeetingFileType
}

export interface IProposalCreatorResponse {
    username: string
    email: string
    avatar: string | null
    defaultAvatarHashColor: string | null
}

export interface IProposalFileResponse {
    id: number
    url: string
}

export interface IProposalResponse {
    id: number
    title: string
    description: string
    oldDescription?: string
    type: ResolutionType
    votedQuantity: number | null
    unVotedQuantity: number | null
    notVoteYetQuantity: number | null
    voteResult: VoteProposalOption
    meetingId: number
    creator: IProposalCreatorResponse
    proposalFiles: IProposalFileResponse[]
}

export interface IUserMeetingResponse {
    id: number
    status: UserMeetingStatusEnum
    user: {
        id: number
        username: string
        email: string
        avatar: string | null
        defaultAvatarHashColor: string | null
    }
}

export interface IMeetingDetailResponse {
    id: number
    title: string
    note: string
    startTime: string
    endTime: string
    endVotingTime: string
    meetingLink: string
    status: MeetingStatus
    companyId: number
    creatorId: number
    meetingFiles: IMeetingFileResponse[]
    proposals: IProposalResponse[]
    hosts: IUserMeetingResponse[]
    controlBoards: IUserMeetingResponse[]
    directors: IUserMeetingResponse[]
    administrativeCouncils: IUserMeetingResponse[]
    shareholders: IUserMeetingResponse[]
    shareholdersTotal: number
    shareholdersJoined: number
    joinedMeetingShares: number
    totalMeetingShares: number
}

export interface IVoteProposalResult {
    result: VoteProposalOption
    userId: number
    proposalId: number
    deletedAt: null | string
    id: number
}

export interface IMeetingParticipantsResponse {
    hosts: IParticipantsView[]
    controlBoards: IParticipantsView[]
    directors: IParticipantsView[]
    shareholders: IParticipantsView[]
    administrativeCouncils: IParticipantsView[]
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

export interface IUserStatusResponse {
    id: number
    status: UserStatus
    description: string
}

export interface IElectionResponse {
    id: number
    status: ElectionEnum
    description: string
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

export interface IRoleResponse {
    id: number
    roleName: string
    description: string
}
export interface IListAccountResponse {
    users_id: number
    users_username: string
    users_wallet_address: string
    users_email: string
    users_avartar: string
    users_company_id: number
    users_defaultAvatarHashColor: string | null
    userStatus_id: number
    userStatus_status: string
    userStatus_description: string
    listRoleResponse: string
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

export interface IUserRole {
    id: number
    roleName: string
    description: string
}
export interface IUserRoleResponse {
    id: number
    roleName: string
    description: string
}
export interface IAccountDetailResponse {
    username: string
    email: string
    walletAddress: string
    shareQuantity: number
    phone: string
    avatar: string
    defaultAvatarHashColor: string | null
    company: {
        companyName: string
        id: number
    }
    userStatus: IUserStatusResponse
    roles: IUserRole[]
}
export interface ICreateAccountPayload {
    email: string
    username: string
    walletAddress?: string | null
    shareQuantity?: number | null
    phone: string
    roleIds: number[]
    statusId: number
    avatar?: string | null
}

export interface IListShareholderResponse {
    users_id: number
    users_username: string
    users_email: string
    users_wallet_address: string
    users_avartar: string | null
    users_company_id: number
    users_share_quantity: number
    users_defaultAvatarHashColor: string | null
    userStatus_status: IUserStatusResponse
    listRoleResponse: string
}

export interface IShareholderDetailResponse {
    username: string
    email: string
    walletAddress: string
    phone: string
    avatar: string
    shareQuantity: number
    defaultAvatarHashColor: string | null
    company: {
        companyName: string
        id: number
    }
    userStatus: IUserStatusResponse
    roles: IUserRole[]
}

export interface IUpdateShareholderPayload {
    email: string
    username: string
    walletAddress?: string | null
    shareQuantity?: number | null
    phone: string
    roleIds: number[]
    statusId: number
    avatar?: string | null
}
export interface IUpdateProfile {
    email: string
    username: string
    walletAddress?: string | null
    phone: string
    avatar?: string
}
export interface IPermissionResponse {
    id: number
    key: string
    description?: string
}
