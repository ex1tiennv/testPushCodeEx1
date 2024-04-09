'use client'

import { useAuthLogin } from '@/stores/auth/hooks'
import { DownOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Dropdown, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
// import { useRouter } from 'next/navigation'
import { useDisconnect } from 'wagmi'

const { Text } = Typography
const AccountInfo = ({ avatar }: { name: string; avatar: string }) => {
    const t = useTranslations()
    // const router = useRouter()
    const { authState, logoutAction } = useAuthLogin()
    const { disconnect } = useDisconnect()
    const handleLogout = async () => {
        disconnect()
        logoutAction()
    }

    const items: MenuProps['items'] = [
        {
            key: '0',
            label: (
                <Link
                    className="py-[5px] text-sm leading-[22px]"
                    rel="noopener noreferrer"
                    href="/dashboard"
                >
                    {t('DASHBOARD')}
                </Link>
            ),
        },
        {
            key: '1',
            label: (
                <Link
                    className="py-[5px] text-sm  leading-[22px]"
                    rel="noopener noreferrer"
                    href="/profile"
                >
                    {t('MY_PROFILE')}
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link
                    className="py-[5px] text-sm  leading-[22px]"
                    rel="noopener noreferrer"
                    href="/change-user-password"
                >
                    {t('CHANGE_PASSWORD')}
                </Link>
            ),
        },
        {
            key: '3',
            label: (
                <div
                    className="py-[5px] text-sm leading-[22px]"
                    onClick={async () => {
                        handleLogout()
                        await new Promise((resolve) => setTimeout(resolve, 500))
                    }}
                >
                    {t('LOGOUT')}
                </div>
            ),
        },
    ]

    return (
        <Dropdown
            arrow={true}
            menu={{ items }}
            placement="bottomLeft"
            overlayStyle={{ borderRadius: '2px' }}
            className="cursor-pointer"
        >
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                    <Image
                        loader={() => authState.userData?.avatar || avatar}
                        src={authState.userData?.avatar || avatar}
                        alt={'avatar'}
                        width={24}
                        height={24}
                        className="h-8 w-8 rounded-full"
                    />
                    <Text className="text-sm leading-[22px] text-white">
                        {authState.userData?.username ?? 'Unknow'}
                    </Text>
                </div>
                <DownOutlined className="h-[10px] w-[10px] text-white" />
            </div>
        </Dropdown>
    )
}

export default AccountInfo
