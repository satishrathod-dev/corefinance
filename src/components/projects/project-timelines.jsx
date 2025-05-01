"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { projects } from "@/components/projects/project-data"
import { Timeline } from "@/components/projects/timeline"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function ProjectTimelines() {
  const [filteredProjects, setFilteredProjects] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")

  const allProjects = projects || []

  const departments = [...new Set(allProjects.map((project) => project.department))]

  useEffect(() => {
    let filtered = [...allProjects]

    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (departmentFilter !== "all") {
      filtered = filtered.filter((project) => project.department === departmentFilter)
    }

    filtered.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())

    setFilteredProjects(filtered)
  }, [searchTerm, departmentFilter, allProjects])

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Project Timelines</CardTitle>
          <CardDescription>View project schedules and timelines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((department) => (
                  <SelectItem key={department} value={department}>
                    {department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No projects found matching your search criteria.</p>
            </div>
          ) : (
            <Timeline projects={filteredProjects} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
