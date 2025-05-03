"use client"

import React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { format } from "date-fns"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { addMeeting } from "./meetings-data"
import { useToast } from "@/components/ui/use-toast"

export default function CreateMeeting() {
  const router = useRouter()
  const { toast } = useToast()
  const [date, setDate] = useState(new Date())
  const [startTime, setStartTime] = useState("09:00")
  const [endTime, setEndTime] = useState("10:00")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "team",
    participants: "",
    agenda: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate form
    if (!formData.title) {
      toast({
        title: "Error",
        description: "Please enter a meeting title",
        variant: "destructive",
      })
      return
    }

    // Create start and end time Date objects
    const [startHour, startMinute] = startTime.split(":").map(Number)
    const [endHour, endMinute] = endTime.split(":").map(Number)

    const startDateTime = new Date(date)
    startDateTime.setHours(startHour, startMinute, 0)

    const endDateTime = new Date(date)
    endDateTime.setHours(endHour, endMinute, 0)

    // Validate times
    if (endDateTime <= startDateTime) {
      toast({
        title: "Error",
        description: "End time must be after start time",
        variant: "destructive",
      })
      return
    }

    // Process agenda items
    const agendaItems = typeof formData.agenda === "string"
    ? formData.agenda.split("\n").filter((item) => item.trim() !== "")
    : []

    // Process participants
    const participantsList = typeof formData.participants === "string"
    ? formData.participants.split(",").map((p) => p.trim()).filter((p) => p !== "")
    : []

    // Create meeting object
    const newMeeting = {
      title: formData.title,
      description: formData.description,
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
      status: "scheduled",
      type: formData.type,
      organizer: "You",
      participants: participantsList,
      agenda: agendaItems,
    }

    // Add meeting
    const meetingId = addMeeting(newMeeting)

    toast({
      title: "Meeting created",
      description: "Your meeting has been successfully created.",
    })

    // Redirect to meeting details
    router.push(`/meetings/${meetingId}`)
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/meetings">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Create Meeting</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Meeting Details</CardTitle>
                <CardDescription>Enter the basic information for your meeting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter meeting title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter meeting description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Meeting Type</Label>
                  <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select meeting type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="team">Team Meeting</SelectItem>
                      <SelectItem value="one-on-one">One-on-One</SelectItem>
                      <SelectItem value="client">Client Meeting</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="presentation">Presentation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Date & Time</CardTitle>
                <CardDescription>Select when the meeting will take place</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        {date ? format(date, "PPP") : "Select a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Input id="endTime" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Participants</CardTitle>
                <CardDescription>Add people to your meeting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="participants">Participants</Label>
                  <Textarea
                    id="participants"
                    name="participants"
                    placeholder="Enter participant names separated by commas"
                    value={formData.participants}
                    onChange={handleInputChange}
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter participant names separated by commas (e.g., John Doe, Jane Smith)
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Agenda</CardTitle>
                <CardDescription>Outline the meeting agenda</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="agenda">Agenda Items</Label>
                  <Textarea
                    id="agenda"
                    name="agenda"
                    placeholder="Enter agenda items (one per line)"
                    value={formData.agenda}
                    onChange={handleInputChange}
                    rows={6}
                  />
                  <p className="text-xs text-muted-foreground">Enter each agenda item on a new line</p>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4 mt-6">
              <Button variant="outline" asChild>
                <Link href="/meetings">Cancel</Link>
              </Button>
              <Button type="submit">Create Meeting</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
