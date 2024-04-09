import BoxArea from '@/components/box-area'
import DetailResolutionItem from '@/components/detail-resolution-item'
import { ResolutionType } from '@/constants/resolution'
import { Empty } from 'antd'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'

import { useMeetingDetail, useResolutions } from '@/stores/meeting/hooks'
import { useAuthLogin } from '@/stores/auth/hooks'
import { titleTooltip } from '@/constants/meeting'
import { UserMeetingStatusEnum } from '@/stores/attendance/type'

const Resolutions = () => {
    const resolutions = useResolutions(ResolutionType.RESOLUTION)
    const t = useTranslations()
    const [{ meeting }] = useMeetingDetail()
    const { authState } = useAuthLogin()

    const notifiEnableVote = useMemo(() => {
        let message: string = ''
        if (meeting) {
            const time = new Date().getTime()
            const startTime = new Date(meeting.startTime).getTime()
            const endVotingTime = new Date(meeting.endVotingTime).getTime()
            if (time < startTime || time > endVotingTime) {
                message += titleTooltip.votingTime
            }
            if (
                !meeting?.shareholders.some(
                    (item) =>
                        item.user.id == authState.userData?.id &&
                        item.status == UserMeetingStatusEnum.PARTICIPATE,
                )
            ) {
                message += message
                    ? `_,_${titleTooltip.shareHolder}`
                    : titleTooltip.shareHolder
            }
        }
        return message
    }, [meeting, authState])

    const body = useMemo(() => {
        if (resolutions.length === 0) {
            return (
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    style={{
                        marginBlock: 0,
                    }}
                />
            )
        }

        return resolutions.map((resolution, index) => (
            <DetailResolutionItem
                id={resolution.id}
                key={index}
                index={index + 1}
                title={resolution.title}
                content={resolution.content}
                percentVoted={resolution.percentVoted}
                voteResult={resolution.voteResult}
                creator={resolution.creator}
                percentUnVoted={resolution.percentUnVoted}
                percentNotVoteYet={resolution.percentNotVoteYet}
                proposalFiles={resolution.proposalFiles}
                voteErrorMessage={notifiEnableVote}
            />
        ))
    }, [resolutions, notifiEnableVote])

    return (
        <BoxArea title={t('RESOLUTIONS')}>
            <div className="mb-6 flex flex-col gap-6">{body}</div>
        </BoxArea>
    )
}

export default Resolutions
