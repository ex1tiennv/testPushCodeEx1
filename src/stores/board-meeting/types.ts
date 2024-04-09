import { IParticipants } from '@/components/participant-selector'
import { ResolutionType } from '@/constants/resolution'

export interface ICreateBoardMeeting {
    title: string
    meetingLink: string
    startTime: string
    endTime: string
    endVotingTime: string
    note: string
    meetingMinutes: IBoardMeetingDocument[]
    meetingInvitations: IBoardMeetingDocument[]
    managementAndFinancials: IBoardMeetingReport[]
    elections: IBoardMeetingReport[]
    candidates: IBoardMeetingExecutive[]
    hosts: IParticipants[]
    controlBoards: IParticipants[]
    directors: IParticipants[]
    administrativeCouncils: IParticipants[]
}

export interface IBoardMeetingDocument {
    id?: number
    uid?: string
    url: string
    fileType: string
}
export interface IBoardProposalFile {
    id?: number
    uid?: string
    url: string
}

export interface IBoardMeetingReport {
    id?: number
    title: string
    description: string
    oldDescription?: string
    files?: IBoardProposalFile[]
    type: ResolutionType
}

export interface IBoardMeetingExecutive {
    title: string
    type: number
    candidateName: string
}
