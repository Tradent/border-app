"use client"

import { useNotifications } from "@/lib/notifications/notifications-context"
import { Button } from "@/components/ui/button"
import { AddNotificationForm } from "@/components/notifications/add-notification-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2 } from "lucide-react"
import Link from "next/link"

export default function NotificationsPage() {
  const { notifications, clearAllNotifications } = useNotifications()

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your notifications</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
          <Button variant="destructive" onClick={clearAllNotifications} disabled={notifications.length === 0}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <AddNotificationForm />
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Current Notifications ({notifications.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {notifications.length > 0 ? (
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 border rounded-lg ${
                        notification.read ? "opacity-70" : "border-burnt-orange dark:border-mustard"
                      }`}
                    >
                      <div className="font-medium">{notification.title}</div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{notification.message}</p>
                      <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
                        <span>
                          {notification.date.toLocaleDateString()} {notification.date.toLocaleTimeString()}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full ${
                            notification.type === "info"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
                              : notification.type === "success"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                                : notification.type === "warning"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
                                  : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
                          }`}
                        >
                          {notification.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No notifications</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
