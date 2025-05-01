"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {  projects } from "@/components/projects/project-data"
import { ProjectsList } from "@/components/projects/projects-list"
import { ProjectDetailModal } from "@/components/projects/project-detail-modal"
import { CreateProjectModal } from "@/components/projects/create-project-modal"
import { Plus, Filter } from "lucide-react"

export function ActiveProjects() {
  // Initialize with empty arrays to prevent null/undefined errors
  const [activeProjects, setActiveProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedProject, setSelectedProject] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)

  // Get unique departments, priorities, and statuses for filters
  const allProjects = projects || []
  const departments = [...new Set(allProjects.map((p) => p.department))]
  const priorities = [...new Set(allProjects.map((p) => p.priority))]
  const statuses = [...new Set(allProjects.map((p) => p.status))]

  useEffect(() => {
    // Make sure projects is defined before filtering
    if (projects && Array.isArray(projects)) {
      // Filter out archived projects
      const active = projects.filter((project) => !project.archived)
      setActiveProjects(active)
      setFilteredProjects(active)
    }
  }, [])

  useEffect(() => {
    // Apply filters
    let filtered = [...activeProjects]

    // Search term filter
    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Department filter
    if (departmentFilter !== "all") {
      filtered = filtered.filter((project) => project.department === departmentFilter)
    }

    // Priority filter
    if (priorityFilter !== "all") {
      filtered = filtered.filter((project) => project.priority === priorityFilter)
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((project) => project.status === statusFilter)
    }

    setFilteredProjects(filtered)
  }, [activeProjects, searchTerm, departmentFilter, priorityFilter, statusFilter])

  const handleViewDetails = (project) => {
    setSelectedProject(project)
    setShowDetailModal(true)
  }

  const handleEditProject = (project) => {
    setSelectedProject(project)
    setShowCreateModal(true)
  }

  const handleArchiveProject = (project) => {
    // In a real application, this would call an API to update the project status
    alert(`Project "${project.name}" would be archived.`)
  }

  const handleDeleteProject = (project) => {
    // In a real application, this would call an API to delete the project
    alert(`Project "${project.name}" would be deleted.`)
  }

  const handleCreateProject = () => {
    setSelectedProject(null)
    setShowCreateModal(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Button onClick={handleCreateProject} className="shrink-0">
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Projects</CardTitle>
          <CardDescription>View and manage all your active projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Filters:</span>
              </div>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  {priorities.map((priority) => (
                    <SelectItem key={priority} value={priority}>
                      {priority}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
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
            </div>
          </div>

          <ProjectsList
            projects={filteredProjects}
            onViewDetails={handleViewDetails}
            onEditProject={handleEditProject}
            onArchiveProject={handleArchiveProject}
            onDeleteProject={handleDeleteProject}
          />
        </CardContent>
      </Card>

      {showDetailModal && selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          onEdit={() => {
            setShowDetailModal(false)
            handleEditProject(selectedProject)
          }}
        />
      )}

      <CreateProjectModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        editProject={selectedProject}
      />
    </div>
  )
}
