import { useTranslations } from 'next-intl'
import { useListShareholder } from '@/stores/shareholder/hook'
import Table, { ColumnsType } from 'antd/es/table'
import { IShareholderList } from '@/stores/shareholder/type'
import { Avatar, Badge, Typography } from 'antd'
import Color from 'color'
import { AvatarBgHexColors } from '@/constants/common'
import { getFirstCharacterUpperCase } from '@/utils/get-first-character'
import { truncateString } from '@/utils/format-string'
import React from 'react'
import { UserStatus } from '@/constants/user-status'
import Link from 'next/link'
const { Text } = Typography

const ShareholderList = () => {
    const t = useTranslations()
    const { shareholderState, getListShareholderAction } = useListShareholder()
    const columns: ColumnsType<IShareholderList> = [
        {
            title: t('NO'),
            dataIndex: 'index',
            width: '5%',
            className: 'text-center',
        },
        {
            title: t('SHAREHOLDER_NAME'),
            dataIndex: 'username',
            render: (_, record) => {
                return (
                    <div className="flex items-center gap-2">
                        {record?.avatar ? (
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
                            className="cursor-pointer"
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
            width: '18%',
        },
        {
            title: t('EMAIL'),
            dataIndex: 'email',
            width: '25',
        },
        {
            title: t('SHARES_QUANTITY'),
            dataIndex: 'shareQuantity',
            width: '17%',
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
                <Link href={`/shareholder/detail/${record.id}`}>
                    {t('SEE_DETAIL')}
                </Link>
            ),
            width: '7%',
        },
    ]
    const handlePageChane = (pageChange: number) => {
        getListShareholderAction({
            page: pageChange,
            limit: shareholderState.limit,
            filter: { ...shareholderState.filter },
        })
    }

    return (
        <div className="bg-white p-6">
            <Table
                columns={columns}
                dataSource={shareholderState.shareholderList}
                rowKey="id"
                pagination={{
                    pageSize: shareholderState.limit,
                    defaultCurrent: shareholderState.page,
                    total: shareholderState.totalShareholderItem,
                    onChange: handlePageChane,
                }}
            />
        </div>
    )
}
export default ShareholderList
