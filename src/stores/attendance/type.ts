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
    HOST = 'HOST',
    CONTROL_BOARD = 'CONTROL_BOARD',
    DIRECTOR_GENERAL_DIRECTOR = 'DIRECTOR_GENERAL_DIRECTOR',
    ADMINISTRATIVE_COUNCIL = 'ADMINISTRATIVE_COUNCIL',
    SHAREHOLDER = 'SHAREHOLDER',
}
