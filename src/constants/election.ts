/* eslint-disable */
export enum ElectionEnum {
    VOTE_OF_CONFIDENCE = '0',
    VOTE_OF_NOT_CONFIDENCE = '1',
}

export const ElectionColor: {
    [key in ElectionEnum]: string
} = {
    [ElectionEnum.VOTE_OF_CONFIDENCE]: 'green',
    [ElectionEnum.VOTE_OF_NOT_CONFIDENCE]: 'red',
}

export const ElectionName: {
    [key in ElectionEnum]: string
} = {
    [ElectionEnum.VOTE_OF_CONFIDENCE]: 'VOTE_OF_CONFIDENCE',
    [ElectionEnum.VOTE_OF_NOT_CONFIDENCE]: 'VOTE_OF_NOT_CONFIDENCE',
}
