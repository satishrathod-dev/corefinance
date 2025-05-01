"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getInvoices } from "./invoice-data"
import { formatCurrency, formatDate } from "@/lib/utils"

export function InvoicesOverview({ className }) {
  const [recentInvoices, setRecentInvoices] = useState([])

  useEffect(() => {
    // Get all invoices and sort by issue date (newest first)
    const allInvoices = getInvoices()
    const sorted = [...allInvoices].sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate))
    setRecentInvoices(sorted.slice(0, 5)) // Get 5 most recent
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Recent Invoices</CardTitle>
        <CardDescription>Latest 5 invoices issued</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentInvoices.map((invoice) => (
            <div key={invoice.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{invoice.client.name}</p>
                <p className="text-sm text-muted-foreground">
                  {invoice.invoiceNumber} • {formatDate(invoice.issueDate)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(invoice.status)}>
                  {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                </Badge>
                <span className="font-medium">{formatCurrency(invoice.totalAmount)}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
