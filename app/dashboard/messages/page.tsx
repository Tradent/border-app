"use client"

import type React from "react"

import { useMessages } from "@/lib/messages/messages-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, ArrowLeft } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function MessagesPage() {
  const { conversations, activeConversation, setActiveConversation, sendMessage, markConversationAsRead } =
    useMessages()
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null)

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    if (activeConversation && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [activeConversation])

  // Mark conversation as read when opened, but only once
  useEffect(() => {
    if (activeConversation && activeConversation.id !== currentConversationId) {
      markConversationAsRead(activeConversation.id)
      setCurrentConversationId(activeConversation.id)
    }
  }, [activeConversation, markConversationAsRead, currentConversationId])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (activeConversation && newMessage.trim()) {
      sendMessage(activeConversation.id, newMessage)
      setNewMessage("")
    }
  }

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
          <p className="text-gray-500 dark:text-gray-400">Communicate with your guests</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Conversations List */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-300px)]">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={cn(
                    "p-4 cursor-pointer border-b last:border-b-0 transition-colors",
                    activeConversation?.id === conversation.id
                      ? "bg-burnt-light dark:bg-rustic-dark/30"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800",
                    conversation.unreadCount > 0 && "bg-burnt-light/50 dark:bg-rustic-dark/20",
                  )}
                  onClick={() => setActiveConversation(conversation)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={conversation.participantAvatar || "/placeholder.svg"}
                        alt={conversation.participantName}
                      />
                      <AvatarFallback>
                        {conversation.participantName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium truncate">{conversation.participantName}</h4>
                        {conversation.lastMessage && (
                          <span className="text-xs text-gray-500">
                            {formatDistanceToNow(conversation.lastMessage.timestamp, { addSuffix: true })}
                          </span>
                        )}
                      </div>
                      {conversation.lastMessage && (
                        <p className="text-sm text-gray-500 truncate">{conversation.lastMessage.content}</p>
                      )}
                    </div>
                    {conversation.unreadCount > 0 && (
                      <div className="flex-shrink-0 w-5 h-5 bg-burnt-orange text-white rounded-full flex items-center justify-center text-xs">
                        {conversation.unreadCount}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Message Content */}
        <Card className="md:col-span-2">
          {activeConversation ? (
            <>
              <CardHeader className="flex flex-row items-center gap-3 pb-2 border-b">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setActiveConversation(null)
                    setCurrentConversationId(null)
                  }}
                  className="md:hidden h-8 w-8"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Avatar>
                  <AvatarImage
                    src={activeConversation.participantAvatar || "/placeholder.svg"}
                    alt={activeConversation.participantName}
                  />
                  <AvatarFallback>
                    {activeConversation.participantName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <CardTitle>{activeConversation.participantName}</CardTitle>
              </CardHeader>

              <CardContent className="p-0 flex flex-col h-[calc(100vh-350px)]">
                <ScrollArea className="flex-1">
                  <div className="space-y-4 p-4">
                    {activeConversation.messages.map((message) => {
                      const isCurrentUser = message.senderId === "user-1"
                      return (
                        <div key={message.id} className={cn("flex", isCurrentUser ? "justify-end" : "justify-start")}>
                          <div className="flex gap-2 max-w-[80%]">
                            {!isCurrentUser && (
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={message.senderAvatar || "/placeholder.svg"}
                                  alt={message.senderName}
                                />
                                <AvatarFallback>
                                  {message.senderName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                            )}
                            <div>
                              <div
                                className={cn(
                                  "rounded-lg p-3",
                                  isCurrentUser
                                    ? "bg-burnt-orange text-white dark:bg-mustard"
                                    : "bg-gray-100 dark:bg-gray-800",
                                )}
                              >
                                <p className="text-sm">{message.content}</p>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                <form onSubmit={handleSendMessage} className="flex gap-2 p-4 border-t mt-auto">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center text-gray-500">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-30"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">No conversation selected</h3>
              <p className="max-w-md">Select a conversation from the list to view messages</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
