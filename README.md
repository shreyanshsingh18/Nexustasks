# Nexus Tasks

A full-stack task management application for teams with role-based access, project management, and a premium dashboard UI. Built with Next.js App Router, MongoDB, and Tailwind CSS.

## Features

- **Authentication**: Secure JWT-based authentication using HTTP-only cookies.
- **Role-Based Access**: 
  - Admin: Can create/delete projects, manage team members, manage all tasks, and change user roles.
  - Member: Can view assigned projects/tasks and update the status of their assigned tasks.
- **Project Management**: Group tasks by project.
- **Task Management**: Track task status (Pending, In Progress, Completed), priority, and due dates. Automatic overdue status calculation.
- **Premium UI**: Built with modern design principles, including dark mode support and responsive layout.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: MongoDB + Mongoose
- **Styling**: Tailwind CSS v4
- **Auth**: `jose` (JWT) + `bcryptjs`
- **Validation**: Zod

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:
   Copy `.env.example` to `.env.local` and update the values.
   ```bash
   cp .env.example .env.local
   ```
   Ensure you have a valid `MONGODB_URI`.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [team-task-manager-three-omega.vercel.app](team-task-manager-three-omega.vercel.app) in your browser.

### First Time Setup

The first user that registers will automatically be assigned the **Admin** role. All subsequent users will be registered as **Members**. The Admin can then change roles from the "Team Members" page in the dashboard.

## API Documentation

All API routes are located under `/api/`. They are protected and require a valid JWT either in the `Authorization: Bearer <token>` header or in the `token` HTTP-only cookie.

- **Auth**: `POST /api/auth/signup`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`
- **Projects**: `GET /api/projects`, `POST /api/projects`, `GET /api/projects/:id`, `PUT /api/projects/:id`, `DELETE /api/projects/:id`
- **Tasks**: `GET /api/tasks`, `POST /api/tasks`, `GET /api/tasks/:id`, `PUT /api/tasks/:id`, `DELETE /api/tasks/:id`
- **Users**: `GET /api/users`, `PUT /api/users` (Admin only)

## Deployment Instructions

### 1. GitHub
To push your project to GitHub:
1. Create a new repository on GitHub.
2. Run the following commands in your terminal:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

### 2. Railway
To deploy on [Railway](https://railway.app/):
1. Log in to Railway and click **"New Project"**.
2. Select **"Deploy from GitHub repo"** and choose your repository.
3. Railway will automatically detect the Next.js project.
4. Click on your project in Railway, go to the **"Variables"** tab, and add the following:
   * `MONGODB_URI`: Your MongoDB Atlas connection string (or add a MongoDB service in Railway).
   * `JWT_SECRET`: A long, random string (e.g., `super_secret_key_12345`).
5. Railway will automatically build and deploy your project!
