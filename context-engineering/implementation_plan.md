# Hired.io Complete Redesign Roadmap

Dokumentasi roadmap lengkap untuk redesign aplikasi Hired.io berdasarkan design reference di folder `stitch_hired.io_homepage_dark_mode`.

---

## Executive Summary

Redesign ini mencakup **15 halaman** dengan design system baru yang fokus pada:

- **Dark Mode** sebagai default theme
- **Glassmorphism** untuk panel dan card effects
- **Neon Green (#49e619)** sebagai primary accent
- **Manrope** font family untuk typography modern
- **Material Symbols Outlined** untuk iconography

---

## Phase 0: Preparation & Analysis

**Timeline: 0.5 hari**

### 0.1 Current State Analysis

- [x] Review existing documentation di `context-engineering/redesign-documentation.md`
- [x] Analyze current tailwind config dan globals.css
- [x] Map existing components yang perlu di-update
- [x] Identify new components yang perlu dibuat

### 0.2 Design Files Inventory

| Page                 | Design Folder                 | Status       |
| -------------------- | ----------------------------- | ------------ |
| Home                 | `home-page`                   | ✅ Available |
| Login                | `login-page`                  | ✅ Available |
| Register             | `register-page`               | ✅ Available |
| Jobs Listing         | `jobs-listing-page`           | ✅ Available |
| Job Detail           | `job-detail-page`             | ✅ Available |
| Companies            | `companies-page`              | ✅ Available |
| Company Detail       | `company-detail-page`         | ✅ Available |
| Apply Form           | `apply-form-job-page`         | ✅ Available |
| Success Apply        | `success-apply-page`          | ✅ Available |
| Dashboard Main       | `dashboard-admn-page`         | ✅ Available |
| Job Listings (Admin) | `dashboard-job-listings-page` | ✅ Available |
| Job Detail (Admin)   | `dashboard-job-detail-page`   | ✅ Available |
| Post a Job           | `dashboaed-post-a-job-page`   | ✅ Available |
| Settings             | `dashboard-setting-page`      | ✅ Available |
| Company Jobs         | `companies-detail-job-page`   | ✅ Available |

---

## Phase 1: Design System Foundation

**Timeline: 1-2 hari**

### 1.1 Update Tailwind Configuration

#### [MODIFY] [tailwind.config.js](file:///c:/Projects/hired-work/tailwind.config.js)

Tambahkan custom colors, fonts, dan utilities:

```diff
module.exports = {
  darkMode: ["class"],
  content: [...],
  theme: {
    extend: {
      colors: {
+       // New Design System Colors
+       primary: "#49e619",
+       secondary: "#a259ff",
+       "accent-blue": "#00f0ff",
+       "background-light": "#f6f8f6",
+       "background-dark": "#131811",
+       "card-dark": "#1e261c",
+       "accent-dark": "#2c3829",
+       "chart-blue": "#3b82f6",
+       "chart-purple": "#8b5cf6",
        // Keep existing shadcn colors
        border: "hsl(var(--border))",
        ...
      },
+     fontFamily: {
+       display: ["Manrope", "sans-serif"],
+     },
+     borderRadius: {
+       DEFAULT: "1rem",
+       lg: "2rem",
+       xl: "3rem",
+       full: "9999px",
+     },
+     backgroundImage: {
+       "grid-pattern": "linear-gradient(to right, #2c3829 1px, transparent 1px), linear-gradient(to bottom, #2c3829 1px, transparent 1px)",
+     },
    },
  },
}
```

---

### 1.2 Update Global Styles

#### [MODIFY] [globals.css](file:///c:/Projects/hired-work/src/app/globals.css)

Tambahkan custom CSS untuk glassmorphism dan glow effects:

```css
/* Import Manrope Font */
@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap");

/* Import Material Symbols */
@import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap");

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

/* Dark Mode Variables */
.dark {
  --background: #131811;
  --foreground: #ffffff;
  --card: #1e261c;
  --card-foreground: #ffffff;
  --primary: #49e619;
  --primary-foreground: #131811;
  --secondary: #a259ff;
  --accent: #2c3829;
  --muted: #2c3829;
  --border: #2c3829;
}
```

---

### 1.3 Add Dark Mode to Root Layout

#### [MODIFY] [layout.tsx](file:///c:/Projects/hired-work/src/app/layout.tsx)

```diff
export default function RootLayout({ children }) {
  return (
-   <html lang="en">
+   <html lang="en" className="dark">
      <body className="font-display">{children}</body>
    </html>
  )
}
```

---

## Phase 2: Shared Components

**Timeline: 2-3 hari**

### 2.1 Core Components (Priority 1)

| Component   | File              | Status    | Complexity |
| ----------- | ----------------- | --------- | ---------- |
| Navbar      | `Navbar.tsx`      | 🔄 Update | Medium     |
| Footer      | `Footer.tsx`      | 🔄 Update | Medium     |
| JobCard     | `JobCard.tsx`     | 🔄 Update | High       |
| CompanyCard | `CompanyCard.tsx` | 🔄 Update | Medium     |

#### [MODIFY] [Navbar.tsx](file:///c:/Projects/hired-work/src/components/page/Navbar.tsx)

**Redesign Notes:**

- Floating glassmorphism navbar di tengah viewport
- Fixed position dengan padding top
- Pills/rounded-full shape
- Logo dengan terminal icon
- Navigation links dengan hover states
- Login/Sign Up buttons dengan glow effect

**Key CSS Classes:**

```
fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4
glass-panel rounded-full px-6 py-3 flex items-center justify-between gap-12
```

---

#### [MODIFY] [Footer.tsx](file:///c:/Projects/hired-work/src/components/page/Footer.tsx)

**Redesign Notes:**

- Multi-column layout
- Dark background dengan border top
- Logo kecil dengan terminal icon
- Links organized by categories: Candidates, Employers, Company
- Copyright dan policy links di bottom

---

#### [MODIFY] [JobCard.tsx](file:///c:/Projects/hired-work/src/components/page/JobCard.tsx)

**Redesign Notes:**

- Pill-shaped (rounded-full) card
- Glow effect on hover (`.glow-box`)
- Company logo rounded-full
- Tech stack badges
- Salary dengan glow text
- Arrow button di sebelah kanan

**Key CSS Classes:**

```
glow-box group relative bg-card-dark border border-accent-dark hover:border-primary/50
rounded-full p-3 pr-8 transition-all duration-300
```

---

#### [MODIFY] [CompanyCard.tsx](file:///c:/Projects/hired-work/src/components/page/CompanyCard.tsx)

**Redesign Notes:**

- Glassmorphism panel
- Hover lift effect (`hover:-translate-y-1`)
- Company logo dengan rounded corners
- Badges untuk company type (Remote, Series, etc.)
- Stats di bagian bawah dengan border-t

---

### 2.2 New Shared Components (Priority 2)

| Component    | File               | Status | Purpose                          |
| ------------ | ------------------ | ------ | -------------------------------- |
| TechBadge    | `TechBadge.tsx`    | ✨ NEW | Technology stack badge           |
| SearchBar    | `SearchBar.tsx`    | ✨ NEW | Hero search dengan glow          |
| GlassPanel   | `GlassPanel.tsx`   | ✨ NEW | Reusable glassmorphism container |
| GlowButton   | `GlowButton.tsx`   | ✨ NEW | Button dengan glow effect        |
| MaterialIcon | `MaterialIcon.tsx` | ✨ NEW | Wrapper untuk Material Symbols   |

#### [NEW] [TechBadge.tsx](file:///c:/Projects/hired-work/src/components/ui/TechBadge.tsx)

```tsx
interface TechBadgeProps {
  label: string;
  variant?: "default" | "primary" | "purple" | "blue" | "orange";
}

// Key CSS:
// shrink-0 px-3 py-1 rounded-full bg-accent-dark text-xs font-mono text-gray-300 border border-white/5
```

---

#### [NEW] [SearchBar.tsx](file:///c:/Projects/hired-work/src/components/page/SearchBar.tsx)

**Features:**

- Search input dengan icon
- Location/work type dropdown
- Gradient glow effect on focus
- Search button dengan primary color

---

#### [NEW] [GlassPanel.tsx](file:///c:/Projects/hired-work/src/components/ui/GlassPanel.tsx)

```tsx
interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  rounded?: "default" | "lg" | "xl" | "full";
}
```

---

## Phase 3: Public Pages Redesign

**Timeline: 4-5 hari**

### 3.1 Home Page

#### [MODIFY] [page.tsx](<file:///c:/Projects/hired-work/src/app/(landing-page)/(page)/page.tsx>)

**Sections to implement:**

1. **Hero Section**

   - Animated ping indicator badge
   - Gradient text headline
   - SVG underline decoration
   - Search bar dengan glow
   - Tech stack chips

2. **Top Companies Section**

   - Section header dengan "View all" link
   - 4-column grid of CompanyCards
   - Glassmorphism cards

3. **Featured Jobs Section**

   - Gradient background overlay
   - Pill-shaped JobCards
   - "View more" button

4. **Trending Tech Stacks**
   - 6-column responsive grid
   - Icon + label + job count
   - Hover scale animation

---

### 3.2 Authentication Pages

#### [MODIFY] [signin/page.tsx](<file:///c:/Projects/hired-work/src/app/(landing-page)/(auth)/signin/page.tsx>)

**Features:**

- Centered glassmorphism card
- Input fields dengan icon prefix
- Forgot password link
- Primary glow button
- OAuth buttons (Google, GitHub)
- Register link

---

#### [MODIFY] [signup/page.tsx](<file:///c:/Projects/hired-work/src/app/(landing-page)/(auth)/signup/page.tsx>)

**Features:**

- Job Seeker / Company toggle tabs
- Full registration form
- Password strength indicator
- Skills input dengan tags
- Terms checkbox

---

### 3.3 Jobs Pages

#### [MODIFY] [find-jobs/page.tsx](<file:///c:/Projects/hired-work/src/app/(landing-page)/(page)/find-jobs/page.tsx>)

**Layout:** Sidebar (filters) + Main (job list)

**Sidebar Components:**

- Job Type checkboxes
- Salary range slider
- Experience level checkboxes
- Tech stack search + tags

**Main Content:**

- Header dengan job count + sort
- Featured job (highlighted)
- Regular job cards
- Pagination

---

#### [MODIFY] [detail/[slug]/page.tsx](<file:///c:/Projects/hired-work/src/app/(landing-page)/(page)/detail/[slug]/page.tsx>)

**Layout:** Main content + Right sidebar

**Main Content:**

- Job header card dengan Apply button
- About the Role section
- Tech Stack section
- What You'll Do section
- Perks & Benefits grid

**Sidebar:**

- Company info card
- Similar jobs list

---

### 3.4 Companies Pages

#### [MODIFY] [find-companies/page.tsx](<file:///c:/Projects/hired-work/src/app/(landing-page)/(page)/find-companies/page.tsx>)

- Grid of company cards
- Filter options
- Pagination

---

#### [NEW] [find-companies/[id]/page.tsx](<file:///c:/Projects/hired-work/src/app/(landing-page)/(page)/find-companies/[id]/page.tsx>)

- Company profile header
- About section
- Open positions list
- Company stats

---

### 3.5 Application Pages

#### [NEW] [detail/[slug]/apply/page.tsx](<file:///c:/Projects/hired-work/src/app/(landing-page)/(page)/detail/[slug]/apply/page.tsx>)

Based on `apply-form-job-page`:

- Job summary at top
- Multi-step form
- Resume upload
- Cover letter
- Skills selection

---

#### [NEW] [apply-success/page.tsx](<file:///c:/Projects/hired-work/src/app/(landing-page)/(page)/apply-success/page.tsx>)

Based on `success-apply-page`:

- Success illustration/icon
- Confirmation message
- Next steps
- Dashboard link

---

## Phase 4: Dashboard Redesign

**Timeline: 3-4 hari**

### 4.1 Dashboard Layout

#### [MODIFY] [layout.tsx](<file:///c:/Projects/hired-work/src/app/(dashboard)/layout.tsx>)

**Structure:**

- Fixed left sidebar (256px)
- Main content area with scroll
- Top header bar (optional)

**Sidebar Navigation:**

```
Logo + Brand
─────────────
Main Menu:
  - Dashboard (icon: dashboard)
  - Job Listings (icon: list_alt)
  - Job Detail (icon: work)
─────────────
Configuration:
  - Post a Job (icon: post_add)
  - Settings (icon: settings)
─────────────
User/Company Profile Card
```

> **Note:** "Candidates" dan "Interviews" tidak ada design-nya. JANGAN tampilkan di sidebar.

---

### 4.2 Dashboard Components

| Component        | File                   | Purpose                 |
| ---------------- | ---------------------- | ----------------------- |
| DashboardSidebar | `DashboardSidebar.tsx` | Sidebar navigation      |
| StatCard         | `StatCard.tsx`         | Stat cards dengan icons |
| ActivityFeed     | `ActivityFeed.tsx`     | Live activity list      |
| TrafficChart     | `TrafficChart.tsx`     | Bar chart untuk traffic |
| FunnelProgress   | `FunnelProgress.tsx`   | Conversion funnel       |
| JobsTable        | `JobsTable.tsx`        | Active jobs table       |

---

### 4.3 Dashboard Pages

#### [MODIFY] Dashboard Main

Based on `dashboard-admn-page`:

- 4 stat cards (Active Jobs, Applicants, Views, Pending)
- Application traffic chart
- Funnel conversion bars
- Candidate sources chart
- Live activity feed
- Active jobs table

---

#### [MODIFY] [job-listings/page.tsx](<file:///c:/Projects/hired-work/src/app/(dashboard)/job-listings/page.tsx>)

Based on `dashboard-job-listings-page`:

- Table dengan job listings
- Status badges
- Actions (edit, delete, view)
- Filters

---

#### [MODIFY] [post-a-job/page.tsx](<file:///c:/Projects/hired-work/src/app/(dashboard)/post-a-job/page.tsx>)

Based on `dashboaed-post-a-job-page`:

- Multi-section form
- Job details inputs
- Requirements section
- Benefits/perks selection
- Preview button

---

#### [MODIFY] [settings/page.tsx](<file:///c:/Projects/hired-work/src/app/(dashboard)/settings/page.tsx>)

Based on `dashboard-setting-page`:

- Company profile section
- Account settings
- Notification preferences
- Billing (if applicable)

---

## Phase 5: Testing & Polish

**Timeline: 1-2 hari**

### 5.1 Responsive Testing

- [ ] Mobile (< 640px)
- [ ] Tablet (768px)
- [ ] Desktop (1024px)
- [ ] Large Desktop (1280px+)

### 5.2 Cross-browser Testing

- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### 5.3 Performance Optimization

- [ ] Image optimization
- [ ] Font loading optimization
- [ ] CSS bundle size check
- [ ] Lighthouse audit

### 5.4 Accessibility

- [ ] Keyboard navigation
- [ ] Color contrast
- [ ] Screen reader compatibility
- [ ] Focus states

---

## Verification Plan

### Automated Testing

```bash
# Run development server
npm run dev

# Build test
npm run build

# Lint check
npm run lint
```

### Visual Testing

- Browser testing untuk semua pages
- Responsive testing dengan DevTools
- Screenshot comparison dengan design files

### Functional Testing

- Navigation links
- Form submissions
- API integrations
- Authentication flow

---

## Risk Assessment

| Risk                                         | Impact | Mitigation                                       |
| -------------------------------------------- | ------ | ------------------------------------------------ |
| Breaking changes pada existing functionality | High   | Test setiap page sebelum merge                   |
| CSS conflicts dengan shadcn components       | Medium | Use specific class names, avoid global overrides |
| Performance regression dari glassmorphism    | Medium | Limit blur effects, optimize animations          |
| Browser compatibility issues                 | Low    | Use vendor prefixes, test early                  |

---

## Dependencies & Prerequisites

### Fonts (add to `layout.tsx` or `globals.css`)

```html
<!-- Google Fonts: Manrope -->
<link
  href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
  rel="stylesheet"
/>

<!-- Material Symbols -->
<link
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
  rel="stylesheet"
/>
```

### NPM Packages (if needed)

- No additional packages required
- Existing tailwindcss-animate plugin is sufficient

---

## Timeline Summary

| Phase   | Duration | Description               |
| ------- | -------- | ------------------------- |
| Phase 0 | 0.5 day  | Preparation & Analysis ✅ |
| Phase 1 | 1-2 days | Design System Foundation  |
| Phase 2 | 2-3 days | Shared Components         |
| Phase 3 | 4-5 days | Public Pages Redesign     |
| Phase 4 | 3-4 days | Dashboard Redesign        |
| Phase 5 | 1-2 days | Testing & Polish          |

**Total Estimated Time: 12-17 days**

---

## Notes

> [!IMPORTANT]
> Dashboard sidebar items "Candidates" dan "Interviews" **tidak memiliki design files**. Items ini harus di-hide atau di-exclude dari sidebar sampai designs tersedia.

> [!NOTE]
> Semua designs menggunakan **dark mode**. Class `dark` harus diterapkan pada root `<html>` element.

> [!TIP]
> Untuk responsive layouts, gunakan breakpoints: `md` (768px) dan `lg` (1024px) sesuai dengan design reference.
