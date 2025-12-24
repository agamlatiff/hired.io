# Developer Handoff Guide

> Quick start guide untuk developer yang mau lanjutin project ini

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (Supabase)
- Git

### Setup

```bash
# Clone & install
git clone <repo>
cd hired-work
npm install

# Setup environment
cp .env.example .env
# Edit .env dengan database credentials

# Run migrations
npx prisma migrate dev
npx prisma generate

# Start dev server
npm run dev
```

### Access

- **Dev**: http://localhost:3000
- **Login**: Use registered company email/password
- **Dashboard**: http://localhost:3000/dashboard

---

## 📁 Project Structure

```
hired-work/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── src/
│   ├── app/
│   │   ├── (landing-page)/   # Public pages
│   │   ├── dashboard/        # Admin dashboard (NEW)
│   │   ├── (dashboard)/      # OLD - to be deleted
│   │   └── api/              # API routes
│   ├── components/
│   │   ├── dashboard/        # Dashboard components
│   │   ├── page/             # Landing components
│   │   └── ui/               # shadcn/ui
│   └── lib/
│       ├── auth.ts           # NextAuth config
│       └── prisma.ts         # Prisma client
└── context-engineering/      # Documentation
```

---

## 🔑 Key Files

### Database

- `prisma/schema.prisma` - All models & relations
- Check models: Job, Applicant, User, Company, Activity, JobView, Notification

### Authentication

- `src/lib/auth.ts` - NextAuth configuration
- `src/app/api/auth/[...nextauth]/route.ts` - Auth handlers

### Main Pages

- `src/app/dashboard/page.tsx` - Main dashboard with stats
- `src/app/dashboard/jobs/page.tsx` - Job listings
- `src/app/dashboard/post-job/page.tsx` - Create job (needs API wiring)

### APIs (All in `src/app/api/`)

- `dashboard/stats/route.ts` - Dashboard statistics
- `dashboard/activity/route.ts` - Activity feed
- `job/[id]/route.ts` - Job CRUD
- `jobs/[id]/applicants/route.ts` - Get applicants
- `applicants/[id]/route.ts` - Applicant operations

---

## ✅ What's Working

### Database

- ✅ Schema with 21+ fields
- ✅ Relations configured
- ✅ Migrations applied
- ✅ Analytics models ready

### Backend

- ✅ 6 API endpoints functional
- ✅ Authentication on protected routes
- ✅ Activity logging system
- ✅ Error handling

### Frontend

- ✅ Dashboard shows real data
- ✅ Job listings from database
- ✅ Search & filter working
- ✅ Loading states

---

## ❌ What Needs Work

### Critical (MVP)

1. **Job Detail Admin** (`/dashboard/jobs/[id]`)

   - Currently shows hardcoded data
   - Needs API integration
   - File: `src/app/dashboard/jobs/[id]/page.tsx`

2. **Post Job Form** (`/dashboard/post-job`)

   - API is ready
   - Form not connected
   - Needs: form state, validation, submit handler

3. **File Upload**

   - No Supabase integration yet
   - Needed for: resume, company logo
   - Setup: Supabase storage bucket

4. **User Auth**

   - Only company login works
   - Job seekers can't login/apply
   - Update: `src/lib/auth.ts`

5. **Route Cleanup**
   - Duplicate dashboard folders
   - Delete: `src/app/(dashboard)/`
   - Update links to `/dashboard/*`

---

## 🛠 Next Steps Guide

### Step 1: Job Detail Integration

```typescript
// File: src/app/dashboard/jobs/[id]/page.tsx
// 1. Add useEffect to fetch job & applicants
// 2. Replace hardcoded data with state
// 3. Add loading/error states
```

### Step 2: Connect Post Job Form

```typescript
// File: src/app/dashboard/post-job/page.tsx
// 1. Add form state management
// 2. Add onSubmit handler
// 3. Call POST /api/job
// 4. Redirect on success
```

### Step 3: File Upload

```bash
# 1. Setup Supabase bucket
# 2. Add upload helper in src/lib/supabase.ts
# 3. Update Apply form to upload resume
```

### Step 4: User Authentication

```typescript
// File: src/lib/auth.ts
// 1. Extend CredentialsProvider to support User model
// 2. Add role to session
// 3. Role-based redirects
```

---

## 🐛 Known Issues

1. **Prisma Warnings** - "url property deprecated"

   - Non-blocking, project uses Prisma 5.x
   - Ignore for now

2. **Duplicate Routes**

   - Both `(dashboard)` and `dashboard` exist
   - Use `dashboard/*` only
   - Delete `(dashboard)` when ready

3. **Hardcoded Data**
   - Job detail admin page
   - Settings page
   - Post job form (no submit)

---

## 📚 Documentation

All docs in `context-engineering/`:

- `00-OVERVIEW.md` - Start here
- `02-DATABASE.md` - Database schema
- `04-API-ENDPOINTS.md` - API reference
- `10-GAP-ANALYSIS.md` - What's missing
- `11-TASKS.md` - Task breakdown
- `12-IMPLEMENTATION-SUMMARY.md` - What's done

---

## 🎯 Quick Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run lint             # Run ESLint

# Database
npx prisma studio        # Open database GUI
npx prisma migrate dev   # Create new migration
npx prisma generate      # Generate Prisma client
npx prisma db seed       # Seed database

# Git
git pull origin main     # Pull latest
git add -A               # Stage all
git commit -m "msg"      # Commit
git push                 # Push
```

---

## 💡 Tips

1. **Check Build** - Run `npm run build` before committing
2. **Use Types** - Prisma generates types automatically
3. **Session** - Access via `getServerSession(authOptions)`
4. **API Auth** - All API routes need auth check
5. **Activity Log** - Create activity on major actions

---

## 📞 Need Help?

1. Check documentation in `context-engineering/`
2. Review completed APIs for patterns
3. Check `11-TASKS.md` for specific tasks
4. Review `10-GAP-ANALYSIS.md` for missing features

**Happy coding!** 🚀
