"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type NotificationType = "info" | "success" | "warning" | "error"

export interface Notification {
  id: string
  title: string
  message: string
  type: NotificationType
  date: Date
  read: boolean
  link?: string
}

type NotificationsContextType = {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "date" | "read">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearNotification: (id: string) => void
  clearAllNotifications: () => void
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined)

// Sample notifications
const sampleNotifications: Notification[] = [
  {
    id: "1",
    title: "New Booking Request",
    message: "Sarah Johnson has requested to book your Beachfront Cottage from June 1-7.",
    type: "info",
    date: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
    link: "/dashboard?tab=bookings",
  },
  {
    id: "2",
    title: "Payment Received",
    message: "You've received a payment of $750 for Modern Downtown Apartment.",
    type: "success",
    date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
    link: "/dashboard?tab=revenue",
  },
  {
    id: "3",
    title: "Calendar Update Needed",
    message: "Your Mountain Cabin Retreat calendar hasn't been updated in 14 days.",
    type: "warning",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: false,
  },
]

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  // Initialize with sample notifications
  useEffect(() => {
    // Check if we have notifications in localStorage
    const storedNotifications = localStorage.getItem("notifications")
    if (storedNotifications) {
      try {
        const parsedNotifications = JSON.parse(storedNotifications)
        // Convert date strings back to Date objects
        const notificationsWithDates = parsedNotifications.map((notification: any) => ({
          ...notification,
          date: new Date(notification.date),
        }))
        setNotifications(notificationsWithDates)
      } catch (error) {
        console.error("Error parsing stored notifications:", error)
        setNotifications(sampleNotifications)
      }
    } else {
      setNotifications(sampleNotifications)
    }
  }, [])

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem("notifications", JSON.stringify(notifications))
    }
  }, [notifications])

  const unreadCount = notifications.filter((notification) => !notification.read).length

  const addNotification = (notification: Omit<Notification, "id" | "date" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      date: new Date(),
      read: false,
    }
    setNotifications((prev) => [newNotification, ...prev])
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const clearNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const clearAllNotifications = () => {
    setNotifications([])
    localStorage.removeItem("notifications")
  }

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotification,
        clearAllNotifications,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationsContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationsProvider")
  }
  return context
}
