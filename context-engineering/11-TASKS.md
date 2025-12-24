# 11 - Task List

> Task breakdown berdasarkan Gap Analysis untuk mengimplementasi fitur yang kurang.

---

## Sprint 1: Database Schema Updates 🔴

### Task 1.1: Update Job Model ✅

- [x] Add `status` field (enum: active, paused, closed, draft)
- [x] Add `views` field (Int, default: 0)
- [x] Add `department` field (String)
- [x] Add `location` field (String)
- [x] Add `experienceLevel` field (String)
- [x] Add `currency` field (String, default: "USD")

### Task 1.2: Update Applicant Model ✅

- [x] Add `status` field (enum: new, screening, interview, offered, rejected)
- [x] Add `appliedAt` field (DateTime, default: now)
- [x] Add `notes` field (String, optional)
- [x] Add `rating` field (Int, optional, 1-5)
- [x] Add `source` field (String: direct, linkedin, referral)

### Task 1.3: Update User Model ✅

- [x] Add `avatar` field (String, optional)
- [x] Add `headline` field (String, optional)
- [x] Add `location` field (String, optional)
- [x] Add `skills` field (String[])
- [x] Add `experience` field (Json, optional)
- [x] Add `education` field (Json, optional)

### Task 1.4: Update Company Model ✅

- [x] Add `logo` field (String, optional)
- [x] Add `plan` field (String, default: "free")
- [x] Add `createdAt` field (DateTime, default: now)

### Task 1.5: Create New Models ✅

- [x] Create `JobView` model for analytics
- [x] Create `Activity` model for activity feed
- [x] Run `prisma migrate dev --name add_missing_fields`
- [ ] Update seed.ts with new fields

---

## Sprint 2: Core API Development 🟠

### Task 2.1: Dashboard Stats API ✅

- [x] Create `GET /api/dashboard/stats`
- [x] Return: activeJobs, totalApplicants, jobViews, pendingReview
- [ ] Connect to dashboard page

### Task 2.2: Activity Feed API ✅

- [x] Create `GET /api/dashboard/activity`
- [x] Return recent activities (applications, status changes)
- [ ] Connect to dashboard activity panel

### Task 2.3: Job Management APIs ✅

- [x] Update `POST /api/job` with new fields
- [x] Create `PATCH /api/job/[id]` for updates
- [x] Create `PATCH /api/job/[id]/status` for status change
- [x] Create `DELETE /api/job/[id]`

### Task 2.4: Applicant Management APIs ✅

- [x] Create `GET /api/jobs/[id]/applicants`
- [x] Create `PATCH /api/applicants/[id]/status`
- [x] Create `GET /api/applicants/[id]` for detail

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

## Sprint 9: UI Features 🟡

### Task 9.1: Export Functionality

- [ ] Add export to CSV button
- [ ] Create export API endpoint
- [ ] Generate CSV from job data
- [ ] Download file to user

### Task 9.2: Notifications Dropdown

- [ ] Create Notifications model in database
- [ ] Create notification API endpoints
- [ ] Build notifications dropdown component
- [ ] Mark as read functionality
- [ ] Real-time notification badge

### Task 9.3: Grid View

- [ ] Add grid view toggle button
- [ ] Create grid layout for jobs
- [ ] Save view preference
- [ ] Make responsive

---

## Sprint 10: Advanced Features 🟢

### Task 10.1: Email Notifications

- [ ] Setup email service (Resend/SendGrid)
- [ ] Create email templates
- [ ] Send application confirmation to applicant
- [ ] Send new application alert to company
- [ ] Send status update emails

### Task 10.2: Real-time Updates (Optional)

- [ ] Setup Pusher/Ably for real-time
- [ ] Real-time activity feed
- [ ] Real-time applicant count updates
- [ ] Live notification badges

### Task 10.3: Interview Scheduling

- [ ] Create Interview model
- [ ] Create interview scheduling API
- [ ] Add calendar integration (Google Calendar)
- [ ] Send interview invites
- [ ] Show upcoming interviews in dashboard

### Task 10.4: Internal Messaging

- [ ] Create Message model
- [ ] Create messaging API
- [ ] Build chat interface
- [ ] Company <-> Applicant messaging
- [ ] Message notifications

---

## Sprint 11: Job Seeker Dashboard 🟢

### Task 11.1: User Dashboard Models

- [ ] Create SavedJob model
- [ ] Create JobAlert model
- [ ] Add relations to User model

### Task 11.2: User Dashboard Pages

- [ ] Create `/dashboard/user/profile` page
- [ ] Create `/dashboard/user/applications` page
- [ ] Create `/dashboard/user/saved-jobs` page
- [ ] Create `/dashboard/user/alerts` page

### Task 11.3: Application History

- [ ] Fetch user's applications
- [ ] Show application status timeline
- [ ] Show company responses
- [ ] Filter by status

### Task 11.4: Saved Jobs

- [ ] Add save job button
- [ ] Create saved jobs API
- [ ] Show saved jobs list
- [ ] Remove saved jobs

### Task 11.5: Job Alerts

- [ ] Create job alert form
- [ ] Save alert preferences
- [ ] Email alerts for matching jobs
- [ ] Manage alerts (edit/delete)

---

## Sprint 12: Analytics & Reporting 🟢

### Task 12.1: Advanced Analytics Models

- [ ] Extend JobView with more data (source, device, location)
- [ ] Create Report model for saved reports
- [ ] Add analytics calculations

### Task 12.2: Analytics Dashboard

- [ ] Create `/dashboard/analytics` page
- [ ] Job performance metrics
- [ ] Applicant demographics
- [ ] Time-to-hire analytics
- [ ] Source effectiveness

### Task 12.3: Reports & Export

- [ ] Create report builder UI
- [ ] Generate PDF reports
- [ ] Export analytics to CSV/Excel
- [ ] Schedule automated reports

### Task 12.4: Candidate Insights

- [ ] Skill gap analysis
- [ ] Salary benchmarking
- [ ] Application quality scores
- [ ] Conversion rate tracking

---

## Updated Timeline Estimate

| Sprint    | Focus                 | Duration |
| --------- | --------------------- | -------- |
| Sprint 1  | Database Schema       | 1 day    |
| Sprint 2  | Core APIs             | 2 days   |
| Sprint 3  | Dashboard Integration | 2 days   |
| Sprint 4  | Forms Integration     | 1.5 days |
| Sprint 5  | File Upload           | 1 day    |
| Sprint 6  | Authentication        | 1.5 days |
| Sprint 7  | Route Cleanup         | 0.5 day  |
| Sprint 8  | Polish                | 1 day    |
| Sprint 9  | UI Features           | 1.5 days |
| Sprint 10 | Advanced Features     | 3 days   |
| Sprint 11 | Job Seeker Dashboard  | 2.5 days |
| Sprint 12 | Analytics & Reporting | 2 days   |

**MVP (Sprint 1-8): ~10.5 days**
**Full-Featured (Sprint 1-12): ~18.5 days**

---

## Development Phases

### Phase 1: MVP (Critical) 🔴

Sprints 1-8 → Core functionality working

### Phase 2: Enhanced (Nice to Have) 🟠

Sprint 9 → Better UX with exports & notifications

### Phase 3: Advanced (Optional) 🟢

Sprints 10-12 → Full-featured platform

---

## Quick Wins (Can Do First)

1. ✅ Schema updates (just add fields)
2. ✅ Dashboard stats API
3. ✅ Connect Post Job form
4. ✅ Route consolidation
