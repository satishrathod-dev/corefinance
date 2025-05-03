"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { ChevronDown, Filter, MoreHorizontal, Search, UserPlus } from "lucide-react"

const teamMembers = [
    {
      id: 1,
      name: "Satish Rathod",
      role: "Senior Developer",
      department: "Engineering",
      email: "satish.rathod@example.com",
      status: "Active",
      avatar:
        "",
    },
    {
      id: 2,
      name: "Preeti Pawar",
      role: "Marketing Director",
      department: "Marketing",
      email: "preeti.pawar@example.com",
      status: "Active",
      avatar: "",
    },
    {
      id: 3,
      name: "Rajesh Kumar",
      role: "Financial Analyst",
      department: "Finance",
      email: "rajesh.kumar@example.com",
      status: "On Leave",
      avatar: "",
    },
    {
      id: 4,
      name: "Priya Patel",
      role: "HR Manager",
      department: "Human Resources",
      email: "priya.patel@example.com",
      status: "Active",
      avatar: "",
    },
    {
      id: 5,
      name: "Vikram Singh",
      role: "Sales Representative",
      department: "Sales",
      email: "vikram.singh@example.com",
      status: "Active",
      avatar: "",
    },
    {
      id: 6,
      name: "Ananya Desai",
      role: "Product Manager",
      department: "Engineering",
      email: "ananya.desai@example.com",
      status: "Active",
      avatar: "",
    },
    {
      id: 7,
      name: "Arjun Mehta",
      role: "Operations Manager",
      department: "Operations",
      email: "arjun.mehta@example.com",
      status: "Inactive",
      avatar:
        "",
    },
    {
      id: 8,
      name: "Neha Gupta",
      role: "Customer Support",
      department: "Customer Service",
      email: "neha.gupta@example.com",
      status: "Active",
      avatar:
        "",
    },
  ]

const departments = [
  "All Departments",
  "Engineering",
  "Marketing",
  "Finance",
  "Human Resources",
  "Sales",
  "Operations",
  "Customer Service",
]

export function TeamMembers() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments")
  const [showInviteDialog, setShowInviteDialog] = useState(false)

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDepartment = selectedDepartment === "All Departments" || member.department === selectedDepartment

    return matchesSearch && matchesDepartment
  })

  const getStatusStyle = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Inactive":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "On Leave":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-xl">Team Members</CardTitle>
              <CardDescription>Manage your organization's team members</CardDescription>
            </div>
            <div className="flex gap-2">
              <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
                <DialogTrigger asChild>
                  <Button className="gap-1">
                    <UserPlus className="h-4 w-4" />
                    <span>Invite Member</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Invite Team Member</DialogTitle>
                    <DialogDescription>
                      Send an invitation to a new team member to join your organization.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="colleague@example.com" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="role">Role</Label>
                      <Input id="role" placeholder="e.g. Developer, Designer, etc." />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="department">Department</Label>
                      <Select defaultValue="Engineering">
                        <SelectTrigger id="department">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments
                            .filter((d) => d !== "All Departments")
                            .map((dept) => (
                              <SelectItem key={dept} value={dept}>
                                {dept}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="message">Personal Message (Optional)</Label>
                      <Input id="message" placeholder="Add a personal message..." />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowInviteDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setShowInviteDialog(false)}>Send Invitation</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 mb-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search members..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-1">
                    <Filter className="h-4 w-4" />
                    <span>Department</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {departments.map((dept) => (
                    <DropdownMenuItem
                      key={dept}
                      onClick={() => setSelectedDepartment(dept)}
                      className={selectedDepartment === dept ? "bg-secondary" : ""}
                    >
                      {dept}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredMembers.map((member) => (
              <Card key={member.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className={getStatusStyle(member.status)}>
                      {member.status}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit Role</DropdownMenuItem>
                        <DropdownMenuItem>Suspend Access</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">{member.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">{member.role}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-3 pb-2 flex justify-between">
                  <div className="text-xs text-muted-foreground">{member.department}</div>
                  <div className="text-xs text-muted-foreground">{member.email}</div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredMembers.length} of {teamMembers.length} team members
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
