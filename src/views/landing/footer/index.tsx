'use client'

import { useTranslations } from 'next-intl'
import { Typography } from 'antd'
import {
    FacebookFilled,
    TwitterOutlined,
    YoutubeFilled,
} from '@ant-design/icons'

const { Text } = Typography

const LandingFooter = () => {
    const t = useTranslations()

    const baseTextClass = `text-sm font-normal text-white`

    return (
        <div id="landing-footer" className=" bg-primary">
            <div className="footer-content mx-auto my-0 flex max-w-[1200px] justify-between py-2">
                <div className="footer__left">
                    <Text className={baseTextClass}>
                        {t('FOOTER_COPY_RIGHT')}
                    </Text>
                </div>
                <div className="footer__right flex items-center justify-center gap-3">
                    <Text className={baseTextClass}>
                        {t('TERM_OF_SERVICE')}
                    </Text>
                    <Text className={baseTextClass}>{t('PRIVACY')}</Text>
                    <FacebookFilled
                        width={24}
                        height={24}
                        style={{ color: 'white', cursor: 'pointer' }}
                    />
                    <YoutubeFilled
                        width={24}
                        height={24}
                        style={{ color: 'white', cursor: 'pointer' }}
                    />
                    <TwitterOutlined
                        width={24}
                        height={24}
                        style={{ color: 'white', cursor: 'pointer' }}
                    />
                </div>
            </div>
        </div>
    )
}

export default LandingFooter
