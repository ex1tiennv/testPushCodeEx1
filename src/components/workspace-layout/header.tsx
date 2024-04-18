import { LogoAppIcon } from '@/components/svgs'
import { useAuthLogin } from '@/stores/auth/hooks'
import { Layout } from 'antd'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import AccountInfo from '../account-info'
import LocaleSwitcher from '../local-switcher'
import CompanyInfo from '../company-info'

const Header = () => {
    const { authState } = useAuthLogin()
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <Layout.Header className="fixed z-10 h-12 w-full bg-primary px-4 py-0 text-white">
            <div className="flex h-full items-center justify-between">
                <Link href="/dashboard">
                    <LogoAppIcon />
                </Link>
                <div className="flex gap-7">
                    <LocaleSwitcher />
                    {mounted && authState.isAuthenticated && <CompanyInfo />}
                    {mounted && authState.isAuthenticated && (
                        <AccountInfo
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
