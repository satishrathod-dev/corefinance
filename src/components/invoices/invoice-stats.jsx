"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getInvoices } from "./invoice-data"
import { formatCurrency } from "@/lib/utils"

export function InvoiceStats() {
  const [stats, setStats] = useState({
    total: 0,
    paid: 0,
    pending: 0,
    overdue: 0,
    paidPercentage: 0,
    pendingPercentage: 0,
    overduePercentage: 0,
  })

  useEffect(() => {
    const allInvoices = getInvoices()
    const paidInvoices = getInvoices("paid")
    const pendingInvoices = getInvoices("pending")
    const overdueInvoices = getInvoices("overdue")

    const totalAmount = allInvoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0)
    const paidAmount = paidInvoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0)
    const pendingAmount = pendingInvoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0)
    const overdueAmount = overdueInvoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0)

    const paidPercentage = totalAmount > 0 ? (paidAmount / totalAmount) * 100 : 0
    const pendingPercentage = totalAmount > 0 ? (pendingAmount / totalAmount) * 100 : 0
    const overduePercentage = totalAmount > 0 ? (overdueAmount / totalAmount) * 100 : 0

    setStats({
      total: totalAmount,
      paid: paidAmount,
      pending: pendingAmount,
      overdue: overdueAmount,
      paidPercentage,
      pendingPercentage,
      overduePercentage,
    })
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats.total)}</div>
          <p className="text-xs text-muted-foreground">Across all invoice statuses</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Paid</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats.paid)}</div>
          <p className="text-xs text-green-500">{stats.paidPercentage.toFixed(1)}% of total</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats.pending)}</div>
          <p className="text-xs text-yellow-500">{stats.pendingPercentage.toFixed(1)}% of total</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Overdue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats.overdue)}</div>
          <p className="text-xs text-red-500">{stats.overduePercentage.toFixed(1)}% of total</p>
        </CardContent>
      </Card>
    </div>
  )
}
