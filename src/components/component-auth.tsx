import { useAuthLogin } from '@/stores/auth/hooks'
import dynamic from 'next/dynamic'
import { ComponentType, useEffect, useState } from 'react'
import NotFoundPage from './errors/NotFound'
import { checkPermission } from '@/utils/auth'

const WorkspaceLogin = dynamic(() => import('./workspace-login'), {
    loading: () => null,
    ssr: false,
})

const withAuth = <P extends object>(
    WrappedComponent: ComponentType<P>,
    permission: string,
) => {
    return function WithAuth(props: P) {
        const { authState } = useAuthLogin()
        const [mounted, setMounted] = useState(false)
        useEffect(() => {
            setMounted(true)
        }, [])

        return (
            mounted &&
            (authState.isAuthenticated ? (
                checkPermission(
                    authState.userData?.permissionKeys,
                    permission,
                ) ? (
                    <WrappedComponent {...props} />
                ) : (
                    <NotFoundPage />
                )
            ) : (
                <WorkspaceLogin />
            ))
        )
    }
}

export default withAuth
