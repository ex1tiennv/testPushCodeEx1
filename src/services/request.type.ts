import { MeetingStatus } from '@/constants/meeting'
import { IMeetingDocument, IMeetingResolution } from '@/stores/meeting/types'
import {
    IBoardMeetingDocument,
    IBoardMeetingExecutive,
    IBoardMeetingReport,
} from '@/stores/board-meeting/types'
import { TypeRoleMeeting } from '@/constants/role-mtg'

export interface ICreateMeetingPayload {
    title: string
    meetingLink: string
    startTime: string
    endTime: string
    meetingMinutes: IMeetingDocument[]
    meetingInvitations: IMeetingDocument[]
    resolutions: IMeetingResolution[]
    amendmentResolutions: IMeetingResolution[]
    participants: IParticipantPayload[]
}

export interface IParticipantPayload {
    roleMtgId: number
    roleName: string
    userIds: number[]
}

export interface ICreateBoardMeetingPayload {
    title: string
    meetingLink: string
    startTime: string
    endTime: string
    meetingMinutes: IBoardMeetingDocument[]
    meetingInvitations: IBoardMeetingDocument[]
    managementAndFinancials: IBoardMeetingReport[]
    elections: IBoardMeetingReport[]
    candidates: IBoardMeetingExecutive[]
    participants: IParticipantPayload[]
}

export interface IUpdateMeetingPayload {
    title: string
    meetingLink: string
    startTime: string
    endTime: string
    status: MeetingStatus
    meetingMinutes: IMeetingDocument[]
    meetingInvitations: IMeetingDocument[]
    resolutions: IMeetingResolution[]
    amendmentResolutions: IMeetingResolution[]
    participants: IParticipantPayload[]
}

export interface IListMeetingPayload {}

export interface IGetAllDataRequest {
    page: number
    limit: number
}
export interface IGetAllRoleMtgByTypeRequest extends IGetAllDataRequest {
    type?: TypeRoleMeeting
}

export interface ICreateAccountPayload {
    email: string
    username: string
    walletAddress: string
    shareQuantity?: number
    phone: string
    roleIds: number[]
    statusId: number
    avatar?: string
}

export interface IUpdatePermissionRole {
    permissionId: number
    changeStatePermissionForRole: RoleChecked[]
}

type RoleChecked = {
    roleId: number
    state: number
}

export interface ICreateRolePayload {
    roleName: string
    description?: string
    idPermissions: number[]
}
