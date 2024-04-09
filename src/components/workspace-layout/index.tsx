'use client'

import Content from '@/components/workspace-layout/content'
import { useAuthLogin } from '@/stores/auth/hooks'
import { Layout } from 'antd'
import { ReactNode, useEffect, useState } from 'react'
import Header from './header'
import Sidebar from './sidebar'

export interface IWorkspaceLayout {
    children: ReactNode
}

const WorkspaceLayout = (props: IWorkspaceLayout) => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
    const { authState } = useAuthLogin()
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])
    return (
        <Layout className="min-h-screen">
            <Header />
            <Layout className="mt-12">
                {mounted && authState.isAuthenticated && (
                    <Sidebar
                        isCollapsed={isCollapsed}
                        setIsCollapsed={setIsCollapsed}
                    />
                )}

                <Content isCollapsed={isCollapsed} {...props} />
            </Layout>
        </Layout>
    )
}

export default WorkspaceLayout
