"use client"

import { format } from "date-fns"
import { Check, CheckCheck } from "lucide-react"
import { cn } from "@/lib/utils"

export function MessageBubble({ message, isOwn }) {
  const getStatusIcon = () => {
    switch (message.status) {
      case "sent":
        return <Check className="h-3 w-3 text-muted-foreground" />
      case "delivered":
        return <CheckCheck className="h-3 w-3 text-muted-foreground" />
      case "read":
        return <CheckCheck className="h-3 w-3 text-blue-500" />
      default:
        return null
    }
  }

  const renderMessageContent = () => {
    switch (message.type) {
      case "text":
        return <p className="whitespace-pre-wrap break-words">{message.content}</p>
      case "image":
        return (
          <div className="rounded-md overflow-hidden max-w-xs">
            <img src={message.attachmentUrl || "/placeholder.svg"} alt="Image" className="w-full h-auto" />
            {message.content && <p className="mt-1 whitespace-pre-wrap break-words">{message.content}</p>}
          </div>
        )
      case "sticker":
        return (
          <div className="w-32 h-32">
            <img
              src={message.attachmentUrl || "/placeholder.svg"}
              alt="Sticker"
              className="w-full h-full object-contain"
            />
          </div>
        )
      default:
        return <p className="whitespace-pre-wrap break-words">{message.content}</p>
    }
  }

  return (
    <div className={cn("flex", isOwn ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[70%] rounded-lg px-3 py-2",
          isOwn
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-secondary text-secondary-foreground rounded-bl-none",
        )}
      >
        {renderMessageContent()}
        <div className={cn("flex gap-1 text-xs mt-1", isOwn ? "justify-end" : "justify-start")}>
          <span className={isOwn ? "text-primary-foreground/70" : "text-muted-foreground"}>
            {format(new Date(message.timestamp), "h:mm a")}
          </span>
          {isOwn && getStatusIcon()}
        </div>
      </div>
    </div>
  )
}
