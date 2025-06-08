"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type DemoContextType = {
  isDemoMode: boolean
  enableDemoMode: () => void
  disableDemoMode: () => void
}

const DemoContext = createContext<DemoContextType | undefined>(undefined)

export function DemoProvider({ children }: { children: ReactNode }) {
  const [isDemoMode, setIsDemoMode] = useState(false)

  // Check localStorage on mount to see if demo mode was previously enabled
  useEffect(() => {
    const storedDemoMode = localStorage.getItem("demoMode")
    if (storedDemoMode === "true") {
      setIsDemoMode(true)
    }
  }, [])

  const enableDemoMode = () => {
    setIsDemoMode(true)
    localStorage.setItem("demoMode", "true")
  }

  const disableDemoMode = () => {
    setIsDemoMode(false)
    localStorage.removeItem("demoMode")
  }

  return <DemoContext.Provider value={{ isDemoMode, enableDemoMode, disableDemoMode }}>{children}</DemoContext.Provider>
}

export function useDemoMode() {
  const context = useContext(DemoContext)
  if (context === undefined) {
    throw new Error("useDemoMode must be used within a DemoProvider")
  }
  return context
}
