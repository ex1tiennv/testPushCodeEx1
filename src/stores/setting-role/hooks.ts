import { useCallback } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '..'
import { ISettingRoleState, ParamsFilter } from './type'
import {
    getCombineRoleWithPermission,
    setFilter,
    setOpenModalRegisterRole,
} from './slice'

type SettingRoleType = {
    settingRoleState: ISettingRoleState
    // eslint-disable-next-line
    setOpenModal: (isOpenModal: boolean) => void
    // eslint-disable-next-line
    getAllCombineRoleWithPermission: (data?: ParamsFilter) => void
    // eslint-disable-next-line
    setFilterAction: (data: ParamsFilter) => void
}

export const useSettingRole = (): SettingRoleType => {
    const dispatch = useAppDispatch()
    const settingRoleState = useAppSelector(
        (state: RootState) => state.settingRole,
    )

    const setOpenModal = useCallback(
        (isOpenModal: boolean) => {
            dispatch(setOpenModalRegisterRole({ isOpenModal }))
        },
        [dispatch],
    )

    const getAllCombineRoleWithPermission = useCallback(
        (data?: ParamsFilter) => {
            dispatch(
                getCombineRoleWithPermission({
                    searchQuery: data?.searchQuery,
                }),
            )
        },
        [dispatch],
    )

    const setFilterAction = useCallback(
        (data: ParamsFilter) => {
            dispatch(setFilter(data))
        },
        [dispatch],
    )

    return {
        settingRoleState,
        setOpenModal,
        getAllCombineRoleWithPermission,
        setFilterAction,
    }
}
