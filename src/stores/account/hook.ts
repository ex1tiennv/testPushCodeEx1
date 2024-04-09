import { IAccountDetail } from './type'
import {
    IAccountState,
    IGetAllAccountQuery,
    ListParamsFilter,
} from '@/stores/account/type'
import { RootState, useAppDispatch, useAppSelector } from '@/stores'
import { useCallback } from 'react'
import { getAllAccount, setFilter } from '@/stores/account/listSlice'
import { getAccountDetail } from './detailSlice'
import { EActionStatus } from '../type'

type ListAccountType = {
    accountState: IAccountState
    // eslint-disable-next-line
    getListAccountAction: (data: IGetAllAccountQuery) => void
    // eslint-disable-next-line
    setFilterAction: (data: ListParamsFilter) => void
}

export const useListAccount = (): ListAccountType => {
    const dispatch = useAppDispatch()
    const accountState = useAppSelector((state: RootState) => state.accountList)

    const getListAccountAction = useCallback(
        (data: IGetAllAccountQuery) => {
            dispatch(getAllAccount(data))
        },
        [dispatch],
    )

    const setFilterAction = useCallback(
        (data: ListParamsFilter) => {
            dispatch(setFilter(data))
        },
        [dispatch],
    )

    return {
        accountState,
        getListAccountAction,
        setFilterAction,
    }
}

export function useAccountDetail(): [
    {
        account: IAccountDetail | undefined
        status: EActionStatus
    },
    // eslint-disable-next-line
    (accountId: number) => void,
] {
    const dispatch = useAppDispatch()
    const { account, status } = useAppSelector(
        (state: RootState) => state.accountDetail,
    )

    const fetchAccountDetail = useCallback(
        (accountId: number) => {
            dispatch(getAccountDetail(accountId))
        },
        [dispatch],
    )

    return [
        {
            account,
            status,
        },
        fetchAccountDetail,
    ]
}
