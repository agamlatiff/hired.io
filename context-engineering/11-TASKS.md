# 11 - Task List

> Task breakdown berdasarkan Gap Analysis untuk mengimplementasi fitur yang kurang.

---

## Sprint 1: Database Schema Updates 🔴

### Task 1.1: Update Job Model

- [ ] Add `status` field (enum: active, paused, closed, draft)
- [ ] Add `views` field (Int, default: 0)
- [ ] Add `department` field (String)
- [ ] Add `location` field (String)
- [ ] Add `experienceLevel` field (String)
- [ ] Add `currency` field (String, default: "USD")

### Task 1.2: Update Applicant Model

- [ ] Add `status` field (enum: new, screening, interview, offered, rejected)
- [ ] Add `appliedAt` field (DateTime, default: now)
- [ ] Add `notes` field (String, optional)
- [ ] Add `rating` field (Int, optional, 1-5)
- [ ] Add `source` field (String: direct, linkedin, referral)

### Task 1.3: Update User Model

- [ ] Add `avatar` field (String, optional)
- [ ] Add `headline` field (String, optional)
- [ ] Add `location` field (String, optional)
- [ ] Add `skills` field (String[])
- [ ] Add `experience` field (Json, optional)
- [ ] Add `education` field (Json, optional)

### Task 1.4: Update Company Model

- [ ] Add `logo` field (String, optional)
- [ ] Add `plan` field (String, default: "free")
- [ ] Add `createdAt` field (DateTime, default: now)

### Task 1.5: Create New Models

- [ ] Create `JobView` model for analytics
- [ ] Create `Activity` model for activity feed
- [ ] Run `prisma migrate dev --name add_missing_fields`
- [ ] Update seed.ts with new fields

---

## Sprint 2: Core API Development 🟠

### Task 2.1: Dashboard Stats API

- [ ] Create `GET /api/dashboard/stats`
- [ ] Return: activeJobs, totalApplicants, jobViews, pendingReview
- [ ] Connect to dashboard page

### Task 2.2: Activity Feed API

- [ ] Create `GET /api/dashboard/activity`
- [ ] Return recent activities (applications, status changes)
- [ ] Connect to dashboard activity panel

### Task 2.3: Job Management APIs

- [ ] Update `POST /api/job` with new fields
- [ ] Create `PATCH /api/job/[id]` for updates
- [ ] Create `PATCH /api/job/[id]/status` for status change
- [ ] Create `DELETE /api/job/[id]`

### Task 2.4: Applicant Management APIs

- [ ] Create `GET /api/jobs/[id]/applicants`
- [ ] Create `PATCH /api/applicants/[id]/status`
- [ ] Create `GET /api/applicants/[id]` for detail

---

## Sprint 3: Dashboard Integration 🟠

### Task 3.1: Main Dashboard

- [ ] Replace hardcoded statsData with API call
- [ ] Replace hardcoded activityData with API call
- [ ] Replace hardcoded jobsData with API call
- [ ] Add loading states
- [ ] Add error handling

### Task 3.2: Job Listings Page

- [ ] Fetch jobs from API
- [ ] Implement search functionality
- [ ] Implement status filter
- [ ] Implement department filter
- [ ] Implement column sorting
- [ ] Implement pagination

### Task 3.3: Job Detail Admin Page

- [ ] Fetch job detail from API
- [ ] Fetch applicants from API
- [ ] Implement status update for applicants
- [ ] Add loading states

---

## Sprint 4: Forms Integration 🟠

### Task 4.1: Post a Job Form

- [ ] Connect form to `POST /api/job`
- [ ] Add form validation (Zod)
- [ ] Handle success/error states
- [ ] Redirect after success

### Task 4.2: Settings Forms

- [ ] Connect Company Profile to API
- [ ] Connect Team Management to API
- [ ] Connect Notifications to API (if applicable)
- [ ] Add save confirmation

### Task 4.3: Apply Form

- [ ] Connect to `POST /api/jobs/[id]/apply`
- [ ] Add form validation
- [ ] Handle file upload (resume)
- [ ] Show success page after apply

---

## Sprint 5: File Upload 🟡

### Task 5.1: Supabase Storage Setup

- [ ] Configure Supabase storage bucket
- [ ] Create upload helper function
- [ ] Add file type validation

### Task 5.2: Resume Upload

- [ ] Implement resume upload in Apply form
- [ ] Save URL to Applicant model
- [ ] Add file preview

### Task 5.3: Image Uploads

- [ ] Implement company logo upload
- [ ] Implement team member photo upload
- [ ] Implement user avatar upload

---

## Sprint 6: Authentication 🟡

### Task 6.1: User (Job Seeker) Auth

- [ ] Update auth.ts to support User model
- [ ] Create user-specific signin flow
- [ ] Add role check (company vs user)

### Task 6.2: Password Features

- [ ] Add forgot password page
- [ ] Create password reset API
- [ ] Send reset email (if email service available)

### Task 6.3: OAuth (Optional)

- [ ] Setup Google OAuth
- [ ] Setup GitHub OAuth
- [ ] Link accounts

---

## Sprint 7: Route Consolidation & Cleanup 🟡

### Task 7.1: Consolidate Dashboard Routes

- [ ] Migrate `(dashboard)/job-listings` → `dashboard/jobs`
- [ ] Migrate `(dashboard)/settings` → `dashboard/settings`
- [ ] Update all internal links
- [ ] Delete old `(dashboard)` folder

### Task 7.2: Fix Legacy Routes

- [ ] Update auth redirect paths
- [ ] Update navbar links
- [ ] Test all navigation

---

## Sprint 8: Polish & Testing 🟢

### Task 8.1: Loading States

- [ ] Add skeleton loaders to dashboard
- [ ] Add loading spinners to forms
- [ ] Add loading states to tables

### Task 8.2: Error Handling

- [ ] Add error boundaries
- [ ] Add toast notifications
- [ ] Add form error messages

### Task 8.3: Testing

- [ ] Test all API endpoints
- [ ] Test all forms
- [ ] Test auth flows
- [ ] Test file uploads

---

## Timeline Estimate

| Sprint   | Focus                 | Duration |
| -------- | --------------------- | -------- |
| Sprint 1 | Database Schema       | 1 day    |
| Sprint 2 | Core APIs             | 2 days   |
| Sprint 3 | Dashboard Integration | 2 days   |
| Sprint 4 | Forms Integration     | 1.5 days |
| Sprint 5 | File Upload           | 1 day    |
| Sprint 6 | Authentication        | 1.5 days |
| Sprint 7 | Route Cleanup         | 0.5 day  |
| Sprint 8 | Polish                | 1 day    |

**Total: ~10.5 days**

---

## Quick Wins (Can Do First)

1. ✅ Schema updates (just add fields)
2. ✅ Dashboard stats API
3. ✅ Connect Post Job form
4. ✅ Route consolidation
