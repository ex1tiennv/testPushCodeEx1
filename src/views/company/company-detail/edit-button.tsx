import { EditOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useTranslations } from 'next-intl'

const EditButton = () => {
    const t = useTranslations()
    return (
        <Button
            icon={<EditOutlined />}
            type="default"
            size="small"
            onClick={() => {}}
        >
            {t('EDIT')}
        </Button>
    )
}

export default EditButton
