# 💰 CoreFinance Dashboard

> Developed by Satish Rathod

A comprehensive financial dashboard built with Next.js, featuring multiple modules for financial management, analytics, organization management, and more.

Live Demo: [CoreFinance Dashboard](https://corefinance.vercel.app/)

![Next.js](https://img.shields.io/badge/Next.js-13+-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)

## ✨ Features

### 📊 Dashboard
- Account overview with balance tracking
- Recent transactions summary
- Financial charts and analytics
- Quick actions for common tasks

### 💸 Transactions
- Complete transaction history
- Filtering by date, category, and amount
- Transaction details with edit and delete functionality
- Visual breakdown of spending by category

### 📝 Invoices
- Create, view, edit, and delete invoices
- Filter invoices by status (paid, pending, overdue)
- Invoice statistics and monthly trends
- Detailed invoice management

### 🚀 Projects
- Project tracking and management
- Timeline visualization
- Project details and team assignment
- Active and archived project views

### 🏢 Organization
- Team member management
- Department structure visualization
- Organization projects overview
- Organization settings

### ⚙️ Settings
- User profile management
- Notification preferences
- Security settings
- Theme customization

### 💬 Chat
- Real-time messaging
- Emoji and sticker support
- AI-powered chat assistant
- Message threading and reactions

## 📁 Pages Structure

```
app/
├── page.jsx                # Dashboard home
├── analytics/              # Analytics and reporting
├── settings/               # User settings
├── organization/           # Organization management
├── projects/               # Projects management
├── transactions/           # Transactions management
├── invoices/               # Invoices management
│   ├── page.jsx            # Main invoices page
│   ├── [id]/               # Invoice details by ID
│   │   ├── page.jsx        # View invoice
│   │   └── edit/page.jsx   # Edit invoice
│   └── create/page.jsx     # Create new invoice
├── chat/                   # Chat functionality
```

## 🧩 Components

The project uses a component-based architecture with reusable UI elements:

- **Layout Components**: Sidebar, TopNav, Content
- **UI Components**: Cards, Buttons, Modals, Charts
- **Feature Components**: Specific components for each module

All UI components are built with shadcn/ui for consistent styling and accessibility.

## 🚀 Getting Started

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev