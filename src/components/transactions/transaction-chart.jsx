"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTransactionStore } from "./transactions-data"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function TransactionChart() {
  const transactions = useTransactionStore((state) => state.transactions)

  // Process data for charts
  const monthlyData = processMonthlyData(transactions)
  const weeklyData = processWeeklyData(transactions)

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Transaction Analysis</CardTitle>
        <CardDescription>View your financial activity over time</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="monthly">Monthly View</TabsTrigger>
            <TabsTrigger value="weekly">Weekly View</TabsTrigger>
          </TabsList>
          <TabsContent value="monthly">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                  <Bar dataKey="income" name="Income" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expense" name="Expense" fill="#EF4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="weekly">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                  <Line type="monotone" dataKey="income" name="Income" stroke="#10B981" strokeWidth={2} />
                  <Line type="monotone" dataKey="expense" name="Expense" stroke="#EF4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function processMonthlyData(transactions) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const currentYear = new Date().getFullYear()

  const monthlyData = months.map((month) => {
    return {
      name: month,
      income: 0,
      expense: 0,
    }
  })

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date)
    if (date.getFullYear() === currentYear) {
      const month = date.getMonth()
      if (transaction.type === "income") {
        monthlyData[month].income += transaction.amount
      } else if (transaction.type === "expense") {
        monthlyData[month].expense += Math.abs(transaction.amount)
      }
    }
  })

  return monthlyData
}

function processWeeklyData(transactions) {
  const weekData = []
  const now = new Date()
  const oneDay = 24 * 60 * 60 * 1000

  // Create last 7 days
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now.getTime() - i * oneDay)
    weekData.push({
      name: date.toLocaleDateString("en-US", { weekday: "short" }),
      fullDate: date.toISOString().split("T")[0],
      income: 0,
      expense: 0,
    })
  }

  transactions.forEach((transaction) => {
    const transDate = transaction.date.split("T")[0]
    const dayData = weekData.find((d) => d.fullDate === transDate)

    if (dayData) {
      if (transaction.type === "income") {
        dayData.income += transaction.amount
      } else if (transaction.type === "expense") {
        dayData.expense += Math.abs(transaction.amount)
      }
    }
  })

  return weekData
}
