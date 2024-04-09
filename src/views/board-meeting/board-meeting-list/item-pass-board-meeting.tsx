import { IMeetingItem } from '@/views/meeting/meeting-list/type'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { Button, Col, Row, Tooltip, Typography } from 'antd'
import Image from 'next/image'
import { truncateString } from '@/utils/format-string'
import Link from 'next/link'
import { formatTimeMeeting } from '@/utils/date'
import { enumToArray } from '@/utils'
import {
    MeetingStatus,
    MeetingStatusColor,
    MeetingStatusName,
} from '@/constants/meeting'

const { Text } = Typography
const ItemPassBoardMeeting = ({
    meetings_id,
    meetings_title,
    meetings_start_time,
    meetings_end_time,
    meetings_meeting_link,
    meetings_status,
    meetings_note,
}: IMeetingItem) => {
    const t = useTranslations()
    const router = useRouter()
    return (
        <Row gutter={[16, 16]} className="mb-2 rounded-lg border p-2">
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
                    <Text>{meetings_title}</Text>
                </Tooltip>
            </Col>
            <Col span={3} className="flex items-center pl-4">
                <Link href={meetings_meeting_link.toString()}>
                    <Text className="text-blue-500 hover:underline">
                        {t('BOARD_MEETING_LINK')}
                    </Text>
                </Link>
            </Col>
            <Col span={2} className="flex items-center pl-3">
                {enumToArray(MeetingStatus).map((status, key) => {
                    if (status === meetings_status) {
                        return (
                            <li
                                key={key}
                                style={{ color: MeetingStatusColor[status] }}
                            >
                                {t(MeetingStatusName[status])}
                            </li>
                        )
                    }
                })}
            </Col>
            <Col span={4} className="flex items-center justify-end">
                <Button
                    size="middle"
                    onClick={() => {
                        router.push('/board-meeting/detail/' + meetings_id)
                    }}
                >
                    {t('BTN_VIEW_DETAIL')}
                </Button>
            </Col>
        </Row>
    )
}
export default ItemPassBoardMeeting
