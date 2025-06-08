"use client"

import { useState } from "react"
import { useNotifications, type Notification } from "@/lib/notifications/notifications-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Bell, Check, CheckCheck, Info, AlertCircle, CheckCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from "date-fns"

export function NotificationDropdown() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotification } = useNotifications()
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id)
    if (notification.link) {
      router.push(notification.link)
    }
    setOpen(false)
  }

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-burnt-orange text-[10px] text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-2">
          <DropdownMenuLabel className="text-base">Notifications</DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs flex items-center gap-1 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              onClick={markAllAsRead}
            >
              <CheckCheck className="h-3.5 w-3.5" />
              Mark all as read
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        {notifications.length > 0 ? (
          <ScrollArea className="h-[300px]">
            {notifications.map((notification) => (
              <div key={notification.id} className="relative">
                <DropdownMenuItem
                  className={cn(
                    "flex flex-col items-start gap-1 p-3 cursor-pointer",
                    !notification.read && "bg-burnt-light/30 dark:bg-rustic-dark/20",
                  )}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-center gap-2 w-full">
                    <div className="flex-shrink-0">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1 font-medium">{notification.title}</div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 opacity-50 hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation()
                        clearNotification(notification.id)
                      }}
                    >
                      <X className="h-3.5 w-3.5" />
                      <span className="sr-only">Dismiss</span>
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{notification.message}</p>
                  <div className="flex items-center justify-between w-full mt-1">
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {formatDistanceToNow(notification.date, { addSuffix: true })}
                    </span>
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 p-1 text-xs flex items-center gap-1 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                        onClick={(e) => {
                          e.stopPropagation()
                          markAsRead(notification.id)
                        }}
                      >
                        <Check className="h-3 w-3" />
                        Mark as read
                      </Button>
                    )}
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </div>
            ))}
          </ScrollArea>
        ) : (
          <div className="py-6 text-center text-gray-500 dark:text-gray-400">
            <Bell className="h-8 w-8 mx-auto mb-2 opacity-30" />
            <p>No notifications</p>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
