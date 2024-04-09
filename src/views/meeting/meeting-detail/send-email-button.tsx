import { MailOutlined } from '@ant-design/icons'
import { Button, notification } from 'antd'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { FETCH_STATUS } from '@/constants/common'
import serviceMeeting from '@/services/meeting'
import { useParams } from 'next/navigation'
import { AxiosError } from 'axios'

const SendEmailButton = () => {
    const t = useTranslations()
    const params = useParams()
    const meetingId: number = Number(params.id)

    const [status, setStatus] = useState(FETCH_STATUS.IDLE)

    const handleClick = async () => {
        setStatus(FETCH_STATUS.LOADING)
        try {
            const response =
                await serviceMeeting.sendMailInvitationShareholderMeeting(
                    meetingId,
                )
            if (response) {
                notification.success({
                    message: t('CREATED'),
                    description: t(
                        'SEND_EMAIL_TO_SHAREHOLDER_MEETING_SUCCESSFULLY',
                    ),
                })
                setStatus(FETCH_STATUS.SUCCESS)
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                notification.error({
                    message: t('ERROR'),
                    description: t('SEND_EMAIL_TO_SHAREHOLDER_MEETING_FAILED'),
                })
            }
            setStatus(FETCH_STATUS.ERROR)
        }
    }

    return (
        <Button
            icon={<MailOutlined />}
            type="primary"
            size="large"
            loading={status === FETCH_STATUS.LOADING}
            onClick={() => {
                handleClick()
            }}
        >
            {t('SEND_EMAIL_TO_SHAREHOLDERS')}
        </Button>
    )
}

export default SendEmailButton
