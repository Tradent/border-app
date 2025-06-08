"use client"

import { type FC, useState, useCallback } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { Button } from "@/components/ui/button"
import { CustomWalletModal } from "./custom-wallet-modal"
import { Wallet } from "lucide-react"

export const CustomWalletButton: FC = () => {
  const { connected, publicKey, connecting } = useWallet()
  const [showWalletModal, setShowWalletModal] = useState(false)

  const handleClick = useCallback(() => {
    if (!connected && !connecting) {
      setShowWalletModal(true)
    }
  }, [connected, connecting])

  // Format wallet address for display
  const formatWalletAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  return (
    <>
      <Button
        onClick={handleClick}
        variant="outline"
        disabled={connecting}
        className="border-burnt-orange text-burnt-orange hover:bg-burnt-light dark:border-mustard dark:text-mustard dark:hover:bg-rustic-dark/30"
      >
        {connecting ? (
          <>
            <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-burnt-orange border-t-transparent"></span>
            Connecting...
          </>
        ) : (
          <>
            <Wallet className="mr-2 h-4 w-4" />
            {!connected ? "Connect Wallet" : publicKey && formatWalletAddress(publicKey.toString())}
          </>
        )}
      </Button>

      <CustomWalletModal open={showWalletModal} setOpen={setShowWalletModal} />
    </>
  )
}
