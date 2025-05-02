"use client"

import { createContext, useContext, useState } from "react"

// Mock data for permissions
export const permissionsData = {
  stats: {
    totalUsers: 68,
    activeUsers: 62,
    inactiveUsers: 6,
    totalRoles: 5,
    recentPermissionChanges: 24,
    usersByRole: [
      { name: "Administrator", count: 3 },
      { name: "Manager", count: 12 },
      { name: "Editor", count: 24 },
      { name: "Contributor", count: 18 },
      { name: "Viewer", count: 11 },
    ],
    permissionsByRole: [
      { name: "Administrator", count: 42 },
      { name: "Manager", count: 28 },
      { name: "Editor", count: 18 },
      { name: "Contributor", count: 12 },
      { name: "Viewer", count: 6 },
    ],
  },
  roles: [
    {
      id: 1,
      name: "Administrator",
      description: "Full access to all system features and settings",
      permissions: ["view_all", "edit_all", "delete_all", "manage_users", "manage_roles"],
      userCount: 3,
      createdAt: "2024-01-15T08:00:00Z",
      updatedAt: "2024-04-10T14:30:00Z",
    },
    {
      id: 2,
      name: "Manager",
      description: "Access to manage projects and team members",
      permissions: ["view_all", "edit_projects", "manage_team"],
      userCount: 12,
      createdAt: "2024-01-15T08:05:00Z",
      updatedAt: "2024-03-22T11:45:00Z",
    },
    {
      id: 3,
      name: "Editor",
      description: "Can edit content but cannot change settings",
      permissions: ["view_all", "edit_content"],
      userCount: 24,
      createdAt: "2024-01-15T08:10:00Z",
      updatedAt: "2024-02-18T09:20:00Z",
    },
    {
      id: 4,
      name: "Contributor",
      description: "Can add content but cannot edit existing content",
      permissions: ["view_all", "add_content"],
      userCount: 18,
      createdAt: "2024-01-15T08:15:00Z",
      updatedAt: "2024-03-05T16:10:00Z",
    },
    {
      id: 5,
      name: "Viewer",
      description: "Read-only access to content",
      permissions: ["view_content"],
      userCount: 11,
      createdAt: "2024-01-15T08:20:00Z",
      updatedAt: "2024-02-28T10:30:00Z",
    },
  ],
  permissions: [
    { id: "view_all", name: "View All Content" },
    { id: "edit_all", name: "Edit All Content" },
    { id: "delete_all", name: "Delete All Content" },
    { id: "manage_users", name: "Manage Users" },
    { id: "manage_roles", name: "Manage Roles" },
    { id: "edit_projects", name: "Edit Projects" },
    { id: "manage_team", name: "Manage Team" },
    { id: "edit_content", name: "Edit Content" },
    { id: "add_content", name: "Add Content" },
    { id: "view_content", name: "View Content" },
    { id: "export_data", name: "Export Data" },
    { id: "import_data", name: "Import Data" },
  ],
  users: [
    {
      id: 1,
      name: "Satish Rathod",
      email: "satish.rathod@example.com",
      role: "Administrator",
      status: "active",
      lastActive: "2024-04-30T15:45:00Z",
      avatar: "/stylized-jd-initials.png",
    },
    {
      id: 2,
      name: "Sachin Rathod",
      email: "sachin.rathod@example.com",
      role: "Manager",
      status: "active",
      lastActive: "2024-04-30T14:20:00Z",
      avatar: "/javascript-code.png",
    },
    {
      id: 3,
      name: "Rohit Palkar",
      email: "rohit.palkar@example.com",
      role: "Editor",
      status: "active",
      lastActive: "2024-04-29T11:30:00Z",
      avatar: "/abstract-rj.png",
    },
    {
      id: 4,
      name: "Aakash Mule",
      email: "akash.mule@example.com",
      role: "Contributor",
      status: "active",
      lastActive: "2024-04-28T09:15:00Z",
      avatar: "/ed-initials-abstract.png",
    },
    {
      id: 5,
      name: "Shubham Wagh",
      email: "shubham.wagh@example.com",
      role: "Viewer",
      status: "inactive",
      lastActive: "2024-04-15T16:40:00Z",
      avatar: "/intertwined-letters.png",
    },
    {
      id: 6,
      name: "Preeti Shevale",
      email: "preeti.shewale@example.com",
      role: "Manager",
      status: "active",
      lastActive: "2024-04-30T10:05:00Z",
      avatar: "/stylized-letter-sb.png",
    },
    {
      id: 7,
      name: "Anjali Rathod",
      email: "anjali.rathod@example.com",
      role: "Editor",
      status: "active",
      lastActive: "2024-04-29T13:50:00Z",
      avatar: "/direct-message-interface.png",
    },
    {
      id: 8,
      name: "meet",
      email: "meet@example.com",
      role: "Contributor",
      status: "inactive",
      lastActive: "2024-04-10T08:30:00Z",
      avatar: "/letter-blocks-LT.png",
    },
  ],
  groups: [
    {
      id: 1,
      name: "Marketing Team",
      description: "All marketing department members",
      memberCount: 12,
      roles: ["Editor", "Contributor"],
      createdAt: "2024-02-10T09:00:00Z",
    },
    {
      id: 2,
      name: "Development Team",
      description: "Software developers and engineers",
      memberCount: 18,
      roles: ["Manager", "Editor"],
      createdAt: "2024-02-10T09:15:00Z",
    },
    {
      id: 3,
      name: "Executive Team",
      description: "Company executives and directors",
      memberCount: 5,
      roles: ["Administrator", "Manager"],
      createdAt: "2024-02-10T09:30:00Z",
    },
    {
      id: 4,
      name: "Support Team",
      description: "Customer support representatives",
      memberCount: 8,
      roles: ["Contributor", "Viewer"],
      createdAt: "2024-02-10T09:45:00Z",
    },
    {
      id: 5,
      name: "Sales Team",
      description: "Sales representatives and managers",
      memberCount: 15,
      roles: ["Manager", "Contributor"],
      createdAt: "2024-02-10T10:00:00Z",
    },
  ],
  logs: [
    {
      id: 1,
      action: "Role Created",
      description: "Created new role 'Project Coordinator'",
      user: "Satish Rathod",
      timestamp: "2024-04-30T16:45:00Z",
    },
    {
      id: 2,
      action: "Permission Added",
      description: "Added 'Export Data' permission to 'Manager' role",
      user: "Preeti Shevale",
      timestamp: "2024-04-30T15:30:00Z",
    },
    {
      id: 3,
      action: "User Role Changed",
      description: "Changed Emily Davis from 'Contributor' to 'Editor'",
      user: "Sachin Rathod",
      timestamp: "2024-04-29T14:20:00Z",
    },
    {
      id: 4,
      action: "Group Created",
      description: "Created new group 'Product Team'",
      user: "Rohit Palkar",
      timestamp: "2024-04-28T11:10:00Z",
    },
    {
      id: 5,
      action: "User Added",
      description: "Added new user 'Shubham Wagh",
      user: "example",
      timestamp: "2024-04-27T09:45:00Z",
    },
    {
      id: 6,
      action: "Permission Removed",
      description: "Removed 'Delete All' permission from 'Editor' role",
      user: "example",
      timestamp: "2024-04-26T16:30:00Z",
    },
    {
      id: 7,
      action: "User Deactivated",
      description: "Deactivated user 'example'",
      user: "example",
      timestamp: "2024-04-25T13:15:00Z",
    },
    {
      id: 8,
      action: "Role Deleted",
      description: "Deleted role 'Temporary Access'",
      user: "example",
      timestamp: "2024-04-24T10:50:00Z",
    },
  ],
}

// Create a context for permissions data
const PermissionsContext = createContext()

export function PermissionsProvider({ children }) {
  const [data, setData] = useState(permissionsData)

  // Function to add a new role
  const addRole = (role) => {
    setData((prevData) => ({
      ...prevData,
      roles: [...prevData.roles, { ...role, id: prevData.roles.length + 1 }],
    }))
  }

  // Function to update a role
  const updateRole = (id, updatedRole) => {
    setData((prevData) => ({
      ...prevData,
      roles: prevData.roles.map((role) => (role.id === id ? { ...role, ...updatedRole } : role)),
    }))
  }

  // Function to delete a role
  const deleteRole = (id) => {
    setData((prevData) => ({
      ...prevData,
      roles: prevData.roles.filter((role) => role.id !== id),
    }))
  }

  // Function to add a new user
  const addUser = (user) => {
    setData((prevData) => ({
      ...prevData,
      users: [...prevData.users, { ...user, id: prevData.users.length + 1 }],
    }))
  }

  // Function to update a user
  const updateUser = (id, updatedUser) => {
    setData((prevData) => ({
      ...prevData,
      users: prevData.users.map((user) => (user.id === id ? { ...user, ...updatedUser } : user)),
    }))
  }

  // Function to delete a user
  const deleteUser = (id) => {
    setData((prevData) => ({
      ...prevData,
      users: prevData.users.filter((user) => user.id !== id),
    }))
  }

  // Function to add a new group
  const addGroup = (group) => {
    setData((prevData) => ({
      ...prevData,
      groups: [...prevData.groups, { ...group, id: prevData.groups.length + 1 }],
    }))
  }

  // Function to update a group
  const updateGroup = (id, updatedGroup) => {
    setData((prevData) => ({
      ...prevData,
      groups: prevData.groups.map((group) => (group.id === id ? { ...group, ...updatedGroup } : group)),
    }))
  }

  // Function to delete a group
  const deleteGroup = (id) => {
    setData((prevData) => ({
      ...prevData,
      groups: prevData.groups.filter((group) => group.id !== id),
    }))
  }

  // Function to add a log entry
  const addLog = (log) => {
    setData((prevData) => ({
      ...prevData,
      logs: [{ ...log, id: prevData.logs.length + 1, timestamp: new Date().toISOString() }, ...prevData.logs],
    }))
  }

  return (
    <PermissionsContext.Provider
      value={{
        data,
        addRole,
        updateRole,
        deleteRole,
        addUser,
        updateUser,
        deleteUser,
        addGroup,
        updateGroup,
        deleteGroup,
        addLog,
      }}
    >
      {children}
    </PermissionsContext.Provider>
  )
}

// Custom hook to use permissions context
export function usePermissions() {
  const context = useContext(PermissionsContext)
  if (!context) {
    throw new Error("usePermissions must be used within a PermissionsProvider")
  }
  return context
}
