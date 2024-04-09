import withAuthAdmin from '@/components/component-auth-admin'
import ListTitle from '@/components/content-page-title/list-title'
import { useListPlan } from '@/stores/service-plan/hooks'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import PlanList from './service-plan-list'
import { EActionStatus } from '@/stores/type'
import Loader from '@/components/loader'

const ServicePlanList = () => {
    const t = useTranslations()
    const router = useRouter()

    const { planState, getListPlanAction, setFilterAction } = useListPlan()

    useEffect(() => {
        getListPlanAction({
            page: planState.page,
            limit: planState.limit,
            filter: { ...planState.filter },
        })
        // eslint-disable-next-line
    }, [planState.filter])

    const handleInputChange = (value: string) => {
        setFilterAction({ ...planState.filter, searchQuery: value })
    }

    const handleSelectChange = (value: string) => {
        setFilterAction({ ...planState.filter, sortOrder: value })
    }

    if (!planState || planState?.status === EActionStatus.Pending) {
        return <Loader />
    }
    return (
        <div>
            <ListTitle
                pageName={t('LIST_SERVICE_PLAN')}
                addButton={
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        size="large"
                        onClick={() => {
                            router.push('/plan/create')
                        }}
                    >
                        {t('ADD_NEW')}
                    </Button>
                }
                defaultSort={planState.filter?.sortOrder}
                onChangeInput={handleInputChange}
                onChangeSelect={handleSelectChange}
            />
            <div className="w-full p-6">
                <div className="w-full bg-white p-6 px-6 py-4 shadow-01">
                    <PlanList />
                </div>
            </div>
        </div>
    )
}

export default withAuthAdmin(ServicePlanList)
