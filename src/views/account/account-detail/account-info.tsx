import { useAccountDetail } from '@/stores/account/hook'
import { useTranslations } from 'next-intl'
import { IRowAccountInfo, RowAccountInfo } from './account-rowinfo'
import { Avatar, Col, Row } from 'antd'
import {
    UserStatus,
    UserStatusColor,
    UserStatusName,
} from '@/constants/user-status'
import Color from 'color'
import { AvatarBgHexColors } from '@/constants/common'
import { getFirstCharacterUpperCase } from '@/utils/get-first-character'
import RoleInfo from '@/components/role-info'
import { convertSnakeCaseToTitleCase } from '@/utils/format-string'

const AccountInfo = () => {
    const t = useTranslations()
    const [{ account }] = useAccountDetail()

    const backgroundAvatarColor = Color(
        account?.defaultAvatarHashColor || AvatarBgHexColors.GOLDEN_PURPLE,
    )
        .lighten(0.6)
        .hex()

    const dataAccountDetailLeft: IRowAccountInfo[] = [
        {
            label: 'COMPANY',
            content: (
                <p className="truncate hover:text-clip">
                    {account?.companyName || ''}
                </p>
            ),
            lg: 6,
        },
        {
            label: 'PHONE',
            content: (
                <p className="truncate hover:text-clip">
                    {account?.phone || ''}
                </p>
            ),
            lg: 6,
        },
        {
            label: 'ROLE',
            content: (
                <div className="mt-[-2px] flex gap-1 truncate hover:text-clip">
                    {account?.roles.map((item) => (
                        <RoleInfo
                            key={item.id}
                            roleName={convertSnakeCaseToTitleCase(
                                item.roleName,
                            )}
                        />
                    ))}
                </div>
            ),
            lg: 6,
        },
        {
            label: 'WALLET_ADDRESS',
            content: (
                <p className="max-w-[415px] truncate hover:text-clip">
                    {account?.walletAddress || ''}
                </p>
            ),
            lg: 6,
        },
    ]

    const dataAccountDetailRight: IRowAccountInfo[] = [
        {
            label: 'USERNAME',
            content: account?.userName && (
                <div
                    className={`mt-[-1px] flex flex-wrap content-start items-center gap-[4px]`}
                >
                    {account?.avatar ? (
                        <Avatar
                            src={account.avatar}
                            alt="avatar-alt"
                            size="small"
                            style={{
                                verticalAlign: 'middle',
                            }}
                        />
                    ) : (
                        <Avatar
                            style={{
                                backgroundColor: backgroundAvatarColor,
                                verticalAlign: 'middle',
                                color:
                                    account?.defaultAvatarHashColor ||
                                    AvatarBgHexColors.GOLDEN_PURPLE,
                            }}
                            size="small"
                        >
                            {getFirstCharacterUpperCase(account.userName)}
                        </Avatar>
                    )}
                    <span>{account.userName}</span>
                </div>
            ),
            lg: 3,
        },

        {
            label: 'EMAIL',
            content: (
                <p className="max-w-[415px] truncate hover:text-clip">
                    {account?.email || ''}
                </p>
            ),
            lg: 3,
        },
        {
            label: 'STATUS',
            content: (
                <div className="ml-[2px] flex flex-wrap content-start items-center gap-1 text-sm text-black/[85%]">
                    {account?.userStatus && (
                        <>
                            <div
                                className={`h-[6px] w-[6px] rounded-full  ${
                                    account?.userStatus == UserStatus.ACTIVE
                                        ? 'bg-green-500'
                                        : account?.userStatus ==
                                          UserStatus.INACTIVE
                                        ? 'bg-red-500'
                                        : null
                                } `}
                            ></div>
                            <span
                                style={{
                                    color: UserStatusColor[account?.userStatus],
                                }}
                            >
                                {t(UserStatusName[account?.userStatus])}
                            </span>
                        </>
                    )}
                </div>
            ),
            lg: 3,
        },
        {
            label: 'QUANTITY',
            content: (
                <p className="max-w-[415px] truncate hover:text-clip">
                    {account?.shareQuantity || ''}
                </p>
            ),
            lg: 3,
        },
    ]

    return (
        <div className="bg-white p-6 px-6 py-4 shadow-01">
            <Row gutter={[0, 0]} className="min-w-[1184px]">
                <Col xs={24} lg={12}>
                    {dataAccountDetailLeft.map((item, index) => {
                        return (
                            <Col xs={24} key={index}>
                                <RowAccountInfo
                                    label={t(item.label)}
                                    content={item.content}
                                    xs={item?.xs}
                                    lg={item?.lg}
                                />
                            </Col>
                        )
                    })}
                </Col>
                <Col xs={24} lg={12}>
                    {dataAccountDetailRight.map((item, index) => {
                        return (
                            <Col xs={24} key={index}>
                                <RowAccountInfo
                                    label={t(item.label)}
                                    content={item.content}
                                    xs={item?.xs}
                                    lg={item?.lg}
                                />
                            </Col>
                        )
                    })}
                </Col>
            </Row>
        </div>
    )
}

export default AccountInfo
