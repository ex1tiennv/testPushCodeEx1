import WorkspaceLayout from '@/components/workspace-layout'
import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
    return <WorkspaceLayout>{children}</WorkspaceLayout>
}

export default Layout
