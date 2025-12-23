# 05 - Components

## Component Categories

### 1. Dashboard Components (`src/components/dashboard/`)

| Component              | Description                        |
| ---------------------- | ---------------------------------- |
| `DashboardSidebar.tsx` | Fixed sidebar with navigation menu |
| `Header.tsx`           | Dashboard header with breadcrumbs  |
| `OverviewForm.tsx`     | Company overview edit form         |
| `SocialMediaForm.tsx`  | Social media links form            |
| `TeamForm.tsx`         | Team member management form        |

---

### 2. Landing Page Components (`src/components/page/`)

| Component         | Description                   |
| ----------------- | ----------------------------- |
| `Navbar.tsx`      | Floating glassmorphism navbar |
| `Footer.tsx`      | Multi-column site footer      |
| `JobCard.tsx`     | Pill-shaped job listing card  |
| `CompanyCard.tsx` | Company profile card          |
| `SearchBar.tsx`   | Hero search component         |

---

### 3. UI Components (`src/components/ui/`)

#### shadcn/ui Components

- `button.tsx` - Button variants
- `input.tsx` - Input field
- `select.tsx` - Select dropdown
- `dialog.tsx` - Modal dialogs
- `toast.tsx` - Toast notifications
- `separator.tsx` - Divider line
- `tabs.tsx` - Tab navigation

#### Custom Components

| Component          | Description                  |
| ------------------ | ---------------------------- |
| `GlassPanel.tsx`   | Glassmorphism container      |
| `GlowButton.tsx`   | Button with neon glow effect |
| `TechBadge.tsx`    | Technology stack badge       |
| `MaterialIcon.tsx` | Material Symbols wrapper     |

---

## Component Patterns

### Glass Panel Usage

```tsx
<div className="glass-panel p-8 rounded-2xl">{/* Content */}</div>
```

### Glow Button Usage

```tsx
<button className="bg-neon-green hover:bg-[#3cd612] text-background-dark font-bold px-6 py-3 rounded-full shadow-[0_0_20px_rgba(73,230,25,0.2)]">
  Submit
</button>
```

### Material Icons Usage

```tsx
<span className="material-symbols-outlined">search</span>
```
