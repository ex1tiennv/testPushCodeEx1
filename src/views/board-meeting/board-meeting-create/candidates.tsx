/* eslint-disable */

import { useTranslations } from 'next-intl'
import { useCreateBoardMeetingInformation } from '@/stores/board-meeting/hook'
import { useEffect, useState } from 'react'
import serviceElection from '@/services/election'
import BoxArea from '@/components/box-area'
import { ResolutionType } from '@/constants/resolution'
import CreateReportItem from '@/components/create-report-item'
import { IElectionResponse } from '@/services/response.type'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

export interface ICandidateForm {
    title: string
    candidateName: string
    typeId: number
}

const Candidates = () => {
    const t = useTranslations()
    const [data, setData] = useCreateBoardMeetingInformation()
    const [electionList, setElectionList] = useState<IElectionResponse[]>()

    useEffect(() => {
        try {
            ;(async () => {
                const electionList = await serviceElection.getAllElection({
                    page: 1,
                    limit: 10,
                })
                if (electionList) {
                    setElectionList(electionList)
                }
            })()
        } catch (error) {
            console.log(error)
        }
    }, [])

    const onChange =
        (name: 'title' | 'candidateName', index: number) => (value: string) => {
            const candidates = [...data.candidates]
            candidates[index] = {
                ...candidates[index],
                [name]: value,
            }
            setData({
                ...data,
                candidates,
            })
        }

    const onAddNew = () => {
        setData({
            ...data,
            candidates: [
                ...data.candidates,
                {
                    title: '',
                    candidateName: '',
                    type: 1,
                },
            ],
        })
    }

    const onDelete = (index: number) => () => {
        setData({
            ...data,
            candidates: data.candidates.filter((r, i) => i !== index),
        })
    }

    return (
        <BoxArea title={t('EXECUTIVE_OFFICER_ELECTION')}>
            <div className="mb-6 flex flex-col gap-6">
                {data.candidates.map((x, index) => (
                    <CreateReportItem
                        key={index}
                        type={ResolutionType.EXECUTIVE_OFFICER}
                        index={index + 1}
                        title={data.candidates[index].title}
                        content={data.candidates[index].candidateName}
                        onChangeTitle={onChange('title', index)}
                        onChangeContent={onChange('candidateName', index)}
                        onDelete={onDelete(index)}
                        electionList={electionList}
                    />
                ))}
            </div>

            <Button onClick={onAddNew} icon={<PlusOutlined />}>
                {t('ADD_NEW')}
            </Button>
        </BoxArea>
    )
}

export default Candidates
