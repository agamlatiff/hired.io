# todo.md - The Memory

> Progress tracker dengan 3 task utama untuk hired.io.

---

## Status Proyek

| Metrik             | Status         |
| ------------------ | -------------- |
| **MVP Progress**   | ~98% Complete  |
| **Build**          | ✅ Passing     |
| **Database**       | ✅ Fully Setup |
| **API Layer**      | ✅ Operational |
| **Authentication** | ✅ Working     |
| **Testing**        | ✅ Passed      |

### Bugs Fixed (2025-12-27)

| Bug                     | Description                                       | Fix                                           |
| ----------------------- | ------------------------------------------------- | --------------------------------------------- |
| SessionProvider Missing | `useSession` not wrapped in `<SessionProvider />` | Added `NextAuthProvider` to dashboard layouts |

---

## Task 1: Finalisasi MVP (Sprint 6 & 8) 🟡

> Menyelesaikan fitur authentication dan testing yang tersisa.

### Apa yang Sudah Selesai

- [x] Database schema lengkap (21+ fields, 3 new models)
- [x] 6 API endpoints fully functional
- [x] Dashboard dengan real data (zero hardcoded)
- [x] Job listings dengan search, filter, sort, pagination
- [x] File upload system (resume, logo, avatar)
- [x] User/Job Seeker authentication support
- [x] Route cleanup (old `(dashboard)` folder deleted)
- [x] Loading states & error handling

### Yang Perlu Dikerjakan

#### 1.1 Password Reset Feature ✅

- [x] Buat halaman `/auth/forgot-password`
- [x] Buat halaman `/auth/reset-password`
- [x] Buat API `POST/PUT /api/auth/reset-password`

**Files created:**

- `src/app/auth/forgot-password/page.tsx`
- `src/app/auth/reset-password/page.tsx`
- `src/app/api/auth/reset-password/route.ts`

---

#### 1.2 Custom Seed Data ✅

- [x] Buat seed file dengan data realistis
- [x] 3 Companies (GojekTech, Tokopedia, Ruangguru)
- [x] 15 Job Listings (mix roles & locations)
- [x] 20 Users/Job Seekers (nama Indonesia)
- [x] Sample applications dengan berbagai status
- [x] Run seed ke database

**Jalankan seed:**

```bash
npx prisma db seed
```

**Login credentials setelah seed:**

| Role    | Email                    | Password    |
| ------- | ------------------------ | ----------- |
| Company | hr@gojektech.co.id       | admin123    |
| Company | careers@tokopedia.com    | password123 |
| Company | talent@ruangguru.com     | password123 |
| User    | budi.santoso@gmail.com   | password123 |
| User    | siti.nurhaliza@gmail.com | password123 |

---

#### 1.3 Data Layer Refactoring

> Pisahkan query data ke reusable functions, hapus dummy data, SOLID principle.

##### 1.3.1 Create Data Services Layer

- [x] Buat folder `src/data/` dengan service files:
  - `companies.ts` - Company queries (getById, getFeatured, getAll)
  - `jobs.ts` - Job queries (getById, getFeatured, getAll)
  - `categories.ts` - Category/Industry queries
  - `index.ts` - Barrel exports

##### 1.3.2 Remove Dummy Data from Landing Pages 🔴

| File                      | Dummy Variables                                             | Lines |
| ------------------------- | ----------------------------------------------------------- | ----- |
| `(page)/page.tsx`         | `topCompanies`, `featuredJobs`, `techChips`, `trendingTech` | ~118  |
| `find-jobs/page.tsx`      | `sampleJobs`, `jobTypes`, `experienceLevels`, `techStacks`  | ~86   |
| `find-companies/page.tsx` | `companiesData`                                             | ~82   |

- [x] `page.tsx` - Hapus 4 arrays, fetch dari API
- [x] `find-jobs/page.tsx` - Hapus sampleJobs, fetch dari `/api/jobs`
- [x] `find-companies/page.tsx` - Hapus companiesData

##### 1.3.3 Clean Up Constants

- [x] Hapus dari `src/constants/index.ts`:
  - `JOB_LISTING_DATA` (unused)
  - `JOB_APPLICANTS_DATA` (unused)
  - `CATEGORIES_OPTIONS` (irrelevant)
- [x] Tambahkan config baru:
  - `DEPARTMENTS`
  - `WORK_TYPES`
  - `CURRENCIES`
  - `CLIENT_LOGOS`

##### 1.3.4 Move Hardcoded Data

| From                           | To                  | Data                       |
| ------------------------------ | ------------------- | -------------------------- |
| `post-job/page.tsx`            | `constants/`        | `departments`, `workTypes` |
| `Clients.tsx`                  | `constants/`        | `clients` array            |
| `detail/company/[id]/page.tsx` | `data/companies.ts` | `getDetailCompany()`       |

**New folder structure:**

```
src/data/
├── index.ts
├── companies.ts
├── jobs.ts
└── categories.ts
```

---

#### 1.5 Replace Remaining Dummy Data ✅

> Refactored landing page detail pages to fetch real data from database.

- [x] `find-companies/[id]/page.tsx` - Refactored to use `getCompanyById()`
  - Converted from client component to server component
  - Displays real company info, tech stack, open jobs, social links
- [x] `detail/job/[id]/page.tsx` - Refactored to use `getJobById()`
  - Displays real job data, salary, skills, company info
  - Added `getSimilarJobs()` to fetch related jobs

**Files modified:**

- `src/app/(landing-page)/(page)/find-companies/[id]/page.tsx`
- `src/app/(landing-page)/(page)/detail/job/[id]/page.tsx`
- `src/data/jobs.ts` - Added `getSimilarJobs()` and `getTechStackCounts()`

---

#### 1.6 Trending Tech Data ✅

> Landing page now shows real job counts by tech stack.

- [x] Created `getTechStackCounts()` utility in `src/data/jobs.ts`
- [x] Updated `(page)/page.tsx` to use real counts from database
- [x] Shows top 6 trending technologies with actual job counts

**All pages now use real data:**

- ✅ `(page)/page.tsx` - Companies, Jobs, Trending Tech
- ✅ `find-jobs/page.tsx` - Job listings
- ✅ `find-companies/page.tsx` - Company listings
- ✅ `find-companies/[id]/page.tsx` - Company detail
- ✅ `detail/company/[id]/page.tsx` - Company detail (old design)
- ✅ `detail/job/[id]/page.tsx` - Job detail

---

#### 1.7 Automated Testing dengan Playwright

> Lihat `documentation/testing.md` untuk setup guide lengkap.

##### Setup

```bash
npm install -D @playwright/test
npx playwright install
```

##### Test Files to Create

- [ ] `tests/api/dashboard.spec.ts` - Dashboard API tests
- [ ] `tests/api/jobs.spec.ts` - Jobs API tests
- [ ] `tests/e2e/auth.spec.ts` - Auth flow tests
- [ ] `tests/e2e/post-job.spec.ts` - Post job form tests
- [ ] `tests/e2e/apply-job.spec.ts` - Apply to job tests
- [ ] `playwright.config.ts` - Playwright config

##### Test Checklist

| Endpoint/Flow               | Test File                     | Status |
| --------------------------- | ----------------------------- | ------ |
| GET /api/dashboard/stats    | `tests/api/dashboard.spec.ts` | [ ]    |
| GET /api/dashboard/activity | `tests/api/dashboard.spec.ts` | [ ]    |
| GET /api/jobs               | `tests/api/jobs.spec.ts`      | [ ]    |
| POST /api/job               | `tests/api/jobs.spec.ts`      | [ ]    |
| GET /api/jobs/[id]/apply    | `tests/api/jobs.spec.ts`      | [ ]    |
| Company login               | `tests/e2e/auth.spec.ts`      | [ ]    |
| User login                  | `tests/e2e/auth.spec.ts`      | [ ]    |
| Post job form               | `tests/e2e/post-job.spec.ts`  | [ ]    |
| File uploads                | `tests/e2e/upload.spec.ts`    | [ ]    |

##### Run Tests

```bash
npx playwright test           # Run all tests
npx playwright test --ui      # Debug mode
npx playwright show-report    # View HTML report
```

---

## Task 2: Enhanced Features (Sprint 9-10) 🟢

> Fitur-fitur yang meningkatkan UX tapi tidak critical untuk launch.

### 2.1 Export to CSV ✅

- [x] Tambah tombol Export di `/dashboard/jobs`
- [x] Buat API `GET /api/company/export`
- [x] Generate CSV dari job/applicant data
- [x] Download file ke user

**New files:**

- `src/app/api/company/export/route.ts` - CSV export API
- `src/components/dashboard/ExportButton.tsx` - Export button component

### 2.2 Notifications System ✅

- [x] Buat model `Notification` di Prisma (sudah ada)
- [x] Buat API `GET /api/notifications`
- [x] Build notifications dropdown di dashboard header
- [x] Mark as read functionality
- [x] Real-time badge count

**New files:**

- `src/app/api/notifications/route.ts` - Notifications API
- `src/components/dashboard/NotificationsDropdown.tsx` - Dropdown component

### 2.3 Email Notifications

- [ ] Setup email service (Resend/SendGrid)
- [ ] Create email templates:
  - Application confirmation (to applicant)
  - New application alert (to company)
  - Status update notification
- [ ] Send emails on relevant events

### 2.4 OAuth Providers (Optional)

- [ ] Setup Google OAuth
- [ ] Setup GitHub OAuth
- [ ] Link OAuth accounts to existing users

**Dependencies:**

- Resend API Key atau SendGrid API Key
- Google OAuth credentials
- GitHub OAuth credentials

---

## Task 3: Advanced Features (Sprint 11-12) 🔵

> Fitur lanjutan untuk platform yang mature.

### 3.1 Job Seeker Dashboard ✅

- [x] Buat model `SavedJob` dan `JobAlert`
- [x] Create pages:
  - `/dashboard/user/profile` - Edit profil
  - `/dashboard/user/applications` - Riwayat lamaran
  - `/dashboard/user/saved-jobs` - Job yang disimpan
  - `/dashboard/user/alerts` - Job alerts settings
- [x] Application status timeline
- [x] Save/unsave job functionality

**New files created:**

- `prisma/schema.prisma` - Added SavedJob, JobAlert models
- `src/app/api/user/profile/route.ts` - Profile API
- `src/app/api/user/applications/route.ts` - Applications API
- `src/app/api/user/saved-jobs/route.ts` - Saved jobs API
- `src/app/api/user/alerts/route.ts` - Job alerts API
- `src/components/dashboard/UserSidebar.tsx` - User navigation
- `src/app/dashboard/user/layout.tsx` - User dashboard layout
- `src/app/dashboard/user/page.tsx` - Overview page
- `src/app/dashboard/user/profile/page.tsx` - Profile editor
- `src/app/dashboard/user/applications/page.tsx` - Application history
- `src/app/dashboard/user/saved-jobs/page.tsx` - Saved jobs list
- `src/app/dashboard/user/alerts/page.tsx` - Job alerts manager

### 3.2 Interview Scheduling ✅

- [x] Buat model `Interview`
- [x] Create interview scheduling API
- [x] Show upcoming interviews di dashboard

**New files:**

- `prisma/schema.prisma` - Added Interview model
- `src/app/api/company/interviews/route.ts` - Company CRUD
- `src/app/api/user/interviews/route.ts` - User GET
- `src/app/dashboard/interviews/page.tsx` - Company view
- `src/app/dashboard/user/interviews/page.tsx` - User view

### 3.3 Analytics & Reporting ✅

- [x] Buat halaman `/dashboard/analytics`
- [x] Job performance metrics (views, applications, conversion)
- [x] Applicant demographics (status breakdown, sources)
- [x] Time-to-hire analytics
- [ ] Export reports to PDF/Excel - Future

**New files:**

- `src/app/api/company/analytics/route.ts` - Analytics API
- `src/app/dashboard/analytics/page.tsx` - Analytics dashboard

### 3.4 Internal Messaging ✅

- [x] Buat model `Message` dan `Conversation`
- [x] Create messaging API
- [x] Build chat interface
- [x] Company ↔ Applicant messaging

**New files:**

- `prisma/schema.prisma` - Added Conversation, Message models
- `src/app/api/company/messages/route.ts` - Company conversations
- `src/app/api/company/messages/[conversationId]/route.ts` - Messages
- `src/app/api/user/messages/route.ts` - User conversations
- `src/app/api/user/messages/[conversationId]/route.ts` - Messages
- `src/app/dashboard/messages/page.tsx` - Company chat UI
- `src/app/dashboard/user/messages/page.tsx` - User chat UI

---

## Quick Reference

### Development Commands

```bash
# Start development
npm run dev

# Database
npx prisma studio        # Open database GUI
npx prisma migrate dev   # Create migration
npx prisma generate      # Generate client
npx prisma db seed       # Seed database

# Build & verify
npm run build
npm run lint
```

### Key Files

| Purpose         | File                                      |
| --------------- | ----------------------------------------- |
| Database schema | `prisma/schema.prisma`                    |
| Auth config     | `src/lib/auth.ts`                         |
| Main dashboard  | `src/app/dashboard/page.tsx`              |
| Job listings    | `src/app/dashboard/jobs/page.tsx`         |
| Post job form   | `src/app/dashboard/post-job/page.tsx`     |
| Dashboard stats | `src/app/api/dashboard/stats/route.ts`    |
| Activity feed   | `src/app/api/dashboard/activity/route.ts` |

### Environment Variables

```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
```

---

## Timeline Estimates

| Task      | Focus                  | Duration |
| --------- | ---------------------- | -------- |
| Task 1    | MVP Finalisasi         | ~2 days  |
| Task 2    | Enhanced Features      | ~4 days  |
| Task 3    | Advanced Features      | ~7 days  |
| **Total** | Full-Featured Platform | ~13 days |

---

## Task 4: Production Readiness (Audit Results) 🔴

> Comprehensive audit to ensure security, stability and performance before launch.

### 4.1 Security Fixes ✅

> Critical vulnerabilities addressed on 2025-12-27.

- [x] **Fix Guest User Creation**
  - Removed `temp_password` usage in `apply/page.tsx`
  - Enforced login check before application submission
- [x] **Secure Password Reset**
  - Added `resetToken` (hashed) & `expiry` to Schema
  - Updated API to generate/verify crypto tokens
- [x] **API Authorization Hardening**
  - Added `middleware.ts` for Dashboard RBAC
  - Secured `POST /api/job` (Company only)
  - Secured `POST /api/jobs/apply` (User only)

### 4.2 Type Safety & Code Quality ✅

> Completed 2025-12-27. All `as any` casts removed.

- [x] **Create `next-auth.d.ts`**
  - Extended `Session` with `id` and `role`
  - File: `src/types/next-auth.d.ts`
- [x] **Create `getSessionUser` Helper**
  - Added `requireCompany()` and `requireUser()` functions
  - File: `src/lib/session.ts`
- [x] **Fix `as any` Casts in API Routes:**
  - [x] `src/app/api/upload/image/route.ts`
  - [x] `src/app/api/jobs/route.ts`
  - [x] `src/app/api/company/profile/route.ts`
  - [x] `src/app/api/dashboard/stats/route.ts`
  - [x] `src/app/api/job/route.ts`
  - [x] `src/app/api/dashboard/activity/route.ts`
  - [x] `src/app/api/applicants/[id]/route.ts`
  - [x] `src/lib/auth.ts`
  - [x] `src/app/(landing-page)/(page)/detail/job/[id]/apply/page.tsx`

### 4.3 Data Layer & Validation 🟡

> Zero fake data policy & input sanitization.

- [ ] **Dashboard Data:**
  - [ ] Replace `chartBars` static array with real aggregation API
  - [ ] Replace `Candidate Sources` hardcoded % with real Applicant data
  - [ ] Connect `View All Activity` button
- [ ] **API Validation (Zod):**
  - [ ] `POST /api/jobs/apply`
  - [ ] `POST /api/job`
  - [ ] `POST /api/user/profile`

### 4.4 UI Cleanup (Remove "Pajangan") 🟢

> Remove or implement non-functional UI elements.

- [ ] **Dashboard Header:**
  - [ ] **Search Bar:** Implement search logic OR Hide for MVP
  - [ ] **Notification Button:** Replace with `NotificationsDropdown` component
- [ ] **Landing Page Footer:**
  - [ ] Remove/Update dead links (Salary calc, Pricing, etc)
- [ ] **General:**
  - [ ] Check all "Do Nothing" buttons

### 4.5 Testing Infrastructure 🟡

- [ ] **Setup Playwright** (`playwright.config.ts`)
- [ ] **Core E2E Scenarios:**
  - [ ] Job Seeker Apply Flow
  - [ ] Company Post Job Flow
- [ ] **API Tests:**
  - [ ] Auth Endpoints
  - [ ] Dashboard Stats

### 4.6 Polish & Deployment 🟢

- [ ] **Loading States:** Audit all async pages
- [ ] **SEO:** Add `generateMetadata` to dynamic pages
- [ ] **Build Check:** Run `npm run build` locally

### 4.7 UI Cleanup (Remove "Pajangan") 🟢

- [ ] **Dashboard Header:** Connect/Hide Search Bar & Fix Notifications
- [ ] **Footer:** Remove placeholder links
- [ ] **General:** Connect "View All Activity" button

### 4.8 UI/UX Enhancements (User Request) 🔵

> Visual polish and functionality gaps identified.

- [ ] **Mobile Responsiveness:**
  - [ ] Implement Mobile Menu (Hamburger) in `Navbar.tsx`
  - [ ] Fix Dashboard Sidebar on mobile (Collapsible?)
- [ ] **Empty States & Feedback:**
  - [ ] Add "Create First Job" CTA in empty job list
  - [ ] Add Toast Notifications (Success/Error) for Actions
  - [ ] Add Loading Progress Bar (NProgress)
- [ ] **Auth UX:**
  - [ ] Add 'Forgot Password' link to Sign In page
  - [ ] Improve User Dropdown in Navbar (Dashboard link)

---

## Tips

1. **Check Build** - Run `npm run build` sebelum commit
2. **Use Types** - Prisma auto-generate types
3. **Session** - Access via `getServerSession(authOptions)`
4. **Activity Log** - Buat activity log untuk setiap major action
5. **API Auth** - Semua protected API perlu auth check
