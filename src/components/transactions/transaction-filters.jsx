"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Filter, Plus, Search } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useTransactionStore, getAllCategories, getAllAccounts } from "./transactions-data"
import { useToast } from "@/components/ui/use-toast"

export function TransactionFilters() {
  const { toast } = useToast()
  const addTransaction = useTransactionStore((state) => state.addTransaction)
  const categories = getAllCategories()
  const accounts = getAllAccounts()

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTypes, setSelectedTypes] = useState({
    income: true,
    expense: true,
    transfer: true,
  })
  const [showFilters, setShowFilters] = useState(false)
  const [addDialogOpen, setAddDialogOpen] = useState(false)

  // New transaction form state
  const [newTransaction, setNewTransaction] = useState({
    date: new Date().toISOString().split("T")[0],
    description: "",
    amount: 0,
    type: "expense",
    category: "Other",
    account: "Chase Credit Card",
    status: "completed",
    reference: "",
    notes: "",
  })

  const handleTypeToggle = (type) => {
    setSelectedTypes((prevTypes) => ({
      ...prevTypes,
      [type]: !prevTypes[type],
    }))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewTransaction((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setNewTransaction((prev) => ({ ...prev, [name]: value }))
  }

  const handleAmountChange = (e) => {
    let value = Number.parseFloat(e.target.value)

    // Ensure the amount is negative for expenses
    if (newTransaction.type === "expense" && value > 0) {
      value = -value
    }
    // Ensure the amount is positive for income
    else if (newTransaction.type === "income" && value < 0) {
      value = Math.abs(value)
    }

    setNewTransaction((prev) => ({ ...prev, amount: value }))
  }

  const handleTypeChange = (value) => {
    const type = value
    let amount = newTransaction.amount

    // Adjust amount sign based on transaction type
    if (type === "expense" && amount > 0) {
      amount = -Math.abs(amount)
    } else if (type === "income" && amount < 0) {
      amount = Math.abs(amount)
    }

    setNewTransaction((prev) => ({ ...prev, type, amount }))
  }

  const handleAddTransaction = (e) => {
    e.preventDefault()

    // Generate a unique ID
    const id = `tx-${Date.now().toString(36)}`

    // Add the transaction
    addTransaction({
      ...newTransaction,
      id,
    })

    // Show success toast
    toast({
      title: "Transaction Added",
      description: `Successfully added transaction: ${newTransaction.description}`,
    })

    // Reset form and close dialog
    setNewTransaction({
      date: new Date().toISOString().split("T")[0],
      description: "",
      amount: 0,
      type: "expense",
      category: "Other",
      account: "Chase Credit Card",
      status: "completed",
      reference: "",
      notes: "",
    })
    setAddDialogOpen(false)
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search transactions..."
          className="pl-8 w-[250px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem checked={selectedTypes.income} onCheckedChange={() => handleTypeToggle("income")}>
            Income
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={selectedTypes.expense} onCheckedChange={() => handleTypeToggle("expense")}>
            Expenses
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={selectedTypes.transfer}
            onCheckedChange={() => handleTypeToggle("transfer")}
          >
            Transfers
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Add New Transaction</DialogTitle>
            <DialogDescription>Enter the details for the new transaction.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddTransaction} className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={newTransaction.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select value={newTransaction.type} onValueChange={(value) => handleTypeChange(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                    <SelectItem value="transfer">Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 col-span-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  value={newTransaction.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  value={Math.abs(newTransaction.amount)}
                  onChange={handleAmountChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={newTransaction.status} onValueChange={(value) => handleSelectChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newTransaction.category}
                  onValueChange={(value) => handleSelectChange("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="account">Account</Label>
                <Select value={newTransaction.account} onValueChange={(value) => handleSelectChange("account", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map((account) => (
                      <SelectItem key={account} value={account}>
                        {account}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 col-span-2">
                <Label htmlFor="reference">Reference (Optional)</Label>
                <Input id="reference" name="reference" value={newTransaction.reference} onChange={handleInputChange} />
              </div>

              <div className="space-y-2 col-span-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea id="notes" name="notes" value={newTransaction.notes} onChange={handleInputChange} rows={3} />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Transaction</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
