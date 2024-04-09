'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Typography } from 'antd'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

const { Text } = Typography

const MenuItem = ({
    text,
    //eslint-disable-next-line
    path,
    isActive = false,
}: {
    text: string
    path: string
    isActive: boolean
}) => {
    return (
        <Link
            href={path}
            className={`h-inherit flex items-center border-b-2 ${
                isActive ? 'border-white' : 'border-transparent'
            }`}
        >
            <Text className="text-sm font-medium leading-[22px] text-white">
                {text}
            </Text>
        </Link>
    )
}

const Menu = () => {
    const t = useTranslations()
    const params = useParams()
    const [hashFragment, setHashFragment] = useState(``)

    useEffect(() => {
        if (!window) return
        setHashFragment(`${window.location.hash}`)
        if (window.location.hash) {
            const el = document.querySelector(window.location.hash)
            el?.scrollIntoView()
        }
    }, [params])

    // console.log(hashFragment)

    const data = [
        {
            text: t('ABOUTS'),
            path: '#abouts',
        },
        {
            text: t('SERVICES'),
            path: '#services',
        },
        {
            text: t('PRICES'),
            path: '#prices',
        },
        {
            text: t('CONTACT'),
            path: '#contact',
        },
    ]

    return (
        <div className={`flex h-full gap-10`}>
            {data.map((item) => (
                <MenuItem
                    text={item.text}
                    path={item.path}
                    isActive={hashFragment === item.path}
                    key={item.path}
                />
            ))}
        </div>
    )
}

export default Menu
