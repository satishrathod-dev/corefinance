"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Filter, Calendar } from "lucide-react"
import { usePermissions } from "./permissions-data"

export default function PermissionLogs() {
  const { data } = usePermissions()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterAction, setFilterAction] = useState("all")
  const [filterUser, setFilterUser] = useState("all")
  const [filterDateFrom, setFilterDateFrom] = useState("")
  const [filterDateTo, setFilterDateTo] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  // Get unique action types and users for filters
  const actionTypes = ["all", ...new Set(data.logs.map((log) => log.action))]
  const users = ["all", ...new Set(data.logs.map((log) => log.user))]

  // Filter logs based on search and filters
  const filteredLogs = data.logs.filter((log) => {
    // Search term filter
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase())

    // Action filter
    const matchesAction = filterAction === "all" || log.action === filterAction

    // User filter
    const matchesUser = filterUser === "all" || log.user === filterUser

    // Date range filter
    let matchesDateRange = true
    if (filterDateFrom) {
      const fromDate = new Date(filterDateFrom)
      const logDate = new Date(log.timestamp)
      matchesDateRange = matchesDateRange && logDate >= fromDate
    }
    if (filterDateTo) {
      const toDate = new Date(filterDateTo)
      toDate.setHours(23, 59, 59, 999) // End of the day
      const logDate = new Date(log.timestamp)
      matchesDateRange = matchesDateRange && logDate <= toDate
    }

    return matchesSearch && matchesAction && matchesUser && matchesDateRange
  })

  // Function to get badge color based on action type
  const getActionBadgeVariant = (action) => {
    if (action.includes("Created") || action.includes("Added")) return "success"
    if (action.includes("Updated") || action.includes("Changed")) return "warning"
    if (action.includes("Deleted") || action.includes("Removed")) return "destructive"
    return "secondary"
  }

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Function to handle export
  const handleExport = () => {
    // In a real application, this would generate and download a CSV/JSON file
    alert("Export functionality would be implemented here")
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {showFilters && (
        <Card>
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="filterAction">Action Type</Label>
                <Select value={filterAction} onValueChange={setFilterAction}>
                  <SelectTrigger id="filterAction">
                    <SelectValue placeholder="Select action" />
                  </SelectTrigger>
                  <SelectContent>
                    {actionTypes.map((action) => (
                      <SelectItem key={action} value={action}>
                        {action === "all" ? "All Actions" : action}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="filterUser">User</Label>
                <Select value={filterUser} onValueChange={setFilterUser}>
                  <SelectTrigger id="filterUser">
                    <SelectValue placeholder="Select user" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user} value={user}>
                        {user === "all" ? "All Users" : user}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="filterDateFrom">From Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="filterDateFrom"
                    type="date"
                    className="pl-8"
                    value={filterDateFrom}
                    onChange={(e) => setFilterDateFrom(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="filterDateTo">To Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="filterDateTo"
                    type="date"
                    className="pl-8"
                    value={filterDateTo}
                    onChange={(e) => setFilterDateTo(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Audit Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50 text-muted-foreground">
                  <th className="p-2 text-left font-medium">Action</th>
                  <th className="p-2 text-left font-medium">Description</th>
                  <th className="p-2 text-left font-medium">User</th>
                  <th className="p-2 text-left font-medium">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log) => (
                    <tr key={log.id} className="border-b">
                      <td className="p-2">
                        <Badge variant={getActionBadgeVariant(log.action)}>{log.action}</Badge>
                      </td>
                      <td className="p-2">{log.description}</td>
                      <td className="p-2">{log.user}</td>
                      <td className="p-2 text-muted-foreground">{formatDate(log.timestamp)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-muted-foreground">
                      No logs found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
