"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search } from "lucide-react"

// Mock sticker packs
const stickerPacks = {
  recent: [
    { id: "recent-1", url: "/stickers/cat-1.png" },
    { id: "recent-2", url: "/stickers/dog-1.png" },
    { id: "recent-3", url: "/stickers/laugh-1.png" },
  ],
  animals: [
    { id: "animal-1", url: "/stickers/cat-1.png" },
    { id: "animal-2", url: "/stickers/cat-2.png" },
    { id: "animal-3", url: "/stickers/dog-1.png" },
    { id: "animal-4", url: "/stickers/dog-2.png" },
    { id: "animal-5", url: "/stickers/fox-1.png" },
    { id: "animal-6", url: "/stickers/panda-1.png" },
  ],
  emotions: [
    { id: "emotion-1", url: "/stickers/laugh-1.png" },
    { id: "emotion-2", url: "/stickers/laugh-2.png" },
    { id: "emotion-3", url: "/stickers/sad-1.png" },
    { id: "emotion-4", url: "/stickers/angry-1.png" },
    { id: "emotion-5", url: "/stickers/love-1.png" },
    { id: "emotion-6", url: "/stickers/surprise-1.png" },
  ],
  food: [
    { id: "food-1", url: "/stickers/pizza-1.png" },
    { id: "food-2", url: "/stickers/burger-1.png" },
    { id: "food-3", url: "/stickers/cake-1.png" },
    { id: "food-4", url: "/stickers/coffee-1.png" },
  ],
  memes: [
    { id: "meme-1", url: "/stickers/meme-1.png" },
    { id: "meme-2", url: "/stickers/meme-2.png" },
    { id: "meme-3", url: "/stickers/meme-3.png" },
  ],
}

export function StickerPicker({ onStickerSelect }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("recent")

  const handleStickerClick = (sticker) => {
    onStickerSelect(sticker)

    // In a real app, we would update the recent stickers here
    const updatedRecent = [sticker, ...stickerPacks.recent.filter((s) => s.id !== sticker.id).slice(0, 7)]
    stickerPacks.recent = updatedRecent
  }

  // For the demo, we'll just show placeholder images
  const renderStickerImage = (sticker) => {
    // Use placeholder images for the demo
    return `/placeholder.svg?height=64&width=64&query=${sticker.id}`
  }

  const filteredStickers = searchQuery
    ? Object.values(stickerPacks)
        .flat()
        .filter((sticker) => sticker.id.includes(searchQuery))
    : stickerPacks[activeCategory]

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search stickers..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {!searchQuery && (
        <Tabs defaultValue="recent" onValueChange={setActiveCategory}>
          <TabsList className="grid grid-cols-5 h-auto">
            <TabsTrigger value="recent" className="p-2">
              Recent
            </TabsTrigger>
            <TabsTrigger value="animals" className="p-2">
              Animals
            </TabsTrigger>
            <TabsTrigger value="emotions" className="p-2">
              Emotions
            </TabsTrigger>
            <TabsTrigger value="food" className="p-2">
              Food
            </TabsTrigger>
            <TabsTrigger value="memes" className="p-2">
              Memes
            </TabsTrigger>
          </TabsList>
        </Tabs>
      )}

      <ScrollArea className="h-48">
        <div className="grid grid-cols-4 gap-2">
          {filteredStickers.map((sticker) => (
            <button
              key={sticker.id}
              className="h-16 w-16 flex items-center justify-center rounded hover:bg-muted cursor-pointer"
              onClick={() => handleStickerClick(sticker)}
            >
              <img
                src={renderStickerImage(sticker) || "/placeholder.svg"}
                alt={sticker.id}
                className="max-h-full max-w-full object-contain"
              />
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
