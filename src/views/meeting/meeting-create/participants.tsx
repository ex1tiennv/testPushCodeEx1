import BoxArea from '@/components/box-area'
import ParticipantSelector, {
    IParticipants,
} from '@/components/participant-selector'
import { useCreateMeetingInformation } from '@/stores/meeting/hooks'
import { useTranslations } from 'next-intl'

// const data: IParticipants[] = [
//     {
//         defaultAvatarHashColor: AvatarBgHexColors.VOLCANO,
//         name: 'phuong naphuong naphuong naphuong naphuong naphuong naphuong naphuong na',
//     },
//     {
//         defaultAvatarHashColor: AvatarBgHexColors.GOLDEN_PURPLE,
//         name: 'kien na',
//         avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1',
//     },
//     {
//         defaultAvatarHashColor: AvatarBgHexColors.CYAN,
//         name: 'quang na',
//         avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=2',
//     },
//     {
//         defaultAvatarHashColor: AvatarBgHexColors.CYAN,
//         name: 'huy na',
//     },
//     {
//         defaultAvatarHashColor: AvatarBgHexColors.CYAN,
//         name: 'phuong naphuong naphuong naphuong naphuong naphuong naphuong naphuong na',
//         avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
//     },
//     {
//         defaultAvatarHashColor: AvatarBgHexColors.GOLDEN_PURPLE,
//         name: 'minh na',
//         avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
//     },
//     {
//         defaultAvatarHashColor: AvatarBgHexColors.VOLCANO,
//         name: 'quang na',
//         avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
//     },
//     {
//         defaultAvatarHashColor: AvatarBgHexColors.GOLDEN_PURPLE,
//         name: 'vuong na',
//     },
// ]
type ParticipantKey =
    | 'hosts'
    | 'controlBoards'
    | 'directors'
    | 'administrativeCouncils'
    | 'shareholders'
const Participants = () => {
    const t = useTranslations()

    const [data, setData] = useCreateMeetingInformation()

    const onSelect = (key: ParticipantKey) => (participant: IParticipants) => {
        const isNotExited =
            data[key].findIndex((p) => p.users_id === participant.users_id) < 0
        if (isNotExited) {
            setData({
                ...data,
                [key]: [...data[key], participant],
            })
        }
    }

    const onSelectAll =
        (key: ParticipantKey) => (participants: IParticipants[]) => {
            setData({
                ...data,
                [key]: [...participants],
            })
        }

    const onDelete = (key: ParticipantKey) => (participant: IParticipants) => {
        setData({
            ...data,
            [key]: data[key].filter((p) => p.users_id !== participant.users_id),
        })
    }
    return (
        <BoxArea title={t('PARTICIPANTS')}>
            <div className="grid min-h-[220px] grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                <ParticipantSelector
                    title={t('HOST')}
                    selectedParticipants={data.hosts}
                    onSelectParticipant={onSelect('hosts')}
                    onSelectAllParticipants={onSelectAll('hosts')}
                    onDeleteParticipant={onDelete('hosts')}
                />
                <ParticipantSelector
                    title={t('CONTROL_BOARD')}
                    selectedParticipants={data.controlBoards}
                    onSelectParticipant={onSelect('controlBoards')}
                    onSelectAllParticipants={onSelectAll('controlBoards')}
                    onDeleteParticipant={onDelete('controlBoards')}
                />
                <ParticipantSelector
                    title={t('DIRECTOR_GENERAL')}
                    selectedParticipants={data.directors}
                    onSelectParticipant={onSelect('directors')}
                    onSelectAllParticipants={onSelectAll('directors')}
                    onDeleteParticipant={onDelete('directors')}
                />
                <ParticipantSelector
                    title={t('ADMINISTRATIVE_COUNCIL')}
                    selectedParticipants={data.administrativeCouncils}
                    onSelectParticipant={onSelect('administrativeCouncils')}
                    onSelectAllParticipants={onSelectAll(
                        'administrativeCouncils',
                    )}
                    onDeleteParticipant={onDelete('administrativeCouncils')}
                />
                <ParticipantSelector
                    title={t('SHAREHOLDERS')}
                    selectedParticipants={data.shareholders}
                    onSelectParticipant={onSelect('shareholders')}
                    onSelectAllParticipants={onSelectAll('shareholders')}
                    onDeleteParticipant={onDelete('shareholders')}
                />
            </div>
        </BoxArea>
    )
}

export default Participants
