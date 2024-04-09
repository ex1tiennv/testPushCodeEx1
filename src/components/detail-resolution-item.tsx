import { FETCH_STATUS } from '@/constants/common'
import { Resolution, VoteProposalOption } from '@/constants/resolution'
import serviceProposal from '@/services/proposal'
import { IProposalCreator, IProposalFile } from '@/stores/meeting/types'
import { formatNumber } from '@/utils/format-number'
import { truncateString } from '@/utils/format-string'
import { getFirstCharacterUpperCase } from '@/utils/get-first-character'
import { getShortNameFromUrl } from '@/utils/meeting'
import {
    Avatar,
    Modal,
    Radio,
    RadioChangeEvent,
    Tooltip,
    Typography,
    notification,
} from 'antd'
import Color from 'color'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useState } from 'react'

const { Text } = Typography

interface IDetailResolutionItem extends Resolution {
    index: number
    percentVoted: number
    percentUnVoted: number
    percentNotVoteYet: number
    voteResult: VoteProposalOption
    creator: IProposalCreator
    proposalFiles?: IProposalFile[]
    id: number
    voteErrorMessage?: string
}

const DetailResolutionItem = ({
    index,
    title,
    content,
    oldContent,
    percentVoted,
    percentUnVoted,
    percentNotVoteYet,
    voteResult,
    creator,
    proposalFiles,
    id,
    voteErrorMessage = '',
}: IDetailResolutionItem) => {
    const [value, setValue] = useState(voteResult)
    const [modalOpen, setOpenModal] = useState<boolean>(false)
    const [votePercent, setVotePercent] = useState({
        percentUnVoted,
        percentVoted,
        percentNotVoteYet,
    })
    const [voteStatus, setVoteStatus] = useState(FETCH_STATUS.IDLE)

    const t = useTranslations()

    const toggleModelDetailResolution = () => {
        setOpenModal(!modalOpen)
    }

    const { avatar, defaultAvatarHashColor, username, email } = creator
    const backgroundAvatarColor = Color(defaultAvatarHashColor as string)
        .lighten(0.6)
        .hex()

    const onVoteConfirm = (e: RadioChangeEvent) => {
        const config = {
            title,
            content: t('DO_YOU_WANT_TO_CHANGE_YOUR_VOTE_RESULT?'),
            okText: t('OK'),
            cancelText: t('CANCEL'),
            onOk() {
                onChange(e)
            },
        }

        Modal.confirm(config)
    }

    const onChange = async (e: RadioChangeEvent) => {
        try {
            setVoteStatus(FETCH_STATUS.LOADING)
            setValue(e.target.value)
            const proposal = await serviceProposal.voteProposal(
                id,
                e.target.value,
            )
            const notVoteYetQuantity = Number(proposal.notVoteYetQuantity)
            const votedQuantity = Number(proposal.votedQuantity)
            const unVotedQuantity = Number(proposal.unVotedQuantity)
            const totalShareholders =
                notVoteYetQuantity + votedQuantity + unVotedQuantity
            const percentVoted =
                totalShareholders === 0
                    ? 0
                    : (votedQuantity * 100) / totalShareholders
            const percentUnVoted =
                totalShareholders === 0
                    ? 0
                    : (unVotedQuantity * 100) / totalShareholders
            const percentNotVoteYet =
                totalShareholders === 0
                    ? 0
                    : (notVoteYetQuantity * 100) / totalShareholders
            setVotePercent({
                percentVoted,
                percentNotVoteYet,
                percentUnVoted,
            })
            setVoteStatus(FETCH_STATUS.SUCCESS)
            notification.success({
                message: t('VOTED_PROPOSAL'),
                description: t('CHANGE_VOTE_RESULT_PROPOSAL_SUCCESSFULLY'),
            })
        } catch (error) {
            setVoteStatus(FETCH_STATUS.ERROR)
        }
    }

    return (
        <div className="flex items-center justify-between border-b border-b-neutral/4 py-3">
            <Modal
                title={title}
                open={modalOpen}
                onCancel={toggleModelDetailResolution}
                footer={null}
            >
                <div className="text-black-45">{t('CONTENT')}</div>
                <div>{content}</div>
                {oldContent && (
                    <div className="mt-4">
                        <div className="text-black-45">{t('OLD_CONTENT')}</div>
                        <div>{oldContent}</div>
                    </div>
                )}
                {proposalFiles && (
                    <div className="mt-4">
                        <div className="text-black-45">{t('DOCUMENTS')}</div>
                        <div className="flex flex-col gap-1">
                            {proposalFiles.map((proposalFile, index) => (
                                <Link
                                    href={proposalFile.url}
                                    key={index}
                                    target="_blank"
                                >
                                    <Text
                                        title={getShortNameFromUrl(
                                            proposalFile.url,
                                        )}
                                        className="cursor-pointer text-primary"
                                    >
                                        {truncateString({
                                            text: getShortNameFromUrl(
                                                proposalFile.url,
                                            ) as string,
                                            start: 5,
                                            end: 40,
                                        })}
                                    </Text>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
                <div className="mt-4 flex items-center gap-2">
                    <div className="text-black-45">{t('CREATED_BY')}:</div>
                    {avatar ? (
                        <Avatar
                            src={avatar}
                            alt="avatar-alt"
                            size="small"
                            style={{
                                backgroundColor: backgroundAvatarColor,
                                verticalAlign: 'middle',
                            }}
                        />
                    ) : (
                        <Avatar
                            style={{
                                backgroundColor: backgroundAvatarColor,
                                verticalAlign: 'middle',
                                color: defaultAvatarHashColor as string,
                            }}
                            size="small"
                        >
                            {getFirstCharacterUpperCase(username)}
                        </Avatar>
                    )}
                    <div className="cursor-pointer">
                        <Text title={email}>
                            {truncateString({
                                text: username,
                                start: 10,
                                end: 0,
                            })}{' '}
                        </Text>
                    </div>
                </div>
            </Modal>
            <div className="flex items-center justify-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral/5 bg-neutral/2">
                    <Text className="text-bold">{index}</Text>
                </div>
                <Text
                    title={content}
                    className="cursor-pointer text-primary underline decoration-1"
                    onClick={toggleModelDetailResolution}
                >
                    {title}
                </Text>
            </div>
            <div className="flex items-center gap-8">
                {/* <div className="flex items-center gap-2">
                    <Text className="text-polar-green">
                        {formatNumber(percentVoted, {
                            maximumFractionDigits: 1,
                        })}
                        %
                    </Text>
                    <Text className="text-black-45">{t('VOTED')}</Text>
                </div> */}
                <Tooltip placement="top" title={t(voteErrorMessage)}>
                    <Radio.Group
                        onChange={onVoteConfirm}
                        value={value}
                        disabled={
                            voteStatus === FETCH_STATUS.LOADING ||
                            !!voteErrorMessage
                        }
                    >
                        <Radio value={VoteProposalOption.VOTE}>
                            <div className="flex flex-col">
                                <div>{t('VOTED')}</div>
                                <Text className="text-polar-green">
                                    {formatNumber(votePercent.percentVoted, {
                                        maximumFractionDigits: 2,
                                    })}
                                    %
                                </Text>
                            </div>
                        </Radio>
                        <Radio value={VoteProposalOption.UN_VOTE}>
                            <div className="flex flex-col">
                                <div>{t('UNVOTED')}</div>
                                <Text className="text-polar-green">
                                    {formatNumber(votePercent.percentUnVoted, {
                                        maximumFractionDigits: 2,
                                    })}
                                    %
                                </Text>
                            </div>
                        </Radio>
                        <Radio value={VoteProposalOption.NO_IDEA}>
                            <div className="flex flex-col">
                                <div>{t('NO_IDEA')}</div>
                                <Text className="text-polar-green">
                                    {formatNumber(
                                        votePercent.percentNotVoteYet,
                                        {
                                            maximumFractionDigits: 2,
                                        },
                                    )}
                                    %
                                </Text>
                            </div>
                        </Radio>
                    </Radio.Group>
                </Tooltip>
            </div>
        </div>
    )
}

export default DetailResolutionItem
