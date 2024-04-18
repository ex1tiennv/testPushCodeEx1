import BoxArea from '@/components/box-area'
import ParticipantSelector, {
    IParticipants,
    IParticipantsWithRole,
} from '@/components/participant-selector'
import { useCreateMeetingInformation } from '@/stores/meeting/hooks'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import serviceRoleMtg from '@/services/role-mtg'
import { TypeRoleMeeting } from '@/constants/role-mtg'
import { convertSnakeCaseToTitleCase } from '@/utils/format-string'

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

export interface IRoleMtg {
    id: number
    roleName: string
    description: string
}

const Participants = () => {
    const t = useTranslations()

    const [data, setData] = useCreateMeetingInformation()
    const [roleMtgList, setRoleMtgList] = useState<IRoleMtg[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const roleMtgList = await serviceRoleMtg.getAllRoleMtg({
                page: 1,
                limit: 10,
                type: TypeRoleMeeting.SHAREHOLDER_MTG,
            })
            if (roleMtgList) {
                setRoleMtgList(roleMtgList)
            }
        }
        fetchData()
    }, [])

    const checkUserExisted = (
        participant: IParticipants,
        participantsWithRole: IParticipantsWithRole[],
        roleName: string,
    ): boolean => {
        const foundRole = participantsWithRole.find(
            (role) => role.roleName === roleName,
        )
        if (foundRole) {
            return foundRole.userParticipant.some(
                (user) => user.users_id === participant.users_id,
            )
        }
        return false
    }

    const onSelect =
        (roleName: string, roleMtgId: number) =>
        (participant: IParticipants) => {
            const isNotExisted = checkUserExisted(
                participant,
                data.participants,
                roleName,
            )

            if (!isNotExisted) {
                if (
                    data.participants.some(
                        (option) => option.roleName === roleName,
                    )
                ) {
                    // already exist
                    const updatedParticipants = data.participants.map(
                        (option) => {
                            if (option.roleName === roleName) {
                                return {
                                    ...option,
                                    userParticipant: [
                                        ...option.userParticipant,
                                        participant,
                                    ],
                                }
                            }
                            return option
                        },
                    )

                    setData({
                        ...data,
                        participants: updatedParticipants,
                    })
                } else {
                    //not existed yet
                    setData({
                        ...data,
                        participants: [
                            ...data.participants,
                            {
                                roleMtgId: roleMtgId,
                                roleName: roleName,
                                userParticipant: [participant],
                            },
                        ],
                    })
                }
            }
        }

    const onSelectAll =
        (roleName: string, roleMtgId: number) =>
        (participants: IParticipants[]) => {
            if (
                data.participants.some((option) => option.roleName === roleName)
            ) {
                // already exist
                const updatedParticipants = data.participants.map((option) => {
                    if (option.roleName === roleName) {
                        return {
                            ...option,
                            userParticipant: [...participants],
                        }
                    }
                    return option
                })

                setData({
                    ...data,
                    participants: updatedParticipants,
                })
            } else {
                //not existed yet
                setData({
                    ...data,
                    participants: [
                        ...data.participants,
                        {
                            roleMtgId: roleMtgId,
                            roleName: roleName,
                            userParticipant: [...participants],
                        },
                    ],
                })
            }
        }

    const onDelete = (roleName: string) => (participant: IParticipants) => {
        const updatedParticipants = data.participants.map((option) => {
            if (option.roleName === roleName) {
                return {
                    ...option,
                    userParticipant: option.userParticipant.filter(
                        (p) => p.users_id !== participant.users_id,
                    ),
                }
            }
            return option
        })
        setData({
            ...data,
            participants: updatedParticipants,
        })
    }

    return (
        <BoxArea title={t('PARTICIPANTS')}>
            <div className="grid min-h-[220px] grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
                {roleMtgList?.map((item, index) => (
                    <ParticipantSelector
                        key={index}
                        title={convertSnakeCaseToTitleCase(item.roleName)}
                        roleName={item.roleName}
                        selectedParticipants={data.participants?.filter(
                            (p) => p.roleName === item.roleName,
                        )}
                        onSelectParticipant={onSelect(item.roleName, item.id)}
                        onSelectAllParticipants={onSelectAll(
                            item.roleName,
                            item.id,
                        )}
                        onDeleteParticipant={onDelete(item.roleName)}
                    />
                ))}
            </div>
        </BoxArea>
    )
}

export default Participants
