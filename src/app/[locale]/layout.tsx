import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import GlobalProvider from '@/global-provider'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })

export const metadata: Metadata = {
    title: 'Cocokitene Application',
    description:
        'Cocokitene Application manage meetings of company by blockchain technology',
}

export function generateStaticParams() {
    return [{ locale: 'ja' }, { locale: 'en' }]
}

export default async function RootLayout({
    children,
    params: { locale },
}: {
    children: ReactNode
    params: {
        locale: string
    }
}) {
    let messages
    try {
        messages = (await import(`../../locales/${locale}.json`)).default
    } catch (error) {
        notFound()
    }

    return (
        <html lang={locale} className="scroll-smooth">
            <body className={roboto.className}>
                <GlobalProvider locale={locale} messages={messages}>
                    {children}
                </GlobalProvider>
            </body>
        </html>
    )
}
