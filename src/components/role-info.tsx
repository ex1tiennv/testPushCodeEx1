import { convertSnakeCaseToTitleCase } from '@/utils/format-string'
import { Tag } from 'antd'
import React from 'react'

interface IRoleInfo {
    roleName: string
}

const RoleInfo = ({ roleName }: IRoleInfo) => {
    return (
        <Tag className="mr-0 rounded">
            {convertSnakeCaseToTitleCase(roleName)}
        </Tag>
    )
}

export default RoleInfo
