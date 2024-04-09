/* eslint-disable */
import UpdateTitle from '@/components/content-page-title/update-title'
import { useTranslations } from 'next-intl'

import { FETCH_STATUS } from '@/constants/common'
import { useForm } from 'antd/es/form/Form'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Loader from '@/components/loader'
import { AxiosError } from 'axios'
import servicePlan from '@/services/system-admin/service-plan'
import { Col, Form, Input, Row, notification } from 'antd'
import SaveUpdatePlanButton from './save-button'
import withAuthAdmin from '@/components/component-auth-admin'

export interface IPlanUpdateForm {
    planName: string
    description?: string
    maxStorage: number
    maxMeeting: number
    price: number
    maxShareholderAccount: number
}

const UpdatePlan = () => {
    const t = useTranslations()
    const router = useRouter()
    const [form] = useForm<IPlanUpdateForm>()
    const [initStatus, setInitStatus] = useState<FETCH_STATUS>(
        FETCH_STATUS.IDLE,
    )

    const [status, setStatus] = useState(FETCH_STATUS.IDLE)
    const [initPlan, setInitPlan] = useState<IPlanUpdateForm>()

    const params = useParams()
    const planId: number = Number(params.id)

    useEffect(() => {
        const fetchData = async () => {
            setInitStatus(FETCH_STATUS.LOADING)
            try {
                const res = await servicePlan.getDetailPlan(planId)
                setInitPlan({
                    planName: res.planName,
                    description: res.description,
                    price: res.price,
                    maxMeeting: res.maxMeeting,
                    maxStorage: res.maxStorage,
                    maxShareholderAccount: res.maxShareholderAccount,
                })
                setInitStatus(FETCH_STATUS.SUCCESS)
            } catch (error) {
                if (error instanceof AxiosError) {
                    notification.error({
                        message: t('ERROR'),
                        description: t(error.response?.data.info.message),
                    })
                }

                setInitStatus(FETCH_STATUS.ERROR)
            }
        }

        if (planId) {
            fetchData()
        }
    }, [planId])

    const onFinish = async (value: IPlanUpdateForm) => {
        setStatus(FETCH_STATUS.LOADING)

        try {
            const updateAccountResponse = await servicePlan.updatePlan(planId, {
                planName: value.planName,
                description: value.description,
                price: +value.price,
                maxMeeting: +value.maxMeeting,
                maxStorage: +value.maxStorage,
                maxShareholderAccount: +value.maxShareholderAccount,
            })

            if (updateAccountResponse) {
                notification.success({
                    message: t('UPDATE'),
                    description: t('UPDATED_PLAN_SUCCESSFULLY'),
                })
                setStatus(FETCH_STATUS.SUCCESS)
                router.push('/plan')
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

    if (!initPlan || initStatus === FETCH_STATUS.LOADING) {
        return <Loader />
    }

    return (
        <div>
            <Form
                onFinish={onFinish}
                form={form}
                layout="vertical"
                initialValues={{
                    ...initPlan,
                }}
            >
                <UpdateTitle
                    pageName={t('UPDATE_PLAN')}
                    saveButton={
                        <SaveUpdatePlanButton
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

export default withAuthAdmin(UpdatePlan)
