/* eslint-disable */

export const ACCEPT_AVATAR_TYPES = '.jpg,.jpeg,.png'
export const MAX_AVATAR_FILE_SIZE = 20

export enum AccountFileType {
    AVATAR = '0',
}

export const AvatarFileTypeToFolderName: {
    [key in AccountFileType]: string
} = {
    [AccountFileType.AVATAR]: 'avatars',
}
