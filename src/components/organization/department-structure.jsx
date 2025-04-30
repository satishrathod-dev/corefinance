"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Building2, ChevronDown, Edit, Plus, Search, Trash2, Users2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

const departments = [
  {
    id: 1,
    name: "Engineering",
    headCount: 78,
    headOfDepartment: "Robert Chen",
    subDepartments: [
      { id: 101, name: "Frontend", headCount: 25, headOfDepartment: "Emma Johnson" },
      { id: 102, name: "Backend", headCount: 30, headOfDepartment: "Michael Smith" },
      { id: 103, name: "DevOps", headCount: 15, headOfDepartment: "Taylor Wong" },
      { id: 104, name: "QA", headCount: 8, headOfDepartment: "Sarah Parker" },
    ],
  },
  {
    id: 2,
    name: "Marketing",
    headCount: 45,
    headOfDepartment: "Jessica Wilson",
    subDepartments: [
      { id: 201, name: "Digital Marketing", headCount: 18, headOfDepartment: "Daniel Lee" },
      { id: 202, name: "Content Creation", headCount: 12, headOfDepartment: "Olivia Martinez" },
      { id: 203, name: "Brand Management", headCount: 8, headOfDepartment: "James Harris" },
      { id: 204, name: "Market Research", headCount: 7, headOfDepartment: "Sophia Chen" },
    ],
  },
  {
    id: 3,
    name: "Finance",
    headCount: 25,
    headOfDepartment: "William Davis",
    subDepartments: [
      { id: 301, name: "Accounting", headCount: 10, headOfDepartment: "Ava Robinson" },
      { id: 302, name: "Financial Planning", headCount: 8, headOfDepartment: "Noah White" },
      { id: 303, name: "Payroll", headCount: 7, headOfDepartment: "Mia Jackson" },
    ],
  },
  {
    id: 4,
    name: "Human Resources",
    headCount: 15,
    headOfDepartment: "Elizabeth Brown",
    subDepartments: [
      { id: 401, name: "Recruitment", headCount: 5, headOfDepartment: "Benjamin Thomas" },
      { id: 402, name: "Employee Relations", headCount: 4, headOfDepartment: "Charlotte Garcia" },
      { id: 403, name: "Training & Development", headCount: 6, headOfDepartment: "Liam Miller" },
    ],
  },
  {
    id: 5,
    name: "Sales",
    headCount: 40,
    headOfDepartment: "Christopher Martin",
    subDepartments: [
      { id: 501, name: "Inside Sales", headCount: 15, headOfDepartment: "Amelia Thompson" },
      { id: 502, name: "Field Sales", headCount: 18, headOfDepartment: "Alexander Anderson" },
      { id: 503, name: "Sales Operations", headCount: 7, headOfDepartment: "Harper Wilson" },
    ],
  },
  {
    id: 6,
    name: "Operations",
    headCount: 30,
    headOfDepartment: "Amanda Clark",
    subDepartments: [
      { id: 601, name: "Supply Chain", headCount: 12, headOfDepartment: "Oliver Wright" },
      { id: 602, name: "Facilities Management", headCount: 8, headOfDepartment: "Abigail Nelson" },
      { id: 603, name: "Logistics", headCount: 10, headOfDepartment: "Ethan Baker" },
    ],
  },
]

export function DepartmentStructure() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedDepartments, setExpandedDepartments] = useState([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredDepartments = departments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.headOfDepartment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.subDepartments.some(
        (sub) =>
          sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sub.headOfDepartment.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  )

  const toggleDepartment = (deptId) => {
    setExpandedDepartments((prev) => (prev.includes(deptId) ? prev.filter((id) => id !== deptId) : [...prev, deptId]))
  }

  const handleAddDepartment = () => {
    setIsAddDialogOpen(false)
    // Add department logic would go here
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold">Department Structure</CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1">
                <Plus className="h-4 w-4" /> Add Department
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Department</DialogTitle>
                <DialogDescription>
                  Create a new department or sub-department in your organization structure.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="department-name" className="text-right">
                    Name
                  </Label>
                  <Input id="department-name" placeholder="Enter department name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="department-head" className="text-right">
                    Head of Department
                  </Label>
                  <Input id="department-head" placeholder="Enter name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="parent-department" className="text-right">
                    Parent Department
                  </Label>
                  <Input id="parent-department" placeholder="Leave empty for top level" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddDepartment}>
                  Create Department
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search departments or team leads..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-2">
              {filteredDepartments.map((department) => (
                <Card key={department.id} className="overflow-hidden">
                  <Collapsible
                    open={expandedDepartments.includes(department.id)}
                    onOpenChange={() => toggleDepartment(department.id)}
                  >
                    <CollapsibleTrigger className="w-full">
                      <div className="flex items-center justify-between p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                        <div className="flex items-center gap-3">
                          <Building2 className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{department.name}</p>
                            <p className="text-sm text-muted-foreground">Lead: {department.headOfDepartment}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant="outline" className="bg-secondary/50">
                            <Users2 className="mr-1 h-3 w-3" />
                            {department.headCount}
                          </Badge>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <ChevronDown className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="border-t px-4 py-2 space-y-2">
                        {department.subDepartments.map((subDept) => (
                          <div
                            key={subDept.id}
                            className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50"
                          >
                            <div className="flex items-center gap-3 pl-6">
                              <div>
                                <p className="text-sm font-medium">{subDept.name}</p>
                                <p className="text-xs text-muted-foreground">Lead: {subDept.headOfDepartment}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <Badge variant="outline" className="bg-secondary/50">
                                <Users2 className="mr-1 h-3 w-3" />
                                {subDept.headCount}
                              </Badge>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                        <Button variant="ghost" className="w-full text-muted-foreground gap-1 mt-2">
                          <Plus className="h-4 w-4" /> Add Sub-Department
                        </Button>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
