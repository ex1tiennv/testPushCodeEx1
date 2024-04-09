import { useAuthLogin } from '@/stores/auth/hooks'
import { Button, Spin, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const { Text } = Typography

const ConnectWallet = dynamic(
    () => import('../views/landing/header-about-section/header/connect-wallet'),
    {
        loading: () => <Spin />,
        ssr: false,
    },
)

const WorkspaceLogin = () => {
    const { authState } = useAuthLogin()
    const router = useRouter()
    const [isModalOpen] = useState(!authState.isAuthenticated)
    const t = useTranslations()

    return (
        <div className="grid h-[calc(100vh-3rem)] place-content-center px-4">
            {isModalOpen && (
                <div className="h-modal fixed inset-0 left-0 right-0 top-0 z-50 grid h-full w-full place-items-center items-center justify-center backdrop-blur-sm">
                    <div className="container relative m-auto px-6">
                        <div className="m-auto md:w-7/12">
                            <div className="rounded-xl bg-white shadow-xl ">
                                <div className="p-8">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <Image
                                                src={'/images/logo-icon.png'}
                                                alt={''}
                                                width={32}
                                                height={32}
                                            />
                                            <Text className="text-lg font-bold text-cyan-900">
                                                Cocokitene
                                            </Text>
                                        </div>
                                        <h2 className="mb-8 text-2xl font-bold text-cyan-900 ">
                                            {t('TITLE_LOGIN')}
                                        </h2>
                                    </div>
                                    <div className="mt-10 flex justify-center gap-2">
                                        <Button
                                            onClick={() => {
                                                router.push('/')
                                            }}
                                            type="default"
                                            size="large"
                                            className="rounded bg-indigo-600 text-base text-sm font-medium font-normal text-white"
                                            style={{ fontWeight: 'bold' }}
                                        >
                                            {t('BTN_BACK_HOME')}
                                        </Button>
                                        <ConnectWallet />
                                    </div>
                                    <div className="mt-10 space-y-4 py-3 text-center text-gray-600 ">
                                        <p className="text-xs">
                                            {t('AGREEMENT_TEXT')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default WorkspaceLogin
