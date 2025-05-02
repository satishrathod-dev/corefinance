"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, MoreHorizontal, Users } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePermissions } from "./permissions-data"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"

export default function PermissionGroups() {
  const { data, addGroup, updateGroup, deleteGroup, addLog } = usePermissions()
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [newGroup, setNewGroup] = useState({
    name: "",
    description: "",
    roles: [],
    memberCount: 0,
  })

  const filteredGroups = data.groups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddGroup = () => {
    addGroup({
      ...newGroup,
      createdAt: new Date().toISOString(),
    })
    addLog({
      action: "Group Created",
      description: `Created new group: ${newGroup.name}`,
      user: "Current User",
    })
    setNewGroup({
      name: "",
      description: "",
      roles: [],
      memberCount: 0,
    })
    setIsAddDialogOpen(false)
  }

  const handleUpdateGroup = () => {
    updateGroup(selectedGroup.id, selectedGroup)
    addLog({
      action: "Group Updated",
      description: `Updated group: ${selectedGroup.name}`,
      user: "Current User",
    })
    setIsEditDialogOpen(false)
  }

  const handleDeleteGroup = () => {
    deleteGroup(selectedGroup.id)
    addLog({
      action: "Group Deleted",
      description: `Deleted group: ${selectedGroup.name}`,
      user: "Current User",
    })
    setIsDeleteDialogOpen(false)
  }

  const handleRoleToggle = (roleName, isEdit = false) => {
    if (isEdit) {
      const updatedRoles = selectedGroup.roles.includes(roleName)
        ? selectedGroup.roles.filter((name) => name !== roleName)
        : [...selectedGroup.roles, roleName]
      setSelectedGroup({
        ...selectedGroup,
        roles: updatedRoles,
      })
    } else {
      const updatedRoles = newGroup.roles.includes(roleName)
        ? newGroup.roles.filter((name) => name !== roleName)
        : [...newGroup.roles, roleName]
      setNewGroup({
        ...newGroup,
        roles: updatedRoles,
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search groups..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Group
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Group</DialogTitle>
              <DialogDescription>Create a new group with specific roles.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Group Name</Label>
                <Input
                  id="name"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                  placeholder="e.g. Marketing Team"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newGroup.description}
                  onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                  placeholder="Describe the group's purpose"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="memberCount">Initial Member Count</Label>
                <Input
                  id="memberCount"
                  type="number"
                  min="0"
                  value={newGroup.memberCount}
                  onChange={(e) => setNewGroup({ ...newGroup, memberCount: Number.parseInt(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>
              <div className="grid gap-2">
                <Label>Assigned Roles</Label>
                <ScrollArea className="h-[150px] rounded-md border p-4">
                  <div className="grid gap-3">
                    {data.roles.map((role) => (
                      <div key={role.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`add-role-${role.id}`}
                          checked={newGroup.roles.includes(role.name)}
                          onCheckedChange={() => handleRoleToggle(role.name)}
                        />
                        <Label htmlFor={`add-role-${role.id}`} className="font-normal">
                          {role.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddGroup} disabled={!newGroup.name}>
                Create Group
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Permission Groups</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-md border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50 text-muted-foreground">
                    <th className="p-2 text-left font-medium">Group</th>
                    <th className="p-2 text-left font-medium">Members</th>
                    <th className="p-2 text-left font-medium">Roles</th>
                    <th className="p-2 text-left font-medium">Created</th>
                    <th className="p-2 text-center font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGroups.map((group) => (
                    <tr key={group.id} className="border-b">
                      <td className="p-2">
                        <div>
                          <div className="font-medium">{group.name}</div>
                          <div className="text-xs text-muted-foreground">{group.description}</div>
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{group.memberCount}</span>
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="flex flex-wrap gap-1">
                          {group.roles.map((role, index) => (
                            <Badge key={index} variant="outline">
                              {role}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="p-2 text-muted-foreground">{new Date(group.createdAt).toLocaleDateString()}</td>
                      <td className="p-2 text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedGroup(group)
                                setIsEditDialogOpen(true)
                              }}
                            >
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => {
                                setSelectedGroup(group)
                                setIsDeleteDialogOpen(true)
                              }}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Group Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Group</DialogTitle>
            <DialogDescription>Modify group details and assigned roles.</DialogDescription>
          </DialogHeader>
          {selectedGroup && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Group Name</Label>
                <Input
                  id="edit-name"
                  value={selectedGroup.name}
                  onChange={(e) => setSelectedGroup({ ...selectedGroup, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Input
                  id="edit-description"
                  value={selectedGroup.description}
                  onChange={(e) => setSelectedGroup({ ...selectedGroup, description: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-memberCount">Member Count</Label>
                <Input
                  id="edit-memberCount"
                  type="number"
                  min="0"
                  value={selectedGroup.memberCount}
                  onChange={(e) =>
                    setSelectedGroup({ ...selectedGroup, memberCount: Number.parseInt(e.target.value) || 0 })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label>Assigned Roles</Label>
                <ScrollArea className="h-[150px] rounded-md border p-4">
                  <div className="grid gap-3">
                    {data.roles.map((role) => (
                      <div key={role.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`edit-role-${role.id}`}
                          checked={selectedGroup.roles.includes(role.name)}
                          onCheckedChange={() => handleRoleToggle(role.name, true)}
                        />
                        <Label htmlFor={`edit-role-${role.id}`} className="font-normal">
                          {role.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateGroup}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Group Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Group</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this group? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedGroup && (
            <div className="py-4">
              <p className="mb-2">
                <strong>{selectedGroup.name}</strong>
              </p>
              <p className="text-sm text-muted-foreground">{selectedGroup.description}</p>
              {selectedGroup.memberCount > 0 && (
                <p className="mt-4 text-sm text-destructive">
                  Warning: This group has {selectedGroup.memberCount} members. Deleting it will remove these members
                  from the group.
                </p>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteGroup}>
              Delete Group
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
