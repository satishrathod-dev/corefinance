"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

// export type TransactionType = "income" | "expense" | "transfer"
// export type TransactionStatus = "completed" | "pending" | "failed"

// export interface Transaction {
//   id: string
//   date: string
//   description: string
//   category: string
//   account: string
//   amount: number
//   type: TransactionType
//   status: TransactionStatus
//   reference?: string
//   notes?: string
// }

// interface TransactionStore {
//   transactions: Transaction[]
//   addTransaction: (transaction: Omit<Transaction, "id">) => void
//   updateTransaction: (id: string, transaction: Partial<Transaction>) => void
//   deleteTransaction: (id: string) => void
// }

// Sample transactions data
export const initialTransactions = [
  {
    id: "t1",
    date: "2023-05-01",
    description: "Salary Deposit",
    category: "Income",
    account: "Main Account",
    amount: 3500,
    type: "income",
    status: "completed",
  },
  {
    id: "t2",
    date: "2023-05-02",
    description: "Grocery Shopping",
    category: "Food & Groceries",
    account: "Main Account",
    amount: -120.45,
    type: "expense",
    status: "completed",
  },
  {
    id: "t3",
    date: "2023-05-03",
    description: "Transfer to Savings",
    category: "Transfers",
    account: "Main Account",
    amount: -500,
    type: "transfer",
    status: "completed",
    reference: "Monthly Savings",
  },
  {
    id: "t4",
    date: "2023-05-05",
    description: "Electric Bill",
    category: "Utilities",
    account: "Main Account",
    amount: -85.2,
    type: "expense",
    status: "completed",
  },
  {
    id: "t5",
    date: "2023-05-07",
    description: "Restaurant Dinner",
    category: "Dining Out",
    account: "Credit Card",
    amount: -78.9,
    type: "expense",
    status: "completed",
  },
  {
    id: "t6",
    date: "2023-05-10",
    description: "Freelance Payment",
    category: "Income",
    account: "Main Account",
    amount: 450,
    type: "income",
    status: "completed",
  },
  {
    id: "t7",
    date: "2023-05-12",
    description: "Phone Bill",
    category: "Utilities",
    account: "Main Account",
    amount: -55.99,
    type: "expense",
    status: "completed",
  },
  {
    id: "t8",
    date: "2023-05-15",
    description: "Online Shopping",
    category: "Shopping",
    account: "Credit Card",
    amount: -120.3,
    type: "expense",
    status: "completed",
  },
  {
    id: "t9",
    date: "2023-05-15",
    description: "Gym Membership",
    category: "Health & Fitness",
    account: "Main Account",
    amount: -45.0,
    type: "expense",
    status: "completed",
  },
  {
    id: "t10",
    date: "2023-05-18",
    description: "Movie Tickets",
    category: "Entertainment",
    account: "Credit Card",
    amount: -25.5,
    type: "expense",
    status: "completed",
  },
  {
    id: "t11",
    date: "2023-05-20",
    description: "Gas Station",
    category: "Transportation",
    account: "Credit Card",
    amount: -42.3,
    type: "expense",
    status: "completed",
  },
  {
    id: "t12",
    date: "2023-05-23",
    description: "Coffee Shop",
    category: "Dining Out",
    account: "Main Account",
    amount: -8.75,
    type: "expense",
    status: "completed",
  },
  {
    id: "t13",
    date: "2023-05-25",
    description: "Interest Payment",
    category: "Income",
    account: "Savings Account",
    amount: 12.5,
    type: "income",
    status: "completed",
  },
  {
    id: "t14",
    date: "2023-05-26",
    description: "Medical Appointment",
    category: "Healthcare",
    account: "Main Account",
    amount: -150.0,
    type: "expense",
    status: "pending",
  },
  {
    id: "t15",
    date: "2023-05-27",
    description: "Rent Payment",
    category: "Housing",
    account: "Main Account",
    amount: -1200,
    type: "expense",
    status: "pending",
  },
  {
    id: "t16",
    date: "2023-05-28",
    description: "Bonus Payment",
    category: "Income",
    account: "Main Account",
    amount: 750,
    type: "income",
    status: "pending",
  },
  {
    id: "t17",
    date: "2023-05-29",
    description: "Car Insurance",
    category: "Insurance",
    account: "Main Account",
    amount: -95.5,
    type: "expense",
    status: "failed",
    notes: "Payment method expired",
  },
  {
    id: "t18",
    date: "2023-05-30",
    description: "Online Course",
    category: "Education",
    account: "Credit Card",
    amount: -199.99,
    type: "expense",
    status: "completed",
  },
]

// Create store with persistence
export const useTransactionStore = create()(
  persist(
    (set) => ({
      transactions: initialTransactions,

      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [...state.transactions, { ...transaction, id: `t${state.transactions.length + 1}` }],
        })),

      updateTransaction: (id, updatedFields) =>
        set((state) => ({
          transactions: state.transactions.map((t) => (t.id === id ? { ...t, ...updatedFields } : t)),
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),
    }),
    {
      name: "transaction-storage",
    },
  ),
)

export const getAllCategories = () => {
  const transactions = useTransactionStore.getState().transactions
  return Array.from(new Set(transactions.map((transaction) => transaction.category)))
}

export const getAllAccounts = () => {
  const transactions = useTransactionStore.getState().transactions
  return Array.from(new Set(transactions.map((transaction) => transaction.account)))
}
