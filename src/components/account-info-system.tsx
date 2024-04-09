'use client'

import { useAuthAdminLogin } from '@/stores/auth-admin/hooks'
import { DownOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Dropdown, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const { Text } = Typography
const AccountInfoSystem = ({ avatar }: { name: string; avatar: string }) => {
    const t = useTranslations()
    const router = useRouter()
    const { authAdminState, logoutAdminAction } = useAuthAdminLogin()
    const handleLogout = async () => {
        logoutAdminAction()
    }

    const items: MenuProps['items'] = [
        // {
        //     key: '0',
        //     label: (
        //         <Link
        //             className="py-[5px] text-sm leading-[22px]"
        //             rel="noopener noreferrer"
        //             href="/dashboard"
        //         >
        //             {t('DASHBOARD')}
        //         </Link>
        //     ),
        // },
        // {
        //     key: '1',
        //     label: (
        //         <Link
        //             className="py-[5px] text-sm  leading-[22px]"
        //             rel="noopener noreferrer"
        //             href="/profile"
        //         >
        //             {t('MY_PROFILE')}
        //         </Link>
        //     ),
        // },
        {
            key: '2',
            label: (
                <Link
                    className="py-[5px] text-sm leading-[22px]"
                    rel="noopener noreferrer"
                    href="/change-password"
                >
                    {t('CHANGE_PASSWORD')}
                </Link>
            ),
        },
        // {
        //     key: '3',
        //     label: (
        //         <Link
        //             className="py-[5px] text-sm  leading-[22px]"
        //             rel="noopener noreferrer"
        //             href="/profile"
        //         >
        //             {t('MY_PROFILE')}
        //         </Link>
        //     ),
        // },
        // {
        //     key: '3',
        //     label: (
        //         <Link
        //             className="py-[5px] text-sm  leading-[22px]"
        //             rel="noopener noreferrer"
        //             href="/reset-password"
        //         >
        //             {t('RESET_PASSWORD')}
        //         </Link>
        //     ),
        // },
        {
            key: '4',
            label: (
                <div
                    className="py-[5px] text-sm leading-[22px]"
                    onClick={async () => {
                        handleLogout()
                        await router.push('/login')
                        // await new Promise((resolve) => setTimeout(resolve, 500))
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
                    <Image src={avatar} alt={'avatar'} width={24} height={24} />
                    <Text className="text-sm leading-[22px] text-white">
                        {authAdminState.userAdminInfo?.username ?? 'Unknow'}
                    </Text>
                </div>
                <DownOutlined className="h-[10px] w-[10px] text-white" />
            </div>
        </Dropdown>
    )
}

export default AccountInfoSystem
