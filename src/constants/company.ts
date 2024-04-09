/* eslint-disable */
export interface MasterDataItem {
    key: number
    value: string
}

export const SERVICE_PLAN_ITEMS: MasterDataItem[] = [
    {
        key: 1,
        value: 'free',
    },
    {
        key: 2,
        value: 'trial',
    },
    {
        key: 3,
        value: 'pay_of_month',
    },
]

export enum ServicePlan {
    FREE = 'free',
    TRIAL = 'trial',
    PAY_OF_MONTH = 'pay_of_month',
}

export const ServicePlanName: {
    [key in ServicePlan]: string
} = {
    [ServicePlan.FREE]: 'FREE',
    [ServicePlan.TRIAL]: 'TRIAL',
    [ServicePlan.PAY_OF_MONTH]: 'PAY_OF_MONTH',
}

export const ServicePlanColor: {
    [key in ServicePlan]: string
} = {
    [ServicePlan.FREE]: 'black',
    [ServicePlan.TRIAL]: 'orange',
    [ServicePlan.PAY_OF_MONTH]: 'green',
}

export enum InfoType {
    NORMAL = 'normal',
    AVATAR = 'avatar',
    STATUS = 'status',
    PLAN = 'plan',
}
