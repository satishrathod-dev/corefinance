"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Project } from "@/components/projects/project-data"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, Clock, Edit, FileText, MessageSquare, Users } from "lucide-react"
import { Progress } from "@/components/ui/progress"


export function ProjectDetailModal({ project, isOpen, onClose, onEdit }){
  const [activeTab, setActiveTab] = useState("overview")

  // Add null check to prevent accessing properties of undefined
  if (!project) {
    return null
  }

  // Safely access nested properties
  const budget = project.budget || 0
  const tags = project.tags || []
  const teamSize = project.teamSize || 0
  const estimatedHours = project.estimatedHours || 0
  const createdAt = project.createdAt || new Date().toISOString()
  const startDate = project.startDate || new Date().toISOString()
  const dueDate = project.dueDate || new Date().toISOString()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">{project.name}</DialogTitle>
            <Badge
              variant={
                project.status === "Completed" ? "default" : project.status === "In Progress" ? "secondary" : "outline"
              }
            >
              {project.status}
            </Badge>
          </div>
          <DialogDescription>
            Project ID: {project.id} • Created on {new Date(createdAt).toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-muted-foreground">{project.description}</p>

                <h3 className="text-lg font-medium mt-4 mb-2">Progress</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Completion</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <h3 className="text-lg font-medium mt-4 mb-2">Timeline</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Start Date: {new Date(startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Due Date: {new Date(dueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Estimated Hours: {estimatedHours}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Department</span>
                    <span>{project.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Priority</span>
                    <span>{project.priority}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Budget</span>
                    <span>${budget.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tags</span>
                    <div className="flex flex-wrap gap-1 justify-end">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-medium mt-4 mb-2">Recent Activity</h3>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={`/diverse-group-avatars.png?height=32&width=32&query=avatar ${i}`} />
                        <AvatarFallback>U{i}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">User {i}</span> updated the project status
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {i} day{i !== 1 ? "s" : ""} ago
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            <h3 className="text-lg font-medium mb-2">Team Members</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-3 p-3 border rounded-md">
                  <Avatar>
                    <AvatarImage src={`/diverse-group-avatars.png?height=40&width=40&query=avatar ${i}`} />
                    <AvatarFallback>U{i}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Team Member {i}</p>
                    <p className="text-sm text-muted-foreground">Role: {i % 2 === 0 ? "Developer" : "Designer"}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Tasks</h3>
              <Button variant="outline" size="sm">
                Add Task
              </Button>
            </div>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="p-3 border rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">
                      Task {i}: {i % 2 === 0 ? "Design" : "Development"} Task
                    </p>
                    <Badge variant={i % 3 === 0 ? "default" : i % 3 === 1 ? "secondary" : "outline"}>
                      {i % 3 === 0 ? "Completed" : i % 3 === 1 ? "In Progress" : "Pending"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">This is a sample task description for task {i}.</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={`/diverse-group-avatars.png?height=20&width=20&query=avatar ${i}`} />
                        <AvatarFallback>U{i}</AvatarFallback>
                      </Avatar>
                      <span>Assigned to User {i}</span>
                    </div>
                    <span>Due: {new Date(Date.now() + i * 86400000).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="files" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Files</h3>
              <Button variant="outline" size="sm">
                Upload File
              </Button>
            </div>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        Document-{i}.{i % 2 === 0 ? "pdf" : "docx"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Uploaded {i} day{i !== 1 ? "s" : ""} ago by User {i}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="comments" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Comments</h3>
              <Button variant="outline" size="sm">
                Add Comment
              </Button>
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-3">
                  <Avatar>
                    <AvatarImage src={`/diverse-group-avatars.png?height=40&width=40&query=avatar ${i}`} />
                    <AvatarFallback>U{i}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">User {i}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-sm mt-1">
                      This is comment {i} on the project. It contains feedback and updates about the progress.
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <button className="text-xs text-muted-foreground hover:text-foreground">Reply</button>
                      <button className="text-xs text-muted-foreground hover:text-foreground">Edit</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{teamSize} team members</span>
            <MessageSquare className="h-4 w-4 text-muted-foreground ml-4" />
            <span className="text-sm">12 comments</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={onEdit}>
              <Edit className="h-4 w-4 mr-2" /> Edit Project
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
