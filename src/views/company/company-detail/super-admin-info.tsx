import { Avatar, Col, Row } from 'antd'
import { useTranslations } from 'next-intl'
import Color from 'color'

import BoxArea from '@/components/box-area'
import { useCompanyDetail } from '@/stores/company/hooks'
import { truncateString } from '@/utils/format-string'
import { IRowInfo, RowInfo } from './row-info'
import { AvatarBgHexColors } from '@/constants/common'
import { getFirstCharacterUpperCase } from '@/utils/get-first-character'
import { UserStatus } from '@/constants/user-status'

const backgroundAvatarColor = Color(AvatarBgHexColors.GOLDEN_PURPLE)
    .lighten(0.6)
    .hex()

const SuperAdminInfo = () => {
    const t = useTranslations()
    const [{ company }] = useCompanyDetail()

    const dataSuperAdminInfo: IRowInfo[] = [
        {
            label: 'USERNAME',
            content: company?.superAdminInfo?.username && (
                <div
                    className={`mt-[-3px] flex flex-wrap content-start items-center gap-[4px]`}
                >
                    <Avatar
                        style={{
                            backgroundColor: backgroundAvatarColor,
                            verticalAlign: 'middle',
                            color: AvatarBgHexColors.GOLDEN_PURPLE,
                        }}
                        size="small"
                    >
                        {getFirstCharacterUpperCase(
                            company?.superAdminInfo?.username,
                        )}
                    </Avatar>
                    <span>{company?.superAdminInfo?.username}</span>
                </div>
            ),
        },
        {
            label: 'WALLET_ADDRESS',
            content: company?.superAdminInfo?.walletAddress && (
                <p className="max-w-[415px] truncate hover:text-clip">
                    {truncateString({
                        text: String(company?.superAdminInfo?.walletAddress),
                        start: 5,
                        end: 3,
                    })}
                </p>
            ),
        },
        {
            label: 'STATUS',
            content: (
                <div className="ml-[2px] flex flex-wrap content-start items-center gap-1 text-sm text-black/[85%]">
                    <div
                        className={`h-[6px] w-[6px] rounded-full  ${
                            company?.superAdminInfo?.userStatus?.status ==
                            UserStatus.ACTIVE
                                ? 'bg-green-300'
                                : company?.superAdminInfo?.userStatus?.status ==
                                  UserStatus.INACTIVE
                                ? 'bg-red-500'
                                : null
                        } `}
                    ></div>
                    <p>
                        {company?.superAdminInfo?.userStatus?.status ==
                        UserStatus.ACTIVE
                            ? t('ACTIVE')
                            : company?.superAdminInfo?.userStatus?.status ==
                              UserStatus.INACTIVE
                            ? t('INACTIVE')
                            : null}
                    </p>
                </div>
            ),
        },
        {
            label: 'EMAIL',
            content: (
                <p className="max-w-[415px] truncate hover:text-clip">
                    {company?.superAdminInfo?.email}
                </p>
            ),
        },
    ]

    return (
        <div>
            <BoxArea title={t('SUPER_ADMIN_INFORMATION')}>
                <Row gutter={[16, 0]} className="min-w-[1184px]">
                    {dataSuperAdminInfo.map((item) => {
                        return (
                            <Col xs={24} lg={12} key={item.label}>
                                <RowInfo
                                    label={t(item.label)}
                                    content={item.content}
                                />
                            </Col>
                        )
                    })}
                </Row>
            </BoxArea>
        </div>
    )
}

export default SuperAdminInfo
