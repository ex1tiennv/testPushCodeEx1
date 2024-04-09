import serviceSettingRole from '@/services/setting-role'
import { useSettingRole } from '@/stores/setting-role/hooks'
import { convertSnakeCaseToTitleCase } from '@/utils/format-string'
import { Button, Form, Input, Modal, Select, notification } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { AxiosError } from 'axios'
import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useState } from 'react'

interface TypeSelect {
    value: number
    label: string
}

export interface IRoleForm {
    roleName: string
    description: string
    permissions: number[]
}

const ModalRegisterRole = () => {
    const t = useTranslations()
    const [form] = useForm<IRoleForm>()
    const { settingRoleState, setOpenModal, getAllCombineRoleWithPermission } =
        useSettingRole()
    const [selectedItems, setSelectedItems] = useState<TypeSelect[]>([])
    const [permissions, setPermissions] = useState<TypeSelect[]>([])

    const filteredOptions = useMemo(
        () => permissions.filter((o) => !selectedItems.includes(o)),
        [selectedItems, permissions],
    )

    useEffect(() => {
        // eslint-disable-next-line
        ;(async () => {
            try {
                const result = await serviceSettingRole.getAllNormalPermissions(
                    1,
                    100,
                )
                const data = result.map((item) => ({
                    value: item.id,
                    label: convertSnakeCaseToTitleCase(item.key),
                }))
                setPermissions(data)
            } catch (error) {
                if (error instanceof AxiosError) {
                    notification.error({
                        message: t('ERROR'),
                        description: error.response?.data.info.message,
                    })
                }
            }
        })()
        // eslint-disable-next-line
    }, [])

    const handleOk = () => {}

    const handleCancel = () => {
        form.resetFields()
        setOpenModal(false)
    }

    const onFinish = async (values: IRoleForm) => {
        try {
            const res = await serviceSettingRole.createRole({
                roleName: values.roleName,
                description: values.description,
                idPermissions: values.permissions,
            })
            if (res) {
                notification.success({
                    message: t('CREATED'),
                    description: t('CREATE_NEW_ROLE'),
                })
                form.resetFields()
                setOpenModal(false)
                getAllCombineRoleWithPermission()
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                notification.error({
                    message: t('ERROR'),
                    description: error.response?.data.info.message,
                })
            }
        }
    }
    return (
        <Modal
            title={t('TITLE_CREATE_ROLE')}
            open={settingRoleState.openModalRegisterRole}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
            maskClosable={false}
            centered
        >
            <div className="mb-6">
                <Form layout="vertical" form={form} onFinish={onFinish}>
                    <Form.Item
                        name="roleName"
                        label={t('ROLE_NAME')}
                        rules={[
                            {
                                required: true,
                                message: t('PLEASE_INPUT_YOUR_ROLE_NAME'),
                            },
                        ]}
                    >
                        <Input size="large" placeholder={t('ROLE_NAME')} />
                    </Form.Item>
                    <Form.Item name="description" label={t('DESCRIPTION')}>
                        <Input size="large" placeholder={t('DESCRIPTION')} />
                    </Form.Item>

                    <Form.Item
                        name="permissions"
                        label={t('SELECT_PERMISSION')}
                        rules={[
                            {
                                required: true,
                                message: t('PLEASE_INPUT_YOUR_PERMISSIONS'),
                            },
                        ]}
                    >
                        <Select
                            mode="multiple"
                            placeholder={t('PERMISSIONS')}
                            value={selectedItems}
                            onChange={setSelectedItems}
                            style={{ width: '100%' }}
                            showSearch
                            optionFilterProp="label"
                            size="large"
                            options={filteredOptions.map((item) => ({
                                value: item.value,
                                label: item.label,
                            }))}
                        />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{ span: 24 }}
                        className="mt-10 flex justify-center"
                    >
                        <Button
                            size="large"
                            className="bg-#5151E5 rounded text-center text-sm font-semibold shadow-sm transition duration-200 hover:border-white hover:bg-[#e9eaeb] hover:text-black"
                            style={{ marginRight: '30px' }}
                            onClick={handleCancel}
                        >
                            {t('CANCEL')}
                        </Button>
                        <Button
                            size="large"
                            type="primary"
                            htmlType="submit"
                            className="bg-#5151E5 rounded text-center text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-600 "
                        >
                            {t('SUBMIT')}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    )
}

export default ModalRegisterRole
