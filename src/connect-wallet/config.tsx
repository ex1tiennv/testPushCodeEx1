import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { FC, ReactNode } from 'react'
import { WagmiConfig } from 'wagmi'
import { chains, wagmiConfig } from '@/connect-wallet/wagmi'

interface ProvidersProps {
    children: ReactNode
}

const GlobalConnectWalletProvider: FC<ProvidersProps> = ({ children }) => {
    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains} coolMode>
                {children}
            </RainbowKitProvider>
        </WagmiConfig>
    )
}

export default GlobalConnectWalletProvider
