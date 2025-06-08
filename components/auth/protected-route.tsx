"use client"

import type React from "react"

import { useAuth } from "@/lib/auth/use-auth"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useDemoMode } from "@/lib/demo/demo-context"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const { isDemoMode } = useDemoMode()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isDemoMode) {
      router.push("/signin")
    }
  }, [isAuthenticated, isLoading, router, isDemoMode])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-burnt-orange" />
          <p className="text-lg font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated && !isDemoMode) {
    return null
  }

  return <>{children}</>
}
