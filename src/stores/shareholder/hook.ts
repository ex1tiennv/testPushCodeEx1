import {
    IGetAllShareholderQuery,
    IShareholderDetail,
    IShareholderState,
    ListParamsFilter,
} from '@/stores/shareholder/type'
import { RootState, useAppDispatch, useAppSelector } from '@/stores'
import { useCallback } from 'react'
import { getAllShareholder, setFilter } from '@/stores/shareholder/listSlice'
import { EActionStatus, FetchError } from '@/stores/type'
import { getShareholderDetail } from '@/stores/shareholder/detailSlice'

type ListShareholderType = {
    shareholderState: IShareholderState
    // eslint-disable-next-line
    getListShareholderAction: (data: IGetAllShareholderQuery) => void
    // eslint-disable-next-line
    setFilterAction: (data: ListParamsFilter) => void
}

export const useListShareholder = (): ListShareholderType => {
    const dispatch = useAppDispatch()
    const shareholderState = useAppSelector(
        (state: RootState) => state.shareholderList,
    )

    const getListShareholderAction = useCallback(
        (data: IGetAllShareholderQuery) => {
            dispatch(getAllShareholder(data))
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
        shareholderState,
        getListShareholderAction,
        setFilterAction,
    }
}
export const useShareholderDetail = (): [
    {
        shareholder: IShareholderDetail | undefined
        status: EActionStatus
        error?: FetchError | undefined
    },
    // eslint-disable-next-line
    (shareholderId: number) => void,
] => {
    const dispatch = useAppDispatch()
    const { shareholder, status, error } = useAppSelector(
        (state: RootState) => state.shareholderDetail,
    )
    const fetchShareholderDetail = useCallback(
        (shareholderId: number) => {
            dispatch(getShareholderDetail(shareholderId))
        },
        [dispatch],
    )
    return [
        {
            shareholder,
            status,
            error,
        },
        fetchShareholderDetail,
    ]
}
