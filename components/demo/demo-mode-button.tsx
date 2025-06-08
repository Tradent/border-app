"use client"

import { Button } from "@/components/ui/button"
import { useDemoMode } from "@/lib/demo/demo-context"
import { useRouter } from "next/navigation"
import { Beaker } from "lucide-react"

export function DemoModeButton() {
  const { isDemoMode, enableDemoMode, disableDemoMode } = useDemoMode()
  const router = useRouter()

  const handleToggleDemoMode = () => {
    if (isDemoMode) {
      disableDemoMode()
      router.push("/")
    } else {
      enableDemoMode()
      router.push("/dashboard")
    }
  }

  return (
    <Button
      onClick={handleToggleDemoMode}
      variant={isDemoMode ? "destructive" : "outline"}
      className={
        isDemoMode
          ? ""
          : "border-burnt-orange text-burnt-orange hover:bg-burnt-light dark:border-mustard dark:text-mustard dark:hover:bg-rustic-dark/30"
      }
    >
      <Beaker className="mr-2 h-4 w-4" />
      {isDemoMode ? "Exit Demo Mode" : "Demo Mode"}
    </Button>
  )
}
