'use client'

import { useAuthLogin } from '@/stores/auth/hooks'
import { Typography } from 'antd'

const { Text } = Typography
const CompanyInfo = () => {
    const { authState } = useAuthLogin()

    return (
        <div className="flex items-center">
            <Text className="text-sm leading-[22px] text-white">
                {authState.userData?.companyName || 'Unknow'}
            </Text>
        </div>
    )
}

export default CompanyInfo
