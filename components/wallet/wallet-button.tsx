"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { useAuth } from "@/lib/auth/use-auth"
import { Button } from "@/components/ui/button"
import { LogOut, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { CustomWalletButton } from "./custom-wallet-button"
import { DemoModeButton } from "@/components/demo/demo-mode-button"
import { useDemoMode } from "@/lib/demo/demo-context"

export function WalletButton() {
  const { connected, publicKey, connecting } = useWallet()
  const { isAuthenticated, isLoading, signOut } = useAuth()
  const { isDemoMode } = useDemoMode()

  // Format wallet address for display
  const formatWalletAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  if (isLoading || connecting) {
    return (
      <Button variant="outline" disabled className="border-burnt-orange text-burnt-orange">
        <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-burnt-orange border-t-transparent"></span>
        {connecting ? "Connecting..." : "Loading..."}
      </Button>
    )
  }

  // If in demo mode, show demo user interface
  if (isDemoMode) {
    return (
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-burnt-orange text-burnt-orange hover:bg-burnt-light dark:border-mustard dark:text-mustard dark:hover:bg-rustic-dark"
            >
              <User className="h-4 w-4 mr-2" />
              Demo User
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Demo Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500 focus:text-red-500">
              <DemoModeButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }

  if (isAuthenticated && publicKey) {
    return (
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-burnt-orange text-burnt-orange hover:bg-burnt-light dark:border-mustard dark:text-mustard dark:hover:bg-rustic-dark"
            >
              <User className="h-4 w-4 mr-2" />
              {formatWalletAddress(publicKey.toString())}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut} className="text-red-500 focus:text-red-500">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }

  if (connected && !isAuthenticated) {
    return (
      <div className="flex gap-2">
        <Button asChild className="bg-burnt-orange hover:bg-mustard text-white">
          <Link href="/signin">Sign In</Link>
        </Button>
        <DemoModeButton />
      </div>
    )
  }

  // Not connected - show custom wallet button and demo mode button
  return (
    <div className="flex gap-2">
      <CustomWalletButton />
      <DemoModeButton />
    </div>
  )
}
