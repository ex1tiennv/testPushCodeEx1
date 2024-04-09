import SystemAdminLayout from '@/components/system-admin-layout'
import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
    return <SystemAdminLayout>{children}</SystemAdminLayout>
}

export default Layout
