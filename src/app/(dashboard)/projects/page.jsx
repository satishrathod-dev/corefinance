"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectsOverview } from "@/components/projects/projects-overview"
import { ActiveProjects } from "@/components/projects/active-projects"
import { ArchivedProjects } from "@/components/projects/archived-projects"
import { ProjectTimelines } from "@/components/projects/project-timelines"
import { ProjectSettings } from "@/components/projects/project-settings"

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="text-muted-foreground">Manage your projects, track progress, and collaborate with your team.</p>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
          <TabsTrigger value="timelines">Timelines</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <ProjectsOverview />
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <ActiveProjects />
        </TabsContent>

        <TabsContent value="archived" className="space-y-4">
          <ArchivedProjects />
        </TabsContent>

        <TabsContent value="timelines" className="space-y-4">
          <ProjectTimelines />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <ProjectSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
