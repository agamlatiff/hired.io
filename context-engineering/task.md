# Hired.io Redesign - Task Checklist

## Phase 0: Preparation & Analysis

- [x] Review existing documentation
- [x] Analyze current tailwind config dan globals.css
- [x] Map existing components yang perlu di-update
- [x] Identify new components yang perlu dibuat
- [x] Create comprehensive roadmap

---

## Phase 1: Design System Foundation

### 1.1 Tailwind Configuration

- [x] Add custom colors (primary, secondary, background-dark, card-dark, accent-dark)
- [x] Add Manrope font family
- [x] Add custom border radius scale
- [x] Add grid-pattern background image

### 1.2 Global Styles

- [x] Import Manrope font from Google Fonts
- [x] Import Material Symbols Outlined
- [x] Add `.glass-panel` class
- [x] Add `.glow-text` class
- [x] Add `.glow-box` class
- [x] Add `.bg-grid` class
- [x] Add `.input-field` class
- [x] Update dark mode CSS variables

### 1.3 Root Layout

- [x] Add `dark` class to html element
- [x] Add `font-display` to body

---

## Phase 2: Shared Components

### 2.1 Core Components (Update)

- [ ] `Navbar.tsx` - Floating glassmorphism navbar
- [ ] `Footer.tsx` - Multi-column footer
- [ ] `JobCard.tsx` - Pill-shaped job card
- [ ] `CompanyCard.tsx` - Glassmorphism company card

### 2.2 New Shared Components

- [ ] `TechBadge.tsx` - Tech stack badge
- [ ] `SearchBar.tsx` - Hero search with glow
- [ ] `GlassPanel.tsx` - Reusable glassmorphism container
- [ ] `GlowButton.tsx` - Button with glow effect
- [ ] `MaterialIcon.tsx` - Material Symbols wrapper

---

## Phase 3: Public Pages Redesign

### 3.1 Home Page

- [ ] Hero section with animated badge
- [ ] Search bar with glow effect
- [ ] Tech stack chips
- [ ] Top Companies section
- [ ] Featured Jobs section
- [ ] Trending Tech Stacks section

### 3.2 Authentication Pages

- [ ] Login page redesign
- [ ] Register page redesign
- [ ] Add OAuth buttons styling
- [ ] Add password strength indicator

### 3.3 Jobs Pages

- [ ] Jobs listing page with sidebar filters
- [ ] Job detail page with company sidebar
- [ ] Similar jobs section

### 3.4 Companies Pages

- [ ] Companies listing page
- [ ] Company detail page
- [ ] Company jobs section

### 3.5 Application Pages

- [ ] Apply form page (NEW)
- [ ] Success apply page (NEW)

---

## Phase 4: Dashboard Redesign

### 4.1 Dashboard Layout

- [ ] Create `DashboardSidebar.tsx`
- [ ] Update dashboard `layout.tsx`
- [ ] Add sidebar navigation items
- [ ] Hide "Candidates" and "Interviews" (no designs)

### 4.2 Dashboard Components

- [ ] `StatCard.tsx` - Stats cards
- [ ] `ActivityFeed.tsx` - Live activity
- [ ] `TrafficChart.tsx` - Bar chart
- [ ] `FunnelProgress.tsx` - Conversion funnel
- [ ] `JobsTable.tsx` - Active jobs table

### 4.3 Dashboard Pages

- [ ] Dashboard main page
- [ ] Job listings management page
- [ ] Post a job page
- [ ] Settings page

---

## Phase 5: Testing & Polish

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
- [ ] Color contrast check
- [ ] Screen reader compatibility
- [ ] Focus states

---

## Final Checklist

- [ ] All pages match design reference
- [ ] No console errors
- [ ] Build succeeds without warnings
- [ ] Documentation updated
