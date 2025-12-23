# 01 - Architecture

## Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                         │
│  ┌─────────────────┐  ┌─────────────────────────────────┐  │
│  │  Landing Pages  │  │        Dashboard (Admin)        │  │
│  │  - Home         │  │  - Job Management               │  │
│  │  - Jobs         │  │  - Applicant Tracking           │  │
│  │  - Companies    │  │  - Settings                     │  │
│  │  - Auth         │  │  - Analytics                    │  │
│  └─────────────────┘  └─────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                      API Layer (Next.js)                    │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  /api/auth/*     - Authentication (NextAuth)          │ │
│  │  /api/jobs/*     - Job CRUD operations                │ │
│  │  /api/companies/*- Company operations                 │ │
│  │  /api/user/*     - User management                    │ │
│  └───────────────────────────────────────────────────────┘ │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                      Data Layer                             │
│  ┌──────────────────┐    ┌───────────────────────────────┐ │
│  │   Prisma ORM     │───▶│   PostgreSQL (Supabase)       │ │
│  └──────────────────┘    └───────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## Route Architecture

### Route Groups

| Group            | Path                         | Description                     |
| ---------------- | ---------------------------- | ------------------------------- |
| `(landing-page)` | `/`                          | Public pages with Navbar/Footer |
| `(dashboard)`    | `/job-listings`, `/settings` | Protected admin pages           |
| `dashboard`      | `/dashboard/*`               | New dashboard pages             |
| `api`            | `/api/*`                     | Backend API routes              |

---

## Component Architecture

```
src/components/
├── dashboard/
│   ├── DashboardSidebar.tsx   # Sidebar navigation
│   ├── Header.tsx             # Dashboard header
│   └── Forms/                 # Form components
├── page/
│   ├── Navbar.tsx             # Main navigation
│   ├── Footer.tsx             # Site footer
│   ├── JobCard.tsx            # Job listing card
│   └── CompanyCard.tsx        # Company card
└── ui/
    ├── button.tsx             # shadcn button
    ├── input.tsx              # shadcn input
    ├── GlassPanel.tsx         # Glassmorphism panel
    └── GlowButton.tsx         # Neon glow button
```

---

## State Management

- **Server State**: React Server Components (RSC)
- **Client State**: React hooks (useState, useContext)
- **Auth State**: NextAuth session
- **Forms**: React Hook Form + Zod validation
