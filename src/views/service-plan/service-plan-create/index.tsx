/* eslint-disable */
import CreateTitle from '@/components/content-page-title/create-title'
import { Col, Form, Input, InputNumber, Row, notification } from 'antd'
import SaveCreatePlanButton from './save-button'
import { FETCH_STATUS } from '@/constants/common'
import { useTranslations } from 'next-intl'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useState } from 'react'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { Permissions } from '@/constants/permission'
import withAuth from '@/components/component-auth'
import servicePlan from '@/services/system-admin/service-plan'

export interface IPlanCreateForm {
    planName: string
    description?: string
    maxStorage: number
    maxMeeting: number
    price: number
    maxShareholderAccount: number
}

const CreatePlan = () => {
    const [status, setStatus] = useState(FETCH_STATUS.IDLE)

    const t = useTranslations()
    const [form] = useForm<IPlanCreateForm>()
    const router = useRouter()

    const onFinish = async (value: IPlanCreateForm) => {
        console.log('value', value)
        try {
            const response = await servicePlan.createPlan({
                planName: value.planName,
                description: value.description,
                maxStorage: +value.maxStorage,
                maxMeeting: +value.maxMeeting,
                price: +value.price,
                maxShareholderAccount: +value.maxShareholderAccount,
            })

            if (response) {
                notification.success({
                    message: t('CREATED'),
                    description: t('CREATED_PLAN_SUCCESSFULLY'),
                })
                router.push('/plan')
                form.resetFields()
                setStatus(FETCH_STATUS.SUCCESS)
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                notification.error({
                    message: t('ERROR'),
                    description: t(error.response?.data.info.message),
                })
            }
            setStatus(FETCH_STATUS.ERROR)
        }
    }

    return (
        <div>
            <Form onFinish={onFinish} form={form} layout="vertical">
                <CreateTitle
                    pageName={t('CREATE_NEW_ACCOUNT')}
                    saveButton={
                        <SaveCreatePlanButton
                            form={form}
                            isLoading={status === FETCH_STATUS.LOADING}
                        />
                    }
                />
                <div className="p-6">
                    <div className="bg-white px-6 py-6 shadow-01">
                        <Row gutter={[16, 24]}>
                            <Col xs={24} lg={12}>
                                <Form.Item
                                    name="planName"
                                    label={t('PLAN_NAME')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('REQUIRE_PLAN_NAME'),
                                        },
                                    ]}
                                    className="mb-0"
                                >
                                    <Input size="large" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} lg={12}>
                                <Form.Item
                                    name="description"
                                    label={t('DESCRIPTION')}
                                    rules={[{ required: false }]}
                                    className="mb-0"
                                >
                                    <Input size="large" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} lg={12}>
                                <Form.Item
                                    name="price"
                                    label={`${t('PRICE')} ($)`}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('REQUIRE_PLAN_PRICE'),
                                        },
                                        {
                                            pattern: new RegExp(/^[0-9]+$/),
                                            message: t(
                                                'PLEASE_ENTER_ ONLY_NUMBER',
                                            ),
                                        },
                                    ]}
                                    className="mb-0"
                                >
                                    <Input size="large" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} lg={12}>
                                <Form.Item
                                    name="maxShareholderAccount"
                                    label={t('MAX_SHAREHOLDER_ACCOUNT')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t(
                                                'REQUIRE_MAX_SHAREHOLDER_ACCOUNT',
                                            ),
                                        },
                                        {
                                            pattern: new RegExp(/^[0-9]+$/),
                                            message: t(
                                                'PLEASE_ENTER_ ONLY_NUMBER',
                                            ),
                                        },
                                    ]}
                                    className="mb-0"
                                >
                                    <Input size="large" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} lg={12}>
                                <Form.Item
                                    name="maxMeeting"
                                    label={t('MAX_MEETING')}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('REQUIRE_MAX_MEETING'),
                                        },
                                        {
                                            pattern: new RegExp(/^[0-9]+$/),
                                            message: t(
                                                'PLEASE_ENTER_ ONLY_NUMBER',
                                            ),
                                        },
                                    ]}
                                    className="mb-0"
                                >
                                    <Input size="large" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} lg={12}>
                                <Form.Item
                                    name="maxStorage"
                                    label={`${t('MAX_STORAGE')} (GB)`}
                                    rules={[
                                        {
                                            required: true,
                                            message: t('REQUIRE_MAX_STORAGE'),
                                        },
                                        {
                                            pattern: new RegExp(/^[0-9]+$/),
                                            message: t(
                                                'PLEASE_ENTER_ ONLY_NUMBER',
                                            ),
                                        },
                                    ]}
                                    className="mb-0"
                                >
                                    <Input size="large" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default CreatePlan
