# Hired.io Redesign Documentation

Dokumentasi lengkap untuk redesign aplikasi Hired.io berdasarkan design files yang sudah disiapkan.

---

## Design System Overview

### Color Palette (Dark Mode)

| Color Name           | Hex Code  | Usage                                      |
| -------------------- | --------- | ------------------------------------------ |
| **Primary**          | `#49e619` | Neon Green - Main accent, CTAs, highlights |
| **Secondary**        | `#a259ff` | Neon Purple - Secondary accent, badges     |
| **Accent Blue**      | `#00f0ff` | Cyan accent for skills tags                |
| **Background Dark**  | `#131811` | Main background                            |
| **Card Dark**        | `#1e261c` | Card/panel background                      |
| **Accent Dark**      | `#2c3829` | Borders, subtle backgrounds                |
| **Background Light** | `#f6f8f6` | Light mode background (if needed)          |

### Typography

- **Font Family**: `Manrope` (Google Fonts)
- **Weights**: 200, 300, 400, 500, 600, 700, 800
- **Display Font**: `font-display: ["Manrope", "sans-serif"]`

### Icons

- **Icon Library**: Material Symbols Outlined
- **CDN**: `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap`

### Border Radius Scale

```js
borderRadius: {
  "DEFAULT": "1rem",
  "lg": "2rem",
  "xl": "3rem",
  "full": "9999px"
}
```

### Key CSS Classes

```css
/* Glassmorphism Panel */
.glass-panel {
  background: rgba(30, 38, 28, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(73, 230, 25, 0.1);
}

/* Glow Text Effect */
.glow-text {
  text-shadow: 0 0 10px rgba(73, 230, 25, 0.5);
}

/* Glow Box Hover Effect */
.glow-box:hover {
  box-shadow: 0 0 20px rgba(73, 230, 25, 0.15);
  border-color: rgba(73, 230, 25, 0.5);
}

/* Grid Pattern Background */
.bg-grid {
  background-size: 40px 40px;
  mask-image: linear-gradient(
    to bottom,
    transparent,
    10%,
    black,
    90%,
    transparent
  );
}

/* Input Field Style */
.input-field {
  background: rgba(20, 25, 20, 0.8);
  border: 1px solid rgba(73, 230, 25, 0.2);
  transition: all 0.3s ease;
}
.input-field:focus {
  border-color: #49e619;
  box-shadow: 0 0 15px rgba(73, 230, 25, 0.2);
}
```

---

## Page Mapping

### Public Pages (Landing)

| Design Folder               | Target Route           | Current File Location                                        |
| --------------------------- | ---------------------- | ------------------------------------------------------------ |
| `home-page`                 | `/`                    | `src/app/(landing-page)/(page)/page.tsx`                     |
| `login-page`                | `/signin`              | `src/app/(landing-page)/(auth)/signin/page.tsx`              |
| `register-page`             | `/signup`              | `src/app/(landing-page)/(auth)/signup/page.tsx`              |
| `jobs-listing-page`         | `/find-jobs`           | `src/app/(landing-page)/(page)/find-jobs/page.tsx`           |
| `job-detail-page`           | `/detail/[slug]`       | `src/app/(landing-page)/(page)/detail/[slug]/page.tsx`       |
| `companies-page`            | `/find-companies`      | `src/app/(landing-page)/(page)/find-companies/page.tsx`      |
| `company-detail-page`       | `/find-companies/[id]` | `src/app/(landing-page)/(page)/find-companies/[id]/page.tsx` |
| `apply-form-job-page`       | `/detail/[slug]/apply` | (NEW) Apply form page                                        |
| `success-apply-page`        | `/apply-success`       | (NEW) Success application page                               |
| `companies-detail-job-page` | -                      | Company's job listing (sub-page)                             |

### Dashboard Pages (Employer/Company)

| Design Folder                 | Target Route       | Current File Location                             |
| ----------------------------- | ------------------ | ------------------------------------------------- |
| `dashboard-admn-page`         | `/dashboard`       | `src/app/(dashboard)/layout.tsx` (main dashboard) |
| `dashboard-job-listings-page` | `/job-listings`    | `src/app/(dashboard)/job-listings/page.tsx`       |
| `dashboard-job-detail-page`   | `/job-detail/[id]` | `src/app/(dashboard)/job-detail/page.tsx`         |
| `dashboaed-post-a-job-page`   | `/post-a-job`      | `src/app/(dashboard)/post-a-job/page.tsx`         |
| `dashboard-setting-page`      | `/settings`        | `src/app/(dashboard)/settings/page.tsx`           |

### Dashboard Sidebar - Available vs Not Available

**Available Designs:**

- [x] Dashboard (main overview)
- [x] Job Listings
- [x] Job Detail
- [x] Post a Job
- [x] Settings

**Not Available (IGNORE these in sidebar):**

- [ ] Candidates
- [ ] Interviews

---

## Design Files Reference

All design files are located at:

```
c:\Projects\hired-work\stitch_hired.io_homepage_dark_mode\stitch_hired.io_homepage_dark_mode\
```

Each folder contains:

- `code.html` - Full HTML implementation with Tailwind classes
- `screen.png` - Design screenshot preview

---

## Detailed Page Specifications

### 1. Home Page (`home-page`)

**Sections:**

1. **Navbar** - Glassmorphism floating navbar with logo, navigation links, login/signup buttons
2. **Hero Section** - Large headline, search bar with location filter, tech stack chips
3. **Top Companies** - 4-column grid of company cards with glassmorphism
4. **Featured Jobs** - Rounded pill-style job cards with company logo, salary, tech tags
5. **Trending Tech Stacks** - 6-column grid of technology categories
6. **Footer** - Multi-column links with logo

**Key Components:**

- Floating glassmorphism navbar (`glass-panel rounded-full`)
- Hero with gradient text and animated ping indicator
- Search bar with glow effect on focus
- Company cards with hover lift effect
- Pill-shaped job listings with responsive layout

---

### 2. Login Page (`login-page`)

**Sections:**

1. **Navbar** - Same floating glassmorphism navbar
2. **Login Form** - Centered glassmorphism card with:
   - Email/username input with icon
   - Password input with forgot password link
   - Primary CTA button
   - OAuth options (Google, GitHub)
   - Register link
3. **Footer** - Minimal footer

**Form Styling:**

- Input fields with `input-field` class
- Icon prefix inside inputs
- Glowing submit button

---

### 3. Register Page (`register-page`)

**Sections:**

1. **Navbar**
2. **Registration Form** - Similar style to login with:
   - Job Seeker / Company toggle tabs
   - Full name, email, password inputs
   - Password strength indicator
   - Skills input with tags
   - OAuth options
3. **Footer**

**Unique Features:**

- Toggle between "Job Seeker" and "Company" modes
- Skill tags with colorful badges
- Password strength meter

---

### 4. Jobs Listing Page (`jobs-listing-page`)

**Layout:** Sidebar (filters) + Main content (job cards)

**Sidebar Filters:**

- Job Type (checkboxes)
- Salary Range (dual input + slider)
- Experience Level (checkboxes)
- Tech Stack (search + tags)

**Main Content:**

- Header with job count and sort dropdown
- Featured job card (highlighted border)
- Regular job cards
- Pagination

**Job Card Components:**

- Company logo
- Job title and company name
- Location and time posted
- Tech stack badges
- Salary range with glow
- Save and Apply buttons

---

### 5. Job Detail Page (`job-detail-page`)

**Layout:** Main content + Right sidebar

**Main Content Sections:**

1. **Header Card** - Company logo, title, salary, equity, badges, Apply button
2. **About the Role** - Rich text description
3. **Tech Stack** - Technology badges with icons
4. **What You'll Do** - Bullet list with hover effects
5. **Perks & Benefits** - 2-column grid of benefits

**Right Sidebar:**

1. **Company Card** - Logo, description, stats grid
2. **Similar Jobs** - List of related positions

---

### 6. Dashboard Pages

**Common Layout:**

- Left sidebar (fixed, 256px width)
- Main content area with scrolling

**Sidebar Structure:**

```
Logo + Brand
─────────────
Main Menu:
  - Dashboard (icon: dashboard)
  - Job Listings (icon: list_alt)
  - Job Detail (icon: work)
  - Candidates (icon: group) [IGNORE]
  - Interviews (icon: schedule) [IGNORE]
─────────────
Configuration:
  - Post a Job (icon: post_add)
  - Settings (icon: settings)
─────────────
User/Company Profile Card
```

**Dashboard Main (`dashboard-admn-page`):**

- 4 stat cards (Active Jobs, Total Applicants, Job Views, Pending Review)
- Application Traffic chart (bar chart)
- Funnel Conversion progress bars
- Candidate Sources pie chart
- Live Activity feed
- Active Job Listings table

---

## Tailwind Config Updates

Update `tailwind.config.js` to include:

```js
module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#49e619",
        secondary: "#a259ff",
        "accent-blue": "#00f0ff",
        "background-light": "#f6f8f6",
        "background-dark": "#131811",
        "card-dark": "#1e261c",
        "accent-dark": "#2c3829",
        "chart-blue": "#3b82f6",
        "chart-purple": "#8b5cf6",
      },
      fontFamily: {
        display: ["Manrope", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg: "2rem",
        xl: "3rem",
        full: "9999px",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, #2c3829 1px, transparent 1px), linear-gradient(to bottom, #2c3829 1px, transparent 1px)",
      },
    },
  },
};
```

---

## Component Checklist

### Shared Components (Create/Update)

- [ ] `Navbar.tsx` - Floating glassmorphism navbar
- [ ] `Footer.tsx` - Multi-column footer
- [ ] `JobCard.tsx` - Pill-shaped job listing card
- [ ] `CompanyCard.tsx` - Company card with glassmorphism
- [ ] `TechBadge.tsx` - Technology stack badge
- [ ] `SearchBar.tsx` - Hero search bar with glow
- [ ] `StatCard.tsx` - Dashboard stat card
- [ ] `DashboardSidebar.tsx` - Admin sidebar navigation

### Page-Specific Components

- [ ] `HeroSection.tsx` - Home page hero
- [ ] `FilterSidebar.tsx` - Jobs listing filters
- [ ] `JobDetailHeader.tsx` - Job detail header card
- [ ] `CompanyProfile.tsx` - Company sidebar card
- [ ] `ActivityFeed.tsx` - Dashboard live activity
- [ ] `TrafficChart.tsx` - Dashboard bar chart

---

## Implementation Priority

### Phase 1: Foundation

1. Update Tailwind config with new colors/fonts
2. Add global styles (glassmorphism, glow effects)
3. Create/update Navbar and Footer

### Phase 2: Public Pages

1. Home page
2. Jobs listing page
3. Job detail page
4. Login/Register pages
5. Companies pages

### Phase 3: Dashboard

1. Dashboard layout with sidebar
2. Dashboard main page
3. Job listings management
4. Post a job form
5. Settings page

---

## Notes

> **Important:** Dashboard sidebar items "Candidates" and "Interviews" do not have design files. These should be excluded or hidden from the sidebar until designs are available.

> **Dark Mode:** All designs are in dark mode. The `dark` class should be applied to the root `<html>` element.

> **Responsive:** All designs support responsive layouts with breakpoints at `md` (768px) and `lg` (1024px).
