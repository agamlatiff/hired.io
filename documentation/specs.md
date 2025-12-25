# specs.md - The Blueprint

> Dokumentasi lengkap fitur, API, komponen, dan halaman admin untuk hired.io job portal.

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
│   │   ├── (auth)/         # Auth routes
│   │   ├── (landing-page)/ # Public pages
│   │   ├── api/            # API routes
│   │   └── dashboard/      # Dashboard pages (protected)
│   ├── components/
│   │   ├── dashboard/      # Dashboard components
│   │   ├── page/           # Landing page components
│   │   └── ui/             # Reusable UI components
│   ├── lib/                # Auth, helpers, prisma
│   ├── hooks/              # Custom React hooks
│   ├── context/            # React contexts
│   └── types/              # TypeScript types
└── documentation/          # Project documentation
```

---

## Design System

- **Theme**: Dark mode with glassmorphism effects
- **Primary Color**: Neon Green (#49e619)
- **Accent Colors**: Purple (#a259ff), Cyan (#00f0ff)
- **Font**: Manrope
- **Effects**: Glass panels, glow effects, subtle animations

---

## Features

### For Job Seekers (Public)

| Feature        | Route                    | Description                     |
| -------------- | ------------------------ | ------------------------------- |
| Home           | `/`                      | Hero, featured companies & jobs |
| Find Jobs      | `/find-jobs`             | Job listings with filters       |
| Job Detail     | `/detail/job/[id]`       | Full job description & apply    |
| Apply Form     | `/detail/job/[id]/apply` | Multi-step application form     |
| Apply Success  | `/apply-success`         | Application confirmation        |
| Find Companies | `/find-companies`        | Company directory               |
| Company Detail | `/find-companies/[id]`   | Company profile & open jobs     |

### For Employers (Dashboard)

| Feature          | Route                  | Description                  |
| ---------------- | ---------------------- | ---------------------------- |
| Dashboard        | `/dashboard`           | Stats, charts, activity feed |
| Job Listings     | `/dashboard/jobs`      | Manage all job posts         |
| Job Detail Admin | `/dashboard/jobs/[id]` | Applicants & pipeline        |
| Post a Job       | `/dashboard/post-job`  | Create new job listing       |
| Settings         | `/dashboard/settings`  | Company settings             |

---

## Authentication

### Auth Provider: NextAuth.js with Credentials Provider

**Config File**: `src/lib/auth.ts`

```typescript
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [CredentialsProvider({ ... })],
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/signup",
  },
  callbacks: { jwt, session }
}
```

### Auth Flow

```
Login Form → NextAuth Verify → Session Created
    ↓              ↓                  ↓
Email/Password  Company/User     JWT Token + Cookie
                lookup
```

### User Types

| Type        | Login            | Role                                    |
| ----------- | ---------------- | --------------------------------------- |
| **Company** | Email + Password | Employer - Post jobs, manage applicants |
| **User**    | Email + Password | Job Seeker - Apply to jobs              |

### Protected Routes

Dashboard layout (`src/app/dashboard/layout.tsx`) uses `getServerSession(authOptions)` to protect routes.

### Environment Variables

```env
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

---

## API Endpoints

### Authentication

| Method | Endpoint            | Description |
| ------ | ------------------- | ----------- |
| POST   | `/api/auth/signin`  | Sign in     |
| POST   | `/api/auth/signout` | Sign out    |
| GET    | `/api/auth/session` | Get session |

### Jobs API

#### Public

| Method | Endpoint               | Description        |
| ------ | ---------------------- | ------------------ |
| GET    | `/api/jobs`            | List all jobs      |
| GET    | `/api/jobs/[id]`       | Get job by ID      |
| GET    | `/api/jobs/categories` | Get job categories |
| GET    | `/api/jobs/featured`   | Get featured jobs  |

#### Protected (Company Auth)

| Method | Endpoint               | Description       |
| ------ | ---------------------- | ----------------- |
| POST   | `/api/job`             | Create new job    |
| PUT    | `/api/job/[id]`        | Update job        |
| DELETE | `/api/job/[id]`        | Delete job        |
| PATCH  | `/api/job/[id]/status` | Update job status |

### Companies API

| Method | Endpoint                    | Auth     | Description             |
| ------ | --------------------------- | -------- | ----------------------- |
| GET    | `/api/companies`            | Public   | List all companies      |
| GET    | `/api/companies/[id]`       | Public   | Get company by ID       |
| GET    | `/api/company`              | Required | Get current company     |
| PUT    | `/api/company/overview`     | Required | Update company overview |
| POST   | `/api/company/team`         | Required | Add team member         |
| PUT    | `/api/company/social-media` | Required | Update social links     |

### User & Applicant API

| Method | Endpoint                  | Description              |
| ------ | ------------------------- | ------------------------ |
| POST   | `/api/user`               | Create user account      |
| GET    | `/api/user/[id]`          | Get user profile         |
| POST   | `/api/jobs/[id]/apply`    | Apply to job             |
| GET    | `/api/company/applicants` | Get company's applicants |

### Dashboard API

| Method | Endpoint                      | Description             |
| ------ | ----------------------------- | ----------------------- |
| GET    | `/api/dashboard/stats`        | Dashboard statistics    |
| GET    | `/api/dashboard/activity`     | Live activity feed      |
| GET    | `/api/jobs/[id]/applicants`   | Job applicants list     |
| PATCH  | `/api/applicants/[id]/status` | Update applicant status |

---

## Components

### Dashboard Components (`src/components/dashboard/`)

| Component              | Description                        |
| ---------------------- | ---------------------------------- |
| `DashboardSidebar.tsx` | Fixed sidebar with navigation menu |
| `Header.tsx`           | Dashboard header with breadcrumbs  |
| `OverviewForm.tsx`     | Company overview edit form         |
| `SocialMediaForm.tsx`  | Social media links form            |
| `TeamForm.tsx`         | Team member management form        |

### Landing Page Components (`src/components/page/`)

| Component         | Description                   |
| ----------------- | ----------------------------- |
| `Navbar.tsx`      | Floating glassmorphism navbar |
| `Footer.tsx`      | Multi-column site footer      |
| `JobCard.tsx`     | Pill-shaped job listing card  |
| `CompanyCard.tsx` | Company profile card          |
| `SearchBar.tsx`   | Hero search component         |

### UI Components (`src/components/ui/`)

**shadcn/ui**: button, input, select, dialog, toast, separator, tabs

**Custom**:
| Component | Description |
| ------------------ | ---------------------------- |
| `GlassPanel.tsx` | Glassmorphism container |
| `GlowButton.tsx` | Button with neon glow effect |
| `TechBadge.tsx` | Technology stack badge |
| `MaterialIcon.tsx` | Material Symbols wrapper |

### Component Patterns

```tsx
// Glass Panel
<div className="glass-panel p-8 rounded-2xl">{/* Content */}</div>

// Glow Button
<button className="bg-neon-green hover:bg-[#3cd612] text-background-dark font-bold px-6 py-3 rounded-full shadow-[0_0_20px_rgba(73,230,25,0.2)]">
  Submit
</button>

// Material Icons
<span className="material-symbols-outlined">search</span>
```

---

## Admin Dashboard Detail

### Dashboard Sidebar Navigation

| Menu Item    | Route                 | Description            |
| ------------ | --------------------- | ---------------------- |
| Dashboard    | `/dashboard`          | Main overview page     |
| Job Listings | `/dashboard/jobs`     | Manage all job posts   |
| Post a Job   | `/dashboard/post-job` | Create new job listing |
| Settings     | `/dashboard/settings` | Company settings       |

### Main Dashboard (`/dashboard`)

**Stats Cards**: Active Jobs, Total Applicants, Profile Views, Pending Reviews

**Widgets**:

- Application Traffic Chart (weekly bar chart)
- Funnel Conversion (screening → interview → hired)
- Candidate Sources (direct, linkedin, referral)
- Live Activity Feed (real-time updates)
- Active Jobs Table (quick overview)

### Job Listings (`/dashboard/jobs`)

**Features**: Stats, Search, Filter by status/department/date, Sortable table, Actions (Edit, Duplicate, Delete), Pagination

### Job Detail Admin (`/dashboard/jobs/[id]`)

**Sections**: Job Stats, Candidate Pipeline, Job Description, Recent Applicants Table

**Applicant Actions**: Schedule Interview, Send Message, Reject

### Post a Job (`/dashboard/post-job`)

**Form Sections**:

1. Basic Details (title, department, location, type)
2. Job Description (rich text editor)
3. Compensation (salary range, benefits)

**Features**: Dynamic tech stack tags, Requirements list, Benefits/perks selection, Live preview sidebar, Save Draft / Publish buttons

### Settings (`/dashboard/settings`)

**Tabs**: Company Profile, Team Management, Notifications, Billing, Security
