import { Button, Input, Select, Typography, Upload } from 'antd'
import { Resolution, ResolutionTitle, ResolutionType } from '@/constants/resolution'
import { IBoardProposalFile } from '@/stores/board-meeting/types'
import { useTranslations } from 'next-intl'
import { ACCEPT_FILE_TYPES, MeetingFileType } from '@/constants/meeting'
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons'
import { ChangeEvent, useState } from 'react'
import { UploadFile } from 'antd/es/upload/interface'
import { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface'
import serviceUpload from '@/services/upload'
import { RcFile, UploadChangeParam } from 'antd/es/upload'
import { IElectionResponse } from '@/services/response.type'
import { ElectionColor, ElectionName } from '@/constants/election'
import { useCreateBoardMeetingInformation } from '@/stores/board-meeting/hook'

const { Text } = Typography
const { TextArea } = Input

interface ICreateReportItem extends Resolution {
    type: ResolutionType
    index: number
    // eslint-disable-next-line
    onChangeTitle: (value: string) => void
    // eslint-disable-next-line
    onChangeContent: (value: string) => void
    // eslint-disable-next-line
    onChangeOldContent?: (value: string) => void
    // eslint-disable-next-line
    onAddFile?: (file: IBoardProposalFile) => void
    // eslint-disable-next-line
    onRemoveFile?: (uuid: string) => void
    onDelete: () => void
    electionList?: IElectionResponse[] | []
}

const CreateReportItem = ({
    type,
    index,
    title,
    oldContent,
    content,
    fileList = [],
    onChangeTitle,
    onChangeContent,
    onChangeOldContent,
    onAddFile,
    onRemoveFile,
    onDelete,
    electionList,
}: ICreateReportItem) => {
    const t = useTranslations()
    const [data, setData] = useCreateBoardMeetingInformation()

    const handleElectionChange =
        (name: 'type', index: number) => (value: number) => {
            const candidates = [...data.candidates]
            candidates[index - 1] = {
                ...candidates[index - 1],
                [name]: value,
            }

            setData({
                ...data,
                candidates: candidates,
            })
        }

    const onChange =
        // eslint-disable-next-line
        (callback: (value: string) => void) =>
        (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            callback(event.target.value)
        }

    const [fileData, setFileData] = useState<{
        fileList: UploadFile[]
        errorUniqueFile: boolean
    }>({ fileList: fileList, errorUniqueFile: false })

    const onFileChange = (info: UploadChangeParam) => {
        if (info.file.status === 'done') {
            const url = info.file?.xhr?.responseURL
            if (url) {
                onAddFile &&
                    onAddFile({
                        url: url.split('?')[0],
                        uid: info.file.uid,
                    })
            }
        }
        if (info.file.status === 'removed') {
            setFileData({
                fileList: info.fileList,
                errorUniqueFile: false,
            })
            const uid = info.file.uid
            if (uid) {
                onRemoveFile && onRemoveFile(uid)
            }
        }
    }

    const validateFile = (file: RcFile, listRcFile: RcFile[]) => {
        //filter unique file
        const listCurrentFileNames = fileData.fileList.map((file) => file.name)
        if (listCurrentFileNames.includes(file.name)) {
            setFileData({
                ...fileData,
                errorUniqueFile: true,
            })
            return false
        }
        const newUploadFiles = listRcFile.filter(
            (file) => !listCurrentFileNames.includes(file.name),
        )
        setFileData({
            fileList: [...fileData.fileList, ...newUploadFiles],
            errorUniqueFile: false,
        })
        if (file.size > 10 * (1024 * 1024)) {
            return Upload.LIST_IGNORE
        }
        const extension = file.name.split('.').slice(-1)[0]
        if (!ACCEPT_FILE_TYPES.split(',').includes(`.${extension}`)) {
            return Upload.LIST_IGNORE
        }

        return true
    }

    const onUpload = async ({ file }: RcCustomRequestOptions) => {
        try {
            const res = await serviceUpload.getPresignedUrl(
                [file as File],
                MeetingFileType.PROPOSAL_FILES,
            )
            await serviceUpload.uploadFile(file as File, res.uploadUrls[0])

            onAddFile &&
                onAddFile({
                    url: res.uploadUrls[0].split('?')[0],
                    uid: (file as RcFile).uid,
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-row items-start gap-2">

            <Text className="leading-10">
                {t(ResolutionTitle[type])} {index}:
            </Text>

            <div className="flex flex-grow flex-col gap-2">
                <Input
                    className="placeholder:text-sm"
                    placeholder={t('ENTER_TITLE')}
                    size="large"
                    value={title}
                    onChange={onChange(onChangeTitle)}
                />
                <TextArea
                    className="placeholder:text-sm"
                    placeholder={
                        type === ResolutionType.EXECUTIVE_OFFICER
                            ? t('ENTER_CANDIDATE_NAME')
                            : t('ENTER_REPORT_DETAIL')
                    }
                    value={content}
                    onChange={onChange(onChangeContent)}
                />
                {type === ResolutionType.ELECTION && onChangeOldContent && (
                    <TextArea
                        className="placeholder:text-sm"
                        placeholder={t('ENTER_OLD_ELECTION_DETAIL')}
                        value={oldContent}
                        onChange={onChange(onChangeOldContent)}
                    />
                )}
                {(title || content) &&
                    type !== ResolutionType.EXECUTIVE_OFFICER && (
                        <Upload
                            onChange={onFileChange}
                            fileList={fileData.fileList}
                            beforeUpload={validateFile}
                            customRequest={onUpload}
                            accept={ACCEPT_FILE_TYPES}
                            name="proposal-files"
                        >
                            <div className="flex flex-col items-start">
                                <Button icon={<UploadOutlined />}>
                                    {t('CLICK_TO_UPLOAD')}
                                </Button>
                                <Text className="text-black-45">
                                    {t('INVITATION_FILE_UPLOAD_NOTICE')}
                                </Text>
                                {fileData.errorUniqueFile && (
                                    <Text className="text-dust-red">
                                        {t('UNIQUE_FILE_ERROR_MESSAGE')}
                                    </Text>
                                )}
                            </div>
                        </Upload>
                    )}
                {type === ResolutionType.EXECUTIVE_OFFICER && (
                    <Select
                        size="large"
                        placeholder={t('PLEASE_SELECT_ELECTION_TYPE')}
                        style={{ width: '100%' }}
                        options={electionList?.map((election) => ({
                            value: election.id,
                            label: (
                                <span
                                    style={{
                                        color: ElectionColor[election.status],
                                    }}
                                >
                                    {t(ElectionName[election.status])}
                                </span>
                            ),
                        }))}
                        onChange={handleElectionChange('type', index)}
                    />
                )}
            </div>
            <div></div>
            <DeleteOutlined
                className={`h-10 text-dust-red ${index === 1 && 'invisible'}`}
                disabled={index === 1}
                onClick={onDelete}
            />
        </div>
    )
}

export default CreateReportItem
