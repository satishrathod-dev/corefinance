import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { permissionsData } from "./permissions-data"
import { Activity, Users, Shield, UserCheck, FileText } from "lucide-react"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js"
import { Bar, Pie } from "react-chartjs-2"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)

export default function PermissionsOverview() {
  const { stats } = permissionsData

  // Bar chart data
  const barChartData = {
    labels: stats.usersByRole.map((role) => role.name),
    datasets: [
      {
        label: "Users",
        data: stats.usersByRole.map((role) => role.count),
        backgroundColor: "rgba(136, 132, 216, 0.8)",
        borderColor: "rgba(136, 132, 216, 1)",
        borderWidth: 1,
      },
    ],
  }

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Users by Role",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  // Pie chart data
  const pieChartData = {
    labels: stats.permissionsByRole.map((role) => role.name),
    datasets: [
      {
        label: "Permissions",
        data: stats.permissionsByRole.map((role) => role.count),
        backgroundColor: [
          "rgba(0, 136, 254, 0.8)",
          "rgba(0, 196, 159, 0.8)",
          "rgba(255, 187, 40, 0.8)",
          "rgba(255, 128, 66, 0.8)",
          "rgba(136, 132, 216, 0.8)",
        ],
        borderColor: [
          "rgba(0, 136, 254, 1)",
          "rgba(0, 196, 159, 1)",
          "rgba(255, 187, 40, 1)",
          "rgba(255, 128, 66, 1)",
          "rgba(136, 132, 216, 1)",
        ],
        borderWidth: 1,
      },
    ],
  }

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Permissions by Role",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || ""
            const value = context.raw || 0
            const total = context.dataset.data.reduce((a, b) => a + b, 0)
            const percentage = Math.round((value / total) * 100)
            return `${label}: ${value} (${percentage}%)`
          },
        },
      },
    },
  }

  return (
    <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {/* Stats Cards */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalUsers}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {stats.activeUsers} active, {stats.inactiveUsers} inactive
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Roles</CardTitle>
          <Shield className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalRoles}</div>
          <p className="text-xs text-muted-foreground mt-1">From Administrator to Viewer</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          <UserCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeUsers}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {Math.round((stats.activeUsers / stats.totalUsers) * 100)}% of total users
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Recent Changes</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.recentPermissionChanges}</div>
          <p className="text-xs text-muted-foreground mt-1">Permission changes in last 30 days</p>
        </CardContent>
      </Card>

      {/* Charts */}
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>Users by Role</CardTitle>
          <CardDescription>Distribution of users across different roles</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <div className="h-full w-full">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>Permissions by Role</CardTitle>
          <CardDescription>Number of permissions assigned to each role</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <div className="h-full w-full">
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="col-span-1 md:col-span-4">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest permission changes and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {permissionsData.logs.slice(0, 5).map((log) => (
              <div key={log.id} className="flex items-start gap-4 border-b pb-4 last:border-0">
                <div className="rounded-full bg-primary/10 p-2">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{log.action}</p>
                  <p className="text-sm text-muted-foreground">{log.description}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{log.user}</span>
                    <span>•</span>
                    <span>{new Date(log.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
