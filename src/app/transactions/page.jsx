import { Metadata } from "next"
import { TransactionsOverview } from "@/components/transactions/transactions-overview"
import { TransactionsList } from "@/components/transactions/transactions-list"
import { TransactionChart } from "@/components/transactions/transaction-chart"
import { TransactionCategories } from "@/components/transactions/transaction-categories"
import { TransactionFilters } from "@/components/transactions/transaction-filters"
import { DateRangePicker } from "@/components/date-range-picker"

export const metadata = {
  title: "Transactions | Financial Dashboard",
  description: "View and manage all your financial transactions",
}

export default function TransactionsPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">View and manage all your financial transactions</p>
        </div>
        <div className="flex items-center gap-2">
          <DateRangePicker />
        </div>
      </div>

      <TransactionsOverview />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TransactionChart />
        </div>
        <div>
          <TransactionCategories />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">All Transactions</h2>
          <TransactionFilters />
        </div>
        <TransactionsList />
      </div>
    </div>
  )
}
