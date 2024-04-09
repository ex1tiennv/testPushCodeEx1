/* eslint-disable */

import { EActionStatus, FetchError } from '../type'

export interface IAttendanceState extends FetchError {
    status: EActionStatus
    meetingIdJoin: number | null
}

export interface IAttendanceMeeting {
    meetingId: number
}

export enum UserMeetingStatusEnum {
    PARTICIPATE = '0',
    ABSENCE = '1',
}

export enum MeetingRole {
    HOST = 'host',
    CONTROL_BOARD = 'control_board',
    DIRECTOR = 'director',
    ADMINISTRATIVE_COUNCIL = 'administrative_council',
    SHAREHOLDER = 'shareholder',
}
