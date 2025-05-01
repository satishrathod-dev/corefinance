"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {  Transaction, useTransactionStore } from "./transactions-data"
import { useToast } from "@/components/ui/use-toast"


export function TransactionDeleteDialog({ transaction, open, onOpenChange }) {
  const { toast } = useToast()
  const deleteTransaction = useTransactionStore((state) => state.deleteTransaction)

  const handleDelete = () => {
    deleteTransaction(transaction.id)

    toast({
      title: "Transaction deleted",
      description: "The transaction has been permanently removed.",
    })

    onOpenChange(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the transaction <strong>{transaction.description}</strong> for{" "}
            <strong>${Math.abs(transaction.amount).toFixed(2)}</strong>. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
