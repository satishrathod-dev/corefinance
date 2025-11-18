"use client"

import { useState, useEffect } from "react"
import { ChatSidebar } from "@/components/chat/chat-sidebar"
import { ChatWindow } from "@/components/chat/chat-window"
import { Card } from "@/components/ui/card"
import { mockConversations, mockMessages } from "@/components/chat/mock-data"

export default function ChatPage() {
  const [conversations, setConversations] = useState(mockConversations)
  const [activeConversation, setActiveConversation] = useState(null)
  const [messages, setMessages] = useState({})
  const [searchQuery, setSearchQuery] = useState("")

  // Initialize messages from mock data
  useEffect(() => {
    const initialMessages = {}
    mockMessages.forEach((message) => {
      if (!initialMessages[message.conversationId]) {
        initialMessages[message.conversationId] = []
      }
      initialMessages[message.conversationId].push(message)
    })
    setMessages(initialMessages)
  }, [])

  // Set first conversation as active by default
  useEffect(() => {
    if (conversations.length > 0 && !activeConversation) {
      setActiveConversation(conversations[0])
    }
  }, [conversations, activeConversation])

  // Handle sending a new message
  const handleSendMessage = (content, type = "text", attachmentUrl = null) => {
    if (!activeConversation) return

    const newMessage = {
      id: `msg-${Date.now()}`,
      conversationId: activeConversation.id,
      senderId: "current-user", // Assuming current user is sending
      content: content,
      timestamp: new Date().toISOString(),
      status: "sent",
      type: type,
      attachmentUrl: attachmentUrl,
    }

    // Update messages state
    setMessages((prevMessages) => ({
      ...prevMessages,
      [activeConversation.id]: [...(prevMessages[activeConversation.id] || []), newMessage],
    }))

    // Update conversation with latest message
    setConversations((prevConversations) =>
      prevConversations.map((conv) =>
        conv.id === activeConversation.id
          ? {
              ...conv,
              lastMessage: {
                content: type === "text" ? content : type === "image" ? "Image" : "Sticker",
                timestamp: new Date().toISOString(),
              },
              unreadCount: 0,
            }
          : conv,
      ),
    )

    // Simulate message being delivered after a short delay
    setTimeout(() => {
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages[activeConversation.id]]
        const messageIndex = updatedMessages.findIndex((msg) => msg.id === newMessage.id)
        if (messageIndex !== -1) {
          updatedMessages[messageIndex] = { ...updatedMessages[messageIndex], status: "delivered" }
        }
        return {
          ...prevMessages,
          [activeConversation.id]: updatedMessages,
        }
      })
    }, 1000)

    // Simulate message being read after a longer delay
    setTimeout(() => {
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages[activeConversation.id]]
        const messageIndex = updatedMessages.findIndex((msg) => msg.id === newMessage.id)
        if (messageIndex !== -1) {
          updatedMessages[messageIndex] = { ...updatedMessages[messageIndex], status: "read" }
        }
        return {
          ...prevMessages,
          [activeConversation.id]: updatedMessages,
        }
      })
    }, 2000)
  }

  // Handle selecting a conversation
  const handleSelectConversation = (conversation) => {
    setActiveConversation(conversation)

    // Mark conversation as read
    setConversations((prevConversations) =>
      prevConversations.map((conv) => (conv.id === conversation.id ? { ...conv, unreadCount: 0 } : conv)),
    )
  }

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(
    (conversation) =>
      conversation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (conversation.lastMessage && conversation.lastMessage.content.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Chat</h1>

      <Card className="flex h-[calc(100vh-12rem)] overflow-hidden">
        <ChatSidebar
          conversations={filteredConversations}
          activeConversation={activeConversation}
          onSelectConversation={handleSelectConversation}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        {activeConversation ? (
          <ChatWindow
            conversation={activeConversation}
            messages={messages[activeConversation.id] || []}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-muted/10">
            <p className="text-muted-foreground">Select a conversation to start chatting</p>
          </div>
        )}
      </Card>
    </div>
  )
}
