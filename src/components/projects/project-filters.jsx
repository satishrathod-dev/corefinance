"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Project } from "@/components/projects/project-data"
import { Search } from "lucide-react"


export function ProjectFilters({ setFilteredProjects, allProjects }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")

  // Add null check to prevent "Cannot convert undefined or null to object" error
  const projects = allProjects || []

  // Get unique departments for filter options
  const departments = Array.from(new Set(projects.map((project) => project.department)))

  // Get unique statuses for filter options
  const statuses = Array.from(new Set(projects.map((project) => project.status)))

  useEffect(() => {
    // Add null check here too
    if (!allProjects) {
      setFilteredProjects([])
      return
    }

    let filtered = [...allProjects]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((project) => project.status === statusFilter)
    }

    // Apply department filter
    if (departmentFilter !== "all") {
      filtered = filtered.filter((project) => project.department === departmentFilter)
    }

    setFilteredProjects(filtered)
  }, [searchTerm, statusFilter, departmentFilter, allProjects, setFilteredProjects])

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      <div className="relative flex-grow">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          {statuses.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
        <SelectTrigger className="w-full sm:w-[180px]">
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
  )
}
