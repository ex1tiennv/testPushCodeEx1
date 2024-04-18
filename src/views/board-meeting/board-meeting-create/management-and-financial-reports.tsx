import { useTranslations } from 'next-intl'
import { useCreateBoardMeetingInformation } from '@/stores/board-meeting/hook'
import BoxArea from '@/components/box-area'
import { ResolutionType } from '@/constants/resolution'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { IProposalFile } from '@/stores/meeting/types'
import { IBoardProposalFile } from '@/stores/board-meeting/types'
import CreateReportItem from '@/components/create-report-item'

const ManagementAndFinancialReports = () => {
    const t = useTranslations()
    const [data, setData] = useCreateBoardMeetingInformation()

    const onChange =
        (name: 'title' | 'description', index: number) => (value: string) => {
            const managementAndFinancials = [...data.managementAndFinancials]
            managementAndFinancials[index] = {
                ...managementAndFinancials[index],
                [name]: value,
            }
            setData({
                ...data,
                managementAndFinancials,
            })
        }

    const onAddFile = (index: number) => (file: IProposalFile) => {
        const managementAndFinancials = [...data.managementAndFinancials]
        const oldFiles = managementAndFinancials[index]
            .files as IBoardProposalFile[]
        managementAndFinancials[index] = {
            ...managementAndFinancials[index],
            files: [...oldFiles, file],
        }
        setData({
            ...data,
            managementAndFinancials,
        })
    }

    const onRemoveFile = (index: number) => (uid: string) => {
        const managementAndFinancials = [...data.managementAndFinancials]
        const oldFiles = managementAndFinancials[index]
            .files as IBoardProposalFile[]
        const newFiles = oldFiles.filter((file) => file.uid !== uid)
        managementAndFinancials[index] = {
            ...managementAndFinancials[index],
            files: newFiles,
        }
        setData({
            ...data,
            managementAndFinancials,
        })
    }

    const onDelete = (index: number) => () => {
        setData({
            ...data,
            managementAndFinancials: data.managementAndFinancials.filter(
                (r, i) => i !== index,
            ),
        })
    }

    const onAddNew = () => {
        setData({
            ...data,
            managementAndFinancials: [
                ...data.managementAndFinancials,
                {
                    title: '',
                    description: '',
                    files: [],
                    type: ResolutionType.MANAGEMENT_FINANCIAL,
                },
            ],
        })
    }

    return (
        <BoxArea title={t('MANAGEMENT_AND_FINANCIAL_REPORTS')}>
            <div className="mb-6 flex flex-col gap-6">
                {data.managementAndFinancials.map((x, index) => (
                    <CreateReportItem
                        key={index}
                        type={ResolutionType.MANAGEMENT_FINANCIAL}
                        index={index + 1}
                        title={data.managementAndFinancials[index].title}
                        content={
                            data.managementAndFinancials[index].description
                        }
                        onChangeTitle={onChange('title', index)}
                        onChangeContent={onChange('description', index)}
                        onAddFile={onAddFile(index)}
                        onRemoveFile={onRemoveFile(index)}
                        onDelete={onDelete(index)}
                    />
                ))}
            </div>
            <Button onClick={onAddNew} icon={<PlusOutlined />}>
                {t('ADD_NEW')}
            </Button>
        </BoxArea>
    )
}
export default ManagementAndFinancialReports
