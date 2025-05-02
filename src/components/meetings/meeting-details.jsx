"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { format, parseISO } from "date-fns"
import { ArrowLeft, Video, Edit, Trash2, Users, Calendar, Clock, Tag, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Meeting, deleteMeeting } from "./meetings-data"
import { useToast } from "@/components/ui/use-toast"

export default function MeetingDetails({ meeting }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleDeleteMeeting = () => {
    deleteMeeting(meeting.id)
    setIsDeleteDialogOpen(false)

    toast({
      title: "Meeting deleted",
      description: "The meeting has been successfully deleted.",
    })

    router.push("/meetings")
  }

  const handleJoinMeeting = () => {
    toast({
      title: "Joining meeting",
      description: `You are joining meeting #${meeting.id}`,
    })
    // In a real application, this would redirect to a video conferencing solution
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/meetings">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">{meeting.title}</h1>
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
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Meeting Details</CardTitle>
              <CardDescription>View and manage meeting information</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details">
                <TabsList className="mb-4 w-full grid grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="participants">Participants</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Date</p>
                        <p className="text-sm text-muted-foreground">
                          {format(parseISO(meeting.startTime), "EEEE, MMMM d, yyyy")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Time</p>
                        <p className="text-sm text-muted-foreground">
                          {format(parseISO(meeting.startTime), "h:mm a")} -{" "}
                          {format(parseISO(meeting.endTime), "h:mm a")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Type</p>
                        <p className="text-sm text-muted-foreground">{meeting.type}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Organizer</p>
                        <p className="text-sm text-muted-foreground">{meeting.organizer}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium">Description</p>
                    <p className="text-sm text-muted-foreground mt-1">{meeting.description}</p>
                  </div>

                  {meeting.agenda && (
                    <div>
                      <p className="text-sm font-medium">Agenda</p>
                      <ul className="list-disc list-inside text-sm text-muted-foreground mt-1 space-y-1">
                        {meeting.agenda.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="participants">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Participants ({meeting.participants.length})</p>
                      <div className="grid gap-2">
                        {meeting.participants.map((participant, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 rounded-md border">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{participant.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{participant}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="notes">
                  <div className="space-y-4">
                    {meeting.notes ? (
                      <div>
                        <p className="text-sm font-medium">Meeting Notes</p>
                        <div className="mt-2 p-4 rounded-md border bg-muted/50">
                          <p className="text-sm whitespace-pre-line">{meeting.notes}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <MessageSquare className="mx-auto h-8 w-8 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">No notes available for this meeting.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(meeting.status === "scheduled" || meeting.status === "in-progress") && (
                <Button className="w-full" onClick={handleJoinMeeting}>
                  <Video className="mr-2 h-4 w-4" />
                  Join Meeting
                </Button>
              )}

              <Button variant="outline" className="w-full" asChild>
                <Link href={`/meetings/${meeting.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Meeting
                </Link>
              </Button>

              <Button variant="destructive" className="w-full" onClick={() => setIsDeleteDialogOpen(true)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Meeting
              </Button>
            </CardContent>
          </Card>

          {meeting.resources && meeting.resources.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {meeting.resources.map((resource, index) => (
                    <li key={index}>
                      <Link href={resource.url} className="text-sm text-blue-600 hover:underline" target="_blank">
                        {resource.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
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
