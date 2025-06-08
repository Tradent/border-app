"use client"

import { type FC, type ReactNode, useMemo } from "react"
import { ConnectionProvider, WalletProvider as SolanaWalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { endpoint, getWallets } from "@/lib/auth/wallet-config"

// Import the styles for the wallet modal
import "@solana/wallet-adapter-react-ui/styles.css"

interface WalletContextProviderProps {
  children: ReactNode
}

export const WalletProvider: FC<WalletContextProviderProps> = ({ children }) => {
  // Get wallet adapters
  const wallets = useMemo(() => getWallets(), [])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={wallets} autoConnect={false}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  )
}
