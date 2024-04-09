'use client'

import Loader from '@/components/loader'
import { useListPlan } from '@/stores/service-plan/hooks'
import { EActionStatus } from '@/stores/type'

import PlanList from '@/views/service-plan/service-plan-list'
import { Typography } from 'antd'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

const { Title, Text } = Typography

const PricesSection = () => {
    const t = useTranslations()
    const { planState, getListPlanAction } = useListPlan()

    useEffect(() => {
        getListPlanAction({
            page: planState.page,
            limit: planState.limit,
            filter: { ...planState.filter },
        })
        // eslint-disable-next-line
    }, [planState.filter])

    if (!planState || planState?.status === EActionStatus.Pending) {
        return <Loader />
    }

    return (
        <div id="prices" className="bg-orange-sunset py-20">
            <div className="pricing-wrapper mx-auto max-w-[1200px]">
                <div id="pricing-title" className="mx-auto mb-10  text-center">
                    <Title level={2} className="font-bold">
                        {t('OUR_PRICING')}
                    </Title>
                    <Text className="font-normal">
                        {t('PRICING_SUB_TITLE')}
                    </Text>
                </div>
                <div id="pricing-list" className="flex justify-center gap-6">
                    <PlanList add={true} />
                </div>
            </div>
        </div>
    )
}

export default PricesSection
