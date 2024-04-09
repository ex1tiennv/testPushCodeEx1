'use client'
import ButtonConnectWallet from '@/connect-wallet/button-connect-wallet'
import { CONSTANT_EMPTY_STRING } from '@/constants/common'
import { useAuthLogin } from '@/stores/auth/hooks'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'
import { signMessage } from 'wagmi/actions'

const ConnectWallet = () => {
    const t = useTranslations()
    const { isConnected, address } = useAccount()
    const { authState, loginAction, getNonceAction } = useAuthLogin()

    useEffect(() => {
        if (isConnected && !authState.isAuthenticated) {
            getNonceAction(address ?? '')
        }
        // eslint-disable-next-line
    }, [isConnected, address])

    useEffect(() => {
        const signAndLogin = async () => {
            if (isConnected && authState.nonce && !authState.isAuthenticated) {
                const sign = await signMessage({
                    message:
                        'Please confirm to login - nonce:' + authState.nonce,
                })
                loginAction({
                    walletAddress: address ?? CONSTANT_EMPTY_STRING,
                    signature: sign,
                })
            }
        }
        signAndLogin()
        // eslint-disable-next-line
    }, [authState.nonce, isConnected, address])

    return (
        <>
            <ButtonConnectWallet
                connectWalletText={t('CONNECT_WALLET')}
                // connectWalletText="TestButton"
                wrongNetworkText={t('WRONG_NETWORK')}
                isAuthenticated={authState.isAuthenticated}
            />
        </>
    )
}

export default ConnectWallet
