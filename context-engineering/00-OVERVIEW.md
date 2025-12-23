# 00 - Project Overview

## hired.io - Modern Job Portal Platform

> A next-generation job portal connecting tech talent with innovative companies.

---

## Tech Stack

| Layer         | Technology                    |
| ------------- | ----------------------------- |
| **Framework** | Next.js 14 (App Router)       |
| **Language**  | TypeScript                    |
| **Styling**   | Tailwind CSS                  |
| **Database**  | PostgreSQL (Supabase)         |
| **ORM**       | Prisma                        |
| **Auth**      | NextAuth.js (Credentials)     |
| **UI**        | shadcn/ui + Custom Components |
| **Icons**     | Material Symbols, React Icons |

---

## Project Structure

```
hired-work/
├── prisma/                 # Database schema & migrations
├── src/
│   ├── app/
│   │   ├── (auth)/         # Auth routes (old)
│   │   ├── (dashboard)/    # Admin dashboard (protected)
│   │   ├── (landing-page)/ # Public pages
│   │   ├── api/            # API routes
│   │   └── dashboard/      # New dashboard pages
│   ├── components/
│   │   ├── dashboard/      # Dashboard components
│   │   ├── page/           # Landing page components
│   │   └── ui/             # Reusable UI components
│   ├── lib/                # Auth, helpers, prisma
│   ├── hooks/              # Custom React hooks
│   ├── context/            # React contexts
│   └── types/              # TypeScript types
└── context-engineering/    # Project documentation
```

---

## Features Overview

### For Job Seekers

- Browse job listings with filters
- View company profiles
- Apply to jobs with resume upload
- Track application status

### For Employers (Dashboard)

- Post job listings
- Manage applicants
- Company profile management
- Team management
- Analytics & insights

---

## Design System

- **Theme**: Dark mode with glassmorphism effects
- **Primary Color**: Neon Green (#49e619)
- **Accent Colors**: Purple (#a259ff), Cyan (#00f0ff)
- **Font**: Manrope
- **Effects**: Glass panels, glow effects, subtle animations

---

## Available Pages

### Public Pages (Landing)

| Page           | Route                    | Description                                  |
| -------------- | ------------------------ | -------------------------------------------- |
| Home           | `/`                      | Hero, featured companies & jobs, tech stacks |
| Find Jobs      | `/find-jobs`             | Job listings with filters                    |
| Job Detail     | `/detail/job/[id]`       | Full job description & apply                 |
| Apply Form     | `/detail/job/[id]/apply` | Multi-step application form                  |
| Apply Success  | `/apply-success`         | Application confirmation                     |
| Find Companies | `/find-companies`        | Company directory                            |
| Company Detail | `/find-companies/[id]`   | Company profile & open jobs                  |

### Authentication Pages

| Page    | Route          | Description          |
| ------- | -------------- | -------------------- |
| Sign In | `/auth/signin` | Company login        |
| Sign Up | `/auth/signup` | Company registration |

### Dashboard Pages (Protected)

| Page             | Route                  | Description                  |
| ---------------- | ---------------------- | ---------------------------- |
| Dashboard        | `/dashboard`           | Stats, charts, activity feed |
| Job Listings     | `/dashboard/jobs`      | Manage all job posts         |
| Job Detail Admin | `/dashboard/jobs/[id]` | Applicants & pipeline        |
| Post a Job       | `/dashboard/post-job`  | Create new job listing       |
| Settings         | `/dashboard/settings`  | Company settings             |

### Legacy Dashboard Routes

| Page               | Route           | Description           |
| ------------------ | --------------- | --------------------- |
| Job Listings (Old) | `/job-listings` | Legacy job management |
| Settings (Old)     | `/settings`     | Legacy settings       |
