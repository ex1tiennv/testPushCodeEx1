/* eslint-disable */
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useForm } from 'antd/es/form/Form'
import { AxiosError } from 'axios'

import { Button, Form, Input, Typography, notification } from 'antd'
import LayoutTitle from '@/components/content-page-title/layout-title'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import withAuth from '@/components/component-auth'
import { Permissions } from '@/constants/permission'
import serviceUser from '@/services/user'
import servicePassword from '@/services/system-admin/forgot-password'

const { Title } = Typography
export interface IPasswordForm {
    currentPassword: string
    newPassword: string
    confirmPassword: string
}

const ChangeUserPassword = () => {
    const t = useTranslations()
    const router = useRouter()
    const [form] = useForm<IPasswordForm>()
    const [confirmPasswordError, setConfirmPasswordError] = useState<
        string | null
    >(null)

    const validatePassword = (_: any, value: string) => {
        const regex =
            /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

        if (!value) {
            return Promise.reject(t('PLEASE_ENTER_NEW_PASSWORD'))
        }

        if (!regex.test(value)) {
            return Promise.reject(t('VALID_PASSWORD'))
        }

        // Reset confirm password error when password changes
        form.setFields([{ name: 'confirmPassword', errors: [] }])
        setConfirmPasswordError(null)

        return Promise.resolve()
    }

    const onFinish = async (values: any) => {
        try {
            const response = await servicePassword.changePasswordUser({
                currentPassword: values.currentPassword,
                newPassword: values.confirmPassword,
            })
            notification.success({
                message: t('SUCCESS'),
                description: t('CHANGE_PASSWORD_SUCCESS'),
            })
            router.push('/dashboard')
        } catch (error) {
            if (error instanceof AxiosError) {
                notification.error({
                    message: t('ERROR'),
                    description: t('CHANGE_PASSWORD_FAILED'),
                })
            }
        }
    }

    return (
        <div>
            <Form onFinish={onFinish} form={form} layout="vertical">
                <LayoutTitle>
                    <div className="flex items-center gap-2">
                        <ArrowLeftOutlined
                            onClick={() => {
                                router.back()
                            }}
                        />
                        <Title level={4} className="mb-0 font-medium">
                            {t('CHANGE_PASSWORD')}
                        </Title>
                    </div>
                </LayoutTitle>
                <div className="mx-auto mt-6 flex flex-col justify-center rounded-md bg-white p-8 shadow-lg md:w-[500px] md:max-w-md">
                    <Form.Item
                        className="font-semibold"
                        name="currentPassword"
                        label={t('CURRENT_PASSWORD')}
                        rules={[
                            {
                                required: true,
                                message: t('REQUIRE_PASSWORD'),
                            },
                        ]}
                    >
                        <Input.Password size="large" className="font-normal" />
                    </Form.Item>

                    {/* New Password */}
                    <Form.Item
                        style={{ marginBottom: '24px' }}
                        className="font-semibold"
                        name="newPassword"
                        label={t('NEW_PASSWORD')}
                        rules={[
                            {
                                required: true,
                                // message: t('PLEASE_ENTER_NEW_PASSWORD'),
                                validator: validatePassword,
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue('currentPassword') !==
                                            value
                                    ) {
                                        return Promise.resolve()
                                    }
                                    return Promise.reject(
                                        new Error(t('NEW_PASSWORD_DIFFERENT')),
                                    )
                                },
                            }),
                        ]}
                    >
                        <Input.Password size="large" className="font-normal" />
                    </Form.Item>

                    <Form.Item
                        style={{ marginBottom: '24px' }}
                        className="font-semibold"
                        name="confirmPassword"
                        label={t('CONFIRM_PASSWORD')}
                        rules={[
                            {
                                required: true,
                                message: t('REQUIRE_CONFIRM_PASSWORD'),
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue('newPassword') === value
                                    ) {
                                        return Promise.resolve()
                                    }
                                    return Promise.reject(
                                        new Error(t('VALID_CONFIRM_PASSWORD')),
                                    )
                                },
                            }),
                        ]}
                        validateStatus={confirmPasswordError ? 'error' : ''}
                        help={confirmPasswordError}
                    >
                        <Input.Password size="large" className="font-normal" />
                    </Form.Item>
                    <Form.Item style={{ marginBottom: '24px' }}>
                        <Button
                            size="large"
                            type="primary"
                            htmlType="submit"
                            className="bg-#5151E5 w-full rounded text-center text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-600 "
                        >
                            {t('SAVE')}
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    )
}

export default withAuth(ChangeUserPassword, Permissions.EDIT_PROFILE)
