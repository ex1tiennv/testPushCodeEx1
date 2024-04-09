import {
    MeetingStatus,
    MeetingStatusColor,
    MeetingStatusName,
} from '@/constants/meeting'
import { useNotification } from '@/hooks/use-notification'
import { useAttendance } from '@/stores/attendance/hooks'
import { enumToArray } from '@/utils'
import { calculateTimeDifference, formatTimeMeeting } from '@/utils/date'
import { truncateString } from '@/utils/format-string'
import { IMeetingItem } from '@/views/meeting/meeting-list/type'
import { Button, Col, Modal, Row, Tooltip, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const { Text } = Typography

const ItemFutureMeeting = ({
    meetings_id,
    meetings_title,
    meetings_start_time,
    meetings_end_time,
    meetings_meeting_link,
    isJoined,
    meetings_status,
    meetings_note,
}: IMeetingItem) => {
    const router = useRouter()
    const t = useTranslations()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { joinMeetingAction } = useAttendance()
    const { openNotification, contextHolder } = useNotification()

    const showModal = (startTime: string) => {
        const result = calculateTimeDifference(startTime)
        if (result) {
            const messageNoti = t('MEETING_START_MESSAGE', {
                days: result[0].toString(),
                hours: result[1].toString(),
                minutes: result[2].toString(),
            })
            openNotification({
                message: messageNoti,
                placement: 'bottomRight',
                type: 'info',
            })
            return
        }
        setIsModalOpen(true)
    }

    const handleOk = (idMeeting: number) => {
        joinMeetingAction(idMeeting)
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    return (
        <>
            {contextHolder}
            <Row
                className="border-true-gray-300 mb-2 rounded-lg border p-2"
                gutter={[16, 16]}
            >
                <Col span={7} className="flex items-center space-x-2">
                    <Image
                        src="/images/logo-meeting-future.png"
                        alt="service-image-alt"
                        width={72}
                        height={48}
                    />
                    <Text>
                        {formatTimeMeeting(
                            meetings_start_time.toString(),
                            meetings_end_time.toString(),
                        )}
                    </Text>
                </Col>
                <Col span={8} className="flex items-center">
                    <Tooltip
                        placement="topLeft"
                        title={truncateString({
                            text: meetings_note,
                            start: 200,
                            end: 0,
                        })}
                        overlayClassName=" lg:max-2xl:max-w-[370px] 2xl:max-w-[500px]"
                        color={'rgba(81, 81, 229, 1)'}
                    >
                        <Text className="overflow-hidden overflow-ellipsis whitespace-nowrap ">
                            {meetings_title}
                        </Text>
                    </Tooltip>
                </Col>
                <Col span={3} className="flex items-center pl-4">
                    <Link href={meetings_meeting_link.toString()}>
                        <Text className="text-blue-500 hover:underline">
                            {t('MEETING_LINK')}
                        </Text>
                    </Link>
                </Col>
                <Col span={2} className="flex items-center pl-3">
                    {enumToArray(MeetingStatus).map((status, key) => {
                        if (status === meetings_status) {
                            return (
                                <li
                                    key={key}
                                    style={{
                                        color: MeetingStatusColor[status],
                                    }}
                                >
                                    {t(MeetingStatusName[status])}
                                </li>
                            )
                        }
                    })}
                </Col>

                <Col
                    span={4}
                    className="flex items-center justify-end space-x-2"
                >
                    {isJoined === 0 ? (
                        <Button
                            type="primary"
                            size="middle"
                            onClick={() => showModal(meetings_start_time)}
                        >
                            {t('BTN_JOIN')}
                        </Button>
                    ) : (
                        <Button disabled type="primary" size="middle">
                            {t('JOINED')}
                        </Button>
                    )}
                    <Button
                        size="middle"
                        onClick={() => {
                            router.push('/meeting/detail/' + meetings_id)
                        }}
                    >
                        {t('BTN_VIEW_DETAIL')}
                    </Button>
                </Col>
            </Row>

            <Modal
                title={t('TITLE_CONFIRM_MEETING_POPUP')}
                open={isModalOpen}
                onOk={() => handleOk(meetings_id)}
                onCancel={handleCancel}
                okText={t('BTN_CONFIRM')}
                cancelText={t('BTN_CANCLE')}
            >
                <p>{t('CONTENT_CONFIRM_MEETING_POPUP')}</p>
            </Modal>
        </>
    )
}

export default ItemFutureMeeting
