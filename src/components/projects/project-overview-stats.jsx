"use client"

import { Card, CardContent } from "@/components/ui/card"
import{ Project } from "@/components/projects/project-data"
import { CheckCircle, Clock, AlertTriangle, BarChart } from "lucide-react"


export function ProjectOverviewStats({ activeProjects }) {
  // Make sure activeProjects is defined
  const projects = activeProjects || []

  // Calculate stats
  const totalProjects = projects.length
  const completedProjects = projects.filter((p) => p.status === "Completed").length
  const overdueProjects = projects.filter((p) => {
    const dueDate = new Date(p.dueDate)
    const today = new Date()
    return dueDate < today && p.status !== "Completed"
  }).length

  // Calculate average progress
  const avgProgress =
    projects.length > 0 ? Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length) : 0

  const stats = [
    {
      title: "Total Projects",
      value: totalProjects,
      icon: BarChart,
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    },
    {
      title: "Completed",
      value: completedProjects,
      icon: CheckCircle,
      color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    },
    {
      title: "Overdue",
      value: overdueProjects,
      icon: AlertTriangle,
      color: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    },
    {
      title: "Avg. Progress",
      value: `${avgProgress}%`,
      icon: Clock,
      color: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
    },
  ]

  return (
    <>
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div className={`rounded-full p-2 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
