import { Typography } from 'antd'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

const { Title, Text } = Typography

export interface IServiceItem {
    serviceImage: string
    serviceTitle: string
    serviceSubtitle: string
}

const ServiceItem = ({
    serviceImage,
    serviceTitle,
    serviceSubtitle,
}: IServiceItem) => {
    const t = useTranslations()

    return (
        <div
            id="service-item-wrapper"
            className="flex flex-col items-center border border-solid border-neutral/5 p-10"
        >
            <Image
                src={serviceImage}
                alt="service-image-alt"
                width={150}
                height={150}
                className="mb-10"
            />
            <Title
                level={4}
                className="mb-4 max-w-[200px] text-center font-medium"
            >
                {t(serviceTitle)}
            </Title>
            <Text className="mb-4 text-center font-normal text-black/[45%]">
                {t(serviceSubtitle)}
            </Text>
        </div>
    )
}

export default ServiceItem
