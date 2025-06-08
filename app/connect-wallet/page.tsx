"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export default function ConnectWalletPage() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [error, setError] = useState("")

  const connectPhantom = async () => {
    setIsConnecting(true)
    setError("")

    try {
      // Simulate connection to Phantom wallet
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock successful connection
      const mockAddress = "8xH5f7bjGmtXfcgmU6SA5YMPunQYG4WRQ3wLUXCmGPZ7"
      setWalletAddress(mockAddress)
      setIsConnected(true)
    } catch (err) {
      setError("Failed to connect to wallet. Please try again.")
    } finally {
      setIsConnecting(false)
    }
  }

  const connectSolflare = async () => {
    setIsConnecting(true)
    setError("")

    try {
      // Simulate connection to Solflare wallet
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock successful connection
      const mockAddress = "6xJ4f7bjGmtXfcgmU6SA5YMPunQYG4WRQ3wLUXCmGPZ7"
      setWalletAddress(mockAddress)
      setIsConnected(true)
    } catch (err) {
      setError("Failed to connect to wallet. Please try again.")
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setWalletAddress("")
  }

  return (
    <div className="container py-10 max-w-md mx-auto">
      <h1 className="text-3xl font-bold tracking-tight text-center mb-6">Connect Your Wallet</h1>

      {isConnected ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Wallet Connected
            </CardTitle>
            <CardDescription>Your Solana wallet is connected to CardBoard</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-1">Wallet Address</p>
                <p className="text-xs bg-muted p-2 rounded-md break-all">{walletAddress}</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Balance</p>
                <p className="text-lg font-bold">2.45 SOL</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={disconnectWallet}>
              Disconnect Wallet
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Connect Wallet</CardTitle>
              <CardDescription>Connect your Solana wallet to access CardBoard features</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="phantom">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="phantom">Phantom</TabsTrigger>
                  <TabsTrigger value="solflare">Solflare</TabsTrigger>
                </TabsList>
                <TabsContent value="phantom" className="mt-4">
                  <div className="flex flex-col items-center justify-center p-4 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                      <img
                        src="/placeholder.svg?height=40&width=40&query=phantom wallet logo"
                        alt="Phantom Wallet"
                        className="h-10 w-10"
                      />
                    </div>
                    <Button className="w-full" onClick={connectPhantom} disabled={isConnecting}>
                      {isConnecting ? "Connecting..." : "Connect Phantom"}
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="solflare" className="mt-4">
                  <div className="flex flex-col items-center justify-center p-4 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                      <img
                        src="/placeholder.svg?height=40&width=40&query=solflare wallet logo"
                        alt="Solflare Wallet"
                        className="h-10 w-10"
                      />
                    </div>
                    <Button className="w-full" onClick={connectSolflare} disabled={isConnecting}>
                      {isConnecting ? "Connecting..." : "Connect Solflare"}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-gray-500 text-center">
                <p>New to Solana?</p>
                <a
                  href="https://solana.com/learn/wallets"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Learn how to create a wallet
                </a>
              </div>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  )
}
