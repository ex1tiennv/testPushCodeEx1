/* eslint-disable */

export enum MeetingResourceType {
    MEETING_INVITATIONS = 'MEETING_INVITATIONS',
    MEETING_MINUTES = 'MEETING_MINUTES',
    MEETING_LINKS = 'MEETING_LINKS',
}

export enum MeetingTime {
    MEETING_FUTURE = 'future',
    MEETING_PASS = 'pass',
}

export enum MeetingType {
    SHAREHOLDER_MEETING = '0',
    BOARD_MEETING = '1',
}

export enum MeetingStatus {
    NOT_HAPPEN = '0',
    HAPPENING = '1',
    HAPPENED = '2',
    CANCELED = '3',
    DELAYED = '4',
}

export const MeetingStatusName: {
    [key in MeetingStatus]: string
} = {
    [MeetingStatus.NOT_HAPPEN]: 'NOT_HAPPEN',
    [MeetingStatus.HAPPENING]: 'HAPPENING',
    [MeetingStatus.HAPPENED]: 'HAPPENED',
    [MeetingStatus.CANCELED]: 'CANCELED',
    [MeetingStatus.DELAYED]: 'DELAYED',
}

export const MeetingStatusColor: {
    [key in MeetingStatus]: string
} = {
    [MeetingStatus.NOT_HAPPEN]: 'blue',
    [MeetingStatus.HAPPENING]: 'green',
    [MeetingStatus.HAPPENED]: 'grey',
    [MeetingStatus.CANCELED]: '#FDDA0D',
    [MeetingStatus.DELAYED]: 'red',
}

export enum UserJoinMeetingStatusEnum {
    USER_JOIN_WHEN_MEETING_IS_NOT_START = 0,
    USER_JOIN_MEETING_WHEN_MEETING_START_A_LITTLE = 1,
    MEETING_WAS_CANCEL = 2,
    MEETING_WAS_DELAYED = 3,
}

export enum FileType {
    PDF = 'PDF',
    EXCEL = 'EXCEL',
    WORD = 'WORD',
    LINK = 'LINK',
}

export enum SORT {
    ASC = 'ASC',
    DESC = 'DESC',
}

export enum SortField {
    START_TIME = 'startTime',
}

export enum MeetingFileType {
    MEETING_INVITATION = '0',
    MEETING_MINUTES = '1',
    REPORTS = '2',
    PROPOSAL_FILES = '3',
}

export const MeetingFileTypeToFolderName: {
    [key in MeetingFileType]: string
} = {
    [MeetingFileType.MEETING_INVITATION]: 'invitations',
    [MeetingFileType.MEETING_MINUTES]: 'minutes',
    [MeetingFileType.REPORTS]: 'reports',
    [MeetingFileType.PROPOSAL_FILES]: 'proposals',
}

export const ACCEPT_FILE_TYPES = '.xlsx,.xls,.doc,.docx,.pdf'

export const titleTooltip = {
    shareHolder: 'YOU_MUST_BE_A_SHAREHOLDER(JOINED)_TO_VOTE',
    votingTime: 'OUTSIDE_THE_VOTING_PERIOD',
}
