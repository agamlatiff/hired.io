# todo.md - The Memory

> Progress tracker dengan 3 task utama untuk hired.io.

---

## Status Proyek

| Metrik             | Status         |
| ------------------ | -------------- |
| **MVP Progress**   | ~95% Complete  |
| **Build**          | ✅ Passing     |
| **Database**       | ✅ Fully Setup |
| **API Layer**      | ✅ Operational |
| **Authentication** | ✅ Working     |

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

#### 1.1 Password Reset Feature

- [ ] Buat halaman `/auth/forgot-password`
- [ ] Buat API `POST /api/auth/reset-password`

**Files to modify:**

- `src/app/(auth)/forgot-password/page.tsx` - NEW
- `src/app/api/auth/reset-password/route.ts` - NEW
- `src/lib/email.ts` - NEW (optional)

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

#### 1.4 Automated Testing dengan Playwright

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

### 2.1 Export to CSV

- [ ] Tambah tombol Export di `/dashboard/jobs`
- [ ] Buat API `GET /api/jobs/export`
- [ ] Generate CSV dari job/applicant data
- [ ] Download file ke user

### 2.2 Notifications System

- [ ] Buat model `Notification` di Prisma (sudah ada)
- [ ] Buat API `GET /api/notifications`
- [ ] Build notifications dropdown di dashboard header
- [ ] Mark as read functionality
- [ ] Real-time badge count

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
- [ ] Calendar integration (Google Calendar) - Future
- [ ] Send interview invites via email - Future

**New files:**

- `prisma/schema.prisma` - Added Interview model
- `src/app/api/company/interviews/route.ts` - Company CRUD
- `src/app/api/user/interviews/route.ts` - User GET
- `src/app/dashboard/interviews/page.tsx` - Company view
- `src/app/dashboard/user/interviews/page.tsx` - User view

### 3.3 Analytics & Reporting

- [ ] Buat halaman `/dashboard/analytics`
- [ ] Job performance metrics (views, applications, conversion)
- [ ] Applicant demographics
- [ ] Time-to-hire analytics
- [ ] Export reports to PDF/Excel

### 3.4 Internal Messaging

- [ ] Buat model `Message`
- [ ] Create messaging API
- [ ] Build chat interface
- [ ] Company ↔ Applicant messaging

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

## Tips

1. **Check Build** - Run `npm run build` sebelum commit
2. **Use Types** - Prisma auto-generate types
3. **Session** - Access via `getServerSession(authOptions)`
4. **Activity Log** - Buat activity log untuk setiap major action
5. **API Auth** - Semua protected API perlu auth check
