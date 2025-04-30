"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search } from "lucide-react"

// Common emoji categories with a few examples in each
const emojiCategories = {
  recent: ["😀", "😂", "❤️", "👍", "🙏", "🔥", "✨", "🎉"],
  smileys: ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘"],
  people: ["👶", "👧", "👩", "👨", "👵", "👴", "👲", "👳‍♀️", "👳‍♂️", "🧕", "👮‍♀️", "👮‍♂️", "👷‍♀️", "👷‍♂️"],
  animals: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸"],
  food: ["🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🍈", "🍒", "🍑", "🥭", "🍍", "🥥"],
  activities: ["⚽", "🏀", "🏈", "⚾", "🥎", "🎾", "🏐", "🏉", "🎱", "🏓", "🏸", "🥅", "🏒", "🏑"],
  travel: ["🚗", "🚕", "🚙", "🚌", "🚎", "🏎", "🚓", "🚑", "🚒", "🚐", "🚚", "🚛", "🚜", "✈️"],
  objects: ["⌚", "📱", "💻", "⌨️", "🖥", "🖨", "🖱", "🖲", "🕹", "🗜", "💽", "💾", "💿", "📀"],
  symbols: ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❣️", "💕", "💞", "💓"],
}

export function EmojiPicker({ onEmojiSelect }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("recent")

  const handleEmojiClick = (emoji) => {
    onEmojiSelect(emoji)

    // In a real app, we would update the recent emojis here
    const updatedRecent = [emoji, ...emojiCategories.recent.filter((e) => e !== emoji).slice(0, 7)]
    emojiCategories.recent = updatedRecent
  }

  const filteredEmojis = searchQuery
    ? Object.values(emojiCategories)
        .flat()
        .filter((emoji) => emoji.includes(searchQuery))
    : emojiCategories[activeCategory]

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search emoji..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {!searchQuery && (
        <Tabs defaultValue="recent" onValueChange={setActiveCategory}>
          <TabsList className="grid grid-cols-8 h-auto">
            <TabsTrigger value="recent" className="p-2">
              🕒
            </TabsTrigger>
            <TabsTrigger value="smileys" className="p-2">
              😀
            </TabsTrigger>
            <TabsTrigger value="people" className="p-2">
              👪
            </TabsTrigger>
            <TabsTrigger value="animals" className="p-2">
              🐱
            </TabsTrigger>
            <TabsTrigger value="food" className="p-2">
              🍔
            </TabsTrigger>
            <TabsTrigger value="activities" className="p-2">
              ⚽
            </TabsTrigger>
            <TabsTrigger value="travel" className="p-2">
              🚗
            </TabsTrigger>
            <TabsTrigger value="objects" className="p-2">
              💡
            </TabsTrigger>
          </TabsList>
        </Tabs>
      )}

      <ScrollArea className="h-48">
        <div className="grid grid-cols-8 gap-1">
          {filteredEmojis.map((emoji, index) => (
            <button
              key={index}
              className="h-8 w-8 flex items-center justify-center rounded hover:bg-muted cursor-pointer text-lg"
              onClick={() => handleEmojiClick(emoji)}
            >
              {emoji}
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
