"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { useTransactionStore } from "./transactions-data"

export function TransactionCategories() {
  const transactions = useTransactionStore((state) => state.transactions)
  const [view, setView] = useState("expense")

  // Get category data for expenses or income
  const categoryData = getCategoryData(transactions, view)

  // Colors for pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D", "#FF6B6B"]

  const handleViewChange = (value) => {
    setView(value)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
        <CardDescription>View your top spending categories</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="expense" onValueChange={handleViewChange}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="expense">Expenses</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
          </TabsList>
          <TabsContent value="expense">
            <div className="h-[300px] flex items-center justify-center">
              {categoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center text-muted-foreground">No {view} transactions found</div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="income">
            <div className="h-[300px] flex items-center justify-center">
              {categoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center text-muted-foreground">No {view} transactions found</div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function getCategoryData(transactions, type) {
  // Filter transactions by type
  const filteredTransactions = transactions.filter((t) => t.type === type)

  // Group by category and sum amounts
  const categoryMap = new Map()
  filteredTransactions.forEach((transaction) => {
    const amount = Math.abs(transaction.amount)
    if (categoryMap.has(transaction.category)) {
      categoryMap.set(transaction.category, categoryMap.get(transaction.category) + amount)
    } else {
      categoryMap.set(transaction.category, amount)
    }
  })

  // Convert to array and sort
  const categoryData = Array.from(categoryMap.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 7) // Top 7 categories

  return categoryData
}
