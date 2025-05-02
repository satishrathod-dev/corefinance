"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { format, parseISO } from "date-fns"
import { Video, Edit, Trash2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getMeetings, deleteMeeting, Meeting } from "./meetings-data"
import { useToast } from "@/components/ui/use-toast"

export default function MeetingsList({ filters, onJoinMeeting }) {
  const { toast } = useToast()
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

    // Sort by start time
    filteredMeetings.sort((a, b) => {
      return new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    })

    setMeetings(filteredMeetings)
  }, [filters])

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

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Organizer</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {meetings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No meetings found.
                </TableCell>
              </TableRow>
            ) : (
              meetings.map((meeting) => (
                <TableRow key={meeting.id}>
                  <TableCell className="font-medium">
                    <Link href={`/meetings/${meeting.id}`} className="hover:underline">
                      {meeting.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{format(parseISO(meeting.startTime), "MMM d, yyyy")}</span>
                      <span className="text-sm text-muted-foreground">
                        {format(parseISO(meeting.startTime), "h:mm a")} - {format(parseISO(meeting.endTime), "h:mm a")}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        meeting.status === "scheduled"
                          ? "outline"
                          : meeting.status === "in-progress"
                            ? "default"
                            : meeting.status === "completed"
                              ? "secondary"
                              : "destructive"
                      }
                    >
                      {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{meeting.type}</TableCell>
                  <TableCell>{meeting.organizer}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {(meeting.status === "scheduled" || meeting.status === "in-progress") && (
                        <Button size="sm" variant="outline" onClick={() => onJoinMeeting(meeting.id)}>
                          <Video className="h-4 w-4" />
                        </Button>
                      )}

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
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
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/meetings/${meeting.id}`}>
                              <ExternalLink className="mr-2 h-4 w-4" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/meetings/${meeting.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedMeeting(meeting)
                              setIsDeleteDialogOpen(true)
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

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
  )
}
