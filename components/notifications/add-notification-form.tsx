"use client"

import type React from "react"

import { useState } from "react"
import { useNotifications, type NotificationType } from "@/lib/notifications/notifications-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AddNotificationForm() {
  const { addNotification } = useNotifications()
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [type, setType] = useState<NotificationType>("info")
  const [link, setLink] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (title && message) {
      addNotification({
        title,
        message,
        type,
        link: link || undefined,
      })

      // Reset form
      setTitle("")
      setMessage("")
      setType("info")
      setLink("")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Test Notification</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Notification title"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Notification message"
              required
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium mb-1">
              Type
            </label>
            <Select value={type} onValueChange={(value) => setType(value as NotificationType)}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="link" className="block text-sm font-medium mb-1">
              Link (optional)
            </label>
            <Input
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="/dashboard?tab=bookings"
            />
          </div>

          <Button type="submit" className="w-full">
            Add Notification
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
