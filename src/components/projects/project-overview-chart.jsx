"use client"

import { useState } from "react"
import { Project } from "@/components/projects/project-data"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export function ProjectOverviewChart({ projects }) {
  const [chartView, setChartView] = useState("department")

  // Make sure projects is defined
  const safeProjects = projects || []

  // Prepare data for department view
  const departmentData = safeProjects.reduce((acc, project) => {
    const existingDept = acc.find((item) => item.name === project.department)
    if (existingDept) {
      existingDept.count += 1
      existingDept.totalProgress += project.progress
    } else {
      acc.push({
        name: project.department,
        count: 1,
        totalProgress: project.progress,
        avgProgress: project.progress,
      })
    }
    return acc
  }, [])

  // Calculate average progress for each department
  departmentData.forEach((dept) => {
    dept.avgProgress = Math.round(dept.totalProgress / dept.count)
  })

  // Prepare data for status view
  const statusData = safeProjects.reduce((acc, project) => {
    const existingStatus = acc.find((item) => item.name === project.status)
    if (existingStatus) {
      existingStatus.count += 1
    } else {
      acc.push({
        name: project.status,
        count: 1,
      })
    }
    return acc
  }, [])

  // Sort data
  departmentData.sort((a, b) => b.count - a.count)
  statusData.sort((a, b) => b.count - a.count)

  const chartData = chartView === "department" ? departmentData : statusData

  // Generate colors based on index
  const getColor = (index) => {
    const colors = [
      "#3b82f6", // blue-500
      "#10b981", // emerald-500
      "#6366f1", // indigo-500
      "#f59e0b", // amber-500
      "#ef4444", // red-500
      "#8b5cf6", // violet-500
      "#ec4899", // pink-500
      "#14b8a6", // teal-500
      "#f97316", // orange-500
      "#84cc16", // lime-500
    ]
    return colors[index % colors.length]
  }

  return (
    // fix this below hight issue on mobile screens
    <div className="h-[400px]"> 
      <div className="mb-4 flex justify-end">
        <Select value={chartView} onValueChange={(value) => setChartView(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="View by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="department">By Department</SelectItem>
            <SelectItem value="status">By Status</SelectItem>
          </SelectContent>
        </Select>¸ 
      </div>

      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <ChartTooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <ChartTooltipContent>
                      <div className="font-medium">{payload[0].payload.name}</div>
                      <div className="text-sm text-muted-foreground">Projects: {payload[0].payload.count}</div>
                      {chartView === "department" && (
                        <div className="text-sm text-muted-foreground">
                          Avg. Progress: {payload[0].payload.avgProgress}%
                        </div>
                      )}
                    </ChartTooltipContent>
                  )
                }
                return null
              }}
            />
            <Bar dataKey="count" fill="#8884d8">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(index)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
