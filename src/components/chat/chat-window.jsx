"use client"

import { useState, useRef, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageInput } from "@/components/chat/message-input"
import { MessageBubble } from "@/components/chat/message-bubble"
import { Info, Phone, Video, MoreVertical, Users } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function ChatWindow({ conversation, messages, onSendMessage }) {
  const [showInfoDialog, setShowInfoDialog] = useState(false)
  const messagesEndRef = useRef(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const date = new Date(message.timestamp).toLocaleDateString()
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(message)
    return groups
  }, {})

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            {conversation.isGroup ? (
              <div className="bg-primary/10 h-full w-full flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
            ) : (
              <>
                <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                <AvatarFallback>
                  {conversation.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </>
            )}
          </Avatar>
          <div>
            <h3 className="font-medium">{conversation.name}</h3>
            <p className="text-xs text-muted-foreground">
              {conversation.isGroup
                ? `${conversation.participants.length} members`
                : conversation.isOnline
                  ? "Online"
                  : "Offline"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Phone className="h-5 w-5" />
            <span className="sr-only">Call</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Video className="h-5 w-5" />
            <span className="sr-only">Video Call</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={() => setShowInfoDialog(true)}>
            <Info className="h-5 w-5" />
            <span className="sr-only">Info</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <MoreVertical className="h-5 w-5" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Search in conversation</DropdownMenuItem>
              <DropdownMenuItem>Mute notifications</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Block contact</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {Object.entries(groupedMessages).map(([date, dateMessages]) => (
            <div key={date} className="space-y-4">
              <div className="flex justify-center">
                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md">{date}</span>
              </div>
              <div className="space-y-4">
                {dateMessages.map((message) => (
                  <MessageBubble key={message.id} message={message} isOwn={message.senderId === "current-user"} />
                ))}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t">
        <MessageInput onSendMessage={onSendMessage} />
      </div>

      {/* Contact/Group Info Dialog */}
      <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{conversation.isGroup ? "Group Info" : "Contact Info"}</DialogTitle>
            <DialogDescription>
              {conversation.isGroup ? "Group details and members" : "Contact details"}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center py-4">
            <Avatar className="h-24 w-24 mb-4">
              {conversation.isGroup ? (
                <div className="bg-primary/10 h-full w-full flex items-center justify-center">
                  <Users className="h-12 w-12 text-primary" />
                </div>
              ) : (
                <>
                  <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                  <AvatarFallback className="text-2xl">
                    {conversation.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </>
              )}
            </Avatar>
            <h3 className="text-xl font-semibold">{conversation.name}</h3>
            {!conversation.isGroup && (
              <p className="text-sm text-muted-foreground">{conversation.phone || "No phone number"}</p>
            )}
          </div>
          {conversation.isGroup && (
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Members ({conversation.participants.length})</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {conversation.participants.map((participant) => (
                  <div key={participant.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                      <AvatarFallback>
                        {participant.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{participant.name}</p>
                      {participant.isAdmin && <p className="text-xs text-muted-foreground">Group Admin</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
