"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"
import { Building2, Users2, FolderClock, ArrowRight, DollarSign, TrendingUp } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

const orgMetrics = [
  {
    title: "Total Employees",
    value: "245",
    change: "+12%",
    icon: Users2,
    description: "Compared to last month",
  },
  {
    title: "Departments",
    value: "8",
    change: "+1",
    icon: Building2,
    description: "New tech department added",
  },
  {
    title: "Active Projects",
    value: "32",
    change: "+5",
    icon: FolderClock,
    description: "Increase from last quarter",
  },
  {
    title: "Budget Utilization",
    value: "78.5%",
    change: "+2.3%",
    icon: DollarSign,
    description: "Slightly above target",
  },
]

const departmentDistributionData = [
  { name: "Engineering", value: 85 },
  { name: "Sales", value: 45 },
  { name: "Marketing", value: 35 },
  { name: "Finance", value: 25 },
  { name: "HR", value: 15 },
  { name: "Operations", value: 40 },
]

const projectProgressData = [
  { name: "Q1", completed: 18, ongoing: 12 },
  { name: "Q2", completed: 24, ongoing: 15 },
  { name: "Q3", completed: 30, ongoing: 22 },
  { name: "Q4", completed: 17, ongoing: 32 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

export function OrganizationOverview() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {orgMetrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">{metric.description}</p>
              <div className="mt-2 flex items-center text-xs text-green-500">
                <TrendingUp className="mr-1 h-3 w-3" />
                {metric.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Employee Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {departmentDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Project Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projectProgressData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="completed" name="Completed" fill={isDark ? "#adfa1d" : "#0ea5e9"} />
                  <Bar dataKey="ongoing" name="Ongoing" fill={isDark ? "#1e40af" : "#3b82f6"} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Recent Organization Updates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            {[
              {
                title: "New HR Policy Update",
                date: "2 days ago",
                description: "Updated work-from-home policy to allow 3 days remote work per week.",
              },
              {
                title: "Quarterly Budget Review",
                date: "1 week ago",
                description: "Financial department completed Q3 budget review with 12% increase in R&D allocation.",
              },
              {
                title: "New Team Member Onboarding",
                date: "2 weeks ago",
                description: "15 new team members joined across Engineering, Marketing, and Sales departments.",
              },
            ].map((update, index) => (
              <div key={index} className="flex flex-col space-y-2 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{update.title}</h3>
                  <span className="text-xs text-muted-foreground">{update.date}</span>
                </div>
                <p className="text-sm text-muted-foreground">{update.description}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <Button variant="outline" size="sm" className="gap-1">
              View all updates <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
