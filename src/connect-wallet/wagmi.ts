import { connectorsForWallets, getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { CHAINS } from '@/connect-wallet/chains'

export const { chains, publicClient, webSocketPublicClient } = configureChains(
    CHAINS,
    [publicProvider()],
)

const projectId = '4dbdec9c7b7116b9f3ce28893b70794c'

const { wallets } = getDefaultWallets({
    appName: 'Cocokitene',
    projectId,
    chains,
})

export const connectors = connectorsForWallets([...wallets])

export const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
})
