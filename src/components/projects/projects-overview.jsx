"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProjectDetailModal } from "@/components/projects/project-detail-modal"
import { ProjectFilters } from "@/components/projects/project-filters"
import { ProjectOverviewStats } from "@/components/projects/project-overview-stats"
import { ProjectOverviewChart } from "@/components/projects/project-overview-chart"
import { ProjectsList } from "@/components/projects/projects-list"
import { projects } from "@/components/projects/project-data"
import { Plus } from "lucide-react"
import { CreateProjectModal } from "@/components/projects/create-project-modal"

export function ProjectsOverview() {
  // Initialize with empty array to prevent null/undefined errors
  const [filteredProjects, setFilteredProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [activeProjects, setActiveProjects] = useState([])

  useEffect(() => {
    // Make sure projects is defined before filtering
    if (projects && Array.isArray(projects)) {
      // Filter out archived projects for the active projects count
      setActiveProjects(projects.filter((project) => !project.archived))
      // Initialize filtered projects with all projects
      setFilteredProjects(projects)
    }
  }, [])

  const handleViewDetails = (project) => {
    setSelectedProject(project)
    setShowDetailModal(true)
  }

  const handleEditProject = (project) => {
    // We'll open the same modal but in edit mode
    setSelectedProject(project)
    setShowCreateModal(true)
  }

  const handleArchiveProject = (project) => {
    // In a real application, this would call an API to update the project status
    // For now, we'll just show a notification
    alert(`Project "${project.name}" would be archived.`)
  }

  const handleDeleteProject = (project) => {
    // In a real application, this would call an API to delete the project
    // For now, we'll just show a notification
    alert(`Project "${project.name}" would be deleted.`)
  }

  const handleCreateProject = () => {
    setSelectedProject(null)
    setShowCreateModal(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <ProjectFilters setFilteredProjects={setFilteredProjects} allProjects={projects || []} />
        <Button onClick={handleCreateProject} className="shrink-0">
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ProjectOverviewStats activeProjects={activeProjects} />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="col-span-3 md:col-span-2">
          <CardHeader>
            <CardTitle>Project Progress</CardTitle>
            <CardDescription>Project completion and milestones across all departments</CardDescription>
          </CardHeader>
          <CardContent>
            <ProjectOverviewChart projects={activeProjects} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeProjects.slice(0, 4).map((project) => (
                <div key={project.id} className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <div>
                    <p className="text-sm font-medium">{project.name}</p>
                    <p className="text-xs text-muted-foreground">{project.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="ghost"
              className="w-full"
              onClick={() =>
                window.scrollTo({ top: document.getElementById("recent-projects")?.offsetTop, behavior: "smooth" })
              }
            >
              View All Projects
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div id="recent-projects">
        <ProjectsList
          projects={filteredProjects}
          onViewDetails={handleViewDetails}
          onEditProject={handleEditProject}
          onArchiveProject={handleArchiveProject}
          onDeleteProject={handleDeleteProject}
        />
      </div>

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
