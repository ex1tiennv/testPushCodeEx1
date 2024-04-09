'use client'
import '@rainbow-me/rainbowkit/styles.css'
import StyledComponentsRegistry from '@/theme/ant-registry'
import theme from '@/theme/theme-config'
import { ConfigProvider } from 'antd'
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl'
import { FC, ReactNode } from 'react'
import GlobalConnectWalletProvider from '@/connect-wallet/config'
import { Provider as ReduxProvider } from 'react-redux'
import { useStore } from './stores'
// import { PersistGate } from 'redux-persist/integration/react'

interface ProvidersProps {
    children: ReactNode
    locale: string
    messages: AbstractIntlMessages
}

const GlobalProvider: FC<ProvidersProps> = ({ children, locale, messages }) => {
    // init state
    const store = useStore(undefined)

    return (
        <ReduxProvider store={store}>
            {/* <PersistGate loading={null} persistor={persistor}> */}
            <NextIntlClientProvider locale={locale} messages={messages}>
                <ConfigProvider theme={theme}>
                    <StyledComponentsRegistry>
                        <GlobalConnectWalletProvider>
                            {children}
                        </GlobalConnectWalletProvider>
                    </StyledComponentsRegistry>
                </ConfigProvider>
            </NextIntlClientProvider>
            {/* </PersistGate> */}
        </ReduxProvider>
    )
}

export default GlobalProvider
