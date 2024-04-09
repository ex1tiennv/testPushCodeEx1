import { IWorkspaceLayout } from '@/components/workspace-layout'
import { SIDEBAR_CLOSE_WIDTH, SIDEBAR_OPEN_WIDTH } from '@/constants/common'
import { Layout } from 'antd'

interface IContent extends IWorkspaceLayout {
    isCollapsed: boolean
}

const Content = ({ children, isCollapsed }: IContent) => {
    const sidebarWidth = isCollapsed ? SIDEBAR_CLOSE_WIDTH : SIDEBAR_OPEN_WIDTH

    return (
        <Layout.Content
            style={{
                marginLeft: `${sidebarWidth}px`,
                transition: `margin-left .15s`,
            }}
        >
            {children}
        </Layout.Content>
    )
}

export default Content
