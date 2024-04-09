/* eslint-disable */
import { IParticipants } from '@/components/participant-selector'
import SelectedParticipantItem from '@/components/participant-selector/selected-participant-item'

interface ISelectedParticipantList {
    selectedParticipants: IParticipants[]
    onDeleteParticipant: (p: IParticipants) => void
}

const SelectedParticipantList = ({
    selectedParticipants,
    onDeleteParticipant,
}: ISelectedParticipantList) => {
    return (
        <div className="mt-2 flex max-h-44 flex-col gap-2 overflow-hidden hover:overflow-auto">
            {selectedParticipants.map((participant, index) => (
                <SelectedParticipantItem
                    key={index}
                    users_id={participant.users_id}
                    users_username={participant.users_username}
                    users_defaultAvatarHashColor={
                        participant.users_defaultAvatarHashColor
                    }
                    users_avartar={participant.users_avartar}
                    onDeleteParticipant={() => onDeleteParticipant(participant)}
                />
            ))}
        </div>
    )
}

export default SelectedParticipantList
