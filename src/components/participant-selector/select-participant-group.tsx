/* eslint-disable */
import useDebounce from '@/hooks/useDebounce'
import { SettingOutlined } from '@ant-design/icons'
import { Input, Spin } from 'antd'
import { useTranslations } from 'next-intl'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { IParticipants } from '.'
import { FETCH_STATUS } from '@/constants/common'
import ParticipantOptionItem from './participant-option-item'
import serviceUser from '@/services/user'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'

export interface ISelectParticipantGroup {
    onSelectParticipant: (p: IParticipants) => void
    onSelectAllParticipants: (p: IParticipants[]) => void
    selectedParticipants: IParticipants[]
    title: string
}

const SelectParticipantGroup = ({
    onSelectParticipant,
    onSelectAllParticipants,
    selectedParticipants,
    title,
}: ISelectParticipantGroup) => {
    const t = useTranslations()
    const [query, setQuery] = useState('')
    const [isFocus, setFocus] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const [optionsData, setOptionsData] = useState<{
        status: FETCH_STATUS
        options: IParticipants[]
    }>({
        status: FETCH_STATUS.IDLE,
        options: [],
    })
    const searchQuery = useDebounce(query, 200)

    useOnClickOutside(ref, () => {
        setFocus(false)
    })

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value)
    }

    useEffect(() => {
        if (isFocus) {
            ;(async () => {
                try {
                    setOptionsData({
                        ...optionsData,
                        status: FETCH_STATUS.LOADING,
                    })
                    let optionsRes = await serviceUser.getAccountList(
                        query,
                        1,
                        278,
                    )
                    if (title === 'Shareholders' || title === '株主') {
                        optionsRes = {
                            ...optionsRes,
                            items: optionsRes.items.filter((item) => {
                                const listRole = item.listRoleResponse || ''
                                return listRole.includes('SHAREHOLDER')
                            }),
                        }
                    }
                    console.log(
                        '🚀 ~ file: select-participant-group.tsx:53 ~ ; ~ optionsRes:',
                        optionsRes,
                    )
                    setOptionsData({
                        options: [
                            {
                                users_defaultAvatarHashColor: '#E57B41',
                                users_username: t('ALL'),
                                users_id: 0,
                            },
                            ...optionsRes.items,
                        ],
                        status: FETCH_STATUS.SUCCESS,
                    })
                } catch (error) {}
            })()
        }
    }, [searchQuery, isFocus])

    const onSelect = (p: IParticipants) => {
        // select all
        if (p.users_id === 0) {
            optionsData.options.shift()
            onSelectAllParticipants(optionsData.options)
            setFocus(false)
            return
        }
        onSelectParticipant(p)
        setFocus(false)
    }

    return (
        <div className="relative">
            <Input
                placeholder={t('SEARCH_TO_ADD_NEW')}
                addonAfter={<SettingOutlined />}
                onChange={onChange}
                value={query}
                onFocus={() => setFocus(true)}
            />
            {isFocus && (
                <div
                    ref={ref}
                    className="absolute z-50 max-h-44 w-full overflow-auto bg-neutral/2 p-2 shadow-lg transition-all"
                >
                    <div className="flex flex-col">
                        {optionsData?.options?.map((option, index) => (
                            <ParticipantOptionItem
                                key={index}
                                users_id={option.users_id}
                                users_username={option.users_username}
                                users_defaultAvatarHashColor={
                                    option.users_defaultAvatarHashColor
                                }
                                users_avartar={option.users_avartar}
                                onSelectParticipant={() => onSelect(option)}
                                selected={
                                    selectedParticipants.findIndex(
                                        (p) => p.users_id === option.users_id,
                                    ) >= 0
                                }
                            />
                        ))}
                    </div>
                    {optionsData.status === FETCH_STATUS.LOADING && (
                        <div className="flex justify-center">
                            <Spin tip="Loading..." />
                        </div>
                    )}
                    {optionsData.status === FETCH_STATUS.SUCCESS &&
                        optionsData.options?.length === 0 && (
                            <div className="flex justify-center">No data</div>
                        )}
                </div>
            )}
        </div>
    )
}

export default SelectParticipantGroup
