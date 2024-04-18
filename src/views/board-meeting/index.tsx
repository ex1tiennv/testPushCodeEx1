/* eslint-disable */
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useAttendance } from '@/stores/attendance/hooks'
import { useNotification } from '@/hooks/use-notification'
import { useAuthLogin } from '@/stores/auth/hooks'
import { checkPermission } from '@/utils/auth'
import { Permissions } from '@/constants/permission'
import { useListMeeting } from '@/stores/meeting/hooks'
import { useEffect } from 'react'
import { MeetingTime, MeetingType } from '@/constants/meeting'
import { EActionStatus } from '@/stores/type'
import ListTitle from '@/components/content-page-title/list-title'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import ListBoardMeetingFuture from '@/views/board-meeting/board-meeting-list/list-board-meeting-future'
import ListBoardMeetingPast from './board-meeting-list/list-board-meeting-pass'
import withAuth from '@/components/component-auth'

const BoardMeetingList = () => {
    const router = useRouter()
    const t = useTranslations()
    const { attendanceState, resetStateAttendance } = useAttendance()
    const { openNotification, contextHolder } = useNotification()
    const { authState } = useAuthLogin()
    const permissionCreateBoardMeeting = checkPermission(
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
            meetingType: MeetingType.BOARD_MEETING,
            filter: { ...meetingState.filter },
        })

        getListPassMeetingAction({
            page: meetingState.page,
            limit: meetingState.limit,
            type: MeetingTime.MEETING_PASS,
            meetingType: MeetingType.BOARD_MEETING,
            filter: { ...meetingState.filter },
        })
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
                message: 'Board meeting',
                placement: 'bottomRight',
                type: 'info',
            })
            resetStateAttendance()
            router.push('/board-meeting/detail' + attendanceState.meetingIdJoin)
        }
        if (attendanceState.status == EActionStatus.Failed) {
            openNotification({
                message: meetingState.errorMessage,
                placement: 'bottomRight',
                type: 'error',
            })
        }
    }, [meetingState.status])

    return (
        <div>
            {contextHolder}
            <ListTitle
                pageName={t('BOARDS_MEETING')}
                addButton={
                    permissionCreateBoardMeeting && (
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            size="large"
                            onClick={() => {
                                router.push('/board-meeting/create')
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
                <ListBoardMeetingFuture data={meetingState.meetingFutureList} />
                <ListBoardMeetingPast data={meetingState.meetingPassList} />
            </div>
        </div>
    )
}
export default withAuth(BoardMeetingList, Permissions.BOARD_MEETING)
