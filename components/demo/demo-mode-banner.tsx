"use client"

import { useDemoMode } from "@/lib/demo/demo-context"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Beaker, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function DemoModeBanner() {
  const { isDemoMode, disableDemoMode } = useDemoMode()
  const [isVisible, setIsVisible] = useState(true)

  if (!isDemoMode || !isVisible) {
    return null
  }

  return (
    <Alert className="bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-400 relative">
      <Beaker className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <span>
          You are currently in <strong>Demo Mode</strong>. All features are available without wallet connection.
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-7 px-2 border-yellow-300 dark:border-yellow-700 hover:bg-yellow-100 dark:hover:bg-yellow-900/30"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-7 px-2 border-yellow-300 dark:border-yellow-700 hover:bg-yellow-100 dark:hover:bg-yellow-900/30"
            onClick={disableDemoMode}
          >
            Exit Demo Mode
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  )
}
