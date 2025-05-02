import  { Metadata } from "next"
import HelpOverview from "@/components/help/help-overview"

export const metadata = {
  title: "Help & Support",
  description: "Get help and support for your account",
}

export default function HelpPage() {
  return (
      <div className="container px-4 py-6 md:px-6 md:py-8 lg:py-10">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
          <p className="text-muted-foreground">Find answers to common questions and get support for your account</p>
        </div>
        <HelpOverview />
      </div>
  )
}
