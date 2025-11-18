"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrganizationOverview } from "@/components/organization/organization-overview"
import { TeamMembers } from "@/components/organization/team-members"
import { DepartmentStructure } from "@/components/organization/department-structure"
import { OrganizationProjects } from "@/components/organization/organization-projects"
import { OrganizationSettings } from "@/components/organization/organization-settings"

export default function OrganizationPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Organization</h1>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <OrganizationOverview />
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <TeamMembers />
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <DepartmentStructure />
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <OrganizationProjects />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <OrganizationSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
