import { useNotification } from '@/hooks/use-notification'
import { useAuthLogin } from '@/stores/auth/hooks'
import { EActionStatus } from '@/stores/type'
import { DownOutlined } from '@ant-design/icons'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Button, Form, Input, Modal, Typography } from 'antd'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useForm } from 'antd/es/form/Form'
import { useRouter } from 'next/navigation'
const { Text } = Typography
interface IButtonProp {
    connectWalletText: string
    wrongNetworkText: string
    isAuthenticated: boolean | null
}

const ButtonConnectWallet = ({
    connectWalletText,
    wrongNetworkText,
    isAuthenticated,
}: IButtonProp) => {
    const t = useTranslations()
    const router = useRouter()

    const { openNotification, contextHolder } = useNotification()
    const { authState, loginByEmailAction, logoutAction, resetStatusAction } =
        useAuthLogin()
    const [form] = useForm<any>()

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    useEffect(() => {
        if (authState.isAuthenticated) {
            setIsModalOpen(false)
        }
    }, [authState])

    const onFinish = async (values: any) => {
        //Call Api
        loginByEmailAction(values)
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    useEffect(() => {
        // eslint-disable-next-line
        ;(async () => {
            if (
                authState.status === EActionStatus.Succeeded &&
                authState.userData
            ) {
                await openNotification({
                    message: t('LOGIN_SUCCESSFULLY'),
                    placement: 'topRight',
                    type: 'success',
                })
                form.resetFields()
                await new Promise((resolve) => setTimeout(resolve, 1000))
                await router.push('/dashboard')
                resetStatusAction()
            }

            if (authState.status === EActionStatus.Failed) {
                if (authState.errorMessage == 'USER_STATUS_INACTIVE') {
                    console.log('User Inactive')
                    openNotification({
                        message: t('USER_STATUS_INACTIVE'),
                        placement: 'topRight',
                        type: 'error',
                    })
                } else {
                    openNotification({
                        message: t('MSG_ERR_USER_LOGIN_00000'),
                        placement: 'topRight',
                        type: 'error',
                    })
                }
                logoutAction()
            }
        })()
        // eslint-disable-next-line
    }, [authState.status])

    return (
        <div>
            {contextHolder}
            <ConnectButton.Custom>
                {({ chain, openChainModal, openConnectModal, mounted }) => {
                    const ready = mounted
                    const connected = ready

                    return (
                        <div>
                            <Modal
                                open={isModalOpen}
                                onCancel={handleCancel}
                                footer={null}
                            >
                                {(() => {
                                    return (
                                        <div>
                                            <div className="flex items-center justify-center gap-2">
                                                <Image
                                                    src={
                                                        '/images/logo-icon.png'
                                                    }
                                                    alt={''}
                                                    width={48}
                                                    height={48}
                                                />
                                                <Text className="text-3xl font-bold">
                                                    {t('LOGIN')}
                                                </Text>
                                            </div>
                                            <div className="mb-4 mt-3 flex items-center justify-center">
                                                <Text className="text-sm">
                                                    {t('TITLE_SYSTEM_LOGIN')}
                                                </Text>
                                            </div>
                                            <div className="flex flex-col text-center ">
                                                <Button
                                                    onClick={openConnectModal}
                                                    type="default"
                                                    size="large"
                                                    className="mx-auto mb-4 text-base font-normal text-primary"
                                                >
                                                    {connectWalletText}
                                                </Button>
                                                <div className="mb-2 text-2xl font-bold">
                                                    {t('OR')}
                                                </div>
                                                <div className="mb-6">
                                                    <Form
                                                        layout="vertical"
                                                        onFinish={onFinish}
                                                        form={form}
                                                        onFinishFailed={
                                                            onFinishFailed
                                                        }
                                                    >
                                                        <Form.Item
                                                            className="font-semibold"
                                                            name="taxOfCompany"
                                                            label={t(
                                                                'COMPANY_CODE',
                                                            )}
                                                            rules={[
                                                                {
                                                                    required:
                                                                        true,
                                                                    message: t(
                                                                        'REQUIRE_COMPANY_CODE',
                                                                    ),
                                                                },
                                                                {
                                                                    pattern:
                                                                        new RegExp(
                                                                            /^\d{10}$/,
                                                                        ),
                                                                    message: t(
                                                                        'PLEASE_ENTER_ ONLY_NUMBER_AND_LENGTH_EQUAL_10',
                                                                    ),
                                                                },
                                                            ]}
                                                        >
                                                            <Input
                                                                size="large"
                                                                className="font-normal"
                                                            />
                                                        </Form.Item>
                                                        <Form.Item
                                                            className="font-semibold"
                                                            name="email"
                                                            label={t('EMAIL')}
                                                            rules={[
                                                                {
                                                                    required:
                                                                        true,
                                                                    // type: 'email',
                                                                    message:
                                                                        t(
                                                                            'REQUIRE_EMAIL',
                                                                        ),
                                                                },
                                                                {
                                                                    pattern:
                                                                        new RegExp(
                                                                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                                        ),
                                                                    message:
                                                                        t(
                                                                            'VALID_EMAIL',
                                                                        ),
                                                                },
                                                            ]}
                                                        >
                                                            <Input
                                                                size="large"
                                                                className="font-normal"
                                                            />
                                                        </Form.Item>
                                                        <Form.Item
                                                            className="font-semibold"
                                                            name="password"
                                                            label={t(
                                                                'PASSWORD',
                                                            )}
                                                            rules={[
                                                                {
                                                                    required:
                                                                        true,
                                                                    whitespace:
                                                                        true,
                                                                    message:
                                                                        t(
                                                                            'REQUIRE_PASSWORD',
                                                                        ),
                                                                },
                                                            ]}
                                                            style={{
                                                                marginBottom:
                                                                    '10px',
                                                            }}
                                                        >
                                                            <Input.Password
                                                                size="large"
                                                                className="font-normal"
                                                            />
                                                        </Form.Item>

                                                        <Form.Item
                                                            style={{
                                                                marginBottom:
                                                                    '10px',
                                                            }}
                                                        >
                                                            <Link
                                                                className="login-form-forgot"
                                                                href="/forgot-password-user"
                                                            >
                                                                {t(
                                                                    'FORGOT_PASSWORD',
                                                                )}
                                                            </Link>
                                                        </Form.Item>

                                                        <Form.Item
                                                            style={{
                                                                marginBottom:
                                                                    '10px',
                                                            }}
                                                        >
                                                            <Button
                                                                size="large"
                                                                type="primary"
                                                                htmlType="submit"
                                                                className="bg-#5151E5 w-full rounded text-center text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-600 "
                                                            >
                                                                {t('SIGN_IN')}
                                                            </Button>
                                                        </Form.Item>
                                                    </Form>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })()}
                            </Modal>
                            {(() => {
                                if (
                                    (isAuthenticated == null ||
                                        isAuthenticated === false) &&
                                    connected
                                ) {
                                    return (
                                        <Button
                                            onClick={showModal}
                                            type="default"
                                            size="large"
                                            className="text-base font-normal text-primary "
                                        >
                                            {t('LOGIN')}
                                        </Button>
                                    )
                                }

                                if (chain && chain.unsupported) {
                                    return (
                                        <Button
                                            onClick={openChainModal}
                                            type="default"
                                            size="large"
                                            className="flex items-center text-base font-normal "
                                            danger
                                        >
                                            {wrongNetworkText}
                                            <DownOutlined
                                                style={{ marginLeft: '8px' }}
                                            />
                                        </Button>
                                    )
                                }

                                return (
                                    <div>
                                        <button
                                            onClick={openChainModal}
                                            className="flex items-center gap-2 py-1 text-sm text-white"
                                            type="button"
                                        >
                                            {chain && chain.iconUrl && (
                                                <Image
                                                    src={chain.iconUrl}
                                                    alt={
                                                        chain.name ??
                                                        'Chain icon'
                                                    }
                                                    width={24}
                                                    height={24}
                                                />
                                            )}
                                            {chain && chain.name}
                                            <DownOutlined className="h-[10px] w-[10px] text-white" />
                                        </button>
                                    </div>
                                )
                            })()}
                        </div>
                    )
                }}
            </ConnectButton.Custom>
        </div>
    )
}

export default ButtonConnectWallet
