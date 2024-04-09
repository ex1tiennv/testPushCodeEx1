import { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useParams, useRouter } from 'next/navigation'

import Loader from '@/components/loader'
import { useAccountDetail } from '@/stores/account/hook'
import { EActionStatus } from '@/stores/type'
import AccountInfo from './account-info'
import withAuth from '@/components/component-auth'
import { Permissions } from '@/constants/permission'
import DetailTitle from '@/components/content-page-title/detail-title'
import { Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { checkPermission } from '@/utils/auth'
import { useAuthLogin } from '@/stores/auth/hooks'

const AccountDetail = () => {
    const params = useParams()
    const router = useRouter()
    const accountId = +params.id
    const t = useTranslations()
    const [{ account, status }, fetchAccountDetail] = useAccountDetail()
    const { authState } = useAuthLogin()

    useEffect(() => {
        if (accountId) {
            fetchAccountDetail(accountId)
        }
    }, [accountId, fetchAccountDetail])

    const permissionEditAccount = checkPermission(
        authState.userData?.permissionKeys,
        Permissions.EDIT_ACCOUNT,
    )

    if (!account || status === EActionStatus.Pending) {
        return <Loader />
    }

    return (
        <div>
            <DetailTitle
                urlBack="/account"
                pageName={t('DETAIL_ACCOUNT')}
                editButton={
                    permissionEditAccount && (
                        <Button
                            icon={<EditOutlined />}
                            type="default"
                            size="large"
                            onClick={() =>
                                router.push(`/account/update/${accountId}`)
                            }
                        >
                            {t('EDIT')}
                        </Button>
                    )
                }
            />
            <div className="p-6">
                <AccountInfo />
            </div>
        </div>
    )
}

export default withAuth(AccountDetail, Permissions.DETAIL_ACCOUNT)
