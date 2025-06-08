"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { sign } from "@/lib/auth/sign-message"
import { useDemoMode } from "@/lib/demo/demo-context"

export function useAuth() {
  const { publicKey, signMessage, connected, connecting, disconnect } = useWallet()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const router = useRouter()
  const { isDemoMode } = useDemoMode()

  // Check if user is authenticated on mount and when wallet connection changes
  useEffect(() => {
    const checkAuth = async () => {
      // If demo mode is enabled, consider the user authenticated
      if (isDemoMode) {
        setIsAuthenticated(true)
        return
      }

      if (connected && publicKey) {
        // Check if we have a token in localStorage
        const token = localStorage.getItem("authToken")
        if (token) {
          // Verify token validity (you would typically validate this with your backend)
          try {
            // This is a placeholder for token validation
            // In a real app, you would verify this with your backend
            setIsAuthenticated(true)
          } catch (error) {
            console.error("Invalid token:", error)
            setIsAuthenticated(false)
            localStorage.removeItem("authToken")
          }
        } else {
          setIsAuthenticated(false)
        }
      } else {
        setIsAuthenticated(false)
        // Only remove token if we're sure the wallet is disconnected
        if (!connecting) {
          localStorage.removeItem("authToken")
        }
      }
    }

    checkAuth()
  }, [connected, publicKey, connecting, isDemoMode])

  // Sign in with wallet
  const signIn = useCallback(async () => {
    if (!publicKey || !signMessage) {
      setAuthError("Wallet not connected")
      return false
    }

    setIsLoading(true)
    setAuthError(null)

    try {
      // Sign a message to prove ownership of the wallet
      const message = `Sign this message to authenticate with Border: ${new Date().toISOString()}`
      const signature = await sign(message, signMessage)

      // In a real app, you would send this to your backend to verify and get a JWT token
      // For this example, we'll simulate a successful authentication
      const mockAuthResponse = {
        token: `mock_jwt_token_${publicKey.toString().slice(0, 10)}`,
        user: {
          id: publicKey.toString(),
          walletAddress: publicKey.toString(),
        },
      }

      // Store the token
      localStorage.setItem("authToken", mockAuthResponse.token)
      localStorage.setItem("userWallet", publicKey.toString())

      setIsAuthenticated(true)
      setIsLoading(false)
      return true
    } catch (error) {
      console.error("Authentication error:", error)
      setAuthError("Failed to authenticate. Please try again.")
      setIsLoading(false)
      return false
    }
  }, [publicKey, signMessage])

  // Sign out
  const signOut = useCallback(async () => {
    setIsLoading(true)

    // Clear authentication data
    localStorage.removeItem("authToken")
    localStorage.removeItem("userWallet")

    try {
      // Disconnect wallet
      await disconnect()
    } catch (error) {
      console.error("Error disconnecting wallet:", error)
    }

    setIsAuthenticated(false)
    setIsLoading(false)

    // Redirect to home page
    router.push("/")
  }, [disconnect, router])

  return {
    isAuthenticated,
    isLoading,
    authError,
    signIn,
    signOut,
    walletAddress: publicKey?.toString(),
    isDemoMode,
  }
}
