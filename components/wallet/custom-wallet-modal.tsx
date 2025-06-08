"use client"

import { type FC, useCallback, useMemo, useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { type WalletName, WalletReadyState } from "@solana/wallet-adapter-base"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, ChevronRight, Download, ExternalLink } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface CustomWalletModalProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export const CustomWalletModal: FC<CustomWalletModalProps> = ({ open, setOpen }) => {
  const { wallets, select } = useWallet()
  const [activeTab, setActiveTab] = useState<"connect" | "install">("connect")
  const [error, setError] = useState<string | null>(null)

  // Filter wallets by ready state
  const readyWallets = useMemo(
    () =>
      wallets.filter(
        (wallet) => wallet.readyState === WalletReadyState.Installed || wallet.readyState === WalletReadyState.Loadable,
      ),
    [wallets],
  )

  const installableWallets = useMemo(
    () => wallets.filter((wallet) => wallet.readyState === WalletReadyState.NotDetected),
    [wallets],
  )

  // Set active tab based on available wallets
  useMemo(() => {
    if (readyWallets.length > 0) {
      setActiveTab("connect")
    } else if (installableWallets.length > 0) {
      setActiveTab("install")
    }
  }, [readyWallets, installableWallets])

  const handleWalletClick = useCallback(
    async (walletName: WalletName) => {
      try {
        setError(null)
        select(walletName)
        setOpen(false)
      } catch (err) {
        console.error("Wallet selection error:", err)
        setError("Failed to connect to wallet. Please try again.")
      }
    },
    [select, setOpen],
  )

  const getWalletIcon = (name: string) => {
    const lowerName = name.toLowerCase()
    if (lowerName.includes("phantom")) {
      return "/phantom-icon.png"
    } else if (lowerName.includes("solflare")) {
      return "/solflare-icon.png"
    }
    return "/modern-wallet-logo.png"
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-burnt-orange dark:text-mustard">
            Connect Wallet
          </DialogTitle>
          <DialogDescription className="text-center">
            Connect your Solana wallet to access Border features
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue={activeTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="connect"
              disabled={readyWallets.length === 0}
              className="data-[state=active]:bg-burnt-orange data-[state=active]:text-white dark:data-[state=active]:bg-mustard"
            >
              Connect
            </TabsTrigger>
            <TabsTrigger
              value="install"
              disabled={installableWallets.length === 0}
              className="data-[state=active]:bg-burnt-orange data-[state=active]:text-white dark:data-[state=active]:bg-mustard"
            >
              Install
            </TabsTrigger>
          </TabsList>

          <TabsContent value="connect" className="mt-4 space-y-4">
            {readyWallets.length > 0 ? (
              readyWallets.map((wallet) => (
                <Button
                  key={wallet.adapter.name}
                  variant="outline"
                  className="w-full flex items-center justify-between p-4 h-auto hover:bg-burnt-light hover:border-burnt-orange dark:hover:bg-rustic-dark/30 dark:hover:border-mustard group transition-all"
                  onClick={() => handleWalletClick(wallet.adapter.name)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-burnt-light dark:bg-rustic-dark flex items-center justify-center">
                      <img
                        src={getWalletIcon(wallet.adapter.name) || "/placeholder.svg"}
                        alt={`${wallet.adapter.name} icon`}
                        className="h-6 w-6"
                      />
                    </div>
                    <span className="font-medium">{wallet.adapter.name}</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-burnt-orange dark:group-hover:text-mustard transition-colors" />
                </Button>
              ))
            ) : (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>No wallets detected. Please install a Solana wallet.</AlertDescription>
              </Alert>
            )}
          </TabsContent>

          <TabsContent value="install" className="mt-4 space-y-4">
            {installableWallets.map((wallet) => (
              <a
                key={wallet.adapter.name}
                href={wallet.adapter.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-between p-4 h-auto hover:bg-burnt-light hover:border-burnt-orange dark:hover:bg-rustic-dark/30 dark:hover:border-mustard group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-burnt-light dark:bg-rustic-dark flex items-center justify-center">
                      <img
                        src={getWalletIcon(wallet.adapter.name) || "/placeholder.svg"}
                        alt={`${wallet.adapter.name} icon`}
                        className="h-6 w-6"
                      />
                    </div>
                    <div>
                      <span className="font-medium">{wallet.adapter.name}</span>
                      <p className="text-xs text-gray-500">Not installed</p>
                    </div>
                  </div>
                  <Download className="h-5 w-5 text-gray-400 group-hover:text-burnt-orange dark:group-hover:text-mustard transition-colors" />
                </Button>
              </a>
            ))}

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">New to Solana wallets?</p>
              <a
                href="https://solana.com/ecosystem/explore?categories=wallet"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-burnt-orange dark:text-mustard flex items-center hover:underline"
              >
                Learn more about Solana wallets
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
          By connecting your wallet, you agree to our{" "}
          <a href="/terms" className="text-burnt-orange dark:text-mustard hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-burnt-orange dark:text-mustard hover:underline">
            Privacy Policy
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}
