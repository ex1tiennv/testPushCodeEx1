import { getNumberLimitedPlan } from '@/utils/plan'
import { Button, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { memo, useRef, useState } from 'react'

const { Title, Text } = Typography

export interface IPlanItem {
    id: number
    planName: string
    description: string
    maxStorage: number
    maxMeeting: number
    price: number
    maxShareholderAccount: number
    className: string
    isRecommended: boolean
    add?: boolean
}

const PlanCard = ({
    id,
    planName,
    description,
    maxStorage,
    maxMeeting,
    price,
    maxShareholderAccount,
    className,
    isRecommended,
    add,
}: IPlanItem) => {
    const t = useTranslations()
    const router = useRouter()
    const [isBold, setIsBold] = useState(false)
    const cardRef = useRef<HTMLInputElement>(null)

    const handleEnter = () => {
        setIsBold(true)
        cardRef.current &&
            cardRef.current.classList.remove('animate-scale-down-card')
        cardRef.current &&
            cardRef.current.classList?.add('animate-scale-up-card')
    }
    const handleLeave = () => {
        setIsBold(false)
        cardRef.current &&
            cardRef.current.classList?.remove('animate-scale-up-card')
        cardRef.current &&
            cardRef.current.classList?.add('animate-scale-down-card')
    }

    const quantityTextClass = `text-base font-normal ${
        isBold ? 'text-white' : ''
    }`

    return (
        <div
            id="plan-item-wrapper"
            className={` relative flex flex-col border-[1px] border-blue-700 bg-white  ${className} ${
                add ? 'h-[340px]' : 'h-[420px]'
            }`}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            ref={cardRef}
        >
            {isRecommended && (
                <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-primary bg-yellow-sunrise px-4">
                    <Text>{t('RECOMMEND')}</Text>
                </div>
            )}
            <div className="plan-item__title border-b border-neutral/4 py-4 text-center">
                <Title
                    level={4}
                    className={`text-u mb-0 font-medium uppercase ${
                        isBold ? 'text-primary' : ''
                    }`}
                >
                    {planName}
                </Title>
            </div>
            <div
                className={`plan-item__info relative flex grow flex-col gap-8 p-8  ${
                    isBold ? 'bg-primary' : ''
                }`}
            >
                <div className="plan-item__price flex items-end justify-center">
                    <Title
                        className={`font-medium leading-[0] text-primary ${
                            isBold ? 'text-white' : ''
                        }`}
                        level={1}
                    >
                        {price}$
                    </Title>
                    <Text
                        className={`font-medium text-primary ${
                            isBold ? 'text-white' : ''
                        }`}
                    >
                        / {t('MONTH')}
                    </Text>
                </div>
                <div
                    className={`plan-item__detail flex flex-col items-center gap-1 ${
                        isBold ? 'bg-primary' : ''
                    }`}
                >
                    <Text className={quantityTextClass}>
                        {getNumberLimitedPlan(maxMeeting, t)} {t('MEETINGS')}
                    </Text>
                    <Text className={quantityTextClass}>
                        {getNumberLimitedPlan(maxShareholderAccount, t)}{' '}
                        {t('SHAREHOLDERS')}
                    </Text>
                    <Text className={quantityTextClass}>
                        {getNumberLimitedPlan(maxStorage, t)} {t('GB_STORAGE')}
                    </Text>

                    <Text
                        className={`${quantityTextClass} line-clamp-3 text-center `}
                    >
                        {description}
                    </Text>
                </div>
                {add ? (
                    <></>
                ) : (
                    <Button
                        size="large"
                        className={`absolute bottom-14 mx-auto w-[80%] text-base font-normal      ${
                            isBold ? 'text-primary' : ''
                        }`}
                        //
                        onClick={() => {
                            router.push(`/plan/update/${id}`)
                        }}
                    >
                        {t('EDIT')}
                    </Button>
                )}
            </div>
        </div>
    )
}

export default memo(PlanCard)
