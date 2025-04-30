"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Smile, Paperclip, Send, Mic, X, ImageIcon } from "lucide-react"
import { EmojiPicker } from "@/components/chat/emoji-picker"
import { StickerPicker } from "@/components/chat/sticker-picker"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function MessageInput({ onSendMessage }) {
  const [message, setMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [attachmentPreview, setAttachmentPreview] = useState(null)
  const fileInputRef = useRef(null)

  const handleSendMessage = () => {
    if (attachmentPreview) {
      onSendMessage(message || "Image", "image", attachmentPreview)
      setAttachmentPreview(null)
    } else if (message.trim()) {
      onSendMessage(message)
    }
    setMessage("")
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleEmojiSelect = (emoji) => {
    setMessage((prev) => prev + emoji)
  }

  const handleStickerSelect = (sticker) => {
    onSendMessage(sticker.id, "sticker", sticker.url)
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setAttachmentPreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAttachmentClick = () => {
    fileInputRef.current?.click()
  }

  const handleCancelAttachment = () => {
    setAttachmentPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording)
    // In a real app, this would start/stop recording audio
  }

  return (
    <div className="space-y-2">
      {attachmentPreview && (
        <div className="relative w-32 h-32 rounded-md overflow-hidden">
          <img
            src={attachmentPreview || "/placeholder.svg"}
            alt="Attachment preview"
            className="w-full h-full object-cover"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-1 right-1 h-6 w-6 rounded-full"
            onClick={handleCancelAttachment}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
      <div className="flex items-end gap-2">
        <div className="flex gap-1">
          <Popover>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-muted-foreground h-9 w-9">
                      <Smile className="h-5 w-5" />
                      <span className="sr-only">Emoji</span>
                    </Button>
                  </PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent>Emoji</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <PopoverContent side="top" align="start" className="w-80 p-0">
              <Tabs defaultValue="emoji">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="emoji">Emoji</TabsTrigger>
                  <TabsTrigger value="stickers">Stickers</TabsTrigger>
                </TabsList>
                <TabsContent value="emoji" className="p-4">
                  <EmojiPicker onEmojiSelect={handleEmojiSelect} />
                </TabsContent>
                <TabsContent value="stickers" className="p-4">
                  <StickerPicker onStickerSelect={handleStickerSelect} />
                </TabsContent>
              </Tabs>
            </PopoverContent>
          </Popover>
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileSelect} />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground h-9 w-9"
                  onClick={handleAttachmentClick}
                >
                  <Paperclip className="h-5 w-5" />
                  <span className="sr-only">Attach</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Attach File</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground h-9 w-9">
                  <ImageIcon className="h-5 w-5" />
                  <span className="sr-only">Image</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Send Image</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Textarea
          placeholder="Type a message..."
          className="flex-1 min-h-9 max-h-32 resize-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div>
          {message.trim() || attachmentPreview ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" className="h-9 w-9 rounded-full" onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Send Message</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`text-muted-foreground h-9 w-9 ${isRecording ? "text-destructive" : ""}`}
                    onClick={handleVoiceRecord}
                  >
                    <Mic className="h-5 w-5" />
                    <span className="sr-only">Voice</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{isRecording ? "Stop Recording" : "Voice Message"}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
    </div>
  )
}
