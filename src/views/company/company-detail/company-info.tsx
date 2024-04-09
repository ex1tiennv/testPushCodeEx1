import { Avatar, Col, Row } from 'antd'
import { useTranslations } from 'next-intl'
import Color from 'color'

import BoxArea from '@/components/box-area'
import { useCompanyDetail } from '@/stores/company/hooks'
import { IRowInfo, RowInfo } from './row-info'
import { AvatarBgHexColors } from '@/constants/common'
import { getFirstCharacterUpperCase } from '@/utils/get-first-character'
import { CompanyStatus } from '@/constants/company-status'
import { convertSnakeCaseToTitleCase } from '@/utils/format-string'

const backgroundAvatarColor = Color(AvatarBgHexColors.GOLDEN_PURPLE)
    .lighten(0.6)
    .hex()

const CompanyInfo = () => {
    const t = useTranslations()
    const [{ company }] = useCompanyDetail()
    const dataCompanyInfoLeft: IRowInfo[] = [
        {
            label: 'COMPANY_NAME',
            content: (
                <p className="max-w-[415px] truncate hover:text-clip">
                    {company?.companyName}
                </p>
            ),
        },
        {
            label: 'COMPANY_INFORMATION',
            content: (
                <p className="max-w-[415px] truncate hover:text-clip">
                    {company?.description}
                </p>
            ),
        },

        {
            label: 'DATE_OF_INCORPORATION',
            content: (
                <p className="max-w-[415px] truncate hover:text-clip">
                    {company?.dateOfCorporation}
                </p>
            ),
        },
        {
            label: 'BUSINESS_TYPE',
            content: (
                <p className="max-w-[415px] truncate hover:text-clip">
                    {company?.businessType}
                </p>
            ),
        },
        {
            label: 'FAX',
            content: (
                <p className="max-w-[415px] truncate hover:text-clip">
                    {company?.fax}
                </p>
            ),
        },
        {
            label: 'REPRESENTATIVE',
            content: (
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
                        {company?.representativeUser &&
                            getFirstCharacterUpperCase(
                                company?.representativeUser,
                            )}
                    </Avatar>
                    <p>{company?.representativeUser}</p>
                </div>
            ),
        },
    ]
    const dataCompanyInfoRight: IRowInfo[] = [
        {
            label: 'ADDRESS',
            content: (
                <p className="max-w-[415px] truncate hover:text-clip">
                    {company?.address}
                </p>
            ),
        },
        {
            label: 'EMAIL',
            content: (
                <p className="max-w-[415px] truncate hover:text-clip">
                    {company?.email}
                </p>
            ),
        },
        {
            label: 'PHONE',
            content: (
                <p className="max-w-[415px] truncate hover:text-clip">
                    {company?.phone}
                </p>
            ),
        },
        {
            label: 'TAX_OF_COMPANY',
            content: (
                <p className="max-w-[415px] truncate hover:text-clip">
                    {company?.taxCompany}
                </p>
            ),
        },
        {
            label: 'STATUS',
            content: (
                <div className="ml-[2px] flex flex-wrap content-start items-center gap-1 text-sm text-black/[85%]">
                    <div
                        className={`h-[6px] w-[6px] rounded-full  ${
                            company?.status.status == CompanyStatus.ACTIVE
                                ? ' bg-green-300'
                                : company?.status.status ==
                                  CompanyStatus.INACTIVE
                                ? ' bg-red-500'
                                : null
                        } `}
                    ></div>
                    <p>
                        {company?.status.status == CompanyStatus.ACTIVE
                            ? t('ACTIVE')
                            : company?.status.status == CompanyStatus.INACTIVE
                            ? t('INACTIVE')
                            : null}
                    </p>
                </div>
            ),
        },
        {
            label: 'SERVICE_PLAN',
            content: (
                // company?.servicePlan.planName == ServicePlan.TRIAL ? (
                //     <p className="text-o text-sm text-orange-500">
                //         {t('TRIAL')}
                //     </p>
                // ) : company?.servicePlan.planName == ServicePlan.FREE ? (
                //     <div className="flex flex-col items-start">
                //         <div className="h-[30px] text-sm">
                //             <span className="mr-1 text-black/[85%]">
                //                 {t('FREE')}
                //             </span>
                //             <span className="text-orange-500">
                //                 ({t('TRIAL_HAS_EXPIRED')})
                //             </span>
                //         </div>
                //         <Button className="h-[32px] border-[1px] border-primary bg-primary px-4 py-1 text-neutral/2 shadow-02 hover:cursor-pointer">
                //             {t('UPGRADE_PLAN')}
                //         </Button>
                //     </div>
                // ) : company?.servicePlan.planName ==
                //   ServicePlan.PAY_OF_MONTH ? (
                //     <p className="text-sm text-polar-green">
                //         {t('PAY_OF_MONTH')}
                //     </p>
                // ) : null,
                <p className="max-w-[415px] truncate hover:text-clip">
                    {convertSnakeCaseToTitleCase(
                        company?.servicePlan.planName || '',
                    )}
                </p>
            ),
        },
    ]

    return (
        <div>
            <BoxArea title={t('COMPANY_INFORMATION')}>
                <Row gutter={[0, 0]} className="min-w-[1184px]">
                    <Col xs={24} lg={12}>
                        {dataCompanyInfoLeft.map((item) => {
                            return (
                                <Col xs={24} key={item.label}>
                                    <RowInfo
                                        label={t(item.label)}
                                        content={item.content}
                                    />
                                </Col>
                            )
                        })}
                    </Col>
                    <Col xs={24} lg={12}>
                        {dataCompanyInfoRight.map((item) => {
                            return (
                                <Col xs={24} key={item.label}>
                                    <RowInfo
                                        label={t(item.label)}
                                        content={item.content}
                                    />
                                </Col>
                            )
                        })}
                    </Col>
                </Row>
            </BoxArea>
        </div>
    )
}

export default CompanyInfo
