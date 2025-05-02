"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

export function FinancialSummaryCards({ isLoading }) {
  const router = useRouter()

  const summaryCards = [
    {
      title: "Total Balance",
      value: "$24,563.21",
      change: "+2.5%",
      trend: "up",
      route: "/accounts",
    },
    {
      title: "Monthly Income",
      value: "$8,350.00",
      change: "+5.2%",
      trend: "up",
      route: "/income",
    },
    {
      title: "Monthly Expenses",
      value: "$3,285.45",
      change: "-1.8%",
      trend: "down",
      route: "/expenses",
    },
    {
      title: "Savings Rate",
      value: "32.4%",
      change: "+3.7%",
      trend: "up",
      route: "/savings",
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {summaryCards.map((card, index) => (
        <FinancialSummaryCard
          key={index}
          title={card.title}
          value={card.value}
          change={card.change}
          trend={card.trend}
          isLoading={isLoading}
          onClick={() => router.push(card.route)}
        />
      ))}
    </div>
  )
}

function FinancialSummaryCard({ title, value, change, trend, isLoading, onClick }) {
  return (
    <Card className="cursor-pointer transition-all hover:shadow-md" onClick={onClick}>
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
