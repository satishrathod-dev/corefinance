"use client"

import React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { AlertCircle, CheckCircle2, Upload } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function SupportTicket() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    priority: "",
    message: "",
    attachments: [],
  })
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    subject: false,
    category: false,
    message: false,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setFormErrors((prev) => ({ ...prev, [name]: false }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    setFormErrors((prev) => ({ ...prev, [name]: false }))
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setFormData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...newFiles].slice(0, 3), // Limit to 3 files
      }))
    }
  }

  const removeFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }))
  }

  const validateForm = () => {
    const errors = {
      name: !formData.name,
      email: !formData.email || !/\S+@\S+\.\S+/.test(formData.email),
      subject: !formData.subject,
      category: !formData.category,
      message: !formData.message,
    }

    setFormErrors(errors)
    return !Object.values(errors).some(Boolean)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Form Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      toast({
        title: "Ticket Submitted",
        description: "Your support ticket has been submitted successfully. We'll get back to you soon.",
      })
    }, 1500)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      category: "",
      priority: "",
      message: "",
      attachments: [],
    })
    setIsSubmitted(false)
  }

  if (isSubmitted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            Ticket Submitted
          </CardTitle>
          <CardDescription>Your support ticket has been submitted successfully</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert>
              <AlertTitle>
                Ticket #
                {Math.floor(Math.random() * 10000)
                  .toString()
                  .padStart(4, "0")}
              </AlertTitle>
              <AlertDescription>
                We've received your support request and will respond to you at {formData.email} as soon as possible.
                Most tickets are answered within 24 hours.
              </AlertDescription>
            </Alert>

            <div className="mt-6">
              <h3 className="font-medium">Ticket Summary</h3>
              <div className="mt-2 space-y-2">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-sm text-muted-foreground">Subject:</div>
                  <div className="col-span-2">{formData.subject}</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-sm text-muted-foreground">Category:</div>
                  <div className="col-span-2">{formData.category}</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-sm text-muted-foreground">Priority:</div>
                  <div className="col-span-2">{formData.priority || "Normal"}</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={resetForm}>Submit Another Ticket</Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit a Support Ticket</CardTitle>
        <CardDescription>Fill out the form below to get help from our support team</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={formErrors.name ? "border-destructive" : ""}
              />
              {formErrors.name && <p className="text-xs text-destructive">Please enter your name</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
                Email Address <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={formErrors.email ? "border-destructive" : ""}
              />
              {formErrors.email && <p className="text-xs text-destructive">Please enter a valid email address</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">
              Subject <span className="text-destructive">*</span>
            </Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={formErrors.subject ? "border-destructive" : ""}
            />
            {formErrors.subject && <p className="text-xs text-destructive">Please enter a subject</p>}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="category">
                Category <span className="text-destructive">*</span>
              </Label>
              <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                <SelectTrigger id="category" className={formErrors.category ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="account">Account Issues</SelectItem>
                  <SelectItem value="billing">Billing & Payments</SelectItem>
                  <SelectItem value="technical">Technical Support</SelectItem>
                  <SelectItem value="feature">Feature Request</SelectItem>
                  <SelectItem value="bug">Bug Report</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {formErrors.category && <p className="text-xs text-destructive">Please select a category</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => handleSelectChange("priority", value)}>
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Normal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">
              Message <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Please describe your issue in detail..."
              className={formErrors.message ? "border-destructive" : ""}
            />
            {formErrors.message && <p className="text-xs text-destructive">Please enter a message</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="attachments">Attachments (Optional, max 3 files)</Label>
            <div className="mt-1 flex items-center gap-2">
              <Label
                htmlFor="file-upload"
                className="flex h-10 cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Upload className="h-4 w-4" />
                <span>Choose files</span>
              </Label>
              <Input
                id="file-upload"
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                disabled={formData.attachments.length >= 3}
              />
            </div>

            {formData.attachments.length > 0 && (
              <div className="mt-2 space-y-2">
                {formData.attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-md border border-border bg-background p-2 text-sm"
                  >
                    <span className="truncate">{file.name}</span>
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Important</AlertTitle>
            <AlertDescription>
              Our support team is available Monday through Friday, 9am-5pm EST. For urgent issues outside of business
              hours, please mark your ticket as "Urgent".
            </AlertDescription>
          </Alert>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => resetForm()}>
          Clear Form
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Ticket"}
        </Button>
      </CardFooter>
    </Card>
  )
}
