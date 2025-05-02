"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  parseISO,
} from "date-fns"
import { ChevronLeft, ChevronRight, Video, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { getMeetings, deleteMeeting, Meeting } from "./meetings-data"
import { useToast } from "@/components/ui/use-toast"


export default function MeetingsCalendar({
  selectedDate,
  setSelectedDate,
  filters,
  onJoinMeeting,
}) {
  const router = useRouter()
  const { toast } = useToast()
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(selectedDate))
  const [meetings, setMeetings] = useState([])
  const [selectedMeeting, setSelectedMeeting] = useState(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  useEffect(() => {
    const allMeetings = getMeetings()

    // Apply filters
    let filteredMeetings = allMeetings

    if (filters.status !== "all") {
      filteredMeetings = filteredMeetings.filter((meeting) => meeting.status === filters.status)
    }

    if (filters.type !== "all") {
      filteredMeetings = filteredMeetings.filter((meeting) => meeting.type === filters.type)
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filteredMeetings = filteredMeetings.filter(
        (meeting) =>
          meeting.title.toLowerCase().includes(searchLower) ||
          meeting.description.toLowerCase().includes(searchLower) ||
          meeting.organizer.toLowerCase().includes(searchLower),
      )
    }

    setMeetings(filteredMeetings)
  }, [filters])

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  })

  const previousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const handleDeleteMeeting = () => {
    if (selectedMeeting) {
      deleteMeeting(selectedMeeting.id)
      setMeetings(meetings.filter((meeting) => meeting.id !== selectedMeeting.id))
      setIsDeleteDialogOpen(false)
      setSelectedMeeting(null)

      toast({
        title: "Meeting deleted",
        description: "The meeting has been successfully deleted.",
      })
    }
  }

  const getMeetingsForDay = (day) => {
    return meetings.filter((meeting) => {
      const meetingDate = parseISO(meeting.startTime)
      return isSameDay(meetingDate, day)
    })
  }

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{format(currentMonth, "MMMM yyyy")}</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={previousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="py-2 text-sm font-medium">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((day, dayIdx) => {
            const dayMeetings = getMeetingsForDay(day)

            return (
              <div
                key={day.toString()}
                className={cn(
                  "min-h-[100px] border p-1",
                  !isSameMonth(day, currentMonth) && "bg-muted/50 text-muted-foreground",
                  isSameDay(day, new Date()) && "border-primary",
                  "overflow-hidden",
                )}
                onClick={() => setSelectedDate(day)}
              >
                <div className="flex justify-between">
                  <span className="text-sm">{format(day, "d")}</span>
                  {dayMeetings.length > 0 && <Badge variant="outline">{dayMeetings.length}</Badge>}
                </div>

                <div className="mt-1 space-y-1 overflow-y-auto max-h-[80px]">
                  {dayMeetings.slice(0, 3).map((meeting) => (
                    <Tooltip key={meeting.id}>
                      <TooltipTrigger asChild>
                        <div
                          className={cn(
                            "text-xs p-1 rounded truncate cursor-pointer",
                            meeting.status === "scheduled" && "bg-blue-100 dark:bg-blue-900/30",
                            meeting.status === "in-progress" && "bg-green-100 dark:bg-green-900/30",
                            meeting.status === "completed" && "bg-gray-100 dark:bg-gray-800",
                            meeting.status === "cancelled" && "bg-red-100 dark:bg-red-900/30",
                          )}
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedMeeting(meeting)
                          }}
                        >
                          {format(parseISO(meeting.startTime), "h:mm a")} - {meeting.title}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="space-y-1">
                          <p className="font-medium">{meeting.title}</p>
                          <p className="text-xs">
                            {format(parseISO(meeting.startTime), "h:mm a")} -{" "}
                            {format(parseISO(meeting.endTime), "h:mm a")}
                          </p>
                          <p className="text-xs">{meeting.description}</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                  {dayMeetings.length > 3 && (
                    <div className="text-xs text-muted-foreground text-center">+{dayMeetings.length - 3} more</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {selectedMeeting && (
          <Card className="p-4 mt-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{selectedMeeting.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {format(parseISO(selectedMeeting.startTime), "EEEE, MMMM d, yyyy")}
                </p>
                <p className="text-sm">
                  {format(parseISO(selectedMeeting.startTime), "h:mm a")} -{" "}
                  {format(parseISO(selectedMeeting.endTime), "h:mm a")}
                </p>
                <Badge
                  className="mt-2"
                  variant={
                    selectedMeeting.status === "scheduled"
                      ? "outline"
                      : selectedMeeting.status === "in-progress"
                        ? "default"
                        : selectedMeeting.status === "completed"
                          ? "secondary"
                          : "destructive"
                  }
                >
                  {selectedMeeting.status.charAt(0).toUpperCase() + selectedMeeting.status.slice(1)}
                </Badge>
                <p className="mt-2 text-sm">{selectedMeeting.description}</p>
                <p className="mt-2 text-sm">
                  <strong>Organizer:</strong> {selectedMeeting.organizer}
                </p>
                <p className="text-sm">
                  <strong>Participants:</strong> {selectedMeeting.participants.join(", ")}
                </p>
              </div>

              <div className="flex gap-2">
                {selectedMeeting.status !== "completed" && selectedMeeting.status !== "cancelled" && (
                  <Button size="sm" onClick={() => onJoinMeeting(selectedMeeting.id)}>
                    <Video className="mr-2 h-4 w-4" />
                    Join
                  </Button>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Link href={`/meetings/${selectedMeeting.id}`}>View Details</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/meetings/${selectedMeeting.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </Card>
        )}

        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Meeting</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this meeting? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteMeeting}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  )
}
