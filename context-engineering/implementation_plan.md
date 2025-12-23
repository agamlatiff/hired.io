# Hired.io Complete Redesign Roadmap

> **Objective**: Mengganti SELURUH design lama dengan design baru dari folder `stitch_hired.io_homepage_dark_mode`. Setiap halaman akan di-convert dari HTML design ke React/Next.js components.

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

## Phase 1: Public Landing Pages

### 1.1 Home Page

**Source**: `home-page/code.html`
**Target**: `src/app/(landing-page)/(page)/page.tsx`

Convert sections:

- [ ] Navbar (floating glassmorphism)
- [ ] Hero Section (gradient text, search bar, tech chips)
- [ ] Top Companies Section (company cards grid)
- [ ] Featured Jobs Section (pill-shaped job cards)
- [ ] Trending Tech Stacks Section (tech stack grid)
- [ ] Footer (multi-column)

### 1.2 Login Page

**Source**: `login-page/code.html`
**Target**: `src/app/(landing-page)/(auth)/signin/page.tsx`

Convert:

- [ ] Glassmorphism login card
- [ ] Input fields with icons
- [ ] OAuth buttons (Google, GitHub)
- [ ] Glow submit button

### 1.3 Register Page

**Source**: `register-page/code.html`
**Target**: `src/app/(landing-page)/(auth)/signup/page.tsx`

Convert:

- [ ] Job Seeker / Company toggle tabs
- [ ] Registration form
- [ ] Password strength indicator
- [ ] Skills tags input

---

## Phase 2: Jobs Pages

### 2.1 Jobs Listing Page

**Source**: `jobs-listing-page/code.html`
**Target**: `src/app/(landing-page)/(page)/find-jobs/page.tsx`

Convert:

- [ ] Filter sidebar (job type, salary, experience, tech stack)
- [ ] Job cards list with featured highlight
- [ ] Sort dropdown
- [ ] Pagination

### 2.2 Job Detail Page

**Source**: `job-detail-page/code.html`
**Target**: `src/app/(landing-page)/(page)/detail/[slug]/page.tsx`

Convert:

- [ ] Job header card (logo, title, salary, Apply button)
- [ ] About the Role section
- [ ] Tech Stack section
- [ ] What You'll Do section
- [ ] Perks & Benefits grid
- [ ] Company sidebar card
- [ ] Similar jobs list

### 2.3 Apply Form Page

**Source**: `apply-form-job-page/code.html`
**Target**: `src/app/(landing-page)/(page)/detail/[slug]/apply/page.tsx` (NEW)

Convert:

- [ ] Job summary header
- [ ] Application form
- [ ] Resume upload
- [ ] Cover letter textarea
- [ ] Submit button

### 2.4 Success Apply Page

**Source**: `success-apply-page/code.html`
**Target**: `src/app/(landing-page)/(page)/apply-success/page.tsx` (NEW)

Convert:

- [ ] Success icon/illustration
- [ ] Confirmation message
- [ ] Next steps info
- [ ] Navigation buttons

---

## Phase 3: Companies Pages

### 3.1 Companies Listing Page

**Source**: `companies-page/code.html`
**Target**: `src/app/(landing-page)/(page)/find-companies/page.tsx`

Convert:

- [ ] Companies grid
- [ ] Glassmorphism company cards
- [ ] Filters
- [ ] Pagination

### 3.2 Company Detail Page

**Source**: `company-detail-page/code.html`
**Target**: `src/app/(landing-page)/(page)/find-companies/[id]/page.tsx` (NEW)

Convert:

- [ ] Company header (logo, name, description)
- [ ] Company stats
- [ ] About section
- [ ] Open positions

### 3.3 Company Jobs Page

**Source**: `companies-detail-job-page/code.html`
**Target**: Sub-section in company detail

Convert:

- [ ] Jobs list for specific company

---

## Phase 4: Dashboard Pages

### 4.1 Dashboard Layout

**Target**: `src/app/(dashboard)/layout.tsx`

- [ ] Fixed sidebar (256px)
- [ ] Main content area
- [ ] Sidebar navigation items
- [ ] User profile card at bottom

**Sidebar Menu Items:**

- Dashboard
- Job Listings
- Post a Job
- Settings

> ⚠️ **Note**: "Candidates" dan "Interviews" TIDAK ADA design-nya. Jangan ditampilkan.

### 4.2 Dashboard Main

**Source**: `dashboard-admn-page/code.html`
**Target**: `src/app/(dashboard)/page.tsx` (NEW main dashboard)

Convert:

- [ ] 4 stat cards (Active Jobs, Applicants, Views, Pending)
- [ ] Application traffic bar chart
- [ ] Funnel conversion progress bars
- [ ] Candidate sources chart
- [ ] Live activity feed
- [ ] Active jobs table

### 4.3 Job Listings Management

**Source**: `dashboard-job-listings-page/code.html`
**Target**: `src/app/(dashboard)/job-listings/page.tsx`

Convert:

- [ ] Jobs table with status badges
- [ ] Actions (edit, delete, view)
- [ ] Filters
- [ ] Pagination

### 4.4 Job Detail (Admin View)

**Source**: `dashboard-job-detail-page/code.html`
**Target**: `src/app/(dashboard)/job-detail/page.tsx`

Convert:

- [ ] Job details view
- [ ] Applicants list
- [ ] Stats

### 4.5 Post a Job

**Source**: `dashboaed-post-a-job-page/code.html`
**Target**: `src/app/(dashboard)/post-a-job/page.tsx`

Convert:

- [ ] Multi-section form
- [ ] Job details inputs
- [ ] Requirements section
- [ ] Benefits selection
- [ ] Preview button

### 4.6 Settings

**Source**: `dashboard-setting-page/code.html`
**Target**: `src/app/(dashboard)/settings/page.tsx`

Convert:

- [ ] Company profile section
- [ ] Account settings
- [ ] Notification preferences

---

## Phase 5: Testing & Finalization

### 5.1 Build Verification

- [ ] `npm run build` passes
- [ ] No TypeScript errors
- [ ] No console errors

### 5.2 Visual Verification

- [ ] Home page matches design
- [ ] Auth pages match design
- [ ] Jobs pages match design
- [ ] Companies pages match design
- [ ] Dashboard pages match design

### 5.3 Responsive Testing

- [ ] Mobile view works
- [ ] Tablet view works
- [ ] Desktop view works

---

## Implementation Approach

Untuk setiap halaman:

1. **Buka** `code.html` dari design folder
2. **Analyze** struktur HTML dan Tailwind classes
3. **Convert** ke React/Next.js component
4. **Replace** existing page dengan design baru
5. **Test** di browser
6. **Commit** perubahan

---

## Timeline Estimate

| Phase   | Pages      | Est. Time |
| ------- | ---------- | --------- |
| Phase 0 | Foundation | ✅ Done   |
| Phase 1 | 3 pages    | 2-3 hours |
| Phase 2 | 4 pages    | 3-4 hours |
| Phase 3 | 3 pages    | 2-3 hours |
| Phase 4 | 6 pages    | 4-5 hours |
| Phase 5 | Testing    | 1-2 hours |

**Total: 12-17 hours**
