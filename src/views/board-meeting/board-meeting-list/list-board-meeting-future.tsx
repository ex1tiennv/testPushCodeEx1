import { IMeetingItem } from '@/views/meeting/meeting-list/type'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/stores'
import { useTranslations } from 'next-intl'
import BoxArea from '@/components/box-area'
import { Pagination } from 'antd'
import { MeetingTime, MeetingType } from '@/constants/meeting'
import EmptyMeeting from '@/views/meeting/meeting-list/empty-meeting'
import ItemFutureBoardMeeting from './item-future-board-meeting'
import { getAllFutureBoardMeetings } from '@/stores/board-meeting/listSlice'

export interface ListFutureBoardMeetingProps {
    data: IMeetingItem[]
}

const ListBoardMeetingFuture = ({ data }: ListFutureBoardMeetingProps) => {
    const { page, limit, filter, totalFutureMeetingItem } = useSelector(
        (state: RootState) => state.meetingList,
    )
    const dispatch = useAppDispatch()
    const t = useTranslations()
    const handlePageChange = (pageChange: number) => {
        dispatch(
            getAllFutureBoardMeetings({
                page: pageChange,
                limit,
                type: MeetingTime.MEETING_FUTURE,
                filter: { ...filter },
                meetingType: MeetingType.BOARD_MEETING,
            }),
        )
    }

    return (
        <div className="list-board-meeting-future">
            <BoxArea title={t('BOARD_MEETING_FUTURE_LIST')}>
                {data && data.length > 0 ? (
                    <>
                        {data.map((item, index) => (
                            <ItemFutureBoardMeeting key={index} {...item} />
                        ))}
                        <div className="mt-6 flex justify-end">
                            <Pagination
                                pageSize={limit}
                                defaultCurrent={page}
                                total={totalFutureMeetingItem}
                                onChange={handlePageChange}
                            />
                        </div>
                    </>
                ) : (
                    <EmptyMeeting
                        emptyMeetingMessage={t(
                            'NO_BOARD_MEETING_FUTURE_MESSAGE',
                        )}
                    />
                )}
            </BoxArea>
        </div>
    )
}
export default ListBoardMeetingFuture
