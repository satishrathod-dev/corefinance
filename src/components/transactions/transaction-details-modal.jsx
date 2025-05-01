"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ArrowDownRight, ArrowLeftRight, ArrowUpRight, Calendar, CreditCard, FileText, Tag } from "lucide-react"
import  { Transaction } from "./transactions-data"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"


export function TransactionDetailsModal({ transaction, open, onOpenChange }) {
  const getTransactionTypeIcon = () => {
    switch (transaction.type) {
      case "income":
        return <ArrowUpRight className="h-6 w-6 text-green-500" />
      case "expense":
        return <ArrowDownRight className="h-6 w-6 text-red-500" />
      case "transfer":
        return <ArrowLeftRight className="h-6 w-6 text-blue-500" />
    }
  }

  const getTransactionStatusBadge = () => {
    switch (transaction.status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
          <DialogDescription>View detailed information about this transaction</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Main Info */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg">{transaction.description}</h3>
              <div className="text-muted-foreground flex items-center gap-1 mt-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>{transaction.date}</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className={`text-xl font-semibold ${transaction.amount >= 0 ? "text-green-600" : "text-red-600"}`}>
                {transaction.amount >= 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
              </div>
              {getTransactionStatusBadge()}
            </div>
          </div>

          <Separator />

          {/* Transaction Details */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Type</p>
                  <div className="flex items-center gap-1.5">
                    {getTransactionTypeIcon()}
                    <span className="capitalize">{transaction.type}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Category</p>
                  <div className="flex items-center gap-1.5">
                    <Tag className="h-4 w-4" />
                    <span>{transaction.category}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Account</p>
                  <div className="flex items-center gap-1.5">
                    <CreditCard className="h-4 w-4" />
                    <span>{transaction.account}</span>
                  </div>
                </div>

                {transaction.reference && (
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Reference</p>
                    <div className="flex items-center gap-1.5">
                      <FileText className="h-4 w-4" />
                      <span>{transaction.reference}</span>
                    </div>
                  </div>
                )}
              </div>

              {transaction.notes && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-1">Notes</p>
                  <p>{transaction.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
