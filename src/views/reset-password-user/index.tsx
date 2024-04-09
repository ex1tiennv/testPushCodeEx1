import { useRouter, useSearchParams } from 'next/navigation'
import { Button, Form, Input, Typography, notification } from 'antd'
import { useState } from 'react'
import AuthLayout from '@/components/auth-layout'
import { useNotification } from '@/hooks/use-notification'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import servicePassword from '@/services/system-admin/forgot-password'
import { AxiosError } from 'axios'

const { Text } = Typography

const ResetPassword = () => {
    const { contextHolder } = useNotification()
    const t = useTranslations()
    const router = useRouter()

    const [form] = Form.useForm()
    const [confirmPasswordError, setConfirmPasswordError] = useState<
        string | null
    >(null)

    //Get Token on Param Url
    const searchParams = useSearchParams()
    const tokenFromUrl = searchParams.get('token')

    const onFinish = async (values: any) => {
        if (tokenFromUrl) {
            try {
                const response = await servicePassword.createNewPassWordUser(
                    tokenFromUrl,
                    values,
                )
                if (response) {
                    notification.success({
                        message: t('SUCCESS'),
                        description: t('CHANGE_PASSWORD_SUCCESS'),
                    })
                }
                router.push('/')
            } catch (error) {
                if (error instanceof AxiosError) {
                    notification.error({
                        message: t('ERROR'),
                        description: t('CHANGE_PASSWORD_FAILED'),
                    })
                }
            }
        }
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }

    const validatePassword = (_: any, value: string) => {
        const regex =
            /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

        if (!value) {
            return Promise.reject('Please input your new password!')
        }

        if (!regex.test(value)) {
            return Promise.reject(
                'Password must be at least 8 characters long, contain at least one uppercase letter, one special character, and one digit.',
            )
        }

        // Reset confirm password error when password changes
        form.setFields([{ name: 'confirmPassword', errors: [] }])
        setConfirmPasswordError(null)

        return Promise.resolve()
    }

    return (
        <>
            <AuthLayout>
                {contextHolder}
                <div className="mb-10 flex items-center justify-center gap-5">
                    <Image
                        src={'/images/logo-icon.png'}
                        alt={''}
                        width={48}
                        height={48}
                    />
                    <Text className="text-3xl font-bold">
                        {t('COCOKITENE')}
                    </Text>
                </div>
                <div>
                    <div className="flex items-center">
                        <Text className="mx-auto text-3xl font-bold ">
                            {t('RESET_PASSWORD')}
                        </Text>
                    </div>
                    <div className="mb-8 mt-3 flex items-center justify-center">
                        <Text className="text-sm">
                            {t('PLEASE_ENTER_NEW_PASSWORD')}
                        </Text>
                    </div>
                    <div className="mb-6">
                        <Form
                            name="resetPassword"
                            layout="vertical"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                style={{ marginBottom: '24px' }}
                                className="font-semibold"
                                name="password"
                                label={t('NEW_PASSWORD')}
                                rules={[
                                    {
                                        required: true,
                                        validator: validatePassword,
                                    },
                                ]}
                            >
                                <Input.Password
                                    size="large"
                                    className="font-normal"
                                />
                            </Form.Item>

                            <Form.Item
                                style={{ marginBottom: '24px' }}
                                className="font-semibold"
                                name="confirmPassword"
                                label={t('CONFIRM_PASSWORD')}
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please confirm your password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (
                                                !value ||
                                                getFieldValue('password') ===
                                                    value
                                            ) {
                                                return Promise.resolve()
                                            }
                                            return Promise.reject(
                                                new Error(
                                                    'The new password that you entered do not match!',
                                                ),
                                            )
                                        },
                                    }),
                                ]}
                                validateStatus={
                                    confirmPasswordError ? 'error' : ''
                                }
                                help={confirmPasswordError}
                            >
                                <Input.Password
                                    size="large"
                                    className="font-normal"
                                />
                            </Form.Item>

                            <Form.Item style={{ marginBottom: '24px' }}>
                                <Button
                                    size="large"
                                    type="primary"
                                    htmlType="submit"
                                    className="bg-#5151E5 w-full rounded text-center text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-600 "
                                >
                                    {t('BTN_CONFIRM')}
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </AuthLayout>
        </>
    )
}

export default ResetPassword
