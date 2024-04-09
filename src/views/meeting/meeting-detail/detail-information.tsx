import BoxArea from '@/components/box-area'
import { LikeIcon, ShareholdersIcon } from '@/components/svgs'
import { MeetingStatusColor, MeetingStatusName } from '@/constants/meeting'
import { useMeetingDetail } from '@/stores/meeting/hooks'
import { Col, Row, Typography } from 'antd'
import moment from 'moment'
import { useTranslations } from 'next-intl'
import { ReactNode } from 'react'

const { Text, Title } = Typography

interface IBoxGeneralInformation {
    icon: ReactNode
    title: string
    realNumber: number
    totalNumber: number
}

export const BoxGeneralInformation = ({
    icon,
    title,
    realNumber,
    totalNumber,
}: IBoxGeneralInformation) => {
    return (
        <div className="bg-white p-6">
            <div className="flex items-end justify-between ">
                <div className="flex items-end justify-center gap-2">
                    {icon}
                    <Text className="leading-none">{title}</Text>
                </div>
                <div>
                    <div className="flex items-baseline gap-2">
                        <Title
                            level={2}
                            className="mb-0 font-medium leading-none"
                        >
                            {realNumber}
                        </Title>
                        <Title
                            level={4}
                            className="mb-0 mt-0 font-medium leading-none"
                        >
                            /
                        </Title>
                        <Title
                            level={4}
                            className="mb-0 mt-0 font-medium leading-none"
                        >
                            {totalNumber}
                        </Title>
                    </div>
                </div>
            </div>
            <div className="mt-2 text-right">
                <Text className="font-bold text-polar-green">
                    {totalNumber === 0
                        ? 0
                        : Math.round((realNumber / totalNumber) * 10000) / 100}
                    %
                </Text>
            </div>
        </div>
    )
}

const DetailInformation = () => {
    const [{ meeting }] = useMeetingDetail()

    const t = useTranslations()

    if (!meeting) return null

    return (
        <>
            <Row gutter={[16, 24]}>
                <Col xs={24} lg={12}>
                    <BoxGeneralInformation
                        icon={<LikeIcon fill1="#EFEFFF" fill2="#5151E5" />}
                        title={t('TOTAL_SHARES_BY_SHAREHOLDERS_JOINED')}
                        realNumber={meeting.joinedMeetingShares}
                        totalNumber={meeting.totalMeetingShares}
                    />
                </Col>
                <Col xs={24} lg={12}>
                    <BoxGeneralInformation
                        icon={
                            <ShareholdersIcon fill1="#EFEFFF" fill2="#5151E5" />
                        }
                        title={t('TOTAL_SHAREHOLDERS_JOINED')}
                        realNumber={meeting.shareholdersJoined}
                        totalNumber={meeting.shareholdersTotal}
                    />
                </Col>
                <Col xs={24} lg={24}>
                    <BoxArea title={t('MEETING_INFORMATION')}>
                        <div className="flex gap-6">
                            <div className="flex gap-3">
                                <Text className="text-black-45">
                                    {t('START_TIME')}:
                                </Text>
                                <div className="flex flex-col gap-1">
                                    {moment(meeting.startTime).format(
                                        'YYYY/MM/DD HH:mm:ss',
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Text className="text-black-45">
                                    {t('END_TIME')}:
                                </Text>
                                <div className="flex flex-col gap-1">
                                    {moment(meeting.endTime).format(
                                        'YYYY/MM/DD HH:mm:ss',
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Text className="text-black-45">
                                    {t('END_VOTING_TIME')}:
                                </Text>
                                <div className="flex flex-col gap-1">
                                    {moment(meeting.endVotingTime).format(
                                        'YYYY/MM/DD HH:mm:ss',
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Text className="text-black-45">
                                    {t('STATUS')}:
                                </Text>
                                <div className="flex flex-col gap-1">
                                    <span
                                        style={{
                                            color: MeetingStatusColor[
                                                meeting.status
                                            ],
                                        }}
                                    >
                                        {t(MeetingStatusName[meeting.status])}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 flex flex-col gap-1">
                            <Text className="text-black-45">{t('NOTE')}:</Text>
                            <div className="flex flex-col gap-1">
                                {meeting.note}
                            </div>
                        </div>
                    </BoxArea>
                </Col>
            </Row>
        </>
    )
}

export default DetailInformation
