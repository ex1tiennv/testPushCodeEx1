import ParticipantList from '@/components/participants-detail/participant-list'
import { Typography } from 'antd'

const { Text } = Typography

export interface IParticipantsView {
    defaultAvatarHashColor: string
    avatar?: string
    name: string
    joined: boolean
}

interface IParticipantDetail {
    title: string
    participantList: IParticipantsView[]
    isLoading: boolean
}

const ParticipantDetail = ({
    title,
    participantList,
    isLoading,
}: IParticipantDetail) => {
    return (
        <div className="flex max-w-sm flex-col gap-4">
            <Text className="text-sm">{title}</Text>
            <ParticipantList
                participantList={participantList}
                isLoading={isLoading}
            />
        </div>
    )
}

export default ParticipantDetail
