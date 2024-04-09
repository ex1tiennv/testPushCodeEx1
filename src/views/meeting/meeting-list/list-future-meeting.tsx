import BoxArea from '@/components/box-area'
import { MeetingTime, MeetingType } from '@/constants/meeting'
import { RootState, useAppDispatch } from '@/stores'
import { getAllMeetings } from '@/stores/meeting/listSlice'
import EmptyMeeting from '@/views/meeting/meeting-list/empty-meeting'
import ItemFutureMeeting from '@/views/meeting/meeting-list/item-future-meeting'
import { IMeetingItem } from '@/views/meeting/meeting-list/type'
import { Pagination } from 'antd'
import { useTranslations } from 'next-intl'
import { useSelector } from 'react-redux'

interface ListFutureMeetingProps {
    data: IMeetingItem[]
}

const ListFutureMeeting = ({ data }: ListFutureMeetingProps) => {
    const { page, limit, filter, totalFutureMeetingItem } = useSelector(
        (state: RootState) => state.meetingList,
    )
    const dispatch = useAppDispatch()
    const t = useTranslations()
    const handlePageChange = (pageChange: number) => {
        dispatch(
            getAllMeetings({
                page: pageChange,
                limit,
                type: MeetingTime.MEETING_FUTURE,
                filter: { ...filter },
                meetingType: MeetingType.SHAREHOLDER_MEETING,
            }),
        )
    }
    return (
        <div className="list-meeting-future">
            <BoxArea title={t('MEETING_FUTURE_LIST')}>
                {data && data.length > 0 ? (
                    <>
                        {data.map((item, index) => (
                            <ItemFutureMeeting key={index} {...item} />
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
                        emptyMeetingMessage={t('NO_MEETING_FUTURE_MESSAGE')}
                    />
                )}
            </BoxArea>
        </div>
    )
}

export default ListFutureMeeting
