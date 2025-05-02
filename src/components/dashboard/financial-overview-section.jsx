"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, ArrowDown, ArrowUp } from "lucide-react"
import { BudgetStatus } from "@/components/dashboard/budget-status"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

export function FinancialOverviewSection({ isLoading, timeframe, setTimeframe }) {
  const router = useRouter()
  const [showDetails, setShowDetails] = useState(false)
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    // Generate chart data based on selected timeframe
    const data = generateChartData(timeframe)
    setChartData(data)
  }, [timeframe])

  const handleDownload = () => {
    // Create a CSV string from the chart data
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Date,Income,Expenses\n" +
      chartData.map((item) => `${item.date},${item.income},${item.expenses}`).join("\n")

    // Create a download link and trigger the download
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `financial_overview_${timeframe}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-7">
      <Card className="lg:col-span-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <div>
            <CardTitle>Financial Overview</CardTitle>
            <CardDescription>Your income and spending</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={handleDownload}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <FinancialOverviewChart isLoading={isLoading} timeframe={timeframe} chartData={chartData} />

          {showDetails ? (
            <div className="mt-4 space-y-4">
              <h3 className="font-medium">Detailed Breakdown</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Income Sources</h4>
                  <ul className="mt-2 space-y-1">
                    <li className="flex justify-between text-sm">
                      <span>Salary</span>
                      <span className="font-medium">$6,500.00</span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span>Freelance Work</span>
                      <span className="font-medium">$1,200.00</span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span>Investments</span>
                      <span className="font-medium">$650.00</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Top Expenses</h4>
                  <ul className="mt-2 space-y-1">
                    <li className="flex justify-between text-sm">
                      <span>Housing</span>
                      <span className="font-medium">$1,500.00</span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span>Food & Dining</span>
                      <span className="font-medium">$650.00</span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span>Transportation</span>
                      <span className="font-medium">$350.00</span>
                    </li>
                  </ul>
                </div>
              </div>
              <Button variant="ghost" className="w-full" onClick={() => setShowDetails(false)}>
                Hide Details
              </Button>
            </div>
          ) : (
            <Button variant="ghost" className="mt-4 w-full" onClick={() => setShowDetails(true)}>
              Show Detailed Breakdown
            </Button>
          )}
        </CardContent>
      </Card>

      <Card className="lg:col-span-3">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Budget Status</CardTitle>
              <CardDescription>Your monthly budget progress</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => router.push("/budget")}>
              Manage Budget
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <BudgetStatus isLoading={isLoading} />
        </CardContent>
      </Card>
    </div>
  )
}

function FinancialOverviewChart({ isLoading, timeframe, chartData }) {
  const router = useRouter()

  if (isLoading) {
    return <div className="flex h-[300px] w-full animate-pulse items-center justify-center rounded-md bg-muted"></div>
  }

  // Calculate total income and expenses
  const totalIncome = chartData.reduce((sum, item) => sum + item.income, 0)
  const totalExpenses = chartData.reduce((sum, item) => sum + item.expenses, 0)
  const netCashflow = totalIncome - totalExpenses
  const percentChange = totalIncome > 0 ? ((netCashflow / totalIncome) * 100).toFixed(1) : 0

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-3 shadow-sm">
          <p className="text-sm font-medium">{label}</p>
          <div className="flex items-center mt-1">
            <div className="mr-2 h-2 w-2 rounded-full bg-primary" />
            <p className="text-sm">Income: ${payload[0].value}</p>
          </div>
          <div className="flex items-center">
            <div className="mr-2 h-2 w-2 rounded-full bg-destructive/70" />
            <p className="text-sm">Expenses: ${payload[1].value}</p>
          </div>
          <p className="mt-1 text-sm font-medium">Net: ${payload[0].value - payload[1].value}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-primary"></div>
          <span className="text-sm text-muted-foreground">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-destructive/70"></div>
          <span className="text-sm text-muted-foreground">Expenses</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Net: </span>
          <span className={`flex items-center text-sm ${netCashflow >= 0 ? "text-green-600" : "text-red-600"}`}>
            ${Math.abs(netCashflow).toLocaleString()}
            {netCashflow >= 0 ? <ArrowUp className="ml-1 h-3 w-3" /> : <ArrowDown className="ml-1 h-3 w-3" />}
            <span className="ml-1">({percentChange}%)</span>
          </span>
        </div>
      </div>

      <div className="h-[250px] w-full cursor-pointer" onClick={() => router.push(`/analytics?timeframe=${timeframe}`)}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} tickFormatter={(value) => `$${value}`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="income" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expenses" fill="hsl(var(--destructive) / 0.7)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

// Helper function to generate chart data based on timeframe
function generateChartData(timeframe) {
  let data = []

  switch (timeframe) {
    case "week":
      data = [
        { date: "Mon", income: 1200, expenses: 800 },
        { date: "Tue", income: 900, expenses: 600 },
        { date: "Wed", income: 1500, expenses: 1100 },
        { date: "Thu", income: 800, expenses: 700 },
        { date: "Fri", income: 1700, expenses: 1300 },
        { date: "Sat", income: 500, expenses: 400 },
        { date: "Sun", income: 300, expenses: 500 },
      ]
      break
    case "month":
      data = [
        { date: "Week 1", income: 4800, expenses: 3400 },
        { date: "Week 2", income: 5200, expenses: 4100 },
        { date: "Week 3", income: 4900, expenses: 3800 },
        { date: "Week 4", income: 5500, expenses: 4300 },
      ]
      break
    case "quarter":
      data = [
        { date: "Jan", income: 18000, expenses: 14000 },
        { date: "Feb", income: 16500, expenses: 13200 },
        { date: "Mar", income: 19200, expenses: 15500 },
      ]
      break
    case "year":
      data = [
        { date: "Q1", income: 53700, expenses: 42700 },
        { date: "Q2", income: 58200, expenses: 45600 },
        { date: "Q3", income: 55800, expenses: 43900 },
        { date: "Q4", income: 61500, expenses: 48200 },
      ]
      break
    default:
      data = [
        { date: "Week 1", income: 4800, expenses: 3400 },
        { date: "Week 2", income: 5200, expenses: 4100 },
        { date: "Week 3", income: 4900, expenses: 3800 },
        { date: "Week 4", income: 5500, expenses: 4300 },
      ]
  }

  return data
}
