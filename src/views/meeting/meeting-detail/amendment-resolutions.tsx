import BoxArea from '@/components/box-area'
import DetailResolutionItem from '@/components/detail-resolution-item'
import { titleTooltip } from '@/constants/meeting'
import { ResolutionType } from '@/constants/resolution'
import { UserMeetingStatusEnum } from '@/stores/attendance/type'
import { useAuthLogin } from '@/stores/auth/hooks'
import { useResolutions, useMeetingDetail } from '@/stores/meeting/hooks'
import { Empty } from 'antd'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import { IMeetingDetail } from '@/stores/meeting/types'
import { RoleMtgEnum } from '@/constants/role-mtg'

const AmendmentResolutions = () => {
    const amendmentResolutions = useResolutions(
        ResolutionType.AMENDMENT_RESOLUTION,
    )

    const [{ meeting }] = useMeetingDetail()
    const { authState } = useAuthLogin()
    const t = useTranslations()
    const checkShareholderAuthAndStatusParticipant = (
        meeting: IMeetingDetail,
    ): boolean => {
        return meeting.participants.some((item) => {
            if (item.roleMtgName === RoleMtgEnum.SHAREHOLDER) {
                return item.userParticipants.some(
                    (option) =>
                        option.user?.id === authState.userData?.id &&
                        option.status === UserMeetingStatusEnum.PARTICIPATE,
                )
            }
            return false
        })
    }

    const notifiEnableVote = useMemo(() => {
        let message: string = ''
        if (meeting) {
            const time = new Date().getTime()
            const startTime = new Date(meeting.startTime).getTime()
            const endVotingTime = new Date(meeting.endVotingTime).getTime()
            if (time < startTime || time > endVotingTime) {
                message += titleTooltip.votingTime
            }
            const isShareholderJoined =
                checkShareholderAuthAndStatusParticipant(meeting)
            if (isShareholderJoined === false) {
                message += message
                    ? `_,_${titleTooltip.shareHolder}`
                    : titleTooltip.shareHolder
            }
        }
        return message
        // eslint-disable-next-line
    }, [meeting, authState])

    const body = useMemo(() => {
        if (amendmentResolutions.length === 0) {
            return (
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    style={{
                        marginBlock: 0,
                    }}
                />
            )
        }

        return amendmentResolutions.map((amendmentResolution, index) => (
            <DetailResolutionItem
                id={amendmentResolution.id}
                key={index}
                index={index + 1}
                title={amendmentResolution.title}
                content={amendmentResolution.content}
                oldContent={amendmentResolution.oldContent}
                percentVoted={amendmentResolution.percentVoted}
                voteResult={amendmentResolution.voteResult}
                creator={amendmentResolution.creator}
                percentUnVoted={amendmentResolution.percentUnVoted}
                percentNotVoteYet={amendmentResolution.percentNotVoteYet}
                proposalFiles={amendmentResolution.proposalFiles}
                voteErrorMessage={notifiEnableVote}
            />
        ))
    }, [amendmentResolutions, notifiEnableVote])

    return (
        <BoxArea title={t('AMENDMENT_RESOLUTIONS')}>
            <div className="mb-6 flex flex-col gap-6">{body}</div>
        </BoxArea>
    )
}

export default AmendmentResolutions
