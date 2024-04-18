import { useTranslations } from 'next-intl'
import { useCreateBoardMeetingInformation } from '@/stores/board-meeting/hook'
import BoxArea from '@/components/box-area'
import CreateReportItem from '@/components/create-report-item'
import { ResolutionType } from '@/constants/resolution'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { IBoardProposalFile } from '@/stores/board-meeting/types'

const Elections = () => {
    const t = useTranslations()

    const [data, setData] = useCreateBoardMeetingInformation()

    const onChange =
        (name: 'title' | 'description' | 'oldDescription', index: number) =>
        (value: string) => {
            const elections = [...data.elections]
            elections[index] = {
                ...elections[index],
                [name]: value,
            }
            setData({
                ...data,
                elections,
            })
        }

    const onAddFile = (index: number) => (file: IBoardProposalFile) => {
        const elections = [...data.elections]
        const oldFiles = elections[index].files as IBoardProposalFile[]
        elections[index] = {
            ...elections[index],
            files: [...oldFiles, file],
        }
        setData({
            ...data,
            elections,
        })
    }

    const onRemoveFile = (index: number) => (uid: string) => {
        const elections = [...data.elections]
        const oldFiles = elections[index].files as IBoardProposalFile[]
        const newFiles = oldFiles.filter((file) => file.uid !== uid)
        elections[index] = {
            ...elections[index],
            files: newFiles,
        }
        setData({
            ...data,
            elections,
        })
    }

    const onDelete = (index: number) => () => {
        setData({
            ...data,
            elections: data.elections.filter((r, i) => i !== index),
        })
    }

    const onAddNew = () => {
        setData({
            ...data,
            elections: [
                ...data.elections,
                {
                    type: ResolutionType.ELECTION,
                    title: '',
                    description: '',
                    oldDescription: '',
                    files: [],
                },
            ],
        })
    }

    return (
        <BoxArea title={t('ELECTIONS')}>
            <div className="mb-6 flex flex-col gap-6">
                {data.elections.map((x, index) => (
                    <CreateReportItem
                        key={index}
                        type={ResolutionType.ELECTION}
                        index={index + 1}
                        title={data.elections[index].title}
                        content={data.elections[index].description}
                        oldContent={data.elections[index].oldDescription}
                        onChangeOldContent={onChange('oldDescription', index)}
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
export default Elections
