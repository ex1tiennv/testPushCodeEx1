import { ReactNode } from 'react'
import { Col, Row } from 'antd'

export interface IRowAccountInfo {
    label: ReactNode
    content: ReactNode
    xs?: number
    lg?: number
}
export const RowAccountInfo = ({
    label,
    content,
    xs = 3,
    lg = 8,
}: IRowAccountInfo) => {
    return (
        <Row gutter={[0, 0]} className="min-h-[38px] min-w-[556px]">
            <Col
                xs={xs}
                lg={lg}
                className="h-[22px] max-w-[130px] whitespace-nowrap"
            >
                {label && (
                    <p className="w-[100%] text-sm text-black-45">{label}:</p>
                )}
            </Col>
            <Col
                xs={24 - xs}
                lg={24 - lg}
                className="max-w-[450px] pl-1 text-sm text-black/[85%]"
            >
                {content}
            </Col>
        </Row>
    )
}
