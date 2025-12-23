# Hired.io Complete Redesign Roadmap

> **Objective**: Mengganti SELURUH design lama dengan design baru dari folder `stitch_hired.io_homepage_dark_mode`. Setiap halaman akan di-convert dari HTML design ke React/Next.js components.

---

## 🎉 Implementation Progress

> **Last Updated**: December 23, 2024 - **ALL PHASES COMPLETED!**

| Phase   | Status      | Description                                         |
| ------- | ----------- | --------------------------------------------------- |
| Phase 0 | ✅ Complete | Foundation, Dark Mode, Tailwind Config, Globals.css |
| Phase 1 | ✅ Complete | Public Landing Pages (Home, Login, Register)        |
| Phase 2 | ✅ Complete | Jobs Pages (Listing, Detail, Apply Form, Success)   |
| Phase 3 | ✅ Complete | Companies Pages (Listing, Detail)                   |
| Phase 4 | ✅ Complete | Dashboard Pages (All admin pages)                   |
| Phase 5 | ✅ Complete | Build verification passed                           |

---

## Design Source Files

Semua design files berada di:

```
stitch_hired.io_homepage_dark_mode/stitch_hired.io_homepage_dark_mode/
```

Setiap folder berisi `code.html` yang merupakan implementasi lengkap dalam HTML + Tailwind.

---

## Phase 0: Foundation ✅ COMPLETED

### 0.1 Design System Setup

- [x] Update `tailwind.config.js` dengan colors, fonts, border radius
- [x] Update `globals.css` dengan glassmorphism, glow effects
- [x] Update `layout.tsx` dengan dark mode dan Manrope font

### 0.2 Base UI Components

- [x] `MaterialIcon.tsx` - Material Symbols wrapper
- [x] `GlassPanel.tsx` - Glassmorphism container
- [x] `GlowButton.tsx` - Button dengan glow effect
- [x] `TechBadge.tsx` - Tech stack badge
- [x] `SearchBar.tsx` - Search dengan glow effect

---

## Phase 1: Public Landing Pages ✅ COMPLETED

### 1.1 Home Page ✅

**Source**: `home-page/code.html`
**Target**: `src/app/(landing-page)/(page)/page.tsx`

- [x] Navbar (floating glassmorphism)
- [x] Hero Section (gradient text, search bar, tech chips)
- [x] Top Companies Section (company cards grid)
- [x] Featured Jobs Section (pill-shaped job cards)
- [x] Trending Tech Stacks Section (tech stack grid)
- [x] Footer (multi-column)

### 1.2 Login Page ✅

**Source**: `login-page/code.html`
**Target**: `src/app/(landing-page)/(auth)/signin/page.tsx`

- [x] Glassmorphism login card
- [x] Input fields with icons
- [x] OAuth buttons (Google, GitHub)
- [x] Glow submit button

### 1.3 Register Page ✅

**Source**: `register-page/code.html`
**Target**: `src/app/(landing-page)/(auth)/signup/page.tsx`

- [x] Job Seeker / Company toggle tabs
- [x] Registration form
- [x] Password strength indicator
- [x] Skills tags input

---

## Phase 2: Jobs Pages ✅ COMPLETED

### 2.1 Jobs Listing Page ✅

**Source**: `jobs-listing-page/code.html`
**Target**: `src/app/(landing-page)/(page)/find-jobs/page.tsx`

- [x] Filter sidebar (job type, salary, experience, tech stack)
- [x] Job cards list with featured highlight
- [x] Sort dropdown
- [x] Pagination

### 2.2 Job Detail Page ✅

**Source**: `job-detail-page/code.html`
**Target**: `src/app/(landing-page)/(page)/detail/job/[id]/page.tsx`

- [x] Job header card (logo, title, salary, Apply button)
- [x] About the Role section
- [x] Tech Stack section
- [x] What You'll Do section
- [x] Perks & Benefits grid
- [x] Company sidebar card
- [x] Similar jobs list

### 2.3 Apply Form Page ✅

**Source**: `apply-form-job-page/code.html`
**Target**: `src/app/(landing-page)/(page)/detail/job/[id]/apply/page.tsx`

- [x] Job summary header
- [x] Application form (multi-step)
- [x] Resume upload
- [x] Cover letter textarea
- [x] Submit button

### 2.4 Success Apply Page ✅

**Source**: `success-apply-page/code.html`
**Target**: `src/app/(landing-page)/(page)/apply-success/page.tsx`

- [x] Success icon/illustration
- [x] Confirmation message
- [x] Application timeline
- [x] Navigation buttons

---

## Phase 3: Companies Pages ✅ COMPLETED

### 3.1 Companies Listing Page ✅

**Source**: `companies-page/code.html`
**Target**: `src/app/(landing-page)/(page)/find-companies/page.tsx`

- [x] Companies grid
- [x] Glassmorphism company cards
- [x] Filters (industry, size, location)
- [x] Search functionality
- [x] Pagination

### 3.2 Company Detail Page ✅

**Source**: `company-detail-page/code.html`
**Target**: `src/app/(landing-page)/(page)/find-companies/[id]/page.tsx`

- [x] Company header (logo, name, description)
- [x] Company stats
- [x] About section
- [x] Open positions list
- [x] Similar companies

---

## Phase 4: Dashboard Pages ✅ COMPLETED

### 4.1 Dashboard Layout ✅

**Target**: `src/app/dashboard/layout.tsx`

- [x] Fixed sidebar (256px) - `DashboardSidebar.tsx`
- [x] Main content area
- [x] Sidebar navigation items
- [x] User profile card at bottom

**Sidebar Menu Items:**

- Dashboard
- Job Listings
- Post a Job
- Settings

### 4.2 Dashboard Main ✅

**Source**: `dashboard-admn-page/code.html`
**Target**: `src/app/dashboard/page.tsx`

- [x] 4 stat cards (Active Jobs, Applicants, Views, Pending)
- [x] Application traffic bar chart
- [x] Funnel conversion progress bars
- [x] Candidate sources chart
- [x] Live activity feed
- [x] Active jobs table

### 4.3 Job Listings Management ✅

**Source**: `dashboard-job-listings-page/code.html`
**Target**: `src/app/dashboard/jobs/page.tsx`

- [x] Stats cards (4 cards)
- [x] Jobs table with status badges
- [x] Actions (edit, duplicate, delete)
- [x] Search & Filters
- [x] Pagination

### 4.4 Job Detail (Admin View) ✅

**Source**: `dashboard-job-detail-page/code.html`
**Target**: `src/app/dashboard/jobs/[id]/page.tsx`

- [x] Job stats cards (4 cards)
- [x] Candidate pipeline visualization
- [x] Job description section
- [x] Recent applicants table
- [x] Applicant actions (schedule, message, reject)

### 4.5 Post a Job ✅

**Source**: `dashboaed-post-a-job-page/code.html`
**Target**: `src/app/dashboard/post-job/page.tsx`

- [x] Multi-section form (Basic Details, Description, Compensation)
- [x] Job details inputs
- [x] Requirements section (dynamic add/remove)
- [x] Tech stack tags
- [x] Benefits selection
- [x] Preview sidebar
- [x] AI Assist button

### 4.6 Settings ✅

**Source**: `dashboard-setting-page/code.html`
**Target**: `src/app/dashboard/settings/page.tsx`

- [x] Company profile section
- [x] Team management section
- [x] Notification preferences (toggles)
- [x] Billing section
- [x] Security section

---

## Phase 5: Testing & Finalization ✅ COMPLETED

### 5.1 Build Verification ✅

- [x] `npm run build` passes
- [x] No TypeScript errors
- [x] No console errors

### 5.2 Visual Verification ✅

- [x] Home page matches design
- [x] Auth pages match design
- [x] Jobs pages match design
- [x] Companies pages match design
- [x] Dashboard pages match design

### 5.3 Bug Fixes ✅

- [x] Fixed duplicate footer issue in landing pages

---

## Files Created/Modified

### New Components

- `src/components/dashboard/DashboardSidebar.tsx`
- `src/components/ui/GlassPanel.tsx`
- `src/components/ui/GlowButton.tsx`
- `src/components/ui/TechBadge.tsx`

### Dashboard Pages

- `src/app/dashboard/layout.tsx`
- `src/app/dashboard/page.tsx`
- `src/app/dashboard/jobs/page.tsx`
- `src/app/dashboard/jobs/[id]/page.tsx`
- `src/app/dashboard/post-job/page.tsx`
- `src/app/dashboard/settings/page.tsx`

### Public Pages

- `src/app/(landing-page)/(page)/page.tsx` - Home
- `src/app/(landing-page)/(auth)/signin/page.tsx` - Login
- `src/app/(landing-page)/(auth)/signup/page.tsx` - Register
- `src/app/(landing-page)/(page)/find-jobs/page.tsx` - Jobs Listing
- `src/app/(landing-page)/(page)/detail/job/[id]/page.tsx` - Job Detail
- `src/app/(landing-page)/(page)/detail/job/[id]/apply/page.tsx` - Apply Form
- `src/app/(landing-page)/(page)/apply-success/page.tsx` - Apply Success
- `src/app/(landing-page)/(page)/find-companies/page.tsx` - Companies Listing
- `src/app/(landing-page)/(page)/find-companies/[id]/page.tsx` - Company Detail

### Config Files

- `tailwind.config.js` - Updated with design system
- `src/app/globals.css` - Added glassmorphism, glow effects

---

## Timeline Summary

| Phase   | Duration | Status  |
| ------- | -------- | ------- |
| Phase 0 | 0.5 day  | ✅ Done |
| Phase 1 | 1 day    | ✅ Done |
| Phase 2 | 1 day    | ✅ Done |
| Phase 3 | 0.5 day  | ✅ Done |
| Phase 4 | 1 day    | ✅ Done |
| Phase 5 | 0.5 day  | ✅ Done |

**Total: ~4.5 days** ✅ **ALL COMPLETED!**
