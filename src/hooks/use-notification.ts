import { notification } from 'antd'
import { NoticeType } from 'antd/es/message/interface'
import { NotificationPlacement } from 'antd/es/notification/interface'

export interface INotification {
    message: string
    placement: NotificationPlacement
    type: NoticeType
    description?: string
}

export const useNotification = () => {
    const [api, contextHolder] = notification.useNotification()
    const openNotification = ({
        message,
        placement,
        description,
        type,
    }: INotification) => {
        const notificationData = {
            message,
            placement,
            description,
            duration: 3,
        }
        switch (type) {
            case 'info':
                api.info(notificationData)
                break
            case 'success':
                api.success(notificationData)
                break
            case 'warning':
                api.warning(notificationData)
                break
            default:
                api.error(notificationData)
        }
    }

    return {
        openNotification,
        contextHolder,
    }
}
