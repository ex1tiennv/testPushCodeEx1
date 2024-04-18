/* eslint-disable */
import {
    IParticipants,
    IParticipantsWithRole,
} from '@/components/participant-selector'
import SelectedParticipantItem from '@/components/participant-selector/selected-participant-item'
import React from 'react'

interface ISelectedParticipantList {
    selectedParticipants: IParticipantsWithRole[]
    onDeleteParticipant: (p: IParticipants) => void
    roleName?: string
}

const SelectedParticipantList = ({
    selectedParticipants,
    onDeleteParticipant,
    roleName,
}: ISelectedParticipantList) => {
    return (
        <div className="mt-2 flex max-h-44 flex-col gap-2 overflow-hidden hover:overflow-auto">
            {selectedParticipants?.map((participantGroup, index) => (
                <React.Fragment key={index}>
                    {participantGroup.userParticipant.map(
                        (participant, subIndex) => (
                            <SelectedParticipantItem
                                key={subIndex}
                                roleName={roleName}
                                users_id={participant.users_id}
                                users_email={participant.users_email}
                                users_defaultAvatarHashColor={
                                    participant.users_defaultAvatarHashColor
                                }
                                users_avartar={participant.users_avartar}
                                onDeleteParticipant={() =>
                                    onDeleteParticipant(participant)
                                }
                            />
                        ),
                    )}
                </React.Fragment>
            ))}
        </div>
    )
}

export default SelectedParticipantList
