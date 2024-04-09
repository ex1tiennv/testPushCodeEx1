import { Typography } from 'antd'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

const { Text } = Typography

export interface IMeetingEmpty {
    emptyMeetingMessage: string
}

const EmptyMeeting = ({ emptyMeetingMessage }: IMeetingEmpty) => {
    const t = useTranslations()
    return (
        <div className="flex flex-col items-center">
            <Image
                src="/images/logo-meeting-past.png"
                alt="service-image-alt"
                width={72}
                height={48}
            />
            <Text className="mt-6 text-xl font-medium text-black-45">
                {t('NO_MEETING')}
            </Text>
            <Text className="mt-2 text-black-45">{emptyMeetingMessage}</Text>
        </div>
    )
}

export default EmptyMeeting
