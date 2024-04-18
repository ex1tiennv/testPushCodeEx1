/* eslint-disable */
import SelectParticipantGroup from '@/components/participant-selector/select-participant-group'
import SelectedParticipantList from '@/components/participant-selector/selected-participant-list'
import { Typography } from 'antd'

const { Text } = Typography

export interface IParticipants {
    users_defaultAvatarHashColor: string
    users_avartar?: string
    // users_username: string
    users_email: string
    users_id: number
    userStatus_status?: string
    listRoleResponse?: string
}

export interface IParticipantsWithRole {
    roleMtgId: number
    roleName: string
    userParticipant: IParticipants[]
}

interface IParticipantSelector {
    title: string
    roleName?: string
    selectedParticipants: IParticipantsWithRole[]
    onSelectParticipant: (p: IParticipants) => void
    onSelectAllParticipants: (p: IParticipants[]) => void
    onDeleteParticipant: (p: IParticipants) => void
}

const ParticipantSelector = ({
    title,
    roleName,
    selectedParticipants,
    onSelectParticipant,
    onSelectAllParticipants,
    onDeleteParticipant,
}: IParticipantSelector) => {
    return (
        <div className="max-w-sm">
            <Text className="text-sm">{title}</Text>
            <SelectParticipantGroup
                selectedParticipants={selectedParticipants}
                onSelectParticipant={onSelectParticipant}
                onSelectAllParticipants={onSelectAllParticipants}
                title={title}
                roleName={roleName}
            />
            <SelectedParticipantList
                selectedParticipants={selectedParticipants}
                onDeleteParticipant={onDeleteParticipant}
                roleName={roleName}
            />
        </div>
    )
}

export default ParticipantSelector
