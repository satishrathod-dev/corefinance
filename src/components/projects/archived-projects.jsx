"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { projects } from "@/components/projects/project-data"
import { ProjectDetailModal } from "@/components/projects/project-detail-modal"
import { Archive, Search } from "lucide-react"

export function ArchivedProjects() {
  const [archivedProjects, setArchivedProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProject, setSelectedProject] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  useEffect(() => {
    // Make sure projects is defined before filtering
    if (projects && Array.isArray(projects)) {
      // Filter only archived projects
      const archived = projects.filter((project) => project.archived)
      setArchivedProjects(archived)
      setFilteredProjects(archived)
    }
  }, [])

  useEffect(() => {
    // Apply search filter
    if (searchTerm && archivedProjects.length > 0) {
      const filtered = archivedProjects.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredProjects(filtered)
    } else {
      setFilteredProjects(archivedProjects)
    }
  }, [searchTerm, archivedProjects])

  const handleViewDetails = (project) => {
    setSelectedProject(project)
    setShowDetailModal(true)
  }

  const handleUnarchiveProject = (project) => {
    // In a real application, this would call an API to update the project status
    alert(`Project "${project.name}" would be unarchived.`)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Archived Projects</CardTitle>
          <CardDescription>View and manage your archived projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search archived projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="text-center py-10">
              <Archive className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No archived projects found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{project.name}</h3>
                      <span className="text-xs text-muted-foreground">
                        Archived on {new Date(project.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-muted-foreground">Department:</span>
                        <span>{project.department}</span>
                        <span className="text-muted-foreground ml-2">Status:</span>
                        <span>{project.status}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleViewDetails(project)}>
                          View Details
                        </Button>
                        <Button size="sm" onClick={() => handleUnarchiveProject(project)}>
                          Unarchive
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {showDetailModal && selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          onEdit={() => {
            setShowDetailModal(false)
          }}
        />
      )}
    </div>
  )
}
