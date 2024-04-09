/* eslint-disable */
import BoxArea from '@/components/box-area'
import {
    UserStatus,
    UserStatusColor,
    UserStatusName,
} from '@/constants/user-status'
import serviceUserStatus from '@/services/user-status'
import { Col, Form, Input, Row, Select } from 'antd'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

export interface IUserStatus {
    id: number
    status: UserStatus
}

const SuperAdminInformation = () => {
    const t = useTranslations()

    const [userStatusList, setUserStatusList] = useState<IUserStatus[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const userStatusList =
                await serviceUserStatus.getAllUserStatusSysAdmin({
                    page: 1,
                    limit: 10,
                })

            if (userStatusList) {
                setUserStatusList(userStatusList)
            }
        }

        fetchData()
    }, [])

    return (
        <BoxArea title={t('SUPER_ADMIN_INFORMATION')}>
            <Row gutter={[16, 24]}>
                <Col xs={24} lg={12}>
                    <Form.Item
                        name="username"
                        label={t('USERNAME')}
                        rules={[
                            { required: true, message: t('REQUIRE_USER_NAME') },
                        ]}
                        className="mb-0"
                    >
                        <Input size="large" />
                    </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                    <Form.Item
                        name="walletAddress"
                        label={t('WALLET_ADDRESS')}
                        rules={[{ required: false }]}
                    >
                        <Input size="large" />
                    </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                    <Form.Item
                        name="superAdminStatusId"
                        label={t('STATUS')}
                        rules={[
                            {
                                required: true,
                                message: t('REQUIRE_USER_STATUS'),
                            },
                        ]}
                        className="mb-0"
                    >
                        <Select
                            placeholder={t('SELECT_SUPER_ADMIN_STATUS')}
                            size="large"
                            style={{ width: '100%' }}
                            options={userStatusList.map((status) => ({
                                value: status.id,
                                label: (
                                    <span
                                        style={{
                                            color: UserStatusColor[
                                                status.status
                                            ],
                                        }}
                                    >
                                        {t(UserStatusName[status.status])}
                                    </span>
                                ),
                            }))}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                    <Form.Item
                        name="superAdminEmail"
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
            </Row>
        </BoxArea>
    )
}

export default SuperAdminInformation
