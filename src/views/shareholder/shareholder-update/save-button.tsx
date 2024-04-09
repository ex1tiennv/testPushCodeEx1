/* eslint-disable */
import { Button, FormInstance, Spin } from 'antd'
import { IShareholderUpdateForm } from '@/views/shareholder/shareholder-update/index'
import { useEffect, useState } from 'react'
import { useWatch } from 'antd/es/form/Form'
import { useTranslations } from 'next-intl'

interface ISaveUpdateShareholderButton {
    form: FormInstance<IShareholderUpdateForm>
    isLoading: boolean
}
const SaveUpdateShareholderButton = ({
    form,
    isLoading,
}: ISaveUpdateShareholderButton) => {
    const [submittable, setSubmittable] = useState(false)
    // watch all values
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
export default SaveUpdateShareholderButton
