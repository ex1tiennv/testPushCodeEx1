/* eslint-disable */
import withAuth from '@/components/component-auth'
import ListTitle from '@/components/content-page-title/list-title'
import { FETCH_STATUS } from '@/constants/common'
import { Permissions } from '@/constants/permission'
import { IUpdatePermissionRole } from '@/services/request.type'
import serviceSettingRole from '@/services/setting-role'
import { useSettingRole } from '@/stores/setting-role/hooks'
import { convertSnakeCaseToTitleCase } from '@/utils/format-string'
import { EditOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons'
import { Button, notification } from 'antd'
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox/Checkbox'
import Table, { ColumnsType } from 'antd/es/table'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import ModalRegisterRole from './modal-register-role'
import { AxiosError } from 'axios'
import { RoleName } from '@/constants/role'
interface DataType {
    namePermission: string
    [key: string]: any
}

// eslint-disable-next-line
type PermissionChecked = {
    permissionId: number
    changeStatePermissionForRole: RoleChecked[]
}

type RoleChecked = {
    roleId: number
    state: number
}

const SettingRoleView = () => {
    const t = useTranslations()
    const {
        settingRoleState,
        getAllCombineRoleWithPermission,
        setOpenModal,
        setFilterAction,
    } = useSettingRole()
    const [clickButtonEdit, setClickButtonEdit] = useState<boolean>(false)
    const [checkboxState, setCheckboxState] = useState<any>({})
    const [dataInitial, setDataInitial] = useState<any>({})
    const [widthRoleColumn, setWidthRoleColumn] = useState<string>('20%')
    const [isLoading, setIsLoading] = useState<FETCH_STATUS>(FETCH_STATUS.IDLE)
    const [data, setData] = useState<any>(null)
    const [columns, setColumns] = useState<any>(null)
    const [permissions, setPermissions] = useState<
        { id: number; key: string }[]
    >([])
    const [roles, setRoles] = useState<{ id: number; key: string }[] | null>(
        null,
    )
    const [dataChecked, setDataCheked] = useState<IUpdatePermissionRole[]>([])

    useEffect(() => {
        getAllCombineRoleWithPermission({
            searchQuery: settingRoleState.filter.searchQuery,
        })
    }, [])

    useEffect(() => {
        if (
            settingRoleState.permissionRoleList &&
            Object.keys(settingRoleState.permissionRoleList).length > 0
        ) {
            const initialCheckboxState: any = {}
            Object.entries(settingRoleState.permissionRoleList).forEach(
                ([item, permissionData]) => {
                    initialCheckboxState[item] = {}

                    Object.entries(permissionData).forEach(([key, value]) => {
                        // @ts-ignore
                        initialCheckboxState[item][key] = value === 1
                    })
                },
            )
            setCheckboxState(initialCheckboxState)
            setDataInitial(initialCheckboxState)

            const totalRoleColumn = Object.keys(
                Object.values(settingRoleState.permissionRoleList)[0],
            ).length
            const widthRolesColumn = 80 // default 80%
            setWidthRoleColumn(
                `${(widthRolesColumn / totalRoleColumn).toFixed(2)}%`,
            )
            setIsLoading(FETCH_STATUS.SUCCESS)
        } else {
            setCheckboxState({})
            setDataInitial({})
            setColumns(null)
            setData([])
            setIsLoading(FETCH_STATUS.SUCCESS)
        }
    }, [settingRoleState.permissionRoleList])

    useEffect(() => {
        if (
            settingRoleState.permissionRoleList &&
            Object.keys(settingRoleState.permissionRoleList).length > 0
        ) {
            let filter = settingRoleState.filter.searchQuery || ''
            const result = Object.entries(settingRoleState.permissionRoleList)
                .map(([namePermission, values]) => ({
                    namePermission,
                    ...values,
                }))
                .filter((item) => item.namePermission.includes(filter))

            const columnData = Object.keys(
                Object.values(settingRoleState.permissionRoleList)[0],
            ).map((item) => ({
                title: convertSnakeCaseToTitleCase(item),
                dataIndex: item,
                // eslint-disable-next-line
                render: (values: any, record: any): JSX.Element => (
                    <Checkbox
                        style={{
                            pointerEvents: !clickButtonEdit ? 'none' : 'auto',
                        }}
                        disabled={item === RoleName.SUPER_ADMIN}
                        checked={checkboxState[record.namePermission]?.[item]}
                        onChange={(e) =>
                            onChange(record.namePermission, item, e)
                        }
                    />
                ),
                width: widthRoleColumn,
            }))

            const columns: ColumnsType<DataType> = [
                {
                    title: '',
                    dataIndex: 'namePermission',
                    render: (text: string) => (
                        <>{convertSnakeCaseToTitleCase(text)} </>
                    ),
                },
                ...columnData,
            ]

            setColumns(columns)

            const data: DataType[] = [...result]
            setData(data)
        }
        // eslint-disable-next-line
    }, [checkboxState, clickButtonEdit, permissions])

    useEffect(() => {
        // eslint-disable-next-line
        ;(async () => {
            try {
                const permissionResponse =
                    await serviceSettingRole.getAllNormalPermissions(
                        1,
                        100,
                        settingRoleState.filter.searchQuery,
                    )
                const permissionList = permissionResponse.map((item) => ({
                    id: item.id,
                    key: item.key,
                }))
                setPermissions(permissionList)

                const roleResponse = await serviceSettingRole.getAllRoles(
                    1,
                    100,
                )
                const roleList = roleResponse.map((item) => ({
                    id: item.id,
                    key: item.roleName,
                }))
                setRoles(roleList)
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
    }, [settingRoleState.filter])

    const handleInputChange = (value: string) => {
        setFilterAction({ searchQuery: value })
    }

    const onChange = (
        namePermission: string,
        key: string,
        e: CheckboxChangeEvent,
    ) => {
        // Check if the value has changed
        const checkValueChange =
            dataInitial[namePermission]?.[key] !== e.target.checked

        // Find the permission ID based on the namePermission
        const idPermission = permissions?.find(
            (item) => item.key === namePermission,
        )?.id

        // Find the role ID based on the key
        const idRole = roles?.find((item) => item.key === key)?.id

        // Check the case where the data is different from the initial
        if (idPermission && idRole) {
            if (checkValueChange) {
                // Check if there is an object with the corresponding permissionId
                const existingDataIndex = dataChecked.findIndex(
                    (item) => item.permissionId === idPermission,
                )

                if (existingDataIndex !== -1) {
                    // If it exists, check if idRole has been added to roleId
                    const existingRoleIndex = dataChecked[
                        existingDataIndex
                    ].changeStatePermissionForRole.findIndex(
                        (role) => role.roleId === idRole,
                    )

                    if (existingRoleIndex !== -1) {
                        // If it exists, update the value of roleId
                        const newDataChecked = [...dataChecked]
                        newDataChecked[
                            existingDataIndex
                        ].changeStatePermissionForRole[existingRoleIndex] = {
                            roleId: idRole,
                            state: e.target.checked ? 1 : 0,
                        }
                        setDataCheked(newDataChecked)
                    } else {
                        // If it doesn't exist, add a new one to roleId
                        const newDataChecked = [...dataChecked]
                        newDataChecked[
                            existingDataIndex
                        ].changeStatePermissionForRole.push({
                            roleId: idRole,
                            state: e.target.checked ? 1 : 0,
                        })
                        setDataCheked(newDataChecked)
                    }
                } else {
                    // If there is no data with the corresponding permissionId, create a new one and add it to the state
                    const newDataChecked = [
                        ...dataChecked,
                        {
                            permissionId: idPermission,
                            changeStatePermissionForRole: [
                                {
                                    roleId: idRole,
                                    state: e.target.checked ? 1 : 0,
                                },
                            ],
                        },
                    ]
                    setDataCheked(newDataChecked)
                }
            } else {
                // If the data is being selected again twice, remove it
                const newDataChecked = [...dataChecked]
                const existingDataIndex = newDataChecked.findIndex(
                    (item) => item.permissionId === idPermission,
                )

                if (existingDataIndex !== -1) {
                    // If there is an object with the corresponding permissionId
                    newDataChecked[
                        existingDataIndex
                    ].changeStatePermissionForRole = newDataChecked[
                        existingDataIndex
                    ].changeStatePermissionForRole.filter(
                        (role) => role.roleId !== idRole,
                    )

                    // Check if, after removing roleId, if the roleId array becomes empty, remove the entire object
                    if (
                        newDataChecked[existingDataIndex]
                            .changeStatePermissionForRole.length === 0
                    ) {
                        newDataChecked.splice(existingDataIndex, 1)
                    }

                    setDataCheked(newDataChecked)
                }
            }
        }

        // Update the checkbox state
        const updatedCheckboxState = { ...checkboxState }

        updatedCheckboxState[namePermission] = {
            ...updatedCheckboxState[namePermission],
            [key]: !updatedCheckboxState[namePermission]?.[key],
        }

        setCheckboxState(updatedCheckboxState)
    }

    const handleEditRolePerrmisson = () => {
        // eslint-disable-next-line
        ;(async () => {
            try {
                const response = await serviceSettingRole.updateRolePermissions(
                    dataChecked,
                )
                if (response) {
                    notification.success({
                        message: t('UPDATED_PERMISSION'),
                        description: t('CHANGE_RESULT_PERMISSION_SUCCESSFULLY'),
                    })
                    setClickButtonEdit(!clickButtonEdit)
                    setDataCheked([])
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
        })()
    }

    return (
        <div>
            <ListTitle
                pageName={t('SETTING_ROLES')}
                addButton={
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        size="large"
                        onClick={() => setOpenModal(true)}
                    >
                        {t('ADD_NEW')}
                    </Button>
                }
                editButton={
                    <>
                        {!clickButtonEdit ? (
                            <Button
                                type={'primary'}
                                icon={<EditOutlined />}
                                size="large"
                                onClick={() =>
                                    setClickButtonEdit(!clickButtonEdit)
                                }
                            >
                                {t('EDIT')}
                            </Button>
                        ) : (
                            <Button
                                type={'default'}
                                icon={<SaveOutlined />}
                                size="large"
                                onClick={() => handleEditRolePerrmisson()}
                            >
                                {t('SAVE')}
                            </Button>
                        )}
                    </>
                }
                onChangeInput={handleInputChange}
            />
            <div className="p-6">
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey={(record) => record.namePermission}
                    loading={isLoading != FETCH_STATUS.SUCCESS}
                    // pagination={false}
                />
            </div>
            <ModalRegisterRole />
        </div>
    )
}

export default withAuth(
    SettingRoleView,
    Permissions.SETTING_PERMISSION_FOR_ROLES,
)
