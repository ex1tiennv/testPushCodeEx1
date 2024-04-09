import { EActionStatus } from '../type'

export interface ISettingRoleState {
    status: EActionStatus
    openModalRegisterRole: boolean
    permissionRoleList?: ISettingRole[]
    filter: ParamsFilter
}

export interface ISettingRole {
    [key: string]: IRolePermission
}

export interface IRolePermission {
    [key: string]: number
}

export interface ParamsFilter {
    searchQuery?: string
}
