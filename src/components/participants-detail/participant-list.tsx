import { IParticipantsView } from '@/components/participants-detail'
import ParticipantItem from '@/components/participants-detail/participant-item'
import { Empty, Spin } from 'antd'

interface IParticipantList {
    participantList: IParticipantsView[]
    isLoading: boolean
}

const ParticipantList = ({ participantList, isLoading }: IParticipantList) => {
    if (isLoading) {
        return (
            <div className="mt-2">
                <Spin tip="Loading..." />
            </div>
        )
    }
    if (participantList.length === 0) {
        return (
            <div className="mb-2 mt-2">
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    style={{
                        marginBlock: 0,
                        width: '40px',
                        height: '40px',
                        fontSize: '10px',
                    }}
                />
            </div>
        )
    }
    return (
        <div className="mt-2 flex max-h-52 flex-col gap-2">
            {participantList.map((participant, index) => (
                <ParticipantItem
                    key={index}
                    email={participant.email}
                    defaultAvatarHashColor={participant.defaultAvatarHashColor}
                    avatar={participant.avatar}
                    joined={participant.joined}
                />
            ))}
        </div>
    )
}

export default ParticipantList
