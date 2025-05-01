"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Edit, Printer, Send, Trash } from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/utils"
import { getInvoiceById } from "@/components/invoices/invoice-data"

export default function InvoiceDetailsPage({ params }) {
  const router = useRouter()
  const [invoice, setInvoice] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInvoice = () => {
      try {
        const data = getInvoiceById(params.id)
        if (data) {
          setInvoice(data)
        } else {
          router.push("/invoices")
        }
      } catch (error) {
        console.error("Error fetching invoice:", error)
        router.push("/invoices")
      } finally {
        setLoading(false)
      }
    }

    fetchInvoice()
  }, [params.id, router])

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const calculateSubtotal = () => {
    return invoice.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
  }

  const calculateTax = () => {
    return (calculateSubtotal() * invoice.taxRate) / 100
  }

  const handleEdit = () => {
    router.push(`/invoices/${params.id}/edit`)
  }

  const handleDelete = () => {
    // This would be replaced with actual delete functionality
    router.push("/invoices")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p>Loading invoice details...</p>
      </div>
    )
  }

  if (!invoice) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <p className="text-xl">Invoice not found</p>
        <Button variant="link" onClick={() => router.push("/invoices")}>
          Return to Invoices
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between pb-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => router.push("/invoices")} className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Invoices
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" size="sm">
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
          <Button variant="outline" size="sm" onClick={handleEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Invoice #{invoice.invoiceNumber}</CardTitle>
            <CardDescription>
              Issued on {formatDate(invoice.issueDate)} • Due on {formatDate(invoice.dueDate)}
            </CardDescription>
          </div>
          <Badge className={getStatusColor(invoice.status)}>
            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
          </Badge>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>From</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">Your Company Name</p>
            <p className="text-muted-foreground">123 Business Street</p>
            <p className="text-muted-foreground">City, State 12345</p>
            <p className="text-muted-foreground">contact@yourcompany.com</p>
            <p className="text-muted-foreground">(123) 456-7890</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bill To</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">{invoice.client.name}</p>
            <p className="text-muted-foreground">{invoice.client.address}</p>
            <p className="text-muted-foreground">{invoice.client.email}</p>
            <p className="text-muted-foreground">{invoice.client.phone}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Invoice Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-4 text-left font-medium">Description</th>
                  <th className="p-4 text-center font-medium">Quantity</th>
                  <th className="p-4 text-right font-medium">Unit Price</th>
                  <th className="p-4 text-right font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-4">{item.description}</td>
                    <td className="p-4 text-center">{item.quantity}</td>
                    <td className="p-4 text-right">{formatCurrency(item.unitPrice)}</td>
                    <td className="p-4 text-right">{formatCurrency(item.quantity * item.unitPrice)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end">
            <div className="w-full max-w-xs space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatCurrency(calculateSubtotal())}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax ({invoice.taxRate}%):</span>
                <span>{formatCurrency(calculateTax())}</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-bold">
                <span>Total:</span>
                <span>{formatCurrency(calculateSubtotal() + calculateTax())}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {invoice.notes && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{invoice.notes}</p>
          </CardContent>
        </Card>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Payment Method:</span> Bank Transfer
            </p>
            <p>
              <span className="font-medium">Account Name:</span> Your Company Name
            </p>
            <p>
              <span className="font-medium">Account Number:</span> XXXX-XXXX-XXXX-1234
            </p>
            <p>
              <span className="font-medium">Routing Number:</span> XXX-XXX-XXX
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">Please include the invoice number in your payment reference.</p>
        </CardFooter>
      </Card>
    </div>
  )
}
