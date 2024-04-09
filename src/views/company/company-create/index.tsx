/* eslint-disable */
import withAuthAdmin from '@/components/component-auth-admin'
import CreateTitle from '@/components/content-page-title/create-title'
import { FETCH_STATUS } from '@/constants/common'
import serviceCompany from '@/services/system-admin/company'
import CompanyInformation from '@/views/company/company-create/company-information'
import SaveCreateCompanyButton from '@/views/company/company-create/save-button'
import SuperAdminInformation from '@/views/company/company-create/super-admin-information'
import { Form, notification } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { AxiosError } from 'axios'
import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export interface ICompanyCreateForm {
    companyName: string
    address: string
    companyShortName?: string
    companyEmail: string
    dateOfIncorporation: string
    phone: string
    taxNumber: string
    fax?: string
    businessType?: string
    representativeUser: string
    companyStatusId: number
    planId: number
    description?: string
    username: string
    walletAddress?: string
    superAdminStatusId: number
    superAdminEmail: string
}

const CompanyCreate = () => {
    const t = useTranslations()

    const [form] = useForm<ICompanyCreateForm>()
    const router = useRouter()

    const [status, setStatus] = useState(FETCH_STATUS.IDLE)

    const onFinish = async (values: ICompanyCreateForm) => {
        setStatus(FETCH_STATUS.LOADING)
        try {
            const res = await serviceCompany.createCompany({
                ...values,
                dateOfCorporation: dayjs(values.dateOfIncorporation).format(
                    'YYYY-MM-DD',
                ),
                email: values.companyEmail,
                statusId: values.companyStatusId,
                planId: values.planId,
                superAdminCompany: {
                    username: values.username,
                    walletAddress: values.walletAddress,
                    email: values.superAdminEmail,
                    statusId: values.superAdminStatusId,
                },
            })
            if (res) {
                notification.success({
                    message: t('CREATED'),
                    description: t('CREATED_COMPANY_SUCCESSFULLY'),
                })

                router.push('/company')
                form.resetFields()
                setStatus(FETCH_STATUS.SUCCESS)
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

    return (
        <Form onFinish={onFinish} form={form} layout="vertical">
            <CreateTitle
                pageName={t('CREATE_NEW_COMPANY')}
                saveButton={
                    <SaveCreateCompanyButton
                        form={form}
                        isLoading={status === FETCH_STATUS.LOADING}
                    />
                }
            />
            <div className="flex flex-col gap-6 p-6">
                <CompanyInformation form={form} />
                <SuperAdminInformation form={form} />
            </div>
        </Form>
    )
}

export default withAuthAdmin(CompanyCreate)
