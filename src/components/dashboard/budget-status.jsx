"use client"

import { useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function BudgetStatus({ isLoading }) {
  const [categories, setCategories] = useState([
    { id: 1, name: "Housing", spent: 1200, budget: 1500, percentage: 80 },
    { id: 2, name: "Food & Dining", spent: 650, budget: 800, percentage: 81 },
    { id: 3, name: "Transportation", spent: 350, budget: 400, percentage: 88 },
    { id: 4, name: "Entertainment", spent: 280, budget: 300, percentage: 93 },
    { id: 5, name: "Shopping", spent: 420, budget: 500, percentage: 84 },
    { id: 6, name: "Utilities", spent: 180, budget: 250, percentage: 72 },
  ])

  const [editingCategory, setEditingCategory] = useState(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [newBudget, setNewBudget] = useState("")

  const totalSpent = categories.reduce((sum, category) => sum + category.spent, 0)
  const totalBudget = categories.reduce((sum, category) => sum + category.budget, 0)
  const totalPercentage = Math.round((totalSpent / totalBudget) * 100)

  const handleEditBudget = (category) => {
    setEditingCategory(category)
    setNewBudget(category.budget.toString())
    setEditDialogOpen(true)
  }

  const handleSaveBudget = () => {
    const updatedCategories = categories.map((cat) => {
      if (cat.id === editingCategory.id) {
        const budget = Number.parseFloat(newBudget)
        return {
          ...cat,
          budget,
          percentage: Math.round((cat.spent / budget) * 100),
        }
      }
      return cat
    })

    setCategories(updatedCategories)
    setEditDialogOpen(false)
  }

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
        <div key={category.id} className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">{category.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                ${category.spent} / ${category.budget}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 rounded-full p-0 text-muted-foreground hover:text-foreground"
                onClick={() => handleEditBudget(category)}
              >
                <span className="sr-only">Edit {category.name} budget</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3 w-3"
                >
                  <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                  <path d="m15 5 4 4" />
                </svg>
              </Button>
            </div>
          </div>
          <Progress
            value={category.percentage}
            className="h-2"
            indicatorClassName={
              category.percentage > 90 ? "bg-red-500" : category.percentage > 75 ? "bg-yellow-500" : "bg-green-500"
            }
          />
        </div>
      ))}
      <div className="pt-2 text-center">
        <span className="text-sm font-medium">
          Total: ${totalSpent} / ${totalBudget} ({totalPercentage}% of budget)
        </span>
      </div>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Budget</DialogTitle>
            <DialogDescription>Adjust the budget amount for {editingCategory?.name}.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="budget" className="text-right">
                Budget
              </Label>
              <div className="col-span-3 flex items-center">
                <span className="mr-2">$</span>
                <Input
                  id="budget"
                  type="number"
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Current</Label>
              <div className="col-span-3">
                <span className="text-sm text-muted-foreground">
                  ${editingCategory?.spent} spent of ${editingCategory?.budget} budget
                </span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveBudget}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
