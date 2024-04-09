import withAuth from '@/components/component-auth'
import UpdateTitle from '@/components/content-page-title/update-title'
import Loader from '@/components/loader'
import { Permissions } from '@/constants/permission'
import { useUpdateMeetingInformation } from '@/stores/meeting/hooks'
import { EActionStatus } from '@/stores/type'
import AmendmentResolutions from '@/views/meeting/meeting-update/amendment-resolutions'
import MeetingInformation from '@/views/meeting/meeting-update/meeting-information'
import Participants from '@/views/meeting/meeting-update/participants'
import Resolutions from '@/views/meeting/meeting-update/resolutions'
import SaveUpdateMeetingButton from '@/views/meeting/meeting-update/save-button'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'

const MeetingUpdate = () => {
    const t = useTranslations()

    const [data, , status, initUpdateMeeting] = useUpdateMeetingInformation()

    const params = useParams()

    const meetingId = Number(params.id)

    useEffect(() => {
        if (meetingId) {
            initUpdateMeeting(meetingId)
        }
    }, [meetingId, initUpdateMeeting])

    if (!data || status === EActionStatus.Pending) {
        return <Loader />
    }

    return (
        <div>
            <UpdateTitle
                pageName={t('UPDATE_MEETING')}
                saveButton={<SaveUpdateMeetingButton />}
            />
            <div className="flex flex-col gap-6 p-6">
                <MeetingInformation />
                <Resolutions />
                <AmendmentResolutions />
                <Participants />
            </div>
        </div>
    )
}

export default withAuth(MeetingUpdate, Permissions.EDIT_MEETING)
