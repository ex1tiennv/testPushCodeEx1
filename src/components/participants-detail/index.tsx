import ParticipantList from '@/components/participants-detail/participant-list'
import { Typography } from 'antd'
import { UserMeetingStatusEnum } from '@/stores/attendance/type'
import { useTranslations } from 'next-intl'

const { Text } = Typography

export interface IParticipantsView {
    defaultAvatarHashColor: string
    avatar?: string
    email: string
    joined: boolean
    status?: UserMeetingStatusEnum
    shareQuantity?: number | null
}

interface IParticipantDetail {
    title: string
    participantList: IParticipantsView[]
    isLoading: boolean
    width?: string
}

const ParticipantDetail = ({
    title,
    participantList,
    isLoading,
    width,
}: IParticipantDetail) => {
    const t = useTranslations()
    return (
        <div className={`flex ${width} flex-col gap-4`}>
            <Text className="text-sm">{t(title)}</Text>

            <ParticipantList
                participantList={participantList}
                isLoading={isLoading}
            />
        </div>
    )
}

export default ParticipantDetail
