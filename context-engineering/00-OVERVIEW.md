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
