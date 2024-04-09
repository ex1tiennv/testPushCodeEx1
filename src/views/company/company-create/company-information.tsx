/* eslint-disable */
import BoxArea from '@/components/box-area'
import {
    ServicePlan,
    ServicePlanColor,
    ServicePlanName,
} from '@/constants/company'
import {
    CompanyStatus,
    CompanyStatusColor,
    CompanyStatusName,
} from '@/constants/company-status'
import serviceCompanyStatus from '@/services/system-admin/company-status'
import servicePlan from '@/services/plan'
import { Col, DatePicker, Form, FormInstance, Input, Row, Select } from 'antd'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { ICompanyCreateForm } from '.'
import { convertSnakeCaseToTitleCase } from '@/utils/format-string'

const { TextArea } = Input

export interface ICompanyStatus {
    id: number
    status: CompanyStatus
}

export interface IPlan {
    id: number
    planName: string
}

interface IDefaultValues {
    companyStatusId?: number
    planId?: number
}

interface CompanyInfoProp {
    form: FormInstance<ICompanyCreateForm>
}

const CompanyInformation = ({ form }: CompanyInfoProp) => {
    const t = useTranslations()

    const [companyStatusList, setCompanyStatusList] = useState<
        ICompanyStatus[]
    >([])
    const [planList, setPlanList] = useState<IPlan[]>([])

    const [initialDefaultValues, setInitialDefaultValue] =
        useState<IDefaultValues>()

    useEffect(() => {
        const fetchData = async () => {
            const companyStatusList =
                await serviceCompanyStatus.getAllCompanyStatus({
                    page: 1,
                    limit: 10,
                })

            if (companyStatusList) {
                setCompanyStatusList(companyStatusList)
                const companyId = companyStatusList.find(
                    (e) => e.status === CompanyStatus.ACTIVE,
                )?.id
                setInitialDefaultValue((prevInitialDefaultValue) => ({
                    ...prevInitialDefaultValue,
                    companyStatusId: companyId,
                }))
            }

            const planList = await servicePlan.getAllPlan({
                page: 1,
                limit: 10,
            })

            if (planList) {
                setPlanList(planList)
                const planId = planList.find(
                    (item) => item.planName === ServicePlan.TRIAL,
                )?.id
                setInitialDefaultValue((prevInitialDefaultValue) => ({
                    ...prevInitialDefaultValue,
                    planId: planId,
                }))
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        form.setFieldsValue({
            companyStatusId: initialDefaultValues?.companyStatusId,
            planId: initialDefaultValues?.planId,
        })
    }, [initialDefaultValues])

    return (
        <BoxArea title={t('COMPANY_INFORMATION')}>
            <Row gutter={[16, 24]}>
                <Col xs={24} lg={12}>
                    <Form.Item
                        name="companyName"
                        label={t('COMPANY_NAME')}
                        rules={[
                            {
                                required: true,
                                message: t('REQUIRE_COMPANY_NAME'),
                            },
                        ]}
                        className="mb-0"
                    >
                        <Input size="large" />
                    </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                    <Form.Item
                        name="address"
                        label={t('ADDRESS')}
                        rules={[
                            {
                                required: true,
                                message: t('REQUIRE_ADDRESS'),
                            },
                        ]}
                        className="mb-0"
                    >
                        <Input size="large" />
                    </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                    <Form.Item
                        name="companyShortName"
                        label={t('COMPANY_SHORT_NAME')}
                        rules={[{ required: false }]}
                        className="mb-0"
                    >
                        <Input size="large" />
                    </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                    <Form.Item
                        name="companyEmail"
                        label={t('EMAIL')}
                        rules={[
                            { required: true, message: t('REQUIRE_EMAIL') },
                            { type: 'email', message: t('VALID_EMAIL') },
                        ]}
                        className="mb-0"
                    >
                        <Input size="large" />
                    </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                    <Form.Item
                        name="dateOfIncorporation"
                        label={t('DATE_OF_INCORPORATION')}
                        className="mb-0"
                        rules={[{ required: true, message: t('REQUIRE_DATE') }]}
                    >
                        <DatePicker
                            size="large"
                            placeholder={t('SELECT_DATE')}
                            format="YYYY-MM-DD"
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                    <Form.Item
                        name="phone"
                        label={t('PHONE')}
                        rules={[
                            { required: true, message: t('REQUIRE_PHONE') },
                            {
                                pattern: new RegExp(/^[0-9]+$/),
                                message: t('PLEASE_ENTER_ ONLY_NUMBER'),
                            },
                        ]}
                        className="mb-0"
                    >
                        <Input size="large" />
                    </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                    <Form.Item
                        name="taxNumber"
                        label={t('TAX_NUMBER')}
                        rules={[
                            {
                                required: true,
                                message: t('REQUIRE_TAX_NUMBER'),
                            },
                            {
                                pattern: new RegExp(/^\d{10}$/),
                                message: t(
                                    'PLEASE_ENTER_ ONLY_NUMBER_AND_LENGTH_EQUAL_10',
                                ),
                            },
                        ]}
                        className="mb-0"
                    >
                        <Input size="large" />
                    </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                    <Form.Item name="fax" label={t('FAX')} className="mb-0">
                        <Input size="large" />
                    </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                    <Form.Item
                        name="businessType"
                        label={t('BUSINESS_TYPE')}
                        rules={[{ required: false }]}
                        className="mb-0"
                    >
                        <Input size="large" />
                    </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                    <Form.Item
                        name="representativeUser"
                        label={t('REPRESENTATIVE')}
                        rules={[
                            {
                                required: true,
                                message: t('REQUIRE_REPRESENTATIVE'),
                            },
                        ]}
                        className="mb-0"
                    >
                        <Input size="large" />
                    </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                    <Form.Item
                        name="companyStatusId"
                        label={t('STATUS')}
                        rules={[
                            {
                                required: true,
                                message: t('REQUIRE_COMPANY_STATUS'),
                            },
                        ]}
                        className="mb-0"
                    >
                        <Select
                            placeholder={t('SELECT_COMPANY_STATUS')}
                            size="large"
                            style={{ width: '100%' }}
                            options={companyStatusList.map((status) => ({
                                value: status.id,
                                label: (
                                    <span
                                        style={{
                                            color: CompanyStatusColor[
                                                status.status
                                            ],
                                        }}
                                    >
                                        {t(CompanyStatusName[status.status])}
                                    </span>
                                ),
                            }))}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                    <Form.Item
                        name="planId"
                        label={t('SERVICE_PLAN')}
                        rules={[
                            {
                                required: true,
                                message: t('REQUIRE_SERVICE_PLAN'),
                            },
                        ]}
                        className="mb-0"
                    >
                        <Select
                            placeholder={t('SELECT_COMPANY_PLAN')}
                            size="large"
                            style={{ width: '100%' }}
                            options={planList.map((plan) => ({
                                value: plan.id,
                                label: (
                                    <span
                                    // style={{
                                    //     color: ServicePlanColor[
                                    //         plan.planName as ServicePlan
                                    //     ],
                                    // }}
                                    >
                                        {/* {t(
                                            ServicePlanName[
                                                plan.planName as ServicePlan
                                            ],
                                        )} */}
                                        {convertSnakeCaseToTitleCase(
                                            plan.planName,
                                        )}
                                    </span>
                                ),
                            }))}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} lg={24}>
                    <Form.Item
                        name="description"
                        label={t('DESCRIPTION')}
                        rules={[
                            {
                                max: 5000,
                                message: t(
                                    'DESCRIPTION_MUST_BE_UP_TO_{max}_CHARACTERS',
                                    {
                                        max: 5000,
                                    },
                                ),
                            },
                        ]}
                        className="mb-0"
                    >
                        <TextArea size="large" />
                    </Form.Item>
                </Col>
            </Row>
        </BoxArea>
    )
}

export default CompanyInformation
