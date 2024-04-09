import { useAuthAdminLogin } from '@/stores/auth-admin/hooks'
import { notification } from 'antd'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { ComponentType, useEffect } from 'react'

const withAuthAdmin = <P extends object>(
    WrappedComponent: ComponentType<P>,
) => {
    return function WithAuth(props: P) {
        const t = useTranslations()
        const { authAdminState } = useAuthAdminLogin()
        const router = useRouter()
        useEffect(() => {
            if (!authAdminState.isAuthenticated) {
                if (authAdminState.isAuthenticated == false) {
                    notification.error({
                        message: t('ERROR_LOGIN_ADMIN'),
                        description: t('MESSAGE_FAILED_LOGIN_ADMIN'),
                    })
                }
                router.push('/login')
            }
            // eslint-disable-next-line
        }, [authAdminState.isAuthenticated])

        return authAdminState.isAuthenticated ? (
            <WrappedComponent {...props} />
        ) : null
    }
}

export default withAuthAdmin
