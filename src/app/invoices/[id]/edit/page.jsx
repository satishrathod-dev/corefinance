"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { InvoiceForm } from "@/components/invoices/invoice-form"
import { getInvoiceById } from "@/components/invoices/invoice-data"

export default function EditInvoicePage({ params }) {
  const router = useRouter()
  const [invoice, setInvoice] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleSubmit = async (formData) => {
    setIsSubmitting(true)
    try {
      // In a real app, this would be an API call to update the invoice
      console.log("Updating invoice:", formData)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to invoice details page after successful update
      router.push(`/invoices/${params.id}`)
    } catch (error) {
      console.error("Error updating invoice:", error)
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p>Loading invoice data...</p>
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
          <Button variant="ghost" onClick={() => router.push(`/invoices/${params.id}`)} className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Invoice
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Edit Invoice #{invoice.invoiceNumber}</h2>
        </div>
      </div>

      <InvoiceForm initialData={invoice} onSubmit={handleSubmit} isSubmitting={isSubmitting} isEditing={true} />
    </div>
  )
}
