import { ICreateBoardMeeting } from '@/stores/board-meeting/types'
import { RootState, useAppDispatch, useAppSelector } from '@/stores'
import { useCallback } from 'react'
import {
    resetCreateBoardMeetingData,
    updateCreateBoardMeetingInformation,
} from '@/stores/board-meeting/createSlice'

export function useCreateBoardMeetingInformation(): [
    ICreateBoardMeeting,
    // eslint-disable-next-line
    (data: ICreateBoardMeeting) => void,
    () => void,
] {
    const dispatch = useAppDispatch()
    const data = useAppSelector((state: RootState) => state.boardMeetingCreate)
    const setCreateBoardMeetingInformation = useCallback(
        (data: ICreateBoardMeeting) => {
            dispatch(updateCreateBoardMeetingInformation(data))
        },
        [dispatch],
    )

    const resetData = useCallback(() => {
        dispatch(resetCreateBoardMeetingData())
    }, [dispatch])
    return [data, setCreateBoardMeetingInformation, resetData]
}
