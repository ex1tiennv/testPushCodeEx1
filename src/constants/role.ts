/* eslint-disable */
export enum RoleName {
    SUPER_ADMIN = 'SUPER_ADMIN',
    ADMIN = 'ADMIN',
    SHAREHOLDER = 'SHAREHOLDER',
    USER = 'USER',
}

export enum RoleBgHexColors {
    SUPER_ADMIN = '#08df5e',
    ADMIN = '#92d851',
    SHAREHOLDER = '#f46806',
    USER = '#b79350',
    DEFAULTCOLOR = '#ed51b4',
}

export const RoleBgColor: {
    [key in string]: string
} = {
    [RoleName.SUPER_ADMIN]: RoleBgHexColors.SUPER_ADMIN,
    [RoleName.ADMIN]: RoleBgHexColors.ADMIN,
    [RoleName.SHAREHOLDER]: RoleBgHexColors.SHAREHOLDER,
    [RoleName.USER]: RoleBgHexColors.USER,
}
