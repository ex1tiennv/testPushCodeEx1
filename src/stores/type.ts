/* eslint-disable */

import { Action } from '@reduxjs/toolkit'

export interface IAction<Payload = any> extends Action {
    payload: Payload
}

export enum EActionStatus {
    Idle = 'idle',
    Pending = 'pending',
    Succeeded = 'succeeded',
    Failed = 'failed',
}

export interface IGetAllDataQuery {
    page: number
    limit: number
    keyword?: string
}

export interface FetchError {
    errorCode: string
    errorMessage: string
}
