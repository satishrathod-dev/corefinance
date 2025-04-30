"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Calendar, CheckCircle2, Clock, Filter, MoreHorizontal, Plus, Search } from "lucide-react"

const projects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Redesign the company website with improved UX/UI",
    status: "In Progress",
    progress: 75,
    dueDate: "2023-12-15",
    department: "Marketing",
    team: [
      {
        id: 1,
        name: "Alex Johnson",
        avatar:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238645_11475210.jpg-lU8bOe6TLt5Rv51hgjg8NT8PsDBmvN.jpeg",
      },
      {
        id: 2,
        name: "Samantha Lee",
        avatar:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238208_11475222.jpg-poEIzVHAGiIfMFQ7EiF8PUG1u0Zkzz.jpeg",
      },
      {
        id: 3,
        name: "Michael Chen",
        avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dd.jpg-4MCwPC2Bec6Ume26Yo1kao3CnONxDg.jpeg",
      },
    ],
  },
  {
    id: 2,
    name: "Product Launch: Financial App",
    description: "Launch the new mobile financial application",
    status: "On Hold",
    progress: 35,
    dueDate: "2024-01-30",
    department: "Engineering",
    team: [
      {
        id: 4,
        name: "Emily Rodriguez",
        avatar:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9334178.jpg-Y74tW6XFO68g7N36SE5MSNDNVKLQ08.jpeg",
      },
      {
        id: 5,
        name: "David Kim",
        avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5295.jpg-fLw0wGGZp8wuTzU5dnyfjZDwAHN98a.jpeg",
      },
    ],
  },
  {
    id: 3,
    name: "2024 Budget Planning",
    description: "Finalize the budget plan for the upcoming fiscal year",
    status: "Completed",
    progress: 100,
    dueDate: "2023-11-30",
    department: "Finance",
    team: [
      {
        id: 6,
        name: "Sarah Wilson",
        avatar:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9720029.jpg-Yf9h2a3kT7rYyCb648iLIeHThq5wEy.jpeg",
      },
      {
        id: 7,
        name: "James Taylor",
        avatar:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/27470341_7294795.jpg-XE0zf7R8tk4rfA1vm4fAHeZ1QoVEOo.jpeg",
      },
    ],
  },
  {
    id: 4,
    name: "Employee Onboarding Revamp",
    description: "Improve the employee onboarding process and materials",
    status: "In Progress",
    progress: 60,
    dueDate: "2024-02-15",
    department: "Human Resources",
    team: [
      {
        id: 8,
        name: "Lisa Brown",
        avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/799.jpg-0tEi4Xvg5YsFoGoQfQc698q4Dygl1S.jpeg",
      },
      {
        id: 1,
        name: "Alex Johnson",
        avatar:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238645_11475210.jpg-lU8bOe6TLt5Rv51hgjg8NT8PsDBmvN.jpeg",
      },
    ],
  },
  {
    id: 5,
    name: "Sales Strategy 2024",
    description: "Develop new sales strategy and targets for the coming year",
    status: "Not Started",
    progress: 0,
    dueDate: "2024-01-15",
    department: "Sales",
    team: [
      {
        id: 5,
        name: "David Kim",
        avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5295.jpg-fLw0wGGZp8wuTzU5dnyfjZDwAHN98a.jpeg",
      },
      {
        id: 7,
        name: "James Taylor",
        avatar:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/27470341_7294795.jpg-XE0zf7R8tk4rfA1vm4fAHeZ1QoVEOo.jpeg",
      },
    ],
  },
  {
    id: 6,
    name: "Supply Chain Optimization",
    description: "Streamline supply chain processes for better efficiency",
    status: "In Progress",
    progress: 45,
    dueDate: "2024-03-30",
    department: "Operations",
    team: [
      {
        id: 3,
        name: "Michael Chen",
        avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dd.jpg-4MCwPC2Bec6Ume26Yo1kao3CnONxDg.jpeg",
      },
      {
        id: 8,
        name: "Lisa Brown",
        avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/799.jpg-0tEi4Xvg5YsFoGoQfQc698q4Dygl1S.jpeg",
      },
    ],
  },
]

const getStatusStyle = (status) => {
  switch (status) {
    case "In Progress":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "Completed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "On Hold":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "Not Started":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  }
}

export function OrganizationProjects() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)

  const filteredProjects = projects.filter((project) => {
    // Filter by search query
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.department.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by tab selection
    let matchesTab = true
    if (activeTab !== "all") {
      if (activeTab === "inProgress") {
        matchesTab = project.status === "In Progress"
      } else if (activeTab === "completed") {
        matchesTab = project.status === "Completed"
      } else if (activeTab === "upcoming") {
        matchesTab = project.status === "Not Started"
      } else if (activeTab === "onHold") {
        matchesTab = project.status === "On Hold"
      }
    }

    return matchesSearch && matchesTab
  })

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-xl">Organization Projects</CardTitle>
              <CardDescription>Manage and track projects across all departments</CardDescription>
            </div>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button className="gap-1">
                  <Plus className="h-4 w-4" />
                  <span>New Project</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Project</DialogTitle>
                  <DialogDescription>Add a new project to your organization's portfolio.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="project-name">Project Name</Label>
                    <Input id="project-name" placeholder="Enter project name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="project-description">Description</Label>
                    <Input id="project-description" placeholder="Enter project description" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="project-department">Department</Label>
                      <Select>
                        <SelectTrigger id="project-department">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="engineering">Engineering</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="hr">Human Resources</SelectItem>
                          <SelectItem value="sales">Sales</SelectItem>
                          <SelectItem value="operations">Operations</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="project-status">Status</Label>
                      <Select defaultValue="notStarted">
                        <SelectTrigger id="project-status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="notStarted">Not Started</SelectItem>
                          <SelectItem value="inProgress">In Progress</SelectItem>
                          <SelectItem value="onHold">On Hold</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="project-due-date">Due Date</Label>
                    <Input id="project-due-date" type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="project-team">Team Members</Label>
                    <Input id="project-team" placeholder="Select team members" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setShowAddDialog(false)}>Create Project</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4" onValueChange={setActiveTab}>
            <div className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0">
              <TabsList>
                <TabsTrigger value="all">All Projects</TabsTrigger>
                <TabsTrigger value="inProgress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="onHold">On Hold</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <div className="relative w-60">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search projects..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) => (
                  <Card key={project.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge className={getStatusStyle(project.status)}>{project.status}</Badge>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardTitle className="text-lg mt-2">{project.name}</CardTitle>
                      <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
                          </div>
                          <Badge variant="outline">{project.department}</Badge>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0 pb-2">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex -space-x-2">
                          {project.team.map((member) => (
                            <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                              <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                              <AvatarFallback>
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <Button variant="ghost" size="sm" className="text-muted-foreground gap-1">
                          <Clock className="h-4 w-4" />
                          {project.status === "Completed" ? (
                            <span className="flex items-center gap-1">
                              <CheckCircle2 className="h-3 w-3" /> Complete
                            </span>
                          ) : (
                            <span>View Tasks</span>
                          )}
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="inProgress" className="mt-0">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) => (
                  <Card key={project.id}>{/* Same project card structure as above */}</Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="mt-0">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) => (
                  <Card key={project.id}>{/* Same project card structure as above */}</Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="upcoming" className="mt-0">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) => (
                  <Card key={project.id}>{/* Same project card structure as above */}</Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="onHold" className="mt-0">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) => (
                  <Card key={project.id}>{/* Same project card structure as above */}</Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredProjects.length} of {projects.length} projects
          </div>
          <Button variant="outline" size="sm">
            View All Projects
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
