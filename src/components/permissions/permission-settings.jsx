"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { usePermissions } from "./permissions-data"
import { useToast } from "@/components/ui/use-toast"

export default function PermissionSettings() {
  const { addLog } = usePermissions()
  const { toast } = useToast()

  const [passwordSettings, setPasswordSettings] = useState({
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    expiryDays: 90,
    preventReuse: 5,
  })

  const [loginSettings, setLoginSettings] = useState({
    maxAttempts: 5,
    lockoutMinutes: 30,
    sessionTimeout: 60,
    requireMFA: false,
    rememberMe: true,
    allowMultipleSessions: false,
  })

  const [accessSettings, setAccessSettings] = useState({
    defaultRole: "Viewer",
    autoDeactivateDays: 90,
    ipRestriction: false,
    allowedIPs: "",
    workHoursOnly: false,
    workHoursStart: "09:00",
    workHoursEnd: "17:00",
    workDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  })

  const [auditSettings, setAuditSettings] = useState({
    enableAudit: true,
    logLevel: "medium",
    retentionDays: 365,
    exportFormat: "CSV",
    notifyAdmins: true,
    criticalChangesOnly: false,
  })

  const handleSaveSettings = (settingType) => {
    addLog({
      action: "Settings Updated",
      description: `Updated ${settingType} settings`,
      user: "Current User",
    })

    toast({
      title: "Settings saved",
      description: `${settingType} settings have been updated successfully.`,
    })
  }

  return (
    <Tabs defaultValue="password" className="space-y-4">
      <div className="overflow-x-auto">
        <TabsList className="inline-flex h-10 items-center justify-start rounded-md bg-muted p-1 text-muted-foreground w-full md:w-auto">
          <TabsTrigger value="password" className="whitespace-nowrap">
            Password Policy
          </TabsTrigger>
          <TabsTrigger value="login" className="whitespace-nowrap">
            Login Security
          </TabsTrigger>
          <TabsTrigger value="access" className="whitespace-nowrap">
            Access Control
          </TabsTrigger>
          <TabsTrigger value="audit" className="whitespace-nowrap">
            Audit Logging
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="password" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Password Policy</CardTitle>
            <CardDescription>Configure password requirements and expiration settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="minLength">Minimum Password Length</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Slider
                    id="minLength"
                    min={6}
                    max={16}
                    step={1}
                    value={[passwordSettings.minLength]}
                    onValueChange={(value) => setPasswordSettings({ ...passwordSettings, minLength: value[0] })}
                    className="flex-1"
                  />
                  <span className="w-12 text-center">{passwordSettings.minLength}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="requireUppercase">Require Uppercase Letters</Label>
                  <Switch
                    id="requireUppercase"
                    checked={passwordSettings.requireUppercase}
                    onCheckedChange={(checked) =>
                      setPasswordSettings({ ...passwordSettings, requireUppercase: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="requireLowercase">Require Lowercase Letters</Label>
                  <Switch
                    id="requireLowercase"
                    checked={passwordSettings.requireLowercase}
                    onCheckedChange={(checked) =>
                      setPasswordSettings({ ...passwordSettings, requireLowercase: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="requireNumbers">Require Numbers</Label>
                  <Switch
                    id="requireNumbers"
                    checked={passwordSettings.requireNumbers}
                    onCheckedChange={(checked) => setPasswordSettings({ ...passwordSettings, requireNumbers: checked })}
                  />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="requireSpecialChars">Require Special Characters</Label>
                  <Switch
                    id="requireSpecialChars"
                    checked={passwordSettings.requireSpecialChars}
                    onCheckedChange={(checked) =>
                      setPasswordSettings({ ...passwordSettings, requireSpecialChars: checked })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDays">Password Expiry (Days)</Label>
                  <Input
                    id="expiryDays"
                    type="number"
                    min="0"
                    value={passwordSettings.expiryDays}
                    onChange={(e) =>
                      setPasswordSettings({ ...passwordSettings, expiryDays: Number.parseInt(e.target.value) || 0 })
                    }
                  />
                  <p className="text-xs text-muted-foreground">Set to 0 for no expiration</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preventReuse">Prevent Password Reuse</Label>
                  <Input
                    id="preventReuse"
                    type="number"
                    min="0"
                    max="10"
                    value={passwordSettings.preventReuse}
                    onChange={(e) =>
                      setPasswordSettings({ ...passwordSettings, preventReuse: Number.parseInt(e.target.value) || 0 })
                    }
                  />
                  <p className="text-xs text-muted-foreground">Number of previous passwords that cannot be reused</p>
                </div>
              </div>
            </div>

            <Button onClick={() => handleSaveSettings("password")}>Save Password Settings</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="login" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Login Security</CardTitle>
            <CardDescription>
              Configure login attempts, session timeouts, and multi-factor authentication.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxAttempts">Maximum Login Attempts</Label>
                  <Input
                    id="maxAttempts"
                    type="number"
                    min="1"
                    max="10"
                    value={loginSettings.maxAttempts}
                    onChange={(e) =>
                      setLoginSettings({ ...loginSettings, maxAttempts: Number.parseInt(e.target.value) || 1 })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lockoutMinutes">Account Lockout Duration (Minutes)</Label>
                  <Input
                    id="lockoutMinutes"
                    type="number"
                    min="5"
                    value={loginSettings.lockoutMinutes}
                    onChange={(e) =>
                      setLoginSettings({ ...loginSettings, lockoutMinutes: Number.parseInt(e.target.value) || 5 })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (Minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    min="5"
                    value={loginSettings.sessionTimeout}
                    onChange={(e) =>
                      setLoginSettings({ ...loginSettings, sessionTimeout: Number.parseInt(e.target.value) || 5 })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="requireMFA">Require Multi-Factor Authentication</Label>
                  <Switch
                    id="requireMFA"
                    checked={loginSettings.requireMFA}
                    onCheckedChange={(checked) => setLoginSettings({ ...loginSettings, requireMFA: checked })}
                  />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="rememberMe">Allow "Remember Me" Option</Label>
                  <Switch
                    id="rememberMe"
                    checked={loginSettings.rememberMe}
                    onCheckedChange={(checked) => setLoginSettings({ ...loginSettings, rememberMe: checked })}
                  />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="allowMultipleSessions">Allow Multiple Sessions</Label>
                  <Switch
                    id="allowMultipleSessions"
                    checked={loginSettings.allowMultipleSessions}
                    onCheckedChange={(checked) =>
                      setLoginSettings({ ...loginSettings, allowMultipleSessions: checked })
                    }
                  />
                </div>
              </div>
            </div>

            <Button onClick={() => handleSaveSettings("login")}>Save Login Settings</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="access" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Access Control</CardTitle>
            <CardDescription>Configure default roles, IP restrictions, and access schedules.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="defaultRole">Default Role for New Users</Label>
                  <Select
                    value={accessSettings.defaultRole}
                    onValueChange={(value) => setAccessSettings({ ...accessSettings, defaultRole: value })}
                  >
                    <SelectTrigger id="defaultRole">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Administrator">Administrator</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Editor">Editor</SelectItem>
                      <SelectItem value="Contributor">Contributor</SelectItem>
                      <SelectItem value="Viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="autoDeactivateDays">Auto-Deactivate After Inactivity (Days)</Label>
                  <Input
                    id="autoDeactivateDays"
                    type="number"
                    min="0"
                    value={accessSettings.autoDeactivateDays}
                    onChange={(e) =>
                      setAccessSettings({ ...accessSettings, autoDeactivateDays: Number.parseInt(e.target.value) || 0 })
                    }
                  />
                  <p className="text-xs text-muted-foreground">Set to 0 to disable auto-deactivation</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="ipRestriction">Enable IP Restrictions</Label>
                  <Switch
                    id="ipRestriction"
                    checked={accessSettings.ipRestriction}
                    onCheckedChange={(checked) => setAccessSettings({ ...accessSettings, ipRestriction: checked })}
                  />
                </div>

                {accessSettings.ipRestriction && (
                  <div className="space-y-2 mt-2">
                    <Label htmlFor="allowedIPs">Allowed IP Addresses</Label>
                    <Input
                      id="allowedIPs"
                      placeholder="e.g. 192.168.1.1, 10.0.0.0/24"
                      value={accessSettings.allowedIPs}
                      onChange={(e) => setAccessSettings({ ...accessSettings, allowedIPs: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter IP addresses or CIDR ranges, separated by commas
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="workHoursOnly">Restrict Access to Work Hours Only</Label>
                  <Switch
                    id="workHoursOnly"
                    checked={accessSettings.workHoursOnly}
                    onCheckedChange={(checked) => setAccessSettings({ ...accessSettings, workHoursOnly: checked })}
                  />
                </div>

                {accessSettings.workHoursOnly && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="space-y-2">
                      <Label htmlFor="workHoursStart">Work Hours Start</Label>
                      <Input
                        id="workHoursStart"
                        type="time"
                        value={accessSettings.workHoursStart}
                        onChange={(e) => setAccessSettings({ ...accessSettings, workHoursStart: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="workHoursEnd">Work Hours End</Label>
                      <Input
                        id="workHoursEnd"
                        type="time"
                        value={accessSettings.workHoursEnd}
                        onChange={(e) => setAccessSettings({ ...accessSettings, workHoursEnd: e.target.value })}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Button onClick={() => handleSaveSettings("access")}>Save Access Settings</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="audit" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Audit Logging</CardTitle>
            <CardDescription>Configure audit log settings and retention policies.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="enableAudit">Enable Audit Logging</Label>
                <Switch
                  id="enableAudit"
                  checked={auditSettings.enableAudit}
                  onCheckedChange={(checked) => setAuditSettings({ ...auditSettings, enableAudit: checked })}
                />
              </div>

              {auditSettings.enableAudit && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="logLevel">Log Detail Level</Label>
                      <Select
                        value={auditSettings.logLevel}
                        onValueChange={(value) => setAuditSettings({ ...auditSettings, logLevel: value })}
                      >
                        <SelectTrigger id="logLevel">
                          <SelectValue placeholder="Select log level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low (Basic Actions Only)</SelectItem>
                          <SelectItem value="medium">Medium (Standard Detail)</SelectItem>
                          <SelectItem value="high">High (Detailed Logging)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="retentionDays">Log Retention Period (Days)</Label>
                      <Input
                        id="retentionDays"
                        type="number"
                        min="30"
                        value={auditSettings.retentionDays}
                        onChange={(e) =>
                          setAuditSettings({
                            ...auditSettings,
                            retentionDays: Number.parseInt(e.target.value) || 30,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="exportFormat">Export Format</Label>
                      <Select
                        value={auditSettings.exportFormat}
                        onValueChange={(value) => setAuditSettings({ ...auditSettings, exportFormat: value })}
                      >
                        <SelectTrigger id="exportFormat">
                          <SelectValue placeholder="Select export format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CSV">CSV</SelectItem>
                          <SelectItem value="JSON">JSON</SelectItem>
                          <SelectItem value="PDF">PDF</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="notifyAdmins">Notify Admins of Critical Changes</Label>
                      <Switch
                        id="notifyAdmins"
                        checked={auditSettings.notifyAdmins}
                        onCheckedChange={(checked) => setAuditSettings({ ...auditSettings, notifyAdmins: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="criticalChangesOnly">Log Critical Changes Only</Label>
                      <Switch
                        id="criticalChangesOnly"
                        checked={auditSettings.criticalChangesOnly}
                        onCheckedChange={(checked) =>
                          setAuditSettings({ ...auditSettings, criticalChangesOnly: checked })
                        }
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            <Button onClick={() => handleSaveSettings("audit")}>Save Audit Settings</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
