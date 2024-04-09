import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { EActionStatus } from '../type'
import { IAttendanceState } from './type'
import { joinMeeting } from './thunk'

const initialState: IAttendanceState = {
    status: EActionStatus.Idle,
    meetingIdJoin: null,
    errorCode: '',
    errorMessage: '',
}

const attendanceSlice = createSlice({
    name: 'attendance',
    initialState,
    reducers: {
        setMeetingIdJoin: (
            state: IAttendanceState,
            action: PayloadAction<{ meetingId: number }>,
        ) => {
            state.meetingIdJoin = action.payload.meetingId
        },
        resetStatusMeeting: (state: IAttendanceState) => {
            state.status = EActionStatus.Idle
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(joinMeeting.pending, (state: IAttendanceState) => {
                state.status = EActionStatus.Pending
                // state.statusMeeting = null
            })
            .addCase(
                joinMeeting.fulfilled,
                (
                    state: IAttendanceState,
                    action: PayloadAction<{ meetingId: number }>,
                ) => {
                    state.status = EActionStatus.Succeeded
                    state.meetingIdJoin = action.payload.meetingId
                },
            )
            .addCase(
                joinMeeting.rejected,
                (state: IAttendanceState, action) => {
                    state.status = EActionStatus.Failed
                    state.errorCode = action.payload?.errorCode ?? ''
                    state.errorMessage = action.payload?.errorMessage ?? ''
                },
            )
    },
})

export const { setMeetingIdJoin, resetStatusMeeting } = attendanceSlice.actions

export default attendanceSlice.reducer
