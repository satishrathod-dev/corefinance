"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HelpCategories from "./help-categories"
import FrequentlyAskedQuestions from "./frequently-asked-questions"
import SupportTicket from "./support-ticket"
import KnowledgeBase from "./knowledge-base"
import ContactInformation from "./contact-information"

export default function HelpOverview() {
  const [activeTab, setActiveTab] = useState("categories")

  return (
    <div className="mt-6 space-y-6">
      <Tabs defaultValue="categories" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="overflow-x-auto">
          <TabsList className="inline-flex w-auto whitespace-nowrap">
            <TabsTrigger value="categories">Help Categories</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="support">Support Ticket</TabsTrigger>
            <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="categories" className="mt-6">
          <HelpCategories
            onSelectCategory={(category) => {
              if (category === "support") {
                setActiveTab("support")
              } else if (category === "faq") {
                setActiveTab("faq")
              } else if (category === "knowledge") {
                setActiveTab("knowledge")
              }
            }}
          />
        </TabsContent>
        <TabsContent value="faq" className="mt-6">
          <FrequentlyAskedQuestions />
        </TabsContent>
        <TabsContent value="support" className="mt-6">
          <SupportTicket />
        </TabsContent>
        <TabsContent value="knowledge" className="mt-6">
          <KnowledgeBase />
        </TabsContent>
        <TabsContent value="contact" className="mt-6">
          <ContactInformation />
        </TabsContent>
      </Tabs>
    </div>
  )
}
