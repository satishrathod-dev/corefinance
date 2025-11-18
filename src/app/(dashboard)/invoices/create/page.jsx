"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { InvoiceForm } from "@/components/invoices/invoice-form"

export default function CreateInvoicePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (formData) => {
    setIsSubmitting(true)
    try {
      // In a real app, this would be an API call to create the invoice
      console.log("Creating invoice:", formData)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to invoices page after successful creation
      router.push("/invoices")
    } catch (error) {
      console.error("Error creating invoice:", error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between pb-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => router.push("/invoices")} className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Invoices
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Create Invoice</h2>
        </div>
      </div>

      <InvoiceForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  )
}
