"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  FileQuestion,
  LifeBuoy,
  BookOpen,
  Video,
  MessageSquare,
  FileText,
  Settings,
  CreditCard,
  Users,
} from "lucide-react"

export default function HelpCategories({ onSelectCategory }) {
  const categories = [
    {
      title: "Getting Started",
      description: "Learn the basics of using our platform",
      icon: FileQuestion,
      action: () => onSelectCategory("knowledge"),
    },
    {
      title: "Account & Billing",
      description: "Manage your account and billing information",
      icon: CreditCard,
      action: () => onSelectCategory("faq"),
    },
    {
      title: "Technical Support",
      description: "Get help with technical issues",
      icon: LifeBuoy,
      action: () => onSelectCategory("support"),
    },
    {
      title: "Knowledge Base",
      description: "Browse our comprehensive knowledge base",
      icon: BookOpen,
      action: () => onSelectCategory("knowledge"),
    },
    {
      title: "Video Tutorials",
      description: "Watch step-by-step video guides",
      icon: Video,
      action: () => onSelectCategory("knowledge"),
    },
    {
      title: "Community Forum",
      description: "Connect with other users and share tips",
      icon: MessageSquare,
      action: () => onSelectCategory("knowledge"),
    },
    {
      title: "Documentation",
      description: "Read detailed documentation",
      icon: FileText,
      action: () => onSelectCategory("knowledge"),
    },
    {
      title: "Settings Help",
      description: "Learn how to configure your settings",
      icon: Settings,
      action: () => onSelectCategory("faq"),
    },
    {
      title: "Team Management",
      description: "Manage your team and permissions",
      icon: Users,
      action: () => onSelectCategory("faq"),
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category, index) => (
        <Card key={index} className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-primary/10 p-2">
                <category.icon className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg">{category.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>{category.description}</CardDescription>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full bg-gray-500" onClick={category.action}>
              Explore
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
