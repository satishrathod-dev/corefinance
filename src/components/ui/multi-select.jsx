"use client"

import { useState } from "react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function MultiSelect({ options, value = [], onChange, placeholder = "Select items...", className }) {
  const [open, setOpen] = useState(false)

  const handleSelect = (option) => {
    const isSelected = value.some((item) => item.value === option.value)

    if (isSelected) {
      onChange(value.filter((item) => item.value !== option.value))
    } else {
      onChange([...value, option])
    }
  }

  const handleRemove = (option) => {
    onChange(value.filter((item) => item.value !== option.value))
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          {value.length > 0 ? (
            <div className="flex flex-wrap gap-1 mr-2">
              {value.length > 2 ? (
                <Badge variant="secondary" className="rounded-sm">
                  {value.length} selected
                </Badge>
              ) : (
                value.map((item) => (
                  <Badge key={item.value} variant="secondary" className="rounded-sm">
                    {item.label}
                  </Badge>
                ))
              )}
            </div>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <ChevronsUpDown className="h-4 w-4 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>No items found.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-y-auto">
            {options.map((option) => {
              const isSelected = value.some((item) => item.value === option.value)
              return (
                <CommandItem
                  key={option.value}
                  onSelect={() => handleSelect(option)}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <span>{option.label}</span>
                  </div>
                  {isSelected && <Check className="h-4 w-4 ml-2" />}
                </CommandItem>
              )
            })}
          </CommandGroup>
        </Command>
        {value.length > 0 && (
          <div className="border-t p-2">
            <div className="flex flex-wrap gap-1">
              {value.map((item) => (
                <Badge key={item.value} variant="secondary" className="rounded-sm">
                  {item.label}
                  <button
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onMouseDown={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    onClick={() => handleRemove(item)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {item.label}</span>
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
