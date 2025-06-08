"use client"

import { useAuth } from "@/lib/auth/use-auth"
import { useWallet } from "@solana/wallet-adapter-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Copy, Check, LogOut } from "lucide-react"
import { useState } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function ProfilePage() {
  const { publicKey } = useWallet()
  const { signOut } = useAuth()
  const [copied, setCopied] = useState(false)

  const copyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toString())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <ProtectedRoute>
      <div className="container py-10 max-w-md mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Your Profile</h1>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-burnt-orange">
                <AvatarImage src="/confident-professional.png" alt="Profile" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>Your Wallet</CardTitle>
                <CardDescription>Manage your wallet connection</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {publicKey && (
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="font-mono text-sm break-all">{publicKey.toString()}</div>
                <Button variant="ghost" size="sm" onClick={copyAddress}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            )}

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Connected Wallet</h3>
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <div className="w-8 h-8 rounded-full bg-burnt-light dark:bg-rustic-dark flex items-center justify-center">
                  <img src="/modern-wallet-logo.png" alt="Wallet" className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">Wallet Connected</div>
                  <div className="text-xs text-gray-500">Active</div>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full mt-4" onClick={signOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  )
}
