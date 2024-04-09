import { useCallback } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '..'
import { IGetAllPlanQuery, IPlanState, ListParamsFilter } from './type'
import { getAllPlan, setFilter } from './listSlice'

type ListPlanType = {
    planState: IPlanState
    // eslint-disable-next-line
    getListPlanAction: (data: IGetAllPlanQuery) => void
    // eslint-disable-next-line
    setFilterAction: (data: ListParamsFilter) => void
}

export const useListPlan = (): ListPlanType => {
    const dispatch = useAppDispatch()
    const planState = useAppSelector((state: RootState) => state.planListSlice)

    const getListPlanAction = useCallback(
        (data: IGetAllPlanQuery) => {
            dispatch(getAllPlan(data))
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
        planState,
        getListPlanAction,
        setFilterAction,
    }
}
