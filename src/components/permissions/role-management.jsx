"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
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
import { Search, Plus, Edit, Trash2, Users } from "lucide-react"
import { usePermissions } from "./permissions-data"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function RoleManagement() {
  const { data, addRole, updateRole, deleteRole, addLog } = usePermissions()
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState(null)
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: [],
  })

  const filteredRoles = data.roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddRole = () => {
    addRole({
      ...newRole,
      userCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    addLog({
      action: "Role Created",
      description: `Created new role: ${newRole.name}`,
      user: "Current User",
    })
    setNewRole({
      name: "",
      description: "",
      permissions: [],
    })
    setIsAddDialogOpen(false)
  }

  const handleUpdateRole = () => {
    updateRole(selectedRole.id, {
      ...selectedRole,
      updatedAt: new Date().toISOString(),
    })
    addLog({
      action: "Role Updated",
      description: `Updated role: ${selectedRole.name}`,
      user: "Current User",
    })
    setIsEditDialogOpen(false)
  }

  const handleDeleteRole = () => {
    deleteRole(selectedRole.id)
    addLog({
      action: "Role Deleted",
      description: `Deleted role: ${selectedRole.name}`,
      user: "Current User",
    })
    setIsDeleteDialogOpen(false)
  }

  const handlePermissionToggle = (permissionId, isEdit = false) => {
    if (isEdit) {
      const updatedPermissions = selectedRole.permissions.includes(permissionId)
        ? selectedRole.permissions.filter((id) => id !== permissionId)
        : [...selectedRole.permissions, permissionId]
      setSelectedRole({
        ...selectedRole,
        permissions: updatedPermissions,
      })
    } else {
      const updatedPermissions = newRole.permissions.includes(permissionId)
        ? newRole.permissions.filter((id) => id !== permissionId)
        : [...newRole.permissions, permissionId]
      setNewRole({
        ...newRole,
        permissions: updatedPermissions,
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search roles..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Role
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Role</DialogTitle>
              <DialogDescription>Create a new role with specific permissions.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Role Name</Label>
                <Input
                  id="name"
                  value={newRole.name}
                  onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                  placeholder="e.g. Project Manager"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newRole.description}
                  onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                  placeholder="Describe the role's purpose"
                />
              </div>
              <div className="grid gap-2">
                <Label>Permissions</Label>
                <ScrollArea className="h-[200px] rounded-md border p-4">
                  <div className="grid gap-3">
                    {data.permissions.map((permission) => (
                      <div key={permission.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`add-${permission.id}`}
                          checked={newRole.permissions.includes(permission.id)}
                          onCheckedChange={() => handlePermissionToggle(permission.id)}
                        />
                        <Label htmlFor={`add-${permission.id}`} className="font-normal">
                          {permission.name}
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
              <Button onClick={handleAddRole} disabled={!newRole.name}>
                Create Role
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredRoles.map((role) => (
          <Card key={role.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle>{role.name}</CardTitle>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedRole(role)
                      setIsEditDialogOpen(true)
                    }}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedRole(role)
                      setIsDeleteDialogOpen(true)
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
              <CardDescription>{role.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                <Users className="h-4 w-4" />
                <span>{role.userCount} users</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {role.permissions.slice(0, 3).map((permissionId) => {
                  const permission = data.permissions.find((p) => p.id === permissionId)
                  return permission ? (
                    <Badge key={permissionId} variant="secondary">
                      {permission.name}
                    </Badge>
                  ) : null
                })}
                {role.permissions.length > 3 && <Badge variant="outline">+{role.permissions.length - 3} more</Badge>}
              </div>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
              Updated {new Date(role.updatedAt).toLocaleDateString()}
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Edit Role Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
            <DialogDescription>Modify role details and permissions.</DialogDescription>
          </DialogHeader>
          {selectedRole && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Role Name</Label>
                <Input
                  id="edit-name"
                  value={selectedRole.name}
                  onChange={(e) => setSelectedRole({ ...selectedRole, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Input
                  id="edit-description"
                  value={selectedRole.description}
                  onChange={(e) => setSelectedRole({ ...selectedRole, description: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label>Permissions</Label>
                <ScrollArea className="h-[200px] rounded-md border p-4">
                  <div className="grid gap-3">
                    {data.permissions.map((permission) => (
                      <div key={permission.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`edit-${permission.id}`}
                          checked={selectedRole.permissions.includes(permission.id)}
                          onCheckedChange={() => handlePermissionToggle(permission.id, true)}
                        />
                        <Label htmlFor={`edit-${permission.id}`} className="font-normal">
                          {permission.name}
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
            <Button onClick={handleUpdateRole}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Role Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Role</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this role? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedRole && (
            <div className="py-4">
              <p className="mb-2">
                <strong>{selectedRole.name}</strong>
              </p>
              <p className="text-sm text-muted-foreground">{selectedRole.description}</p>
              {selectedRole.userCount > 0 && (
                <p className="mt-4 text-sm text-destructive">
                  Warning: This role is assigned to {selectedRole.userCount} users. Deleting it will remove these
                  permissions from those users.
                </p>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteRole}>
              Delete Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
