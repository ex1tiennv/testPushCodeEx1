import { useCallback } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '..'
import { IAttendanceState } from './type'
import { joinMeeting } from './thunk'
import { resetStatusMeeting } from './slice'

type AttendanceType = {
    attendanceState: IAttendanceState
    // eslint-disable-next-line
    joinMeetingAction: (meetingId: number) => void
    resetStateAttendance: () => void
}

export const useAttendance = (): AttendanceType => {
    const dispatch = useAppDispatch()
    const attendanceState = useAppSelector(
        (state: RootState) => state.attendance,
    )

    const joinMeetingAction = useCallback(
        (meetingId: number) => {
            dispatch(joinMeeting({ meetingId }))
        },
        [dispatch],
    )

    const resetStateAttendance = useCallback(() => {
        dispatch(resetStatusMeeting())
    }, [dispatch])

    return { attendanceState, joinMeetingAction, resetStateAttendance }
}
