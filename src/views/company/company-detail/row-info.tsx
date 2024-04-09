import { ReactNode } from 'react'
import { Col, Row } from 'antd'

export interface IRowInfo {
    label: string
    content: ReactNode
}

export const RowInfo = ({ label, content }: IRowInfo) => {
    return (
        <Row className="min-h-[38px] min-w-[556px]">
            <Col
                xs={8}
                lg={8}
                className="h-[22px] max-w-[145px] whitespace-nowrap"
            >
                {label && (
                    <p className="w-[100%] text-sm text-black-45">{label}:</p>
                )}
            </Col>
            <Col xs={16} lg={16} className="text-sm text-black/[85%]">
                {content}
            </Col>
        </Row>
    )
}
