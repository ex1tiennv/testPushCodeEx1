import { post } from './fetcher'
import { IAttendanceMeeting } from '@/stores/attendance/type'

const attendanceMeeting = {
    attendanceMeeting: async (
        meetingId: number,
    ): Promise<IAttendanceMeeting> => {
        const response: { data: IAttendanceMeeting } = await post(
            '/meetings/attendance-meeting',
            {
                meetingId,
            },
        )
        return response.data
    },
}

export default attendanceMeeting
