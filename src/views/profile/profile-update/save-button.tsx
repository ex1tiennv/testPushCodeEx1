import { Button, Spin } from 'antd'
import { FormInstance, useWatch } from 'antd/es/form/Form'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { IProfileUpdateForm } from '.'

interface ISaveUpdateAccountButton {
    form: FormInstance<IProfileUpdateForm>
    isLoading: boolean
}

const SaveUpdateAccountButton = ({
    form,
    isLoading,
}: ISaveUpdateAccountButton) => {
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

export default SaveUpdateAccountButton
