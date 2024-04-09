import { getNumberLimitedPlan } from '@/utils/plan'
import { Button, Typography } from 'antd'
import { useTranslations } from 'next-intl'

const { Title, Text } = Typography

export interface IPlanItem {
    title: string
    price: number
    meetingsQuantity: number
    videosQuantity: number
    imagesQuantity: number
    storageQuantity: number
    isRecommended: boolean
    isBold: boolean
}

const PlanItem = ({
    title,
    price,
    meetingsQuantity,
    videosQuantity,
    imagesQuantity,
    storageQuantity,
    isRecommended,
    isBold,
}: IPlanItem) => {
    const t = useTranslations()

    const quantityTextClass = `text-base font-normal ${
        isBold ? 'text-white' : ''
    }`

    return (
        <div id="plan-item-wrapper" className="relative flex flex-col bg-white">
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
                    {t(title)}
                </Title>
            </div>
            <div
                className={`plan-item__info flex flex-col gap-8 p-8 ${
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
                        {getNumberLimitedPlan(meetingsQuantity, t)}{' '}
                        {t('MEETINGS')}
                    </Text>
                    <Text className={quantityTextClass}>
                        {getNumberLimitedPlan(videosQuantity, t)} {t('VIDEOS')}
                    </Text>
                    <Text className={quantityTextClass}>
                        {getNumberLimitedPlan(imagesQuantity, t)} {t('IMAGES')}
                    </Text>
                    <Text className={quantityTextClass}>
                        {getNumberLimitedPlan(storageQuantity, t)}{' '}
                        {t('GB_STORAGE')}
                    </Text>
                </div>
                <Button
                    size="large"
                    className={`w-[280px] text-base font-normal ${
                        isBold ? 'text-primary' : ''
                    }`}
                >
                    {t('GET_THIS')}
                </Button>
            </div>
        </div>
    )
}

export default PlanItem
