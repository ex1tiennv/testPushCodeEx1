/* eslint-disable */

import {
    BookOutlined,
    ClusterOutlined,
    DashboardOutlined,
    RadarChartOutlined,
    SettingOutlined,
    TeamOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons'
import { Permissions } from './permission'

export interface ISidebarItem {
    icon: any
    label: string
    key: string
    permission?: string
}

export const SIDEBAR_ITEMS: ISidebarItem[] = [
    {
        icon: DashboardOutlined,
        label: 'DASHBOARD',
        key: '/dashboard',
        permission: 'DASHBOARD',
    },
    {
        icon: SettingOutlined,
        label: 'SETTING_ROLES',
        key: '/setting-role',
        permission: Permissions.SETTING_PERMISSION_FOR_ROLES,
    },
    {
        icon: ClusterOutlined,
        label: 'BOARD_MEETINGS',
        key: '/board-meeting',
        permission: Permissions.SHAREHOLDERS_MTG,
    },
    {
        icon: VideoCameraOutlined,
        label: 'SHAREHOLDERS_MEETINGS',
        key: '/meeting',
        permission: Permissions.SHAREHOLDERS_MTG,
    },
    {
        icon: UserOutlined,
        label: 'ACCOUNTS',
        key: '/account',
        permission: Permissions.LIST_ACCOUNT,
    },
    {
        icon: TeamOutlined,
        label: 'SHAREHOLDERS',
        key: '/shareholder',
        permission: Permissions.LIST_SHAREHOLDERS,
    },
]

export const SIDEBAR_ITEMS_SYSTEM: ISidebarItem[] = [
    // {
    //     icon: DashboardOutlined,
    //     label: 'DASHBOARD',
    //     key: '/dashboard-system',
    // },
    {
        icon: RadarChartOutlined,
        label: 'LIST_COMPANY',
        key: '/company',
    },
    {
        icon: BookOutlined,
        label: 'SERVICE_PLAN',
        key: '/plan',
    },
]

export const CONSTANT_EMPTY_STRING: string = ''

export const SIDEBAR_OPEN_WIDTH: number = 208
export const SIDEBAR_CLOSE_WIDTH: number = 80
export const MAX_DISPLAY_ROLES = 2

export enum AvatarBgHexColors {
    GREEK_BLUE = '#2F54EB',
    VOLCANO = '#fa541c',
    CYAN = '#13C2C2',
    GOLDEN_PURPLE = '#722ED1',
}

export enum FETCH_STATUS {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}

export const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN'

export const urlRegex =
    /^(https?:\/\/)?((?!\/\/)[\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/
