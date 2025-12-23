# 10 - Gap Analysis

> Dokumentasi untuk mengidentifikasi fitur yang belum terimplementasi, field database yang kurang, dan bagian aplikasi yang masih "bolong".

---

## 🔴 Critical Gaps (Priority 1)

### 1. Dashboard Data - Semua Hardcoded

**Problem:** Semua dashboard pages menggunakan sample data hardcoded, bukan dari database.

**Files affected:**

- `src/app/dashboard/page.tsx` → `statsData`, `activityData`, `jobsData` hardcoded
- `src/app/dashboard/jobs/page.tsx` → `jobsData` hardcoded
- `src/app/dashboard/jobs/[id]/page.tsx` → applicant data hardcoded

**Solution:** Connect to API endpoints untuk fetch real data.

---

### 2. Missing Database Fields

#### Job Model - Perlu Tambah:

| Field             | Type   | Purpose                               |
| ----------------- | ------ | ------------------------------------- |
| `status`          | String | "active", "paused", "closed", "draft" |
| `views`           | Int    | Track job page views                  |
| `department`      | String | Engineering, Design, Marketing, etc   |
| `location`        | String | "San Francisco, CA"                   |
| `experienceLevel` | String | Junior, Mid, Senior                   |
| `currency`        | String | USD, EUR, IDR                         |

#### Applicant Model - Perlu Tambah:

| Field       | Type     | Purpose                                                |
| ----------- | -------- | ------------------------------------------------------ |
| `status`    | String   | "new", "screening", "interview", "offered", "rejected" |
| `appliedAt` | DateTime | Tanggal apply                                          |
| `notes`     | String   | Internal notes dari recruiter                          |
| `rating`    | Int      | 1-5 star rating                                        |
| `source`    | String   | "direct", "linkedin", "referral"                       |

#### User Model - Perlu Tambah:

| Field        | Type     | Purpose                     |
| ------------ | -------- | --------------------------- |
| `avatar`     | String   | Profile picture URL         |
| `headline`   | String   | "Senior Frontend Developer" |
| `location`   | String   | User location               |
| `skills`     | String[] | Array of skills             |
| `experience` | Json     | Work experience array       |
| `education`  | Json     | Education array             |

#### Company Model - Perlu Tambah:

| Field       | Type     | Purpose                     |
| ----------- | -------- | --------------------------- |
| `logo`      | String   | Company logo URL            |
| `plan`      | String   | "free", "pro", "enterprise" |
| `createdAt` | DateTime | Tanggal register            |

---

### 3. Missing Analytics Tables

**New Model: JobView**

```prisma
model JobView {
  id        String   @id @default(cuid())
  jobId     String
  Job       Job      @relation(fields: [jobId], references: [id])
  viewedAt  DateTime @default(now())
  source    String?  // referrer
}
```

**New Model: Activity**

```prisma
model Activity {
  id          String   @id @default(cuid())
  companyId   String
  Company     Company  @relation(fields: [companyId], references: [id])
  type        String   // "application", "interview", "status_change"
  message     String
  targetId    String?  // applicant/job id
  createdAt   DateTime @default(now())
}
```

---

## 🟠 Medium Gaps (Priority 2)

### 4. Forms Not Connected to API

| Form                       | Location                 | Status                |
| -------------------------- | ------------------------ | --------------------- |
| Post a Job                 | `/dashboard/post-job`    | ❌ UI only, no submit |
| Settings - Company Profile | `/dashboard/settings`    | ❌ UI only            |
| Settings - Team            | `/dashboard/settings`    | ❌ UI only            |
| Settings - Notifications   | `/dashboard/settings`    | ❌ UI only            |
| Apply Form                 | `/detail/job/[id]/apply` | ❌ UI only            |

---

### 5. Missing API Endpoints

| Endpoint                      | Method | Purpose                 |
| ----------------------------- | ------ | ----------------------- |
| `/api/dashboard/stats`        | GET    | Dashboard statistics    |
| `/api/dashboard/activity`     | GET    | Live activity feed      |
| `/api/jobs/[id]/applicants`   | GET    | Job applicants list     |
| `/api/applicants/[id]/status` | PATCH  | Update applicant status |
| `/api/jobs/[id]/views`        | POST   | Track job view          |
| `/api/upload/resume`          | POST   | Upload resume file      |

---

### 6. Authentication Gaps

| Feature                | Status                     |
| ---------------------- | -------------------------- |
| OAuth Google           | ❌ Placeholder only        |
| OAuth GitHub           | ❌ Placeholder only        |
| Forgot Password        | ❌ Not implemented         |
| Email Verification     | ❌ Not implemented         |
| User (Job Seeker) Auth | ❌ Only Company auth works |

---

## 🟡 Low Gaps (Priority 3)

### 7. UI/UX Missing Features

| Feature                | Page              | Status             |
| ---------------------- | ----------------- | ------------------ |
| Search functionality   | `/dashboard`      | ❌ UI only         |
| Filter by status       | `/dashboard/jobs` | ❌ UI only         |
| Sort columns           | `/dashboard/jobs` | ❌ UI only         |
| Pagination             | All pages         | ❌ UI only         |
| Export to CSV          | `/dashboard/jobs` | ❌ Not implemented |
| Notifications dropdown | Dashboard header  | ❌ UI only         |

---

### 8. File Upload

| Feature             | Status                              |
| ------------------- | ----------------------------------- |
| Resume upload       | ❌ UI only, no Supabase integration |
| Company logo upload | ❌ Not implemented                  |
| Team member photo   | ❌ Not implemented                  |

---

### 9. Route Consolidation

**Problem:** Ada 2 dashboard routes yang overlap:

- `(dashboard)/*` - Old routes
- `dashboard/*` - New routes

**Solution:**

1. Migrate semua ke `dashboard/*`
2. Delete `(dashboard)` folder
3. Update all links

---

## 📋 Implementation Checklist

### Database Schema Updates

- [ ] Add `status`, `views`, `department`, `location` to Job
- [ ] Add `status`, `appliedAt`, `source`, `rating` to Applicant
- [ ] Add `avatar`, `skills`, `experience` to User
- [ ] Add `logo`, `plan`, `createdAt` to Company
- [ ] Create JobView model
- [ ] Create Activity model
- [ ] Run `prisma migrate dev`

### API Development

- [ ] Create `/api/dashboard/stats`
- [ ] Create `/api/dashboard/activity`
- [ ] Create `/api/jobs/[id]/applicants`
- [ ] Create `/api/applicants/[id]/status`
- [ ] Implement file upload with Supabase

### Dashboard Integration

- [ ] Connect dashboard stats to API
- [ ] Connect activity feed to API
- [ ] Connect job listings to real data
- [ ] Implement search & filter
- [ ] Implement pagination

### Forms

- [ ] Connect Post a Job form to API
- [ ] Connect Settings forms to API
- [ ] Connect Apply form to API
- [ ] Implement file upload

### Authentication

- [ ] Implement User (job seeker) auth
- [ ] Add forgot password
- [ ] Add email verification (optional)

---

## 📊 Gap Summary

| Category        | Total Gaps | Critical | Medium | Low   |
| --------------- | ---------- | -------- | ------ | ----- |
| Database Fields | 15         | 6        | 6      | 3     |
| API Endpoints   | 6          | 2        | 4      | 0     |
| Forms           | 5          | 0        | 5      | 0     |
| Auth Features   | 4          | 1        | 3      | 0     |
| UI Features     | 6          | 0        | 3      | 3     |
| **Total**       | **36**     | **9**    | **21** | **6** |

---

## 🎯 Recommended Priority Order

1. **Schema Updates** - Add missing fields to database
2. **Dashboard Stats API** - Real data for main dashboard
3. **Job CRUD** - Full create/edit/delete functionality
4. **Applicant Management** - Pipeline & status updates
5. **File Upload** - Resume & image uploads
6. **User Authentication** - Job seeker login
