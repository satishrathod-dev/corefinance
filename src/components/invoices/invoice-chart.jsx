"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { getInvoices } from "./invoice-data"

export function InvoiceChart() {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const allInvoices = getInvoices()

    // Group invoices by month
    const invoicesByMonth = allInvoices.reduce((acc, invoice) => {
      const date = new Date(invoice.issueDate)
      const month = date.toLocaleString("default", { month: "short" })
      const year = date.getFullYear()
      const key = `${month} ${year}`

      if (!acc[key]) {
        acc[key] = {
          month: key,
          paid: 0,
          pending: 0,
          overdue: 0,
        }
      }

      acc[key][invoice.status] += invoice.totalAmount

      return acc
    }, {})

    // Convert to array and sort by date
    const data = Object.values(invoicesByMonth)
    data.sort((a, b) => {
      const [monthA, yearA] = a.month.split(" ")
      const [monthB, yearB] = b.month.split(" ")
      const dateA = new Date(`${monthA} 1, ${yearA}`)
      const dateB = new Date(`${monthB} 1, ${yearB}`)
      return dateA - dateB
    })

    setChartData(data)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Invoices</CardTitle>
        <CardDescription>Invoice amounts by status per month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value) => [`$${value.toFixed(2)}`, ""]}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Bar dataKey="paid" stackId="a" fill="#10b981" name="Paid" />
              <Bar dataKey="pending" stackId="a" fill="#f59e0b" name="Pending" />
              <Bar dataKey="overdue" stackId="a" fill="#ef4444" name="Overdue" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
