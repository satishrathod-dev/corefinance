"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, FileText, Video, ArrowRight } from "lucide-react"

export default function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState("")

  const articles = [
    {
      id: "1",
      title: "Getting Started with the Dashboard",
      description: "Learn how to navigate and use the main dashboard features",
      category: "Getting Started",
      type: "guide",
      icon: BookOpen,
      readTime: "5 min read",
    },
    {
      id: "2",
      title: "Setting Up Your Organization Profile",
      description: "Complete guide to configuring your organization settings",
      category: "Organization",
      type: "guide",
      icon: BookOpen,
      readTime: "8 min read",
    },
    {
      id: "3",
      title: "Managing Team Permissions",
      description: "Learn how to set up and manage permissions for your team",
      category: "Permissions",
      type: "tutorial",
      icon: FileText,
      readTime: "10 min read",
    },
    {
      id: "4",
      title: "Creating Your First Project",
      description: "Step-by-step guide to creating and managing projects",
      category: "Projects",
      type: "video",
      icon: Video,
      readTime: "6 min video",
    },
    {
      id: "5",
      title: "Understanding Analytics Reports",
      description: "How to interpret and use the analytics dashboard",
      category: "Analytics",
      type: "guide",
      icon: BookOpen,
      readTime: "12 min read",
    },
    {
      id: "6",
      title: "Setting Up Two-Factor Authentication",
      description: "Enhance your account security with 2FA",
      category: "Security",
      type: "tutorial",
      icon: FileText,
      readTime: "4 min read",
    },
    {
      id: "7",
      title: "Managing Invoices and Payments",
      description: "Complete guide to the invoicing and payment system",
      category: "Billing",
      type: "video",
      icon: Video,
      readTime: "15 min video",
    },
    {
      id: "8",
      title: "Customizing Your User Profile",
      description: "Personalize your account settings and preferences",
      category: "Account",
      type: "guide",
      icon: BookOpen,
      readTime: "7 min read",
    },
    {
      id: "9",
      title: "Tracking Transactions and Expenses",
      description: "How to monitor and manage your financial transactions",
      category: "Transactions",
      type: "tutorial",
      icon: FileText,
      readTime: "9 min read",
    },
  ]

  const categories = [
    "All",
    "Getting Started",
    "Account",
    "Organization",
    "Projects",
    "Analytics",
    "Billing",
    "Security",
    "Permissions",
    "Transactions",
  ]

  const [activeCategory, setActiveCategory] = useState("All")

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = activeCategory === "All" || article.category === activeCategory

    return matchesSearch && matchesCategory
  })

  const getBadgeVariant = (type) => {
    switch (type) {
      case "guide":
        return "default"
      case "tutorial":
        return "outline"
      case "video":
        return "secondary"
      default:
        return "default"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Knowledge Base</CardTitle>
          <CardDescription>Browse our guides, tutorials, and videos to learn more about our platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search knowledge base..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" onClick={() => setSearchQuery("")}>
                Clear
              </Button>
            </div>

            <div className="overflow-x-auto pb-2">
              <div className="flex space-x-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(category)}
                    className="whitespace-nowrap"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {filteredArticles.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No articles found. Try a different search term or category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredArticles.map((article) => (
                  <Card key={article.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="rounded-md bg-primary/10 p-2">
                            <article.icon className="h-4 w-4 text-primary" />
                          </div>
                          <CardTitle className="text-base">{article.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <CardDescription>{article.description}</CardDescription>
                        <div className="flex items-center justify-between">
                          <Badge variant={getBadgeVariant(article.type)}>
                            {article.type.charAt(0).toUpperCase() + article.type.slice(1)}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{article.readTime}</span>
                        </div>
                      </div>
                    </CardContent>
                    <div className="border-t border-border p-3">
                      <Button variant="ghost" size="sm" className="w-full justify-between">
                        Read Article <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
