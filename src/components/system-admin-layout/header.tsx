import { LogoAppIcon } from '@/components/svgs'
import { Layout } from 'antd'
import Link from 'next/link'
import AccountInfoSystem from '../account-info-system'
import { useEffect, useState } from 'react'
import { useAuthAdminLogin } from '@/stores/auth-admin/hooks'
import LocaleSwitcher from '../local-switcher'

const Header = () => {
    const { authAdminState } = useAuthAdminLogin()
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])
    return (
        <Layout.Header className="fixed z-10 h-12 w-full bg-primary px-4 py-0 text-white">
            <div className="flex h-full items-center justify-between">
                <Link href="/company">
                    <LogoAppIcon />
                </Link>

                <div className="flex gap-5">
                    <LocaleSwitcher />
                    {mounted && authAdminState.isAuthenticated && (
                        <AccountInfoSystem
                            name="Stan Lee"
                            avatar="/images/default-avatar.png"
                        />
                    )}
                </div>
            </div>
        </Layout.Header>
    )
}

export default Header
