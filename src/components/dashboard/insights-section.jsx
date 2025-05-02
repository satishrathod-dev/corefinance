"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { PieChart, BarChart, ArrowRight, DollarSign, Plus, Settings, CreditCard } from "lucide-react"

export function InsightsSection({ isLoading }) {
  const router = useRouter()
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false)

  const handleAddGoal = (e) => {
    e.preventDefault()
    // In a real app, this would save the new goal
    alert("Savings goal added successfully!")
    setIsAddGoalOpen(false)
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Spending by Category</CardTitle>
          <CardDescription>Where your money is going</CardDescription>
        </CardHeader>
        <CardContent>
          <SpendingByCategory isLoading={isLoading} router={router} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Savings Goals</CardTitle>
            <CardDescription>Track your progress</CardDescription>
          </div>
          <Dialog open={isAddGoalOpen} onOpenChange={setIsAddGoalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Savings Goal</DialogTitle>
                <DialogDescription>Set a new financial goal to track your progress.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddGoal}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="goal-name">Goal Name</Label>
                    <Input id="goal-name" placeholder="e.g. New Car" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="target-amount">Target Amount</Label>
                    <Input id="target-amount" type="number" step="0.01" placeholder="0.00" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="current-amount">Current Amount Saved</Label>
                    <Input id="current-amount" type="number" step="0.01" placeholder="0.00" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="target-date">Target Date (Optional)</Label>
                    <Input id="target-date" type="date" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Goal</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <SavingsGoals isLoading={isLoading} router={router} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your finances</CardDescription>
        </CardHeader>
        <CardContent>
          <QuickActions router={router} />
        </CardContent>
      </Card>
    </div>
  )
}

function SpendingByCategory({ isLoading, router }) {
  const categories = [
    { id: 1, name: "Housing", percentage: 35, amount: 1200 },
    { id: 2, name: "Food", percentage: 20, amount: 650 },
    { id: 3, name: "Transportation", percentage: 15, amount: 350 },
    { id: 4, name: "Entertainment", percentage: 10, amount: 280 },
    { id: 5, name: "Shopping", percentage: 12, amount: 420 },
    { id: 6, name: "Other", percentage: 8, amount: 180 },
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
      <div
        className="flex h-[180px] items-center justify-center cursor-pointer"
        onClick={() => router.push("/analytics/spending")}
      >
        <PieChart className="h-16 w-16 text-muted-foreground" />
        <p className="ml-4 text-sm text-muted-foreground">Spending by category chart</p>
      </div>
      <div className="space-y-2">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between cursor-pointer hover:bg-muted/50 p-1 rounded-md"
            onClick={() => router.push(`/analytics/spending/${category.id}`)}
          >
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

function SavingsGoals({ isLoading, router }) {
  const goals = [
    { id: 1, name: "Emergency Fund", current: 8500, target: 10000, percentage: 85 },
    { id: 2, name: "Vacation", current: 2300, target: 5000, percentage: 46 },
    { id: 3, name: "New Car", current: 12000, target: 25000, percentage: 48 },
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
        <div
          key={goal.id}
          className="space-y-2 cursor-pointer"
          onClick={() => router.push(`/savings/goals/${goal.id}`)}
        >
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
    </div>
  )
}

function QuickActions({ router }) {
  const actions = [
    {
      name: "Transfer Money",
      icon: ArrowRight,
      color: "bg-blue-100 text-blue-700",
      action: () => router.push("/transfer"),
    },
    {
      name: "Pay Bills",
      icon: DollarSign,
      color: "bg-green-100 text-green-700",
      action: () => router.push("/bills"),
    },
    {
      name: "Add Account",
      icon: Plus,
      color: "bg-purple-100 text-purple-700",
      action: () => router.push("/accounts/add"),
    },
    {
      name: "View Reports",
      icon: BarChart,
      color: "bg-orange-100 text-orange-700",
      action: () => router.push("/reports"),
    },
    {
      name: "Manage Cards",
      icon: CreditCard,
      color: "bg-pink-100 text-pink-700",
      action: () => router.push("/cards"),
    },
    {
      name: "Settings",
      icon: Settings,
      color: "bg-gray-100 text-gray-700",
      action: () => router.push("/settings"),
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-3">
      {actions.map((action, index) => (
        <Button
          key={index}
          variant="outline"
          className="flex h-auto flex-col items-center justify-center gap-2 sm:gap-0 p-4 sm:p-10 text-center"
          onClick={action.action}
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
