"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { UploadCloud } from "lucide-react"
import { toast } from "sonner"

export function OrganizationSettings() {
  const [organizationInfo, setOrganizationInfo] = useState({
    name: "Flowers & Saints Financial",
    legalName: "Flowers & Saints Financial Inc.",
    industry: "Financial Services",
    address: "123 Finance Street, New York, NY 10001",
    website: "www.flowersandsaints.com",
    email: "contact@flowersandsaints.com",
    phone: "+1 (555) 123-4567",
    description:
      "Flowers & Saints Financial provides cutting-edge financial services for individuals and businesses. Our mission is to empower our clients with the tools and knowledge they need to achieve financial success.",
    logo: "/abstract-logo.png",
    taxId: "12-3456789",
    foundedYear: "2015",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    weeklyReports: true,
    monthlyReports: true,
    projectUpdates: true,
    teamChanges: true,
    newMembers: false,
    billingAlerts: true,
  })

  const [privacySettings, setPrivacySettings] = useState({
    showMemberEmail: false,
    showMemberPhone: false,
    publicProfile: true,
    allowDataSharing: false,
    requireMfa: true,
    allowExternalLogin: false,
    allowGuests: true,
  })

  const [billingInfo, setBillingInfo] = useState({
    plan: "Enterprise",
    nextBillingDate: "December 15, 2023",
    paymentMethod: "Credit Card ending in 4242",
    autoRenew: true,
    seats: 250,
    usedSeats: 245,
    additionalFeatures: ["Advanced Analytics", "Premium Support", "Dedicated Account Manager"],
    billingAddress: "123 Finance Street, New York, NY 10001",
    billingEmail: "billing@flowersandsaints.com",
    taxExempt: true,
  })

  const handleSaveGeneral = () => {
    toast.success("Organization information saved successfully")
  }

  const handleSaveNotifications = () => {
    toast.success("Notification settings saved successfully")
  }

  const handleSavePrivacy = () => {
    toast.success("Privacy settings saved successfully")
  }

  const handleSaveBilling = () => {
    toast.success("Billing information saved successfully")
  }

  return (
    <Tabs defaultValue="general" className="space-y-4">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>

      <TabsContent value="general" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Organization Information</CardTitle>
            <CardDescription>Manage your organization's basic information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex flex-col items-center space-y-2">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={organizationInfo.logo || "/placeholder.svg"} alt="Organization Logo" />
                  <AvatarFallback>F&S</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm" className="gap-1">
                  <UploadCloud className="h-4 w-4" /> Change Logo
                </Button>
              </div>
              <div className="flex-1 grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="org-name">Organization Name</Label>
                    <Input
                      id="org-name"
                      value={organizationInfo.name}
                      onChange={(e) => setOrganizationInfo({ ...organizationInfo, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="legal-name">Legal Name</Label>
                    <Input
                      id="legal-name"
                      value={organizationInfo.legalName}
                      onChange={(e) => setOrganizationInfo({ ...organizationInfo, legalName: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Input
                      id="industry"
                      value={organizationInfo.industry}
                      onChange={(e) => setOrganizationInfo({ ...organizationInfo, industry: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="founded">Year Founded</Label>
                    <Input
                      id="founded"
                      value={organizationInfo.foundedYear}
                      onChange={(e) => setOrganizationInfo({ ...organizationInfo, foundedYear: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={organizationInfo.address}
                  onChange={(e) => setOrganizationInfo({ ...organizationInfo, address: e.target.value })}
                  className="min-h-[80px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={organizationInfo.description}
                  onChange={(e) => setOrganizationInfo({ ...organizationInfo, description: e.target.value })}
                  className="min-h-[80px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={organizationInfo.website}
                  onChange={(e) => setOrganizationInfo({ ...organizationInfo, website: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={organizationInfo.email}
                  onChange={(e) => setOrganizationInfo({ ...organizationInfo, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={organizationInfo.phone}
                  onChange={(e) => setOrganizationInfo({ ...organizationInfo, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tax-id">Tax ID / EIN</Label>
                <Input
                  id="tax-id"
                  value={organizationInfo.taxId}
                  onChange={(e) => setOrganizationInfo({ ...organizationInfo, taxId: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveGeneral}>Save Organization Information</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="notifications" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Control how your organization receives notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold leading-none">Email Notifications</h3>
              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-alerts" className="flex flex-col gap-1">
                    <span>Email Alerts</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Receive important alerts via email
                    </span>
                  </Label>
                  <Switch
                    id="email-alerts"
                    checked={notificationSettings.emailAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, emailAlerts: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="weekly-reports" className="flex flex-col gap-1">
                    <span>Weekly Reports</span>
                    <span className="font-normal text-xs text-muted-foreground">Receive weekly summary reports</span>
                  </Label>
                  <Switch
                    id="weekly-reports"
                    checked={notificationSettings.weeklyReports}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, weeklyReports: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="monthly-reports" className="flex flex-col gap-1">
                    <span>Monthly Reports</span>
                    <span className="font-normal text-xs text-muted-foreground">Receive monthly detailed reports</span>
                  </Label>
                  <Switch
                    id="monthly-reports"
                    checked={notificationSettings.monthlyReports}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, monthlyReports: checked })
                    }
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-sm font-semibold leading-none">System Notifications</h3>
              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="project-updates" className="flex flex-col gap-1">
                    <span>Project Updates</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Notifications about project status changes
                    </span>
                  </Label>
                  <Switch
                    id="project-updates"
                    checked={notificationSettings.projectUpdates}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, projectUpdates: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="team-changes" className="flex flex-col gap-1">
                    <span>Team Changes</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Notifications about team structure changes
                    </span>
                  </Label>
                  <Switch
                    id="team-changes"
                    checked={notificationSettings.teamChanges}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, teamChanges: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="new-members" className="flex flex-col gap-1">
                    <span>New Member Alerts</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Notifications when new members join
                    </span>
                  </Label>
                  <Switch
                    id="new-members"
                    checked={notificationSettings.newMembers}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, newMembers: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="billing-alerts" className="flex flex-col gap-1">
                    <span>Billing Alerts</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Notifications about billing and subscription changes
                    </span>
                  </Label>
                  <Switch
                    id="billing-alerts"
                    checked={notificationSettings.billingAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, billingAlerts: checked })
                    }
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveNotifications}>Save Notification Settings</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="privacy" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Privacy & Security Settings</CardTitle>
            <CardDescription>Configure privacy and security for your organization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold leading-none">Member Privacy</h3>
              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-email" className="flex flex-col gap-1">
                    <span>Show Member Email</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Make member email addresses visible to other members
                    </span>
                  </Label>
                  <Switch
                    id="show-email"
                    checked={privacySettings.showMemberEmail}
                    onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, showMemberEmail: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="show-phone" className="flex flex-col gap-1">
                    <span>Show Member Phone</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Make member phone numbers visible to other members
                    </span>
                  </Label>
                  <Switch
                    id="show-phone"
                    checked={privacySettings.showMemberPhone}
                    onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, showMemberPhone: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="public-profile" className="flex flex-col gap-1">
                    <span>Public Organization Profile</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Make your organization publicly discoverable
                    </span>
                  </Label>
                  <Switch
                    id="public-profile"
                    checked={privacySettings.publicProfile}
                    onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, publicProfile: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="data-sharing" className="flex flex-col gap-1">
                    <span>Data Sharing</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Allow data sharing with third-party analytics
                    </span>
                  </Label>
                  <Switch
                    id="data-sharing"
                    checked={privacySettings.allowDataSharing}
                    onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, allowDataSharing: checked })}
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-sm font-semibold leading-none">Security</h3>
              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="require-mfa" className="flex flex-col gap-1">
                    <span>Require MFA</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Require multi-factor authentication for all members
                    </span>
                  </Label>
                  <Switch
                    id="require-mfa"
                    checked={privacySettings.requireMfa}
                    onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, requireMfa: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="external-login" className="flex flex-col gap-1">
                    <span>Allow External Login</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Allow members to log in with third-party accounts
                    </span>
                  </Label>
                  <Switch
                    id="external-login"
                    checked={privacySettings.allowExternalLogin}
                    onCheckedChange={(checked) =>
                      setPrivacySettings({ ...privacySettings, allowExternalLogin: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="allow-guests" className="flex flex-col gap-1">
                    <span>Allow Guest Access</span>
                    <span className="font-normal text-xs text-muted-foreground">
                      Allow guest access to certain areas of your organization
                    </span>
                  </Label>
                  <Switch
                    id="allow-guests"
                    checked={privacySettings.allowGuests}
                    onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, allowGuests: checked })}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSavePrivacy}>Save Privacy & Security Settings</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="billing" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Billing Information</CardTitle>
            <CardDescription>Manage your organization's billing details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold mb-2">Subscription Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Plan:</span>
                    <span className="text-sm font-medium">{billingInfo.plan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Next Billing Date:</span>
                    <span className="text-sm font-medium">{billingInfo.nextBillingDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Payment Method:</span>
                    <span className="text-sm font-medium">{billingInfo.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Auto Renew:</span>
                    <Switch
                      id="auto-renew"
                      checked={billingInfo.autoRenew}
                      onCheckedChange={(checked) => setBillingInfo({ ...billingInfo, autoRenew: checked })}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-semibold mb-2">User Seats</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Seats:</span>
                      <span className="text-sm font-medium">{billingInfo.seats}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Used Seats:</span>
                      <span className="text-sm font-medium">{billingInfo.usedSeats}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Available Seats:</span>
                      <span className="text-sm font-medium">{billingInfo.seats - billingInfo.usedSeats}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-semibold mb-2">Additional Features</h3>
                  <ul className="space-y-1">
                    {billingInfo.additionalFeatures.map((feature, index) => (
                      <li key={index} className="text-sm">
                        • {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="billing-address">Billing Address</Label>
                  <Textarea
                    id="billing-address"
                    value={billingInfo.billingAddress}
                    onChange={(e) => setBillingInfo({ ...billingInfo, billingAddress: e.target.value })}
                    className="min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billing-email">Billing Email</Label>
                  <Input
                    id="billing-email"
                    type="email"
                    value={billingInfo.billingEmail}
                    onChange={(e) => setBillingInfo({ ...billingInfo, billingEmail: e.target.value })}
                  />
                </div>

                <div className="flex items-center space-x-2 mt-4">
                  <Switch
                    id="tax-exempt"
                    checked={billingInfo.taxExempt}
                    onCheckedChange={(checked) => setBillingInfo({ ...billingInfo, taxExempt: checked })}
                  />
                  <Label htmlFor="tax-exempt">Tax Exempt Organization</Label>
                </div>

                <div className="pt-4">
                  <Button variant="outline" className="w-full">
                    Update Payment Method
                  </Button>
                </div>

                <div className="pt-2">
                  <Button variant="outline" className="w-full">
                    Download Invoice History
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-between flex-wrap gap-2">
            <Button variant="outline">Change Subscription Plan</Button>
            <Button onClick={handleSaveBilling}>Save Billing Information</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
