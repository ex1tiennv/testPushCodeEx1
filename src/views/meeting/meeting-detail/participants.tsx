/*eslint-disable*/
import BoxArea from '@/components/box-area'
import ParticipantDetail from '@/components/participants-detail'
import { FETCH_STATUS } from '@/constants/common'
import useDebounce from '@/hooks/useDebounce'
import serviceMeeting from '@/services/meeting'
import { IMeetingParticipantsResponse } from '@/services/response.type'
import { SettingOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'

const Participants = () => {
    const t = useTranslations()
    const [query, setQuery] = useState('')
    const { id } = useParams()
    const [participants, setParticipants] = useState<{
        status: FETCH_STATUS
        data: IMeetingParticipantsResponse
    }>({
        status: FETCH_STATUS.IDLE,
        data: {
            hosts: [],
            controlBoards: [],
            directors: [],
            shareholders: [],
            administrativeCouncils: [],
        },
    })
    const searchQuery = useDebounce(query, 200)

    useEffect(() => {
        if (id) {
            ;(async () => {
                try {
                    setParticipants({
                        ...participants,
                        status: FETCH_STATUS.LOADING,
                    })
                    const res = await serviceMeeting.getMeetingParticipants(
                        Number(id),
                        searchQuery.trim(),
                    )
                    setParticipants({
                        data: res,
                        status: FETCH_STATUS.SUCCESS,
                    })
                } catch (error) {
                    setParticipants({
                        ...participants,
                        status: FETCH_STATUS.ERROR,
                    })
                }
            })()
        }
    }, [searchQuery, id])

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value)
    }

    return (
        <BoxArea title={t('PARTICIPANTS')}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                <Input
                    placeholder={t('SEARCH')}
                    className="mb-6"
                    addonAfter={<SettingOutlined />}
                    onChange={onChange}
                    value={query}
                    // onFocus={() => setFocus(true)}
                />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                <ParticipantDetail
                    isLoading={participants.status === FETCH_STATUS.LOADING}
                    title={t('HOST')}
                    participantList={participants.data.hosts}
                />
                <ParticipantDetail
                    isLoading={participants.status === FETCH_STATUS.LOADING}
                    title={t('CONTROL_BOARD')}
                    participantList={participants.data.controlBoards}
                />
                <ParticipantDetail
                    isLoading={participants.status === FETCH_STATUS.LOADING}
                    title={t('DIRECTOR_GENERAL')}
                    participantList={participants.data.directors}
                />
                <ParticipantDetail
                    isLoading={participants.status === FETCH_STATUS.LOADING}
                    title={t('ADMINISTRATIVE_COUNCIL')}
                    participantList={participants.data.administrativeCouncils}
                />
                <ParticipantDetail
                    isLoading={participants.status === FETCH_STATUS.LOADING}
                    title={t('SHAREHOLDERS')}
                    participantList={participants.data.shareholders}
                />
            </div>
        </BoxArea>
    )
}

export default Participants
