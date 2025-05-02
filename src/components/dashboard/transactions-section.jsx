"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Search, Filter, TrendingUp, CreditCard, ChevronRight, Plus, MoreHorizontal } from "lucide-react"
import { useState } from "react"

export function TransactionsSection({ isLoading, searchQuery, setSearchQuery }) {
  const router = useRouter()
  const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filterType, setFilterType] = useState("all")
  const [filterDateRange, setFilterDateRange] = useState("all")
  const [filterAmount, setFilterAmount] = useState("all")

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

  // Filter transactions based on search query and filters
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType =
      filterType === "all" ||
      (filterType === "income" && transaction.amount > 0) ||
      (filterType === "expense" && transaction.amount < 0)

    // In a real app, you would implement date range and amount filtering

    return matchesSearch && matchesType
  })

  const handleNewTransaction = (e) => {
    e.preventDefault()
    // In a real app, this would save the new transaction
    alert("Transaction added successfully!")
    setIsNewTransactionOpen(false)
  }

  const handleApplyFilters = () => {
    // In a real app, this would apply the filters
    setIsFilterOpen(false)
  }

  return (
    <Card className="lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest financial activity</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-[180px] pl-8 md:w-[200px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filter Transactions</DialogTitle>
                <DialogDescription>Customize which transactions you want to see.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="type">Transaction Type</Label>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Transactions</SelectItem>
                      <SelectItem value="income">Income Only</SelectItem>
                      <SelectItem value="expense">Expenses Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="date">Date Range</Label>
                  <Select value={filterDateRange} onValueChange={setFilterDateRange}>
                    <SelectTrigger id="date">
                      <SelectValue placeholder="Select date range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="amount">Amount Range</Label>
                  <Select value={filterAmount} onValueChange={setFilterAmount}>
                    <SelectTrigger id="amount">
                      <SelectValue placeholder="Select amount range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Amount</SelectItem>
                      <SelectItem value="under100">Under $100</SelectItem>
                      <SelectItem value="100to500">$100 - $500</SelectItem>
                      <SelectItem value="over500">Over $500</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsFilterOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleApplyFilters}>Apply Filters</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isNewTransactionOpen} onOpenChange={setIsNewTransactionOpen}>
            <DialogTrigger asChild>
              <Button size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Transaction</DialogTitle>
                <DialogDescription>Enter the details of your transaction below.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleNewTransaction}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Transaction Name</Label>
                    <Input id="name" placeholder="e.g. Grocery Shopping" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input id="amount" type="number" step="0.01" placeholder="0.00" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="type">Transaction Type</Label>
                    <Select defaultValue="expense">
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="expense">Expense</SelectItem>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="transfer">Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select defaultValue="food">
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="food">Food & Dining</SelectItem>
                        <SelectItem value="shopping">Shopping</SelectItem>
                        <SelectItem value="housing">Housing</SelectItem>
                        <SelectItem value="transportation">Transportation</SelectItem>
                        <SelectItem value="entertainment">Entertainment</SelectItem>
                        <SelectItem value="utilities">Utilities</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" defaultValue={new Date().toISOString().split("T")[0]} required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Input id="notes" placeholder="Add any additional details" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Transaction</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <RecentTransactions isLoading={isLoading} transactions={filteredTransactions} router={router} />
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button variant="ghost" className="w-full" onClick={() => router.push("/transactions")}>
          View All Transactions <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

function RecentTransactions({ isLoading, transactions, router }) {
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

  if (transactions.length === 0) {
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
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between py-2 cursor-pointer hover:bg-muted/50 rounded-md px-2"
          onClick={() => router.push(`/transactions/${transaction.id}`)}
        >
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
          <div className="flex items-center gap-2">
            <div className={`font-medium ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
              {transaction.amount > 0 ? "+" : ""}
              {transaction.amount.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation()
                    router.push(`/transactions/${transaction.id}`)
                  }}
                >
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation()
                    router.push(`/transactions/${transaction.id}/edit`)
                  }}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation()
                    if (confirm("Are you sure you want to delete this transaction?")) {
                      alert("Transaction deleted successfully!")
                    }
                  }}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  )
}
