import { ScreenForgotPassword } from '@/constants/forgot-password'
import servicePassword from '@/services/system-admin/forgot-password'
import { useForgotPassword } from '@/stores/forgot-password/hooks'
import { Button, Form, Input, Typography, notification } from 'antd'
import { AxiosError } from 'axios'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

const { Text } = Typography
const SendMailForgot = () => {
    const {
        forgotPasswordState,
        setScreenForgotPassword,
        setEmailForgotPassword,
    } = useForgotPassword()

    const t = useTranslations()

    const onFinish = async (values: any) => {
        try {
            const response = await servicePassword.sendEmailForgotPassword({
                email: values.email,
            })
            if (response) {
                notification.success({
                    message: t('SUCCESS'),
                    description: t('SUCCESS_SEND_EMAIL_TO_SYSTEM_ADMIN'),
                })
            }
            setEmailForgotPassword(values?.email)
            setScreenForgotPassword(ScreenForgotPassword.CONFIRM)
        } catch (error) {
            if (error instanceof AxiosError) {
                notification.error({
                    message: t('ERROR'),
                    description: t('SYSADMIN_NOT_EXITED'),
                })
            }
        }
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }

    return (
        <>
            <div>
                <Text className="text-3xl font-bold">
                    {t('FORGOT_YOUR_PASSWORD')}
                </Text>
            </div>
            <div className="mb-8 mt-3 flex items-center justify-center">
                <Text className="text-sm">
                    {t('CONTENT_FORGOT_YOUR_PASSWORD')}
                </Text>
            </div>
            <div className="mb-6">
                <Form
                    name="sendMailForgot"
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    initialValues={{ email: forgotPasswordState.email ?? null }}
                >
                    <Form.Item
                        style={{ marginBottom: '24px' }}
                        className="font-semibold"
                        name="email"
                        label={t('ENTER_EMAIL_ADDRESS')}
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
                        <Input
                            size="large"
                            className="font-normal"
                            placeholder="abc@gmail.com"
                        />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: '24px' }}>
                        <Button
                            size="large"
                            type="primary"
                            htmlType="submit"
                            className="bg-#5151E5 w-full rounded text-center text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-600 "
                        >
                            {t('REQUEST_PASSWORD_RESET')}
                        </Button>
                    </Form.Item>

                    <Link
                        href="/login"
                        className="text-primary-600 flex items-center justify-center font-medium hover:underline"
                    >
                        {t('BACK_TO_LOGIN')}
                    </Link>
                </Form>
            </div>
        </>
    )
}

export default SendMailForgot
