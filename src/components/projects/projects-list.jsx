"use client"

import { useState } from "react"
import { Project } from "@/components/projects/project-data"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { MoreHorizontal, Eye, Edit, Archive, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export function ProjectsList({
  projects,
  onViewDetails,
  onEditProject,
  onArchiveProject,
  onDeleteProject,
}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [viewType, setViewType] = useState("grid")

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name)
      case "dueDate":
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      case "progress":
        return b.progress - a.progress
      case "priority":
        const priorityOrder = { Critical: 0, High: 1, Medium: 2, Low: 3 }
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      default:
        return 0
    }
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-500"
      case "In Progress":
        return "bg-blue-500"
      case "Planning":
        return "bg-purple-500"
      case "On Hold":
        return "bg-yellow-500"
      case "Cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="dueDate">Due Date</SelectItem>
              <SelectItem value="progress">Progress</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex border rounded-md">
            <Button
              variant={viewType === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewType("grid")}
              className="rounded-r-none"
            >
              Grid
            </Button>
            <Button
              variant={viewType === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewType("list")}
              className="rounded-l-none"
            >
              List
            </Button>
          </div>
        </div>
      </div>

      {sortedProjects.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No projects found matching your search criteria.</p>
        </div>
      ) : viewType === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription>{project.department}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onViewDetails(project)}>
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEditProject(project)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onArchiveProject(project)}>
                        <Archive className="mr-2 h-4 w-4" /> Archive
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDeleteProject(project)} className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`}></div>
                  <span className="text-sm">{project.status}</span>
                </div>
                <p className="text-sm line-clamp-2 mb-2">{project.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between pt-2">
                <div className="flex -space-x-2">
                  {Array.from({ length: Math.min(3, project.teamSize) }).map((_, i) => (
                    <Avatar key={i} className="border-2 border-background h-7 w-7">
                      <AvatarImage src={`/diverse-group-avatars.png?height=28&width=28&query=avatar ${i + 1}`} />
                      <AvatarFallback>U{i + 1}</AvatarFallback>
                    </Avatar>
                  ))}
                  {project.teamSize > 3 && (
                    <div className="flex items-center justify-center h-7 w-7 rounded-full bg-muted text-xs">
                      +{project.teamSize - 3}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Badge
                    variant={
                      project.priority === "Critical"
                        ? "destructive"
                        : project.priority === "High"
                          ? "default"
                          : "outline"
                    }
                  >
                    {project.priority}
                  </Badge>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {sortedProjects.map((project) => (
            <Card key={project.id}>
              <div className="flex flex-col md:flex-row md:items-center p-4 gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`}></div>
                    <h3 className="font-medium">{project.name}</h3>
                    <Badge variant="outline" className="ml-2">
                      {project.department}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1 mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <div className="flex items-center">
                      <span className="text-muted-foreground mr-1">Due:</span>
                      {new Date(project.dueDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <span className="text-muted-foreground mr-1">Team:</span>
                      {project.teamSize} members
                    </div>
                    <div className="flex items-center">
                      <span className="text-muted-foreground mr-1">Budget:</span>${project.budget.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <div className="w-full md:w-32">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  <Badge
                    variant={
                      project.priority === "Critical"
                        ? "destructive"
                        : project.priority === "High"
                          ? "default"
                          : "outline"
                    }
                  >
                    {project.priority}
                  </Badge>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" onClick={() => onViewDetails(project)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => onEditProject(project)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => onArchiveProject(project)}>
                      <Archive className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => onDeleteProject(project)} className="text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
