"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PermissionsProvider } from "@/components/permissions/permissions-data"
import PermissionsOverview from "@/components/permissions/permissions-overview"
import RoleManagement from "@/components/permissions/role-management"
import UserPermissions from "@/components/permissions/user-permissions"
import PermissionGroups from "@/components/permissions/permission-groups"
import PermissionSettings from "@/components/permissions/permission-settings"
import PermissionLogs from "@/components/permissions/permission-logs"

export default function PermissionsPage() {
  return (
    <PermissionsProvider>
      <div className="flex flex-col h-full">
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Permissions</h2>
          </div>
          <p className="text-muted-foreground">
            Manage user roles, permissions, and access controls for your organization.
          </p>

          <Tabs defaultValue="overview" className="space-y-4">
            <div className="overflow-x-auto">
              <TabsList className="inline-flex h-10 items-center justify-start rounded-md bg-muted p-1 text-muted-foreground w-full md:w-auto">
                <TabsTrigger value="overview" className="whitespace-nowrap">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="roles" className="whitespace-nowrap">
                  Roles
                </TabsTrigger>
                <TabsTrigger value="users" className="whitespace-nowrap">
                  Users
                </TabsTrigger>
                <TabsTrigger value="groups" className="whitespace-nowrap">
                  Groups
                </TabsTrigger>
                <TabsTrigger value="settings" className="whitespace-nowrap">
                  Settings
                </TabsTrigger>
                <TabsTrigger value="logs" className="whitespace-nowrap">
                  Logs
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-4">
              <PermissionsOverview />
            </TabsContent>

            <TabsContent value="roles" className="space-y-4">
              <RoleManagement />
            </TabsContent>

            <TabsContent value="users" className="space-y-4">
              <UserPermissions />
            </TabsContent>

            <TabsContent value="groups" className="space-y-4">
              <PermissionGroups />
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <PermissionSettings />
            </TabsContent>

            <TabsContent value="logs" className="space-y-4">
              <PermissionLogs />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PermissionsProvider>
  )
}
