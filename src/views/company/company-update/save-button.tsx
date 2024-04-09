import { ICompanyCreateForm } from '@/views/company/company-create'
import { Button, Spin } from 'antd'
import { FormInstance, useWatch } from 'antd/es/form/Form'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

interface ISaveCreateCompanyButton {
    form: FormInstance<ICompanyCreateForm>
    isLoading: boolean
}

const SaveUpdateCompanyButton = ({
    form,
    isLoading,
}: ISaveCreateCompanyButton) => {
    const [submittable, setSubmittable] = useState(false)

    // Watch all values
    const values = useWatch([], form)

    useEffect(() => {
        form.validateFields({ validateOnly: true }).then(
            () => {
                setSubmittable(true)
            },
            () => {
                setSubmittable(false)
            },
        )
        // eslint-disable-next-line
    }, [values])

    const t = useTranslations()

    return (
        <Spin spinning={isLoading} delay={0}>
            <Button
                type="default"
                className="bg-primary text-white transition-opacity disabled:opacity-60"
                size="large"
                htmlType="submit"
                disabled={!submittable}
            >
                {t('SAVE')}
            </Button>
        </Spin>
    )
}

export default SaveUpdateCompanyButton
