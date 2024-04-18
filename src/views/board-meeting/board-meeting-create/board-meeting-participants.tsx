import { useTranslations } from 'next-intl'
import { useCreateBoardMeetingInformation } from '@/stores/board-meeting/hook'
import BoxArea from '@/components/box-area'
import ParticipantSelector, {
    IParticipants,
} from '@/components/participant-selector'
import { useEffect, useState } from 'react'
import serviceRoleMtg from '@/services/role-mtg'
import { TypeRoleMeeting } from '@/constants/role-mtg'
import { convertSnakeCaseToTitleCase } from '@/utils/format-string'

export interface IRoleBoardMtg {
    id: number
    roleName: string
    description: string
}

const BoardMeetingParticipants = () => {
    const t = useTranslations()
    const [data, setData] = useCreateBoardMeetingInformation()
    const [roleBoardMtgList, setRoleBoardMtgList] = useState<IRoleBoardMtg[]>(
        [],
    )

    console.log('data', data)
    useEffect(() => {
        const fetchInitialData = async () => {
            const roleBoardMtgList = await serviceRoleMtg.getAllRoleMtg({
                page: 1,
                limit: 10,
                type: TypeRoleMeeting.BOARD_MTG,
            })
            if (roleBoardMtgList) {
                setRoleBoardMtgList(roleBoardMtgList)
            }
        }
        fetchInitialData()
    }, [])

    console.log('roleBoardMtgList', roleBoardMtgList)

    const onSelect =
        (key: string, roleMtgId: number) => (participant: IParticipants) => {
            if (
                data.participants.some(
                    (participant) => participant.roleName == key,
                )
            ) {
                const isNotExisted = data.participants
                    .find((item) => item.roleName === key)
                    ?.userParticipant.some(
                        (user) => user.users_id === participant.users_id,
                    )

                if (!isNotExisted) {
                    const updatedParticipants = data.participants.map(
                        (item) => {
                            if (item.roleName === key) {
                                return {
                                    ...item,
                                    userParticipant: [
                                        ...item.userParticipant,
                                        participant,
                                    ],
                                }
                            }
                            return item
                        },
                    )
                    setData({
                        ...data,
                        participants: [...updatedParticipants],
                    })
                }
            } else {
                setData({
                    ...data,
                    participants: [
                        ...data.participants,
                        {
                            roleMtgId: roleMtgId,
                            roleName: key,
                            userParticipant: [participant],
                        },
                    ],
                })
            }
        }
    const onSelectAll =
        (key: string, roleMtgId: number) => (participants: IParticipants[]) => {
            if (
                data.participants.some(
                    (participant) => participant.roleName == key,
                )
            ) {
                const updatedParticipants = data.participants.map(
                    (participant) => {
                        if (participant.roleName === key) {
                            return {
                                ...participant,
                                userParticipant: [...participants],
                            }
                        }
                        return participant
                    },
                )
                setData({
                    ...data,
                    participants: updatedParticipants,
                })
            } else {
                setData({
                    ...data,
                    participants: [
                        ...data.participants,
                        {
                            roleMtgId: roleMtgId,
                            roleName: key,
                            userParticipant: [...participants],
                        },
                    ],
                })
            }
        }
    const onDelete = (key: string) => (participant: IParticipants) => {
        const updatedParticipants = data.participants.map((item) => {
            if (item.roleName == key) {
                return {
                    ...item,
                    userParticipant: item.userParticipant.filter(
                        (user) => user.users_id !== participant.users_id,
                    ),
                }
            }
            return item
        })
        setData({
            ...data,
            participants: updatedParticipants,
        })
    }

    return (
        <BoxArea title={t('PARTICIPANTS')}>
            <div className="grid min-h-[220px] grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {roleBoardMtgList?.map((roleBoardMtg) => {
                    return (
                        <ParticipantSelector
                            key={roleBoardMtg.id}
                            title={convertSnakeCaseToTitleCase(
                                roleBoardMtg.roleName,
                            )}
                            roleName={roleBoardMtg.roleName}
                            selectedParticipants={data.participants?.filter(
                                (participant) =>
                                    participant.roleName ==
                                    roleBoardMtg.roleName,
                            )}
                            onSelectParticipant={onSelect(
                                roleBoardMtg.roleName,
                                roleBoardMtg.id,
                            )}
                            onSelectAllParticipants={onSelectAll(
                                roleBoardMtg.roleName,
                                roleBoardMtg.id,
                            )}
                            onDeleteParticipant={onDelete(
                                roleBoardMtg.roleName,
                            )}
                        />
                    )
                })}
            </div>
        </BoxArea>
    )
}

export default BoardMeetingParticipants
