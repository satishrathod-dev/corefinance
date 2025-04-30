"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Plus, Users, UserPlus } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ChatSidebar({ conversations, activeConversation, onSelectConversation, searchQuery, onSearchChange }) {
  const [showNewChatDialog, setShowNewChatDialog] = useState(false)

  return (
    <div className="w-80 border-r flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Messages</h2>
          <Dialog open={showNewChatDialog} onOpenChange={setShowNewChatDialog}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Plus className="h-5 w-5" />
                <span className="sr-only">New Chat</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New Conversation</DialogTitle>
                <DialogDescription>Start a new chat or create a group</DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="individual" className="mt-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="individual">Individual</TabsTrigger>
                  <TabsTrigger value="group">Group</TabsTrigger>
                </TabsList>
                <TabsContent value="individual" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact">Select Contact</Label>
                    <Input id="contact" placeholder="Search contacts..." />
                  </div>
                </TabsContent>
                <TabsContent value="group" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="group-name">Group Name</Label>
                    <Input id="group-name" placeholder="Enter group name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="group-members">Add Members</Label>
                    <Input id="group-members" placeholder="Search contacts to add..." />
                  </div>
                </TabsContent>
              </Tabs>
              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setShowNewChatDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowNewChatDialog(false)}>Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              className={cn(
                "w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors",
                activeConversation?.id === conversation.id ? "bg-secondary" : "hover:bg-secondary/50",
              )}
              onClick={() => onSelectConversation(conversation)}
            >
              <Avatar className="h-10 w-10 flex-shrink-0">
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
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <p className="font-medium truncate">{conversation.name}</p>
                  {conversation.lastMessage && (
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatDistanceToNow(new Date(conversation.lastMessage.timestamp), { addSuffix: false })}
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center mt-1">
                  {conversation.lastMessage ? (
                    <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage.content}</p>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">No messages yet</p>
                  )}
                  {conversation.unreadCount > 0 && (
                    <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 min-w-5 flex items-center justify-center px-1.5">
                      {conversation.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <Button variant="outline" className="w-full gap-2">
          <UserPlus className="h-4 w-4" />
          <span>Invite Friends</span>
        </Button>
      </div>
    </div>
  )
}
