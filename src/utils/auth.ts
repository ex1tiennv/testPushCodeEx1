export const checkPermission = (
    userPermissionList: string[] | undefined,
    permission: string,
) => {
    if (userPermissionList) return userPermissionList.includes(permission)
    return false
}
