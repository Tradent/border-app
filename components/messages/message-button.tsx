"use client"

import { useState } from "react"
import { useMessages } from "@/lib/messages/messages-context"
import { Button } from "@/components/ui/button"
import { MessageDialog } from "./message-dialog"
import { MessageSquare } from "lucide-react"

interface MessageButtonProps {
  variant?: "outline" | "icon-only"
  showLabel?: boolean
  className?: string
}

export function MessageButton({ variant = "outline", showLabel = false, className }: MessageButtonProps) {
  const { totalUnreadCount } = useMessages()
  const [open, setOpen] = useState(false)

  if (variant === "icon-only") {
    return (
      <>
        <MessageSquare className="h-8 w-8 mb-2 text-burnt-orange dark:text-mustard" />
        {totalUnreadCount > 0 && (
          <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-burnt-orange text-[10px] text-white">
            {totalUnreadCount}
          </span>
        )}
        <MessageDialog open={open} setOpen={setOpen} />
      </>
    )
  }

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className={`relative message-button ${className || ""}`}
        onClick={() => setOpen(true)}
      >
        <MessageSquare className="h-5 w-5" />
        {totalUnreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-burnt-orange text-[10px] text-white">
            {totalUnreadCount}
          </span>
        )}
      </Button>
      <MessageDialog open={open} setOpen={setOpen} />
    </>
  )
}
