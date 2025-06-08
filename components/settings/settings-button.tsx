"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"
import { SettingsDialog } from "./settings-dialog"

interface SettingsButtonProps {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function SettingsButton({ variant = "ghost", size = "icon", className }: SettingsButtonProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant={variant} size={size} onClick={() => setOpen(true)} className={className} aria-label="Settings">
        <Settings className="h-[1.2rem] w-[1.2rem]" />
      </Button>
      <SettingsDialog open={open} setOpen={setOpen} />
    </>
  )
}
