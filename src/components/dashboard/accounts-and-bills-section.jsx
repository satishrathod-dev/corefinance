"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Wallet, TrendingUp, CreditCard, Calendar, Plus } from "lucide-react"

export function AccountsAndBillsSection({ isLoading }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("accounts")
  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false)
  const [isAddBillOpen, setIsAddBillOpen] = useState(false)
  const [isPayBillOpen, setIsPayBillOpen] = useState(false)
  const [selectedBill, setSelectedBill] = useState(null)

  const handleAddAccount = (e) => {
    e.preventDefault()
    // In a real app, this would save the new account
    alert("Account added successfully!")
    setIsAddAccountOpen(false)
  }

  const handleAddBill = (e) => {
    e.preventDefault()
    // In a real app, this would save the new bill
    alert("Bill added successfully!")
    setIsAddBillOpen(false)
  }

  const handlePayBill = (e) => {
    e.preventDefault()
    // In a real app, this would process the bill payment
    alert(`Payment for ${selectedBill.name} processed successfully!`)
    setIsPayBillOpen(false)
  }

  return (
    <Card>
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Your Finances</CardTitle>
            <TabsList className="grid w-full max-w-[200px] grid-cols-2">
              <TabsTrigger value="accounts">Accounts</TabsTrigger>
              <TabsTrigger value="bills">Bills</TabsTrigger>
            </TabsList>
          </div>
        </CardHeader>
        <CardContent>
          <TabsContent value="accounts" className="mt-0 space-y-4">
            <AccountsList isLoading={isLoading} router={router} />
          </TabsContent>
          <TabsContent value="bills" className="mt-0 space-y-4">
            <UpcomingBills
              isLoading={isLoading}
              router={router}
              setIsPayBillOpen={setIsPayBillOpen}
              setSelectedBill={setSelectedBill}
            />
          </TabsContent>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          {activeTab === "accounts" ? (
            <Dialog open={isAddAccountOpen} onOpenChange={setIsAddAccountOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Add Account
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Account</DialogTitle>
                  <DialogDescription>Enter your account details below.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddAccount}>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="account-name">Account Name</Label>
                      <Input id="account-name" placeholder="e.g. Checking Account" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="account-type">Account Type</Label>
                      <Select defaultValue="checking">
                        <SelectTrigger id="account-type">
                          <SelectValue placeholder="Select account type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="checking">Checking</SelectItem>
                          <SelectItem value="savings">Savings</SelectItem>
                          <SelectItem value="investment">Investment</SelectItem>
                          <SelectItem value="credit">Credit Card</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="balance">Current Balance</Label>
                      <Input id="balance" type="number" step="0.01" placeholder="0.00" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="institution">Financial Institution</Label>
                      <Input id="institution" placeholder="e.g. Bank of America" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add Account</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          ) : (
            <Dialog open={isAddBillOpen} onOpenChange={setIsAddBillOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Add Bill
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Bill</DialogTitle>
                  <DialogDescription>Enter your bill details below.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddBill}>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="bill-name">Bill Name</Label>
                      <Input id="bill-name" placeholder="e.g. Electricity Bill" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="amount">Amount</Label>
                      <Input id="amount" type="number" step="0.01" placeholder="0.00" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="due-date">Due Date</Label>
                      <Input id="due-date" type="date" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="frequency">Frequency</Label>
                      <Select defaultValue="monthly">
                        <SelectTrigger id="frequency">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="once">One Time</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="category">Category</Label>
                      <Select defaultValue="utilities">
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="utilities">Utilities</SelectItem>
                          <SelectItem value="housing">Housing</SelectItem>
                          <SelectItem value="transportation">Transportation</SelectItem>
                          <SelectItem value="insurance">Insurance</SelectItem>
                          <SelectItem value="subscriptions">Subscriptions</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add Bill</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </CardFooter>
      </Tabs>

      {/* Pay Bill Dialog */}
      {selectedBill && (
        <Dialog open={isPayBillOpen} onOpenChange={setIsPayBillOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Pay Bill: {selectedBill.name}</DialogTitle>
              <DialogDescription>
                Amount due: ${selectedBill.amount.toFixed(2)} • Due on {selectedBill.dueDate}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handlePayBill}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="payment-amount">Payment Amount</Label>
                  <Input
                    id="payment-amount"
                    type="number"
                    step="0.01"
                    defaultValue={selectedBill.amount.toFixed(2)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="payment-date">Payment Date</Label>
                  <Input id="payment-date" type="date" defaultValue={new Date().toISOString().split("T")[0]} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="payment-method">Payment Method</Label>
                  <Select defaultValue="checking">
                    <SelectTrigger id="payment-method">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="checking">Checking Account</SelectItem>
                      <SelectItem value="savings">Savings Account</SelectItem>
                      <SelectItem value="credit">Credit Card</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="payment-notes">Notes (Optional)</Label>
                  <Input id="payment-notes" placeholder="Add any additional details" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsPayBillOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Pay Now</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  )
}

function AccountsList({ isLoading, router }) {
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
        <div
          key={account.id}
          className="flex items-center justify-between rounded-lg p-2 hover:bg-muted/50 cursor-pointer"
          onClick={() => router.push(`/accounts/${account.id}`)}
        >
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

function UpcomingBills({ isLoading, router, setIsPayBillOpen, setSelectedBill }) {
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
          <div
            className="flex items-center gap-3 cursor-pointer flex-1"
            onClick={() => router.push(`/bills/${bill.id}`)}
          >
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
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedBill(bill)
                setIsPayBillOpen(true)
              }}
            >
              Pay
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
