import { Modal } from 'antd'
import React, { ReactNode } from 'react'

interface IUtilityModal {
    content: string
    title: string
    type: 'confirm' | 'info' | 'warning' | 'error' | 'success'
    executeFunction?: () => void
    children: ReactNode
}

const UtilityModal = (props: IUtilityModal) => {
    const { content, type, title, children, executeFunction } = props

    const config = {
        title: title ? title : undefined,
        content: content ? content : undefined,
        okText: 'OK',
        cancelText: 'Cancel',
        onOk() {
            executeFunction ? executeFunction() : console.log()
        },
    }

    const confirm = () => {
        switch (type) {
            case 'confirm':
                Modal.confirm(config)
                break
            case 'info':
                Modal.info(config)
                break
            case 'error':
                Modal.error(config)
                break
            case 'success':
                Modal.success(config)
                break
            default:
                Modal.warning(config)
        }
    }

    return <div onClick={confirm}>{children}</div>
}

export default UtilityModal
