"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, List, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import MeetingsCalendar from "./meetings-calendar"
import MeetingsList from "./meetings-list"
import MeetingsFilters from "./meetings-filters"
import { useToast } from "@/components/ui/use-toast"

export default function MeetingsOverview() {
  const router = useRouter()
  const { toast } = useToast()
  const [view, setView] = useState("calendar")
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [filters, setFilters] = useState({
    status: "all",
    type: "all",
    search: "",
  })

  const handleCreateMeeting = () => {
    router.push("/meetings/create")
  }

  const handleJoinMeeting = (meetingId) => {
    toast({
      title: "Joining meeting",
      description: `You are joining meeting #${meetingId}`,
    })
    // In a real app, this would redirect to a video conferencing solution
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meetings</h1>
          <p className="text-muted-foreground">Schedule, manage, and join your meetings.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleCreateMeeting} className="gap-1">
            <Plus className="h-4 w-4" />
            <span>New Meeting</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader className="flex flex-col gap-4 space-y-0 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Your Meetings</CardTitle>
              <CardDescription>View and manage your upcoming meetings</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Tabs
                defaultValue="calendar"
                value={view}
                onValueChange={(value) => setView(value)}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="calendar">
                    <Calendar className="mr-2 h-4 w-4" />
                    Calendar
                  </TabsTrigger>
                  <TabsTrigger value="list">
                    <List className="mr-2 h-4 w-4" />
                    List
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <MeetingsFilters filters={filters} setFilters={setFilters} />

            <div className="mt-4">
              {view === "calendar" ? (
                <MeetingsCalendar
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  filters={filters}
                  onJoinMeeting={handleJoinMeeting}
                />
              ) : (
                <MeetingsList filters={filters} onJoinMeeting={handleJoinMeeting} />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
