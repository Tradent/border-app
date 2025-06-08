"use client"

import { useEffect, useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Beaker, CheckCircle2, Loader2 } from "lucide-react"
import { useDemoMode } from "@/lib/demo/demo-context"

export default function SignInPage() {
  const { connected } = useWallet()
  const { isAuthenticated, signIn, authError, isLoading } = useAuth()
  const [signInAttempted, setSignInAttempted] = useState(false)
  const [signInSuccess, setSignInSuccess] = useState(false)
  const router = useRouter()
  const { enableDemoMode } = useDemoMode()

  // Handle sign in
  const handleSignIn = async () => {
    setSignInAttempted(true)
    const success = await signIn()
    setSignInSuccess(success)
  }

  // Handle demo mode
  const handleDemoMode = () => {
    enableDemoMode()
    router.push("/dashboard")
  }

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      // Redirect after a short delay to show success message
      const timer = setTimeout(() => {
        router.push("/dashboard")
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [isAuthenticated, router])

  return (
    <div className="container py-10 max-w-md mx-auto">
      <h1 className="text-3xl font-bold tracking-tight text-center mb-6">Sign In to Border</h1>

      <Card>
        <CardHeader>
          <CardTitle>Connect Your Wallet</CardTitle>
          <CardDescription>Sign in using your Solana wallet to access your Border dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {authError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{authError}</AlertDescription>
            </Alert>
          )}

          {isAuthenticated && (
            <Alert className="bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>You are now signed in. Redirecting to dashboard...</AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col items-center justify-center p-4 space-y-4">
            <div className="w-full flex justify-center mb-4">
              <WalletMultiButton className="wallet-adapter-button" />
            </div>

            {connected && !isAuthenticated && (
              <Button
                onClick={handleSignIn}
                disabled={isLoading}
                className="w-full bg-burnt-orange hover:bg-mustard text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in with Connected Wallet"
                )}
              </Button>
            )}
          </div>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white dark:bg-gray-800 px-2 text-sm text-gray-500 dark:text-gray-400">
                Or try without a wallet
              </span>
            </div>
          </div>

          <Button
            onClick={handleDemoMode}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
          >
            <Beaker className="mr-2 h-4 w-4" />
            Enter Demo Mode
          </Button>

          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p>By signing in, you agree to our</p>
            <div className="flex justify-center gap-2">
              <a href="/terms" className="text-burnt-orange dark:text-mustard hover:underline">
                Terms of Service
              </a>
              <span>and</span>
              <a href="/privacy" className="text-burnt-orange dark:text-mustard hover:underline">
                Privacy Policy
              </a>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-gray-500 text-center">
            <p>New to Solana?</p>
            <a
              href="https://solana.com/learn/wallets"
              target="_blank"
              rel="noopener noreferrer"
              className="text-burnt-orange dark:text-mustard underline"
            >
              Learn how to create a wallet
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
