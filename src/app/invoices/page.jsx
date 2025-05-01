import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { InvoicesList } from "@/components/invoices/invoices-list"
import { InvoicesOverview } from "@/components/invoices/invoices-overview"

export default function InvoicesPage() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between space-y-2 pb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Invoices</h2>
          <p className="text-muted-foreground">Manage your invoices, track payments, and monitor financial activity.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/invoices/create">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Invoice
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-col space-y-2">
            <p className="text-sm text-muted-foreground">Total Invoices</p>
            <p className="text-3xl font-bold">$24,780.00</p>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-col space-y-2">
            <p className="text-sm text-muted-foreground">Paid</p>
            <p className="text-3xl font-bold">$18,230.00</p>
            <p className="text-xs text-green-500">73.5% of total</p>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-col space-y-2">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-3xl font-bold">$4,125.00</p>
            <p className="text-xs text-yellow-500">16.6% of total</p>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-col space-y-2">
            <p className="text-sm text-muted-foreground">Overdue</p>
            <p className="text-3xl font-bold">$2,425.00</p>
            <p className="text-xs text-red-500">9.9% of total</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3 mt-6">
        <div className="col-span-2">
          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6">
              <h3 className="text-lg font-medium">Monthly Invoices</h3>
              <div className="h-[300px] mt-4 flex items-center justify-center">
                <p className="text-muted-foreground">Chart visualization would go here</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <InvoicesOverview />
        </div>
      </div>

      <div className="mt-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Invoices</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <InvoicesList filter="all" />
          </TabsContent>
          <TabsContent value="paid" className="mt-4">
            <InvoicesList filter="paid" />
          </TabsContent>
          <TabsContent value="pending" className="mt-4">
            <InvoicesList filter="pending" />
          </TabsContent>
          <TabsContent value="overdue" className="mt-4">
            <InvoicesList filter="overdue" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
