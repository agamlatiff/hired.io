# Hired.io Redesign - Task Checklist

> Converting HTML designs from `stitch_hired.io_homepage_dark_mode` to React/Next.js

---

## Phase 0: Foundation ✅ COMPLETED

- [x] Update tailwind.config.js
- [x] Update globals.css with glassmorphism & glow effects
- [x] Update layout.tsx with dark mode
- [x] Create MaterialIcon.tsx
- [x] Create GlassPanel.tsx
- [x] Create GlowButton.tsx
- [x] Create TechBadge.tsx
- [x] Create SearchBar.tsx

---

## Phase 1: Public Landing Pages ✅ COMPLETED

### Home Page (`home-page/code.html`)

- [x] Convert Navbar section
- [x] Convert Hero section
- [x] Convert Top Companies section
- [x] Convert Featured Jobs section
- [x] Convert Trending Tech Stacks section
- [x] Convert Footer section

### Login Page (`login-page/code.html`)

- [x] Convert login form card
- [x] Convert input fields
- [x] Convert OAuth buttons
- [x] Convert submit button

### Register Page (`register-page/code.html`)

- [x] Convert registration form
- [x] Convert role toggle tabs
- [x] Convert skills input
- [x] Convert password strength indicator

### Auth Layout

- [x] Update auth layout with new design

---

## Phase 2: Jobs Pages

### Jobs Listing (`jobs-listing-page/code.html`)

- [ ] Convert filter sidebar
- [ ] Convert job cards list
- [ ] Convert sort/filter header
- [ ] Convert pagination

### Job Detail (`job-detail-page/code.html`)

- [ ] Convert job header card
- [ ] Convert about section
- [ ] Convert tech stack section
- [ ] Convert responsibilities section
- [ ] Convert benefits section
- [ ] Convert company sidebar
- [ ] Convert similar jobs

### Apply Form (`apply-form-job-page/code.html`)

- [ ] Create apply page route
- [ ] Convert application form
- [ ] Convert file upload
- [ ] Convert submit section

### Apply Success (`success-apply-page/code.html`)

- [ ] Create success page route
- [ ] Convert success message
- [ ] Convert navigation buttons

---

## Phase 3: Companies Pages

### Companies Listing (`companies-page/code.html`)

- [ ] Convert companies grid
- [ ] Convert company cards
- [ ] Convert filters
- [ ] Convert pagination

### Company Detail (`company-detail-page/code.html`)

- [ ] Create company detail route
- [ ] Convert company header
- [ ] Convert about section
- [ ] Convert open positions

### Company Jobs (`companies-detail-job-page/code.html`)

- [ ] Convert company jobs list

---

## Phase 4: Dashboard Pages

### Dashboard Layout

- [ ] Create DashboardSidebar component
- [ ] Update dashboard layout.tsx
- [ ] Add navigation items
- [ ] Add user profile section

### Dashboard Main (`dashboard-admn-page/code.html`)

- [ ] Create dashboard main page
- [ ] Convert stat cards
- [ ] Convert traffic chart
- [ ] Convert funnel progress
- [ ] Convert activity feed
- [ ] Convert jobs table

### Job Listings (`dashboard-job-listings-page/code.html`)

- [ ] Convert jobs table
- [ ] Convert actions
- [ ] Convert filters

### Job Detail Admin (`dashboard-job-detail-page/code.html`)

- [ ] Convert job detail view
- [ ] Convert applicants section

### Post a Job (`dashboaed-post-a-job-page/code.html`)

- [ ] Convert job form
- [ ] Convert requirements section
- [ ] Convert benefits section
- [ ] Convert preview

### Settings (`dashboard-setting-page/code.html`)

- [ ] Convert profile section
- [ ] Convert account settings
- [ ] Convert notifications

---

## Phase 5: Testing & Finalization

- [ ] Build verification (`npm run build`)
- [ ] Visual comparison with designs
- [ ] Responsive testing
- [ ] Fix any issues

---

## Git Commits Plan

- [x] Phase 1 complete → commit & push
- [ ] Phase 2 complete → commit & push
- [ ] Phase 3 complete → commit & push
- [ ] Phase 4 complete → commit & push
- [ ] Phase 5 complete → commit & push
