import BoxArea from '@/components/box-area'
import { PdfIcon } from '@/components/svgs'
import { FileType, MeetingResourceType } from '@/constants/meeting'
import { useMeetingDetail, useMeetingFiles } from '@/stores/meeting/hooks'
import { truncateString } from '@/utils/format-string'
import { getShortNameFromUrl } from '@/utils/meeting'
import { Col, Row, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

const { Text } = Typography

export interface MeetingResource {
    url: string
    type: FileType
}

interface IDocumentList {
    meetingResourceType: MeetingResourceType
    resources: MeetingResource[]
}

const Resource = ({ url, type }: MeetingResource) => {
    const getIconFromFileType = () => {
        switch (type) {
            case FileType.PDF:
                return <PdfIcon fill="#5151E5" />
            default:
                return null
        }
    }

    return (
        <div className="flex items-center gap-2">
            {getIconFromFileType()}
            <Link href={url} target="_blank">
                <Text
                    title={getShortNameFromUrl(url)}
                    className="cursor-pointer text-primary"
                >
                    {truncateString({
                        text: getShortNameFromUrl(url) as string,
                        start: 5,
                        end: 15,
                    })}
                </Text>
            </Link>
        </div>
    )
}

const DocumentList = ({ meetingResourceType, resources }: IDocumentList) => {
    const t = useTranslations()

    return (
        <div className="flex gap-3">
            <Text className="text-black-45">{t(meetingResourceType)}:</Text>
            <div className="flex flex-col gap-1">
                {resources.map((resource, index) => (
                    <Resource
                        key={index}
                        url={resource.url}
                        type={resource.type}
                    />
                ))}
            </div>
        </div>
    )
}

const Documents = () => {
    const [{ meeting }] = useMeetingDetail()

    const { invitations, minutes } = useMeetingFiles()

    const t = useTranslations()

    if (!meeting) return null

    return (
        <BoxArea title={t('DOCUMENTS')}>
            <Row gutter={[16, 24]}>
                <Col xs={24} md={12} lg={8}>
                    <DocumentList
                        meetingResourceType={
                            MeetingResourceType.MEETING_INVITATIONS
                        }
                        resources={invitations}
                    />
                </Col>
                <Col xs={24} md={12} lg={8}>
                    <DocumentList
                        meetingResourceType={
                            MeetingResourceType.MEETING_MINUTES
                        }
                        resources={minutes}
                    />
                </Col>
                <Col xs={24} md={12} lg={8}>
                    <DocumentList
                        meetingResourceType={MeetingResourceType.MEETING_LINKS}
                        resources={[
                            {
                                url: meeting.meetingLink,
                                type: FileType.LINK,
                            },
                        ]}
                    />
                </Col>
            </Row>
        </BoxArea>
    )
}

export default Documents
