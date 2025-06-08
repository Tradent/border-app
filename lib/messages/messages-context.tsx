"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar?: string
  recipientId: string
  content: string
  timestamp: Date
  read: boolean
}

export interface Conversation {
  id: string
  participantId: string
  participantName: string
  participantAvatar?: string
  lastMessage?: Message
  unreadCount: number
  messages: Message[]
}

type MessagesContextType = {
  conversations: Conversation[]
  activeConversation: Conversation | null
  setActiveConversation: (conversation: Conversation | null) => void
  totalUnreadCount: number
  sendMessage: (conversationId: string, content: string) => void
  markConversationAsRead: (conversationId: string) => void
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined)

// Sample user ID (in a real app, this would come from authentication)
const currentUserId = "user-1"

// Sample conversations
const sampleConversations: Conversation[] = [
  {
    id: "conv-1",
    participantId: "guest-1",
    participantName: "Sarah Johnson",
    participantAvatar: "/serene-gaze.png",
    unreadCount: 2,
    messages: [
      {
        id: "msg-1",
        senderId: "guest-1",
        senderName: "Sarah Johnson",
        senderAvatar: "/serene-gaze.png",
        recipientId: currentUserId,
        content: "Hi there! I'm interested in booking your Beachfront Cottage for the first week of June.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        read: true,
      },
      {
        id: "msg-2",
        senderId: currentUserId,
        senderName: "John Doe",
        recipientId: "guest-1",
        content: "Hello Sarah! The cottage is available during that time. Do you have any specific questions?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1), // 1 hour ago
        read: true,
      },
      {
        id: "msg-3",
        senderId: "guest-1",
        senderName: "Sarah Johnson",
        senderAvatar: "/serene-gaze.png",
        recipientId: currentUserId,
        content: "Great! Is there a grill available for outdoor cooking? Also, how far is the beach?",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        read: false,
      },
      {
        id: "msg-4",
        senderId: "guest-1",
        senderName: "Sarah Johnson",
        senderAvatar: "/serene-gaze.png",
        recipientId: currentUserId,
        content: "One more thing - is early check-in possible? We'll be arriving around 11am.",
        timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
        read: false,
      },
    ],
  },
  {
    id: "conv-2",
    participantId: "guest-2",
    participantName: "Michael Brown",
    participantAvatar: "/thoughtful-gaze.png",
    unreadCount: 1,
    messages: [
      {
        id: "msg-5",
        senderId: "guest-2",
        senderName: "Michael Brown",
        senderAvatar: "/thoughtful-gaze.png",
        recipientId: currentUserId,
        content: "Hello, I'm checking in today for the Mountain Cabin Retreat. What's the check-in process?",
        timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
        read: false,
      },
    ],
  },
  {
    id: "conv-3",
    participantId: "guest-3",
    participantName: "Emily Davis",
    unreadCount: 0,
    messages: [
      {
        id: "msg-6",
        senderId: "guest-3",
        senderName: "Emily Davis",
        recipientId: currentUserId,
        content: "Thanks for hosting us last weekend! We had a wonderful time at your Modern Downtown Apartment.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        read: true,
      },
      {
        id: "msg-7",
        senderId: currentUserId,
        senderName: "John Doe",
        recipientId: "guest-3",
        content:
          "I'm glad you enjoyed your stay, Emily! Thank you for leaving everything so clean. You're welcome back anytime!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // 1 day ago
        read: true,
      },
    ],
  },
]

export function MessagesProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null)

  // Initialize with sample conversations
  useEffect(() => {
    // Check if we have conversations in localStorage
    const storedConversations = localStorage.getItem("conversations")
    if (storedConversations) {
      try {
        const parsedConversations = JSON.parse(storedConversations)
        // Convert date strings back to Date objects
        const conversationsWithDates = parsedConversations.map((conversation: any) => ({
          ...conversation,
          messages: conversation.messages.map((message: any) => ({
            ...message,
            timestamp: new Date(message.timestamp),
          })),
          lastMessage: conversation.lastMessage
            ? {
                ...conversation.lastMessage,
                timestamp: new Date(conversation.lastMessage.timestamp),
              }
            : undefined,
        }))
        setConversations(conversationsWithDates)
      } catch (error) {
        console.error("Error parsing stored conversations:", error)
        setConversations(
          sampleConversations.map((conversation) => ({
            ...conversation,
            lastMessage: conversation.messages[conversation.messages.length - 1],
          })),
        )
      }
    } else {
      setConversations(
        sampleConversations.map((conversation) => ({
          ...conversation,
          lastMessage: conversation.messages[conversation.messages.length - 1],
        })),
      )
    }
  }, [])

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem("conversations", JSON.stringify(conversations))
    }
  }, [conversations])

  // Calculate total unread count
  const totalUnreadCount = conversations.reduce((total, conversation) => total + conversation.unreadCount, 0)

  // Send a new message
  const sendMessage = (conversationId: string, content: string) => {
    if (!content.trim()) return

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUserId,
      senderName: "John Doe",
      recipientId: conversations.find((c) => c.id === conversationId)?.participantId || "",
      content,
      timestamp: new Date(),
      read: true,
    }

    setConversations((prevConversations) =>
      prevConversations.map((conversation) => {
        if (conversation.id === conversationId) {
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage],
            lastMessage: newMessage,
          }
        }
        return conversation
      }),
    )

    // Update active conversation if it's the one we're sending to
    if (activeConversation?.id === conversationId) {
      setActiveConversation({
        ...activeConversation,
        messages: [...activeConversation.messages, newMessage],
        lastMessage: newMessage,
      })
    }
  }

  // Mark a conversation as read
  const markConversationAsRead = (conversationId: string) => {
    setConversations((prevConversations) =>
      prevConversations.map((conversation) => {
        if (conversation.id === conversationId) {
          return {
            ...conversation,
            unreadCount: 0,
            messages: conversation.messages.map((message) => ({
              ...message,
              read: true,
            })),
          }
        }
        return conversation
      }),
    )

    // Update active conversation if it's the one we're marking as read
    if (activeConversation?.id === conversationId) {
      setActiveConversation({
        ...activeConversation,
        unreadCount: 0,
        messages: activeConversation.messages.map((message) => ({
          ...message,
          read: true,
        })),
      })
    }
  }

  return (
    <MessagesContext.Provider
      value={{
        conversations,
        activeConversation,
        setActiveConversation,
        totalUnreadCount,
        sendMessage,
        markConversationAsRead,
      }}
    >
      {children}
    </MessagesContext.Provider>
  )
}

export function useMessages() {
  const context = useContext(MessagesContext)
  if (context === undefined) {
    throw new Error("useMessages must be used within a MessagesProvider")
  }
  return context
}
