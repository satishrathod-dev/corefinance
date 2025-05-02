"use client"

import { useState, useEffect } from "react"
import { FinancialSummaryCards } from "@/components/dashboard/financial-summary-cards"
import { FinancialOverviewSection } from "@/components/dashboard/financial-overview-section"
import { TransactionsSection } from "@/components/dashboard/transactions-section"
import { AccountsAndBillsSection } from "@/components/dashboard/accounts-and-bills-section"
import { InsightsSection } from "@/components/dashboard/insights-section"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Bell, HelpCircle, Settings } from "lucide-react"
import {
  ArrowUpRight,
  ArrowDownRight,
  BarChart,
  Search,
  TrendingUp,
  CreditCard,
  Wallet,
  Calendar,
  PieChart,
  Plus,
  ArrowRight,
  DollarSign,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [timeframe, setTimeframe] = useState("month")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-8">

      <FinancialSummaryCards isLoading={isLoading} />

      <FinancialOverviewSection isLoading={isLoading} timeframe={timeframe} setTimeframe={setTimeframe} />

      <div className="grid gap-6 lg:grid-cols-3">
        <TransactionsSection isLoading={isLoading} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <AccountsAndBillsSection isLoading={isLoading} />
      </div>

      <InsightsSection isLoading={isLoading} />
    </div>
  )
}



function FinancialSummaryCard({ title, value, change, trend, isLoading }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {trend === "up" ? (
          <ArrowUpRight className="h-4 w-4 text-green-500" />
        ) : (
          <ArrowDownRight className="h-4 w-4 text-red-500" />
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <div className="h-6 w-24 animate-pulse rounded-md bg-muted"></div>
            <div className="h-4 w-16 animate-pulse rounded-md bg-muted"></div>
          </div>
        ) : (
          <>
            <div className="text-2xl font-bold">{value}</div>
            <p className={`text-xs ${trend === "up" ? "text-green-500" : "text-red-500"}`}>{change} from last month</p>
          </>
        )}
      </CardContent>
    </Card>
  )
}

function FinancialOverviewChart({ isLoading, timeframe }) {
  if (isLoading) {
    return <div className="flex h-[300px] w-full animate-pulse items-center justify-center rounded-md bg-muted"></div>
  }

  // This would be replaced with actual chart implementation
  return (
    <div className="relative h-[300px]">
      <div className="absolute inset-0 flex items-center justify-center">
        <BarChart className="h-16 w-16 text-muted-foreground" />
        <p className="ml-4 text-sm text-muted-foreground">
          Financial overview chart for{" "}
          {timeframe === "week"
            ? "this week"
            : timeframe === "month"
              ? "this month"
              : timeframe === "quarter"
                ? "this quarter"
                : "this year"}
        </p>
      </div>
    </div>
  )
}

function BudgetStatus({ isLoading }) {
  const categories = [
    { name: "Housing", spent: 1200, budget: 1500, percentage: 80 },
    { name: "Food & Dining", spent: 650, budget: 800, percentage: 81 },
    { name: "Transportation", spent: 350, budget: 400, percentage: 88 },
    { name: "Entertainment", spent: 280, budget: 300, percentage: 93 },
    { name: "Shopping", spent: 420, budget: 500, percentage: 84 },
    { name: "Utilities", spent: 180, budget: 250, percentage: 72 },
  ]

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between">
              <div className="h-4 w-24 animate-pulse rounded-md bg-muted"></div>
              <div className="h-4 w-16 animate-pulse rounded-md bg-muted"></div>
            </div>
            <div className="h-2 animate-pulse rounded-full bg-muted"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <div key={category.name} className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">{category.name}</span>
            <span className="text-sm text-muted-foreground">
              ${category.spent} / ${category.budget}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-secondary">
            <div
              className={`h-2 rounded-full ${
                category.percentage > 90 ? "bg-red-500" : category.percentage > 75 ? "bg-yellow-500" : "bg-green-500"
              }`}
              style={{ width: `${category.percentage}%` }}
            ></div>
          </div>
        </div>
      ))}
      <div className="pt-2 text-center">
        <span className="text-sm font-medium">Total: $3,080 / $3,750 (82% of budget)</span>
      </div>
    </div>
  )
}

function RecentTransactions({ isLoading, searchQuery }) {
  const transactions = [
    {
      id: 1,
      name: "Amazon",
      category: "Shopping",
      date: "Today, 2:34 PM",
      amount: -129.99,
      status: "completed",
    },
    {
      id: 2,
      name: "Salary Deposit",
      category: "Income",
      date: "Yesterday",
      amount: 4200.0,
      status: "completed",
    },
    {
      id: 3,
      name: "Starbucks",
      category: "Food & Dining",
      date: "Yesterday",
      amount: -5.4,
      status: "completed",
    },
    {
      id: 4,
      name: "Transfer to Savings",
      category: "Transfer",
      date: "May 1",
      amount: -500.0,
      status: "completed",
    },
    {
      id: 5,
      name: "Electric Bill",
      category: "Utilities",
      date: "Apr 29",
      amount: -95.4,
      status: "completed",
    },
  ]

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex animate-pulse items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-muted"></div>
              <div className="space-y-1">
                <div className="h-4 w-24 rounded-md bg-muted"></div>
                <div className="h-3 w-16 rounded-md bg-muted"></div>
              </div>
            </div>
            <div className="h-4 w-16 rounded-md bg-muted"></div>
          </div>
        ))}
      </div>
    )
  }

  if (filteredTransactions.length === 0) {
    return (
      <div className="flex h-[200px] flex-col items-center justify-center text-center">
        <Search className="mb-2 h-10 w-10 text-muted-foreground" />
        <h3 className="text-lg font-medium">No transactions found</h3>
        <p className="text-sm text-muted-foreground">Try adjusting your search query</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {filteredTransactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                transaction.amount > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {transaction.amount > 0 ? <TrendingUp className="h-5 w-5" /> : <CreditCard className="h-5 w-5" />}
            </div>
            <div>
              <p className="font-medium">{transaction.name}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>{transaction.category}</span>
                <span>•</span>
                <span>{transaction.date}</span>
              </div>
            </div>
          </div>
          <div className={`font-medium ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
            {transaction.amount > 0 ? "+" : ""}
            {transaction.amount.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

function AccountsList({ isLoading }) {
  const accounts = [
    { id: 1, name: "Checking Account", balance: 5243.87, type: "checking" },
    { id: 2, name: "Savings Account", balance: 12750.55, type: "savings" },
    { id: 3, name: "Investment Portfolio", balance: 6568.79, type: "investment" },
    { id: 4, name: "Credit Card", balance: -1245.36, type: "credit" },
  ]

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex animate-pulse items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-muted"></div>
              <div className="h-4 w-24 rounded-md bg-muted"></div>
            </div>
            <div className="h-4 w-16 rounded-md bg-muted"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-1">
      {accounts.map((account) => (
        <div key={account.id} className="flex items-center justify-between rounded-lg p-2 hover:bg-muted/50">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                account.type === "checking"
                  ? "bg-blue-100 text-blue-700"
                  : account.type === "savings"
                    ? "bg-green-100 text-green-700"
                    : account.type === "investment"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-red-100 text-red-700"
              }`}
            >
              {account.type === "checking" || account.type === "savings" ? (
                <Wallet className="h-4 w-4" />
              ) : account.type === "investment" ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <CreditCard className="h-4 w-4" />
              )}
            </div>
            <span className="font-medium">{account.name}</span>
          </div>
          <div className={`font-medium ${account.balance < 0 ? "text-red-600" : ""}`}>
            {account.balance.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

function UpcomingBills({ isLoading }) {
  const bills = [
    { id: 1, name: "Rent", amount: 1500, dueDate: "May 5", status: "upcoming" },
    { id: 2, name: "Internet", amount: 79.99, dueDate: "May 12", status: "upcoming" },
    { id: 3, name: "Phone Bill", amount: 85.0, dueDate: "May 15", status: "upcoming" },
    { id: 4, name: "Electricity", amount: 120.45, dueDate: "May 18", status: "upcoming" },
  ]

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex animate-pulse items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-muted"></div>
              <div className="space-y-1">
                <div className="h-4 w-24 rounded-md bg-muted"></div>
                <div className="h-3 w-16 rounded-md bg-muted"></div>
              </div>
            </div>
            <div className="h-4 w-16 rounded-md bg-muted"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-1">
      {bills.map((bill) => (
        <div key={bill.id} className="flex items-center justify-between rounded-lg p-2 hover:bg-muted/50">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-700">
              <Calendar className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">{bill.name}</p>
              <p className="text-xs text-muted-foreground">Due {bill.dueDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">
              {bill.amount.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
            <Button variant="outline" size="sm">
              Pay
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

function SpendingByCategory({ isLoading }) {
  const categories = [
    { name: "Housing", percentage: 35, amount: 1200 },
    { name: "Food", percentage: 20, amount: 650 },
    { name: "Transportation", percentage: 15, amount: 350 },
    { name: "Entertainment", percentage: 10, amount: 280 },
    { name: "Shopping", percentage: 12, amount: 420 },
    { name: "Other", percentage: 8, amount: 180 },
  ]

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex h-[180px] animate-pulse items-center justify-center rounded-md bg-muted"></div>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex animate-pulse items-center justify-between">
              <div className="h-4 w-24 rounded-md bg-muted"></div>
              <div className="h-4 w-16 rounded-md bg-muted"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex h-[180px] items-center justify-center">
        <PieChart className="h-16 w-16 text-muted-foreground" />
        <p className="ml-4 text-sm text-muted-foreground">Spending by category chart</p>
      </div>
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor:
                    category.name === "Housing"
                      ? "#3b82f6"
                      : category.name === "Food"
                        ? "#10b981"
                        : category.name === "Transportation"
                          ? "#f59e0b"
                          : category.name === "Entertainment"
                            ? "#8b5cf6"
                            : category.name === "Shopping"
                              ? "#ec4899"
                              : "#6b7280",
                }}
              ></div>
              <span className="text-sm">{category.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{category.percentage}%</span>
              <span className="text-sm text-muted-foreground">${category.amount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SavingsGoals({ isLoading }) {
  const goals = [
    { name: "Emergency Fund", current: 8500, target: 10000, percentage: 85 },
    { name: "Vacation", current: 2300, target: 5000, percentage: 46 },
    { name: "New Car", current: 12000, target: 25000, percentage: 48 },
  ]

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between">
              <div className="h-4 w-24 animate-pulse rounded-md bg-muted"></div>
              <div className="h-4 w-16 animate-pulse rounded-md bg-muted"></div>
            </div>
            <div className="h-2 animate-pulse rounded-full bg-muted"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {goals.map((goal) => (
        <div key={goal.name} className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">{goal.name}</span>
            <span className="text-sm text-muted-foreground">
              ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-secondary">
            <div className="h-2 rounded-full bg-primary" style={{ width: `${goal.percentage}%` }}></div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{goal.percentage}% complete</span>
            <span>${(goal.target - goal.current).toLocaleString()} remaining</span>
          </div>
        </div>
      ))}
      <Button variant="outline" className="w-full">
        <Plus className="mr-2 h-4 w-4" /> Add Goal
      </Button>
    </div>
  )
}

function QuickActions() {
  const actions = [
    { name: "Transfer Money", icon: ArrowRight, color: "bg-blue-100 text-blue-700" },
    { name: "Pay Bills", icon: DollarSign, color: "bg-green-100 text-green-700" },
    { name: "Add Account", icon: Plus, color: "bg-purple-100 text-purple-700" },
    { name: "View Reports", icon: BarChart, color: "bg-orange-100 text-orange-700" },
    { name: "Manage Cards", icon: CreditCard, color: "bg-pink-100 text-pink-700" },
    { name: "Settings", icon: Settings, color: "bg-gray-100 text-gray-700" },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-1 gap-3">
      {actions.map((action) => (
        <Button
          key={action.name}
          variant="outline"
          className="flex h-auto flex-col items-center justify-center gap-2 p-4 text-center"
        >
          <div className={`rounded-full p-2 ${action.color}`}>
            <action.icon className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium">{action.name}</span>
        </Button>
      ))}
    </div>
  )
}
