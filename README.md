# Storify - Subscription-based File & Folder Management System

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Shadcn UI](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)

## 📌 Project Overview

**Storify** is a full-featured, subscription-based file and folder management system that simulates a real-world SaaS storage product. The system allows administrators to define and manage tiered subscription packages (Free, Silver, Gold, Diamond) that strictly control how each user interacts with their storage.

The platform enforces package-level restrictions across every user action, including:
- **Folder Nesting Depth:** Maximum depth users can nest folders within their subscription tier
- **File Type Restrictions:** Which file types users are allowed to upload based on their package
- **File Size Limits:** Maximum file size allowed per upload
- **Folder & File Quotas:** Total number of folders and files allowed per user
- **Per-Folder Limits:** Maximum files/folders allowed within a single folder

All business rules are defined dynamically by the admin rather than hardcoded into the application, providing flexibility to adjust subscription benefits without code changes.

## ✨ Features

### For Admins

- **Package Management:** Create, update, and delete subscription packages (Free, Silver, Gold, Diamond)
- **Tier Configuration:** Define storage limits, file restrictions, and nesting depths per package
- **User Management:** View and manage all users and their subscription status
- **Dashboard Analytics:** Monitor storage usage, active subscriptions, and system metrics
- **Dynamic Business Rules:** Configure all restrictions from the admin panel without code changes

### For Users

- **File Management:** Upload, download, rename, move, and delete files
- **Folder Management:** Create, rename, move, and delete folders with enforced nesting limits
- **Storage Dashboard:** View current storage usage and quota limits
- **Package Upgrade:** View available subscription tiers and upgrade options
- **Search & Filter:** Easily find files and folders with search functionality
- **File Preview:** Preview supported file types before downloading

## 🛠️ Tech Stack

### Frontend

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Library:** [React.js](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) for robust and type-safe code
- **Styling UI:** Tailwind CSS and [Shadcn UI](https://ui.shadcn.com/) for beautifully designed, accessible, and customizable components
- **State Management:** React Context API / Zustand
- **API Client:** Axios / Fetch API

### Backend (Recommended)

- **Runtime:** Node.js
- **Framework:** Express.js / NestJS
- **Database:** PostgreSQL / MongoDB
- **ORM:** Prisma / Mongoose
- **Authentication:** JWT / NextAuth.js
- **File Storage:** Local / AWS S3 / Cloudinary

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm, yarn, pnpm, or bun
- Git

### Installation

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd storify-client
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or yarn install / pnpm install
   ```

3. **Set up environment variables:**
   
   Create a `.env.local` file in the root directory with the following variables:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   NEXT_PUBLIC_APP_NAME=Storify
   ```

### Running the Application

To start the Next.js development server:

```bash
npm run dev
# or yarn dev
# or pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application running.

## 🏗️ Code Organization

The frontend project is structured for scalability and maintainability:

```text
storify-client/
├── app/                  # Next.js App Router root
│   ├── (auth)/           # Authentication routes (login, register, forgot-password)
│   ├── (main)/           # Public main pages (Home, About, Pricing)
│   ├── admin/            # Admin dashboard and package management
│   ├── dashboard/        # User dashboard for file/folder management
│   ├── globals.css       # Global Tailwind CSS styles
│   ├── layout.tsx        # Root application layout
│   └── not-found.tsx     # Custom 404 error page
├── components/           # Reusable UI components
│   ├── admin/            # Admin-specific components
│   ├── dashboard/        # Dashboard widgets and file/folder components
│   ├── shared/           # Global shared components (Navbar, Footer, Sidebar)
│   └── ui/               # Base Shadcn UI components (button, dialog, etc.)
├── data/                 # Static data and configurations
├── interface/            # TypeScript interfaces and types
├── lib/                  # Utility functions and helpers
├── services/             # API integration and external communications
│   ├── api.ts            # Base API client and fetch wrapper
│   ├── auth.service.ts   # Authentication-related API functions
│   ├── file.service.ts   # File management API functions
│   └── package.service.ts # Subscription package API functions
├── public/               # Static public assets
├── .env.local            # Environment variables
├── components.json       # Shadcn UI configuration
├── next.config.ts        # Next.js configuration
├── package.json          # Project dependencies
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 📋 Subscription Tiers

| Feature | Free | Silver | Gold | Diamond |
|---------|------|--------|------|---------|
| Storage Space | 1 GB | 10 GB | 50 GB | 500 GB |
| Max File Size | 10 MB | 100 MB | 500 MB | 2 GB |
| Max Folder Depth | 3 | 5 | 10 | Unlimited |
| Max Files | 100 | 1,000 | 10,000 | Unlimited |
| Max Folders | 10 | 100 | 1,000 | Unlimited |
| Allowed File Types | Basic | Extended | All | All + Premium |

*Note: All limits are configurable by the admin through the dashboard.*

## 🎯 Key Features

### Admin Features

1. **Package Management:** Full CRUD operations for subscription packages
2. **Dynamic Restrictions:** Configure all limits without code changes
3. **User Oversight:** View and manage all user accounts
4. **Analytics Dashboard:** Monitor system usage and revenue metrics

### User Features

1. **File Operations:** Upload, download, rename, move, delete with restriction enforcement
2. **Folder Operations:** Create nested folders within tier limits
3. **Storage Management:** Real-time quota tracking and usage visualization
4. **Subscription Management:** View and upgrade packages seamlessly

## 🔐 Security & Enforcement

- **Server-Side Validation:** All restrictions enforced at the API level
- **Authentication:** Secure JWT-based authentication system
- **Authorization:** Role-based access control (Admin/User)
- **File Validation:** File type and size validation before upload
- **Quota Checking:** Real-time quota validation on every operation

## 🎨 UI/UX Highlights

- **Responsive Design:** Fully responsive across all devices
- **Modern Interface:** Clean, intuitive design using Shadcn UI components
- **Real-Time Feedback:** Instant validation messages and error handling
- **Loading States:** Smooth loading indicators and skeleton screens
- **Toast Notifications:** User-friendly feedback for all actions

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ using Next.js, TypeScript, and Shadcn UI
