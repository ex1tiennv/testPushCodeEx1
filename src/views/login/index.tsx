import AuthLayout from '@/components/auth-layout'
import { useNotification } from '@/hooks/use-notification'
import { useAuthAdminLogin } from '@/stores/auth-admin/hooks'
import { EActionStatus } from '@/stores/type'
import { Button, Form, Input, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
const { Text } = Typography

const Login = () => {
    const t = useTranslations()

    const { authAdminState, loginAdminAction, resetStatusLogin } =
        useAuthAdminLogin()
    const { openNotification, contextHolder } = useNotification()
    const onFinish = (values: any) => {
        loginAdminAction({ email: values.email, password: values.password })
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }
    const router = useRouter()

    useEffect(() => {
        // eslint-disable-next-line
        ;(async () => {
            if (authAdminState.status === EActionStatus.Succeeded) {
                await openNotification({
                    message: t('LOGIN_SUCCESSFULLY'),
                    placement: 'topRight',
                    type: 'success',
                })
                resetStatusLogin()
                await new Promise((resolve) => setTimeout(resolve, 1000))
                // await router.push('/dashboard-system')
                await router.push('/company')
            }

            if (authAdminState.status === EActionStatus.Failed) {
                openNotification({
                    message: t('MSG_ERR_SYSTEM_ADMIN_00000'),
                    placement: 'topRight',
                    type: 'error',
                })
            }
        })()
        // eslint-disable-next-line
    }, [authAdminState.status])

    return (
        <AuthLayout>
            {contextHolder}
            <div className="flex items-center justify-center gap-5">
                <Image
                    src={'/images/logo-icon.png'}
                    alt={''}
                    width={48}
                    height={48}
                />
                <Text className="text-3xl font-bold">{t('COCOKITENE')}</Text>
            </div>
            <div className="mb-10 mt-3 flex items-center justify-center">
                <Text className="text-sm">{t('TITLE_SYSTEM_LOGIN')}</Text>
            </div>

            <div className="mb-6">
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        className="font-semibold"
                        name="email"
                        label={t('EMAIL')}
                        rules={[
                            {
                                required: true,
                                // type: 'email',
                                message: t('REQUIRE_EMAIL'),
                            },
                            {
                                pattern: new RegExp(
                                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                ),
                                message: t('VALID_EMAIL'),
                            },
                        ]}
                    >
                        <Input size="large" className="font-normal" />
                    </Form.Item>
                    <Form.Item
                        className="font-semibold"
                        name="password"
                        label={t('PASSWORD')}
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: t('REQUIRE_PASSWORD'),
                            },
                        ]}
                        style={{ marginBottom: '10px' }}
                    >
                        <Input.Password size="large" className="font-normal" />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: '10px' }}>
                        <Link
                            className="login-form-forgot"
                            href="/forgot-password"
                        >
                            {t('FORGOT_PASSWORD')}
                        </Link>
                    </Form.Item>

                    <Form.Item style={{ marginBottom: '10px' }}>
                        <Button
                            size="large"
                            type="primary"
                            htmlType="submit"
                            className="bg-#5151E5 w-full rounded text-center text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-600 "
                        >
                            {t('SUBMIT')}
                        </Button>
                    </Form.Item>

                    {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        {t('DONT_HAVE_AN_ACCOUNT_YET')}{' '}
                        <Link
                            href="#"
                            className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                        >
                            {t('SIGN_UP')}
                        </Link>
                    </p> */}
                </Form>
            </div>
        </AuthLayout>
    )
}

export default Login
