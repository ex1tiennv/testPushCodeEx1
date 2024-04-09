import {
    SIDEBAR_CLOSE_WIDTH,
    SIDEBAR_ITEMS,
    SIDEBAR_OPEN_WIDTH,
} from '@/constants/common'
import { useAuthLogin } from '@/stores/auth/hooks'
import { checkPermission } from '@/utils/auth'
import { capitalizeFirstLetter } from '@/utils/format-string'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, Layout, Menu, MenuProps } from 'antd'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { createElement, useCallback } from 'react'

type MenuItem = Required<MenuProps>['items'][number]

interface ISidebar {
    isCollapsed: boolean
    // eslint-disable-next-line
    setIsCollapsed: (value: boolean) => void
}

const Sidebar = ({ isCollapsed, setIsCollapsed }: ISidebar) => {
    const { authState } = useAuthLogin()
    const pathname = usePathname()

    const router = useRouter()
    const t = useTranslations()

    const redirect = ({ key }: { key: string }) => {
        router.push(key)
    }

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed)
    }

    const menuItems: MenuItem[] = SIDEBAR_ITEMS.map((sidebarItem) => {
        const { label, key, icon, permission } = sidebarItem

        if (
            (permission &&
                checkPermission(
                    authState.userData?.permissionKeys,
                    permission,
                )) ||
            permission === 'DASHBOARD'
        ) {
            return {
                key,
                icon: createElement(icon),
                label: capitalizeFirstLetter(t(label)),
            }
        }

        return null
    })

    const getSelectedKey = useCallback(() => {
        let selectedKey: string = ''
        for (const sidebarItem of SIDEBAR_ITEMS) {
            if (pathname.includes(sidebarItem.key)) {
                selectedKey = sidebarItem.key
                break
            }
        }
        return selectedKey
    }, [pathname])

    const sidebarWidth = isCollapsed ? SIDEBAR_CLOSE_WIDTH : SIDEBAR_OPEN_WIDTH

    return (
        <Layout.Sider
            width={sidebarWidth}
            collapsible
            trigger={null}
            collapsed={isCollapsed}
            className="fixed h-full overflow-auto bg-white"
        >
            <Menu
                className="h-full"
                onClick={redirect}
                mode={'inline'}
                selectedKeys={[getSelectedKey()]}
                items={menuItems}
            />
            <div
                className={`fixed bottom-0 left-0 z-20 flex h-10 items-center border-t border-neutral/4 px-6`}
                style={{ width: `${sidebarWidth}px` }}
            >
                <Button
                    type="text"
                    icon={
                        isCollapsed ? (
                            <MenuUnfoldOutlined />
                        ) : (
                            <MenuFoldOutlined />
                        )
                    }
                    onClick={toggleSidebar}
                />
            </div>
        </Layout.Sider>
    )
}

export default Sidebar
