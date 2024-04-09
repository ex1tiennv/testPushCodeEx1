import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import ListTitle from '@/components/content-page-title/list-title'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useListAccount } from '@/stores/account/hook'
import { useAuthLogin } from '@/stores/auth/hooks'
import { checkPermission } from '@/utils/auth'
import { Permissions } from '@/constants/permission'
import withAuth from '@/components/component-auth'
import AccountList from '@/views/account/account-list'

const AccountView = () => {
    const t = useTranslations()
    const router = useRouter()
    const { accountState, getListAccountAction, setFilterAction } =
        useListAccount()
    const { authState } = useAuthLogin()
    const permissionCreateAccount = checkPermission(
        authState.userData?.permissionKeys,
        Permissions.CREATE_ACCOUNT,
    )

    useEffect(() => {
        getListAccountAction({
            page: accountState.page,
            limit: accountState.limit,
            filter: { ...accountState.filter },
        })
        // eslint-disable-next-line
    }, [accountState.filter])

    const handleInputChange = (value: string) => {
        setFilterAction({ ...accountState.filter, searchQuery: value })
    }
    const handleSelectChange = (value: string) => {
        setFilterAction({ ...accountState.filter, sortOrder: value })
    }

    return (
        <div>
            <ListTitle
                pageName={t('LIST_ACCOUNTS')}
                addButton={
                    permissionCreateAccount && (
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            size="large"
                            onClick={() => {
                                router.push('/account/create')
                            }}
                        >
                            {t('ADD_NEW')}
                        </Button>
                    )
                }
                defaultSort={accountState.filter?.sortOrder}
                onChangeInput={handleInputChange}
                onChangeSelect={handleSelectChange}
            />
            <div className="p-6">
                <AccountList />
            </div>
        </div>
    )
}

export default withAuth(AccountView, Permissions.LIST_ACCOUNT)
