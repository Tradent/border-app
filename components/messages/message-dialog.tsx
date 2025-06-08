"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useMessages, type Conversation } from "@/lib/messages/messages-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatDistanceToNow } from "date-fns"
import { Send, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface MessageDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function MessageDialog({ open, setOpen }: MessageDialogProps) {
  const { conversations, activeConversation, setActiveConversation, sendMessage, markConversationAsRead } =
    useMessages()
  const [newMessage, setNewMessage] = useState("")
  const [view, setView] = useState<"list" | "conversation">("list")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null)

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    if (view === "conversation" && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [activeConversation?.messages.length, view])

  // Mark conversation as read when opened, but only once
  useEffect(() => {
    if (activeConversation && view === "conversation" && activeConversation.id !== currentConversationId) {
      markConversationAsRead(activeConversation.id)
      setCurrentConversationId(activeConversation.id)
    }
  }, [activeConversation, view, markConversationAsRead, currentConversationId])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (activeConversation && newMessage.trim()) {
      sendMessage(activeConversation.id, newMessage)
      setNewMessage("")
    }
  }

  const handleSelectConversation = (conversation: Conversation) => {
    setActiveConversation(conversation)
    setView("conversation")
  }

  const handleBackToList = () => {
    setView("list")
    // Reset current conversation ID when going back to list
    setCurrentConversationId(null)
  }

  const handleClose = () => {
    setOpen(false)
    // Reset to list view when closing
    setTimeout(() => {
      setView("list")
      setCurrentConversationId(null)
    }, 300)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        {view === "list" ? (
          <>
            <DialogHeader>
              <DialogTitle>Messages</DialogTitle>
              <DialogDescription>Your conversations with guests</DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-[400px] pr-4">
              {conversations.length > 0 ? (
                <div className="space-y-2">
                  {conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={cn(
                        "p-3 rounded-lg cursor-pointer transition-colors",
                        conversation.unreadCount > 0
                          ? "bg-burnt-light dark:bg-rustic-dark/30 hover:bg-burnt-light/70 dark:hover:bg-rustic-dark/50"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800",
                      )}
                      onClick={() => handleSelectConversation(conversation)}
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
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <p>No messages yet</p>
                </div>
              )}
            </ScrollArea>
          </>
        ) : (
          activeConversation && (
            <>
              <DialogHeader className="flex flex-row items-center gap-3 pb-2 border-b">
                <Button variant="ghost" size="icon" onClick={handleBackToList} className="h-8 w-8">
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
                <DialogTitle>{activeConversation.participantName}</DialogTitle>
              </DialogHeader>

              <div className="flex flex-col h-[400px]">
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-4 py-4">
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

                <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t mt-2">
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
              </div>
            </>
          )
        )}
      </DialogContent>
    </Dialog>
  )
}
