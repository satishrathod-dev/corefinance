"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { useState } from "react"

export default function FrequentlyAskedQuestions() {
  const [searchQuery, setSearchQuery] = useState("")

  const faqCategories = [
    {
      category: "Account Management",
      questions: [
        {
          question: "How do I change my password?",
          answer:
            "To change your password, go to Settings > Security, and click on 'Change Password'. You'll need to enter your current password and then set a new one.",
        },
        {
          question: "How do I update my profile information?",
          answer:
            "You can update your profile information by navigating to Settings > Profile. From there, you can edit your name, email, profile picture, and other personal details.",
        },
        {
          question: "Can I have multiple accounts?",
          answer:
            "Yes, you can have multiple accounts, but each account must use a unique email address. We recommend using our organization features instead if you're managing multiple businesses.",
        },
      ],
    },
    {
      category: "Billing & Subscriptions",
      questions: [
        {
          question: "How do I update my payment method?",
          answer:
            "To update your payment method, go to Settings > Billing, and click on 'Payment Methods'. From there, you can add, edit, or remove payment methods.",
        },
        {
          question: "How do I cancel my subscription?",
          answer:
            "You can cancel your subscription by going to Settings > Billing > Subscription and clicking on 'Cancel Subscription'. Please note that cancellations take effect at the end of your current billing period.",
        },
        {
          question: "Do you offer refunds?",
          answer:
            "We offer refunds within 30 days of purchase for annual subscriptions. Monthly subscriptions are not eligible for refunds. Please contact our support team for more information.",
        },
      ],
    },
    {
      category: "Features & Functionality",
      questions: [
        {
          question: "How do I create a new project?",
          answer:
            "To create a new project, navigate to the Projects page and click on the 'Create Project' button. Fill in the required information and click 'Create'.",
        },
        {
          question: "How do I invite team members?",
          answer:
            "You can invite team members by going to Organization > Team Members and clicking on 'Invite Member'. Enter their email address and select their role, then click 'Send Invitation'.",
        },
        {
          question: "How do I generate reports?",
          answer:
            "To generate reports, go to Analytics > Reports and select the type of report you want to create. You can customize the report parameters and then click 'Generate Report'.",
        },
      ],
    },
    {
      category: "Security & Privacy",
      questions: [
        {
          question: "Is my data secure?",
          answer:
            "Yes, we take security very seriously. All data is encrypted both in transit and at rest. We use industry-standard security measures to protect your information.",
        },
        {
          question: "Do you support two-factor authentication?",
          answer:
            "Yes, we support two-factor authentication. You can enable it in Settings > Security > Two-Factor Authentication.",
        },
        {
          question: "How can I manage my privacy settings?",
          answer:
            "You can manage your privacy settings by going to Settings > Privacy. From there, you can control what information is visible to others and how your data is used.",
        },
      ],
    },
  ]

  const filteredFAQs = searchQuery
    ? faqCategories
        .map((category) => ({
          category: category.category,
          questions: category.questions.filter(
            (q) =>
              q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        }))
        .filter((category) => category.questions.length > 0)
    : faqCategories

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Find answers to common questions about our platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search FAQs..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" onClick={() => setSearchQuery("")}>
              Clear
            </Button>
          </div>

          {filteredFAQs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No results found. Try a different search term.</p>
            </div>
          ) : (
            filteredFAQs.map(
              (category, index) =>
                category.questions.length > 0 && (
                  <div key={index} className="mb-6">
                    <h3 className="text-lg font-medium mb-3">{category.category}</h3>
                    <Accordion type="single" collapsible className="w-full">
                      {category.questions.map((item, qIndex) => (
                        <AccordionItem key={qIndex} value={`${index}-${qIndex}`}>
                          <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                          <AccordionContent>
                            <p className="text-muted-foreground">{item.answer}</p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ),
            )
          )}
        </CardContent>
      </Card>
    </div>
  )
}
