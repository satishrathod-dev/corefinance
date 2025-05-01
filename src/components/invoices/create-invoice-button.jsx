import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export function CreateInvoiceButton() {
  return (
    <Link href="/invoices/create">
      <Button>
        <PlusCircle className="mr-2 h-4 w-4" />
        Create Invoice
      </Button>
    </Link>
  )
}
