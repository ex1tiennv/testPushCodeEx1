import { IAccountList } from '@/stores/account/type'
import { useTranslations } from 'next-intl'
import Table, { ColumnsType } from 'antd/es/table'
import { Avatar, Badge, Tag, Tooltip, Typography } from 'antd'
import { useListAccount } from '@/stores/account/hook'
import { UserStatus } from '@/constants/user-status'
import {
    convertSnakeCaseToTitleCase,
    truncateString,
} from '@/utils/format-string'
import Color from 'color'
import { getFirstCharacterUpperCase } from '@/utils/get-first-character'
import { AvatarBgHexColors, MAX_DISPLAY_ROLES } from '@/constants/common'
import RoleInfo from '@/components/role-info'
import React from 'react'
import { EditTwoTone, EyeTwoTone } from '@ant-design/icons'
import { useRouter } from 'next/navigation'

const { Text } = Typography

const AccountList = () => {
    const t = useTranslations()
    const router = useRouter()
    const { accountState, getListAccountAction } = useListAccount()

    const columns: ColumnsType<IAccountList> = [
        {
            title: t('NO'),
            dataIndex: 'index',
            width: '5%',
            className: 'text-center',
        },
        {
            title: t('USER_NAME'),
            dataIndex: 'username',
            render: (_, record) => {
                return (
                    <div className="flex items-center gap-2">
                        {record.avatar ? (
                            <Avatar
                                src={record.avatar}
                                alt="avatar-alt"
                                size="small"
                                style={{
                                    verticalAlign: 'middle',
                                }}
                            />
                        ) : (
                            <Avatar
                                style={{
                                    backgroundColor: Color(
                                        record?.defaultAvatarHashColor ||
                                            AvatarBgHexColors.GOLDEN_PURPLE,
                                    )
                                        .lighten(0.6)
                                        .hex(),
                                    verticalAlign: 'middle',
                                    color: AvatarBgHexColors.GOLDEN_PURPLE,
                                }}
                                size="small"
                            >
                                {getFirstCharacterUpperCase(record?.username)}
                            </Avatar>
                        )}
                        <Text
                            title={record.username}
                            // className="cursor-pointer"
                        >
                            {record.username}
                        </Text>
                    </div>
                )
            },
            width: '17%',
        },
        {
            title: t('WALLET_ADDRESS'),
            dataIndex: 'walletAddress',
            render: (_, record) => {
                return (
                    <>
                        {truncateString({
                            text: record.walletAddress,
                            start: 5,
                            end: 3,
                        })}
                    </>
                )
            },
            width: '17%',
        },
        {
            title: t('EMAIL'),
            dataIndex: 'email',
            width: '21',
        },
        {
            title: t('ROLES'),
            dataIndex: 'roles',
            render: (_, record) => {
                const roles = record.role.split(',')
                const displayRoleNames = roles.slice(0, MAX_DISPLAY_ROLES)
                const additionalRoleNames = roles.slice(MAX_DISPLAY_ROLES)
                return (
                    <div className="flex space-x-1">
                        {displayRoleNames.map((item) => {
                            return (
                                <RoleInfo
                                    key={item}
                                    roleName={convertSnakeCaseToTitleCase(item)}
                                />
                            )
                        })}
                        {additionalRoleNames.length > 0 && (
                            <Tooltip
                                color="white"
                                placement="topRight"
                                title={
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            backgroundColor: 'white',
                                        }}
                                        className="space-y-1"
                                    >
                                        {additionalRoleNames.map((item) => (
                                            <RoleInfo
                                                key={item}
                                                roleName={item}
                                            />
                                        ))}
                                    </div>
                                }
                            >
                                <Tag
                                    className="rounded"
                                    style={{
                                        marginLeft: '1px',
                                        backgroundColor: 'black',
                                        color: 'white',
                                        fontWeight: 500,
                                    }}
                                >
                                    +{additionalRoleNames.length}
                                </Tag>
                            </Tooltip>
                        )}
                    </div>
                )
            },
            width: '22%',
        },

        {
            title: t('STATUS'),
            dataIndex: 'status',
            render: (_, record) => {
                return (
                    <>
                        {record.status && record.status == UserStatus.ACTIVE ? (
                            <Badge status="success" text={t('ACTIVE')} />
                        ) : (
                            <Badge status="error" text={t('INACTIVE')} />
                        )}{' '}
                    </>
                )
            },
            width: '11%',
        },
        {
            title: '',
            key: 'action',
            render: (_, record) => (
                <div className="flex gap-3">
                    <EditTwoTone
                        style={{ fontSize: '18px' }}
                        twoToneColor="#5151e5"
                        onClick={() => {
                            router.push(`/account/update/${record.id}`)
                        }}
                    />
                    <EyeTwoTone
                        style={{ fontSize: '18px' }}
                        twoToneColor="#5151e5"
                        onClick={() => {
                            router.push(`/account/detail/${record.id}`)
                        }}
                    />
                </div>
            ),
            width: '7%',
        },
    ]
    const handlePageChange = (pageChange: number) => {
        getListAccountAction({
            page: pageChange,
            limit: accountState.limit,
            filter: { ...accountState.filter },
        })
    }
    return (
        <div className="bg-white p-6">
            <Table
                columns={columns}
                dataSource={accountState.accountList}
                rowKey="id"
                pagination={{
                    pageSize: accountState.limit,
                    defaultCurrent: accountState.page,
                    total: accountState.totalAccountItem,
                    onChange: handlePageChange,
                }}
            />
        </div>
    )
}

export default AccountList
