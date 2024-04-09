import withAuth from '@/components/component-auth'
import ListTitle from '@/components/content-page-title/list-title'
import { MeetingTime, MeetingType } from '@/constants/meeting'
import { Permissions } from '@/constants/permission'
import { useNotification } from '@/hooks/use-notification'
import { useAttendance } from '@/stores/attendance/hooks'
import { useAuthLogin } from '@/stores/auth/hooks'
import { useListMeeting } from '@/stores/meeting/hooks'
import { EActionStatus } from '@/stores/type'
import { checkPermission } from '@/utils/auth'
import ListMeetingFuture from '@/views/meeting/meeting-list/list-future-meeting'
import ListMeetingPast from '@/views/meeting/meeting-list/list-past-meeting'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const MeetingList = () => {
    const router = useRouter()
    const t = useTranslations()
    const { attendanceState, resetStateAttendance } = useAttendance()
    const { openNotification, contextHolder } = useNotification()
    const { authState } = useAuthLogin()

    const permissionCreateMeeting = checkPermission(
        authState.userData?.permissionKeys,
        Permissions.CREATE_MEETING,
    )

    const {
        meetingState,
        getListFutureMeetingAction,
        getListPassMeetingAction,
        setFilterAction,
    } = useListMeeting()

    useEffect(() => {
        getListFutureMeetingAction({
            page: meetingState.page,
            limit: meetingState.limit,
            type: MeetingTime.MEETING_FUTURE,
            meetingType: MeetingType.SHAREHOLDER_MEETING,
            filter: { ...meetingState.filter },
        })

        getListPassMeetingAction({
            page: meetingState.page,
            limit: meetingState.limit,
            type: MeetingTime.MEETING_PASS,
            meetingType: MeetingType.SHAREHOLDER_MEETING,
            filter: { ...meetingState.filter },
        })
        // eslint-disable-next-line
    }, [meetingState.filter])

    const handleInputChange = (value: string) => {
        setFilterAction({ ...meetingState.filter, searchQuery: value })
    }

    const handleSelectChange = (value: string) => {
        setFilterAction({ ...meetingState.filter, sortOrder: value })
    }

    useEffect(() => {
        if (attendanceState.status == EActionStatus.Succeeded) {
            openNotification({
                message: 'Meeting',
                placement: 'bottomRight',
                type: 'info',
            })
            resetStateAttendance()
            router.push('/meeting/detail/' + attendanceState.meetingIdJoin)
        }

        if (attendanceState.status == EActionStatus.Failed) {
            openNotification({
                message: attendanceState.errorMessage,
                placement: 'bottomRight',
                type: 'error',
            })
        }
        // eslint-disable-next-line
    }, [attendanceState.status])

    useEffect(() => {
        if (meetingState.status == EActionStatus.Failed) {
            openNotification({
                message: meetingState.errorMessage,
                placement: 'bottomRight',
                type: 'error',
            })
        }
        // eslint-disable-next-line
    }, [meetingState.status])

    return (
        <div>
            {contextHolder}
            <ListTitle
                pageName={t('SHAREHOLDERS_MEETINGS')}
                addButton={
                    permissionCreateMeeting && (
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            size="large"
                            onClick={() => {
                                router.push('/meeting/create')
                            }}
                        >
                            {t('ADD_NEW')}
                        </Button>
                    )
                }
                defaultSort={meetingState.filter?.sortOrder}
                onChangeInput={handleInputChange}
                onChangeSelect={handleSelectChange}
            />
            <div className="p-6">
                <ListMeetingFuture data={meetingState.meetingFutureList} />
                <ListMeetingPast data={meetingState.meetingPassList} />
            </div>
        </div>
    )
}

export default withAuth(MeetingList, Permissions.SHAREHOLDERS_MTG)
