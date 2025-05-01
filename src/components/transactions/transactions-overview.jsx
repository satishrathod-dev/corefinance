"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, ArrowLeftRight, DollarSign } from "lucide-react"
import { useTransactionStore } from "./transactions-data"

export function TransactionsOverview() {
  const transactions = useTransactionStore((state) => state.transactions)

  // Calculate overview metrics
  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + Math.abs(t.amount), 0)

  const netCashflow = totalIncome - totalExpenses

  const averageTransaction =
    transactions.length > 0 ? transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0) / transactions.length : 0

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          <ArrowUpRight className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">${totalIncome.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            From {transactions.filter((t) => t.type === "income").length} income transactions
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <ArrowDownRight className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">${totalExpenses.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            From {transactions.filter((t) => t.type === "expense").length} expense transactions
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Net Cashflow</CardTitle>
          <DollarSign className={`h-4 w-4 ${netCashflow >= 0 ? "text-green-500" : "text-red-500"}`} />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${netCashflow >= 0 ? "text-green-600" : "text-red-600"}`}>
            ${Math.abs(netCashflow).toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            {netCashflow >= 0 ? "Positive" : "Negative"} balance for this period
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Transaction</CardTitle>
          <ArrowLeftRight className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${averageTransaction.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">Across {transactions.length} total transactions</p>
        </CardContent>
      </Card>
    </div>
  )
}
