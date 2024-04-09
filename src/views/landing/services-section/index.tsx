'use client'

import ServiceItem, {
    IServiceItem,
} from '@/views/landing/services-section/service-item'
import { Typography } from 'antd'
import { useTranslations } from 'next-intl'

const { Title, Text } = Typography

const servicesList: IServiceItem[] = [
    {
        serviceImage: '/images/landing-service-save.png',
        serviceTitle: 'SAVE_ALL_DATA_ON_BLOCKCHAIN_TITLE',
        serviceSubtitle: 'SAVE_ALL_DATA_ON_BLOCKCHAIN_SUB_TITLE',
    },
    {
        serviceImage: '/images/landing-service-meeting.png',
        serviceTitle: 'MANAGE_MEETING_EASILY_TITLE',
        serviceSubtitle: 'MANAGE_MEETING_EASILY_SUB_TITLE',
    },
    {
        serviceImage: '/images/landing-service-rbac.png',
        serviceTitle: 'USE_RBAC_TITLE',
        serviceSubtitle: 'USE_RBAC_SUB_TITLE',
    },
]

const ServicesSection = () => {
    const t = useTranslations()

    return (
        <div id="services" className="mx-auto max-w-[1200px] py-[100px]">
            <div id="services-title" className="mb-10 text-center">
                <Title level={2} className="font-bold">
                    {t('OUR_SERVICE')}
                </Title>
                <Text className="font-normal">{t('SERVICE_SUB_TITLE')}</Text>
            </div>
            <div id="services-list" className="flex justify-center gap-6">
                {servicesList.map((service, index) => (
                    <ServiceItem
                        key={index}
                        serviceImage={service.serviceImage}
                        serviceTitle={service.serviceTitle}
                        serviceSubtitle={service.serviceSubtitle}
                    />
                ))}
            </div>
        </div>
    )
}

export default ServicesSection
