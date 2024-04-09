import withAuthAdmin from '@/components/component-auth-admin'
import DetailTitle from '@/components/content-page-title/detail-title'
import Loader from '@/components/loader'
import { useCompanyDetail } from '@/stores/company/hooks'
import { EActionStatus } from '@/stores/type'
import { EditOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useTranslations } from 'next-intl'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import CompanyInfo from './company-info'
import SuperAdminInfo from './super-admin-info'

const CompanyDetail = () => {
    const router = useRouter()
    const params = useParams()
    const companyId = +params.id
    const [{ company, status }, fetchCompanyDetail] = useCompanyDetail()
    const t = useTranslations()

    useEffect(() => {
        if (companyId) {
            fetchCompanyDetail(companyId)
        }
    }, [companyId, fetchCompanyDetail])

    if (!company || status === EActionStatus.Pending) {
        return <Loader />
    }

    return (
        <div>
            <DetailTitle
                urlBack="/company"
                pageName={t('DETAIL_COMPANY')}
                editButton={
                    <Button
                        icon={<EditOutlined />}
                        type="default"
                        size="large"
                        onClick={() =>
                            router.push(`/company/update/${companyId}`)
                        }
                    >
                        {t('EDIT')}
                    </Button>
                }
                // editUrl={}
            />
            <div className="flex flex-col gap-6 p-6">
                <CompanyInfo />
                <SuperAdminInfo />
            </div>
        </div>
    )
}

export default withAuthAdmin(CompanyDetail)
