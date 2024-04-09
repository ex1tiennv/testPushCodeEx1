/* eslint-disable */
import UpdateTitle from '@/components/content-page-title/update-title'
import Loader from '@/components/loader'
import { FETCH_STATUS } from '@/constants/common'
import serviceCompany from '@/services/system-admin/company'
import SaveUpdateCompanyButton from '@/views/company/company-update/save-button'
import { Form, notification } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { AxiosError } from 'axios'
import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import CompanyInformation from './company-information'
import SuperAdminInformation from './super-admin-information'
import withAuthAdmin from '@/components/component-auth-admin'

export interface ICompanyUpdateForm {
    companyName: string
    address: string
    companyShortName: string
    companyEmail: string
    dateOfIncorporation: string
    phone: string
    taxNumber: string
    fax?: string
    businessType: string
    representativeUser: string
    companyStatusId: number
    planId: number
    description?: string
    username: string
    walletAddress: string
    superAdminStatusId: number
    superAdminEmail: string
    superAdminId: number
}

const CompanyUpdate = () => {
    const router = useRouter()
    const t = useTranslations()

    const [initCompany, setInitCompany] = useState<ICompanyUpdateForm>()
    const [initStatus, setInitStatus] = useState<FETCH_STATUS>(
        FETCH_STATUS.IDLE,
    )

    const params = useParams()

    const companyId = Number(params.id)

    useEffect(() => {
        const fetchInitCompany = async () => {
            setInitStatus(FETCH_STATUS.LOADING)
            try {
                const res = await serviceCompany.getDetailCompany(companyId)
                if (res) {
                    setInitCompany({
                        companyName: res.companyName,
                        address: res.address,
                        companyShortName: res.companyShortName,
                        companyEmail: res.email,
                        dateOfIncorporation: res.dateOfCorporation,
                        phone: res.phone,
                        taxNumber: res.taxNumber,
                        fax: res.fax,
                        businessType: res.businessType,
                        representativeUser: res.representativeUser,
                        companyStatusId: res.companyStatus.id,
                        planId: res.planId,
                        description: res.description,
                        username: res.superAdminInfo.username,
                        walletAddress: res.superAdminInfo.walletAddress,
                        superAdminStatusId: res.superAdminInfo.statusId,
                        superAdminEmail: res.superAdminInfo.email,
                        superAdminId: res.superAdminInfo.id,
                    })
                }
                setInitStatus(FETCH_STATUS.SUCCESS)
            } catch (error) {
                if (error instanceof AxiosError) {
                    notification.error({
                        message: t('ERROR'),
                        description: error.response?.data.info.message,
                    })
                }
                setInitStatus(FETCH_STATUS.ERROR)
            }
        }
        if (companyId) {
            fetchInitCompany()
        }
    }, [companyId])

    const [form] = useForm<ICompanyUpdateForm>()

    const [status, setStatus] = useState(FETCH_STATUS.IDLE)

    const onFinish = async (values: ICompanyUpdateForm) => {
        setStatus(FETCH_STATUS.LOADING)
        try {
            const updatedCompanyRes = await serviceCompany.updateCompany(
                companyId,
                {
                    ...values,
                    dateOfCorporation: dayjs(values.dateOfIncorporation).format(
                        'YYYY-MM-DD',
                    ),
                    email: values.companyEmail,
                    statusId: values.companyStatusId,
                    planId: values.planId,
                },
            )
            const updatedSuperAdminRes = await serviceCompany.updateSuperAdmin(
                companyId,
                Number(initCompany?.superAdminId),
                {
                    username: values.username,
                    walletAddress: values.walletAddress,
                    email: values.superAdminEmail,
                    statusId: values.superAdminStatusId,
                },
            )
            if (updatedCompanyRes && updatedSuperAdminRes) {
                notification.success({
                    message: t('UPDATED'),
                    description: t('UPDATED_COMPANY_SUCCESSFULLY'),
                })

                setStatus(FETCH_STATUS.SUCCESS)
                router.push(`/company/detail/${companyId}`)
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                notification.error({
                    message: t('ERROR'),
                    description: t(error.response?.data.info.message),
                })
            }

            setStatus(FETCH_STATUS.ERROR)
        }
    }

    if (!initCompany || initStatus === FETCH_STATUS.LOADING) {
        return <Loader />
    }

    return (
        <Form
            onFinish={onFinish}
            form={form}
            layout="vertical"
            initialValues={{
                ...initCompany,
                dateOfIncorporation: dayjs(initCompany.dateOfIncorporation),
            }}
        >
            <UpdateTitle
                pageName={t('UPDATE_COMPANY')}
                saveButton={
                    <SaveUpdateCompanyButton
                        form={form}
                        isLoading={status === FETCH_STATUS.LOADING}
                    />
                }
            />
            <div className="flex flex-col gap-6 p-6">
                <CompanyInformation />
                <SuperAdminInformation />
            </div>
        </Form>
    )
}

export default withAuthAdmin(CompanyUpdate)
