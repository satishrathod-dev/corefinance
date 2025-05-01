"use client"

import { Project } from "@/components/projects/project-data"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format, differenceInDays } from "date-fns"

export function Timeline({ projects }) {
  // Make sure projects is defined
  const safeProjects = projects || []

  // Find the earliest start date and latest end date
  const startDates = safeProjects.map((p) => new Date(p.startDate))
  const endDates = safeProjects.map((p) => new Date(p.dueDate))

  const earliestDate = startDates.length > 0 ? new Date(Math.min(...startDates.map((d) => d.getTime()))) : new Date()
  const latestDate = endDates.length > 0 ? new Date(Math.max(...endDates.map((d) => d.getTime()))) : new Date()

  // Calculate total timeline duration in days
  const totalDays = differenceInDays(latestDate, earliestDate) + 1

  // Get status color
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
    <div className="space-y-6">
      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
        <span>{format(earliestDate, "MMM d, yyyy")}</span>
        <span>{format(latestDate, "MMM d, yyyy")}</span>
      </div>

      {safeProjects.map((project) => {
        const startDate = new Date(project.startDate)
        const dueDate = new Date(project.dueDate)

        // Calculate position and width percentages
        const startOffset = (differenceInDays(startDate, earliestDate) / totalDays) * 100
        const duration = ((differenceInDays(dueDate, startDate) + 1) / totalDays) * 100

        return (
          <Card key={project.id} className="p-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{project.name}</h3>
                <Badge variant="outline">{project.department}</Badge>
              </div>

              <div className="text-xs text-muted-foreground flex justify-between">
                <span>Start: {format(startDate, "MMM d, yyyy")}</span>
                <span>Due: {format(dueDate, "MMM d, yyyy")}</span>
              </div>

              <div className="h-6 w-full bg-muted rounded-full relative mt-1">
                <div
                  className="absolute h-full rounded-full"
                  style={{
                    left: `${startOffset}%`,
                    width: `${duration}%`,
                    backgroundColor: "rgba(var(--primary), 0.2)",
                  }}
                >
                  <div
                    className={`h-full rounded-full ${getStatusColor(project.status)}`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`}></div>
                  <span>{project.status}</span>
                </div>
                <span>{project.progress}% Complete</span>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
