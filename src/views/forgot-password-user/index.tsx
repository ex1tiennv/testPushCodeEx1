import AuthLayout from '@/components/auth-layout'
import { useNotification } from '@/hooks/use-notification'
import { Typography } from 'antd'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useForgotPassword } from '@/stores/forgot-password/hooks'
import { ScreenForgotPassword } from '@/constants/forgot-password'
import SendMailForgotUser from './send-mail-forgot-user'
import ConfirmCodeForgotUser from './confirm-code-forgot'
const { Text } = Typography

const ForgotPasswordUser = () => {
    const t = useTranslations()
    const { contextHolder } = useNotification()
    const { forgotPasswordState } = useForgotPassword()

    return (
        <AuthLayout>
            {contextHolder}
            <div className="mb-10 flex items-center justify-center gap-5">
                <Image
                    src={'/images/logo-icon.png'}
                    alt={''}
                    width={48}
                    height={48}
                />
                <Text className="text-3xl font-bold">{t('COCOKITENE')}</Text>
            </div>
            {forgotPasswordState.currentScreen ===
                ScreenForgotPassword.SEND_MAIL && <SendMailForgotUser />}
            {forgotPasswordState.currentScreen ===
                ScreenForgotPassword.CONFIRM && <ConfirmCodeForgotUser />}
        </AuthLayout>
    )
}

export default ForgotPasswordUser
