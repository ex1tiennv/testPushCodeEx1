import { Button, FormInstance, Spin } from 'antd'
import { useWatch } from 'antd/es/form/Form'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { IAccountCreateForm } from '.'

interface ISaveCreateAccountButton {
    form: FormInstance<IAccountCreateForm>
    isLoading: boolean
}

const SaveCreateAccountButton = ({
    form,
    isLoading,
}: ISaveCreateAccountButton) => {
    const [submittable, setSubmittable] = useState(false)
    const t = useTranslations()

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

export default SaveCreateAccountButton
