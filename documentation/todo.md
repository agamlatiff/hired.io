# todo.md - hired.io Restructuring Plan

> Dokumen audit lengkap untuk merombak hired.io dari segi fungsionalitas, clean code, dan arsitektur.

---

## Status Hasil Audit (2025-12-28)

| Aspek                       | Temuan                          | Severity    |
| --------------------------- | ------------------------------- | ----------- |
| **Broken Pages**            | `/salaries` (404 di Navbar)     | 🔴 Critical |
| **Non-Functional Features** | 6+ fitur cuma pajangan          | 🔴 Critical |
| **Dummy Data**              | Hardcoded values di beberapa UI | 🟡 Medium   |
| **Missing Tests**           | 0 test files exist              | 🟡 Medium   |
| **Architecture**            | Mostly clean, data layer exists | 🟢 Good     |

---

## Priority 0: Deep Scan Findings (2025-12-28) 🔴

> Hasil scanning mendalam yang menemukan issue-issue baru.

### 0.1 DUPLICATE Auth Pages!

**Ada 2 versi signin page yang berbeda:**

| Path                                    | Fitur                                                                       | Status          |
| --------------------------------------- | --------------------------------------------------------------------------- | --------------- |
| `(auth)/auth/signin/page.tsx`           | Login switcher (company/user), Forgot Password → `/auth/forgot-password` ✅ | **AKTIF**       |
| `(landing-page)/(auth)/signin/page.tsx` | OAuth buttons, Forgot Password → `#` ❌                                     | **DEPRECATED?** |

**Issues di `(landing-page)/(auth)/signin`:**

- [x] Line 98: `href="#"` - Forgot Password button points to `#` not `/auth/forgot-password` ✅ FIXED
- [x] Lines 150-177: OAuth buttons (Google/GitHub) - ✅ DELETED (deprecated page removed)

**Todo:**

- [x] Tentukan mana yang primary signin page → `(auth)/auth/signin` is primary
- [x] Delete atau merge yang deprecated → DELETED `(landing-page)/(auth)/signin`
- [x] Jika keep both, fix the `#` link dan implement OAuth → N/A (deleted)

---

### 0.2 DashboardSidebar Hardcoded Company

**File:** `src/components/dashboard/DashboardSidebar.tsx`

| Line | Hardcoded Value |
| ---- | --------------- |
| 146  | `TC` (initials) |
| 149  | `TechCorp Inc.` |
| 150  | `Pro Plan`      |

**Current Code (Line 143-156):**

```tsx
// This should fetch real company data!
<div className="w-10 h-10 rounded-full... font-bold">
  TC  // ❌ Hardcoded
</div>
<div>
  <p className="...">TechCorp Inc.</p>  // ❌ Hardcoded
  <p className="...">Pro Plan</p>  // ❌ Hardcoded
</div>
```

**Todo:**

- [x] Fetch company data via API or session
- [x] Display real company name dan plan

---

### 0.3 HeroSection Static Stats

**File:** `src/components/page/HeroSection.tsx`

| Line | Hardcoded Value                      |
| ---- | ------------------------------------ |
| 42   | `Over 500+ new dev jobs added today` |

**Todo:**

- [x] Fetch real job count dari database
- [x] **Atau:** Hapus badge jika tidak akurat (Changed to generic "New dev jobs added daily")

---

### 0.4 Console.log Statements (9 found)

**Should be removed for production:**

| File                      | Line  | Context                       |
| ------------------------- | ----- | ----------------------------- |
| `SocialMediaForm.tsx`     | 70    | Error handler                 |
| `OverviewForm.tsx`        | 114   | Error handler                 |
| `FormModalApply.tsx`      | 84    | Error handler                 |
| `DialogAddTeam.tsx`       | 67    | Error handler                 |
| `reset-password/route.ts` | 54-57 | **DEV ONLY: logs reset link** |
| `signup/page.tsx`         | 58    | Error handler                 |

**Todo:**

- [x] Replace dengan proper error logging service
- [x] Remove dev console.logs before production

---

### 0.5 TODO Comment in Code

**File:** `src/app/api/auth/reset-password/route.ts`

- Line 59: `// TODO: Implement actual email sending here using the resetLink`

**Status:** Password reset link dikirim ke console, bukan email!

---

### 0.6 Unused/Duplicate Hooks

**Potentially unused hooks in `src/hooks/`:**

| Hook                           | API Used    | Possibly Unused? |
| ------------------------------ | ----------- | ---------------- |
| `useCategoryCompanyFilter.tsx` | -           | Check usage      |
| `useCategoryJobFilter.tsx`     | -           | Check usage      |
| `useFeaturedJobs.tsx`          | `/api/jobs` | Check usage      |

**Todo:**

- [x] Search codebase for usage → `useFeaturedJobs` is used, other 2 are unused
- [x] Delete if truly unused → DELETED `useCategoryCompanyFilter.tsx` and `useCategoryJobFilter.tsx`

---

### 0.7 🔴 CRITICAL BUG: OverviewForm.tsx Wrong Dropdown Data!

**File:** `src/components/dashboard/OverviewForm.tsx`

**BUG: Dropdowns menampilkan data yang SALAH:**

| Field    | Line | Harusnya            | Tapi Pakai               |
| -------- | ---- | ------------------- | ------------------------ |
| Location | 191  | `LOCATION_OPTIONS`  | `Industry` data dari API |
| Employee | 224  | `EMPLOYEE_OPTIONS`  | `LOCATION_OPTIONS` ❌    |
| Industry | 257  | `Industry` API data | `EMPLOYEE_OPTIONS` ❌    |

**Impact:** User akan melihat pilihan yang tidak masuk akal!

**Dead Links (3x):**

- Line 200: `href="/examples/forms"` → 404
- Line 235: `href="/examples/forms"` → 404
- Line 268: `href="/examples/forms"` → 404

**Todo:**

- [x] Fix dropdown: Employee → gunakan `EMPLOYEE_OPTIONS`
- [x] Fix dropdown: Industry → gunakan `data` dari API
- [x] Fix dropdown: Location → gunakan `LOCATION_OPTIONS`
- [x] Remove `/examples/forms` links

---

### 0.8 Type Safety Issues (50+ `any` types)

**Files dengan banyak `any`:**

| File                       | Count | Priority |
| -------------------------- | ----- | -------- |
| `utils.ts`                 | 13    | Medium   |
| `helpers.ts`               | 7     | Medium   |
| `InputBenefits.tsx`        | 5     | Low      |
| `InputSkills.tsx`          | 3     | Low      |
| `CKEditor.tsx`             | 3     | Low      |
| `Applicants.tsx`           | 2     | Low      |
| `ExploreDataContainer.tsx` | 5     | Low      |

**Todo:**

- [x] Replace `any` dengan proper types (created `src/lib/types.ts` with shared interfaces)
- [x] Create shared interfaces untuk common data shapes (Benefit, Company, Job, Applicant, etc.)

---

### 0.9 Dead Links (`href="#"`) - 9 Found!

**Files dengan dead links:**

| File                                    | Line           | Link Text            |
| --------------------------------------- | -------------- | -------------------- |
| `(auth)/auth/signup/page.tsx`           | 220            | Terms of Service     |
| `(auth)/auth/signup/page.tsx`           | 221            | Privacy Policy       |
| `apply/page.tsx`                        | 650            | Terms of Service     |
| `apply/page.tsx`                        | 654            | Privacy Policy       |
| `(landing-page)/(auth)/layout.tsx`      | 45, 84, 87, 90 | Various footer links |
| `(landing-page)/(auth)/signin/page.tsx` | 98             | Forgot Password      |

**Todo:**

- [x] Buat halaman `/terms` dan `/privacy` atau remove links (Links now point to /terms and /privacy)
- [x] Fix Forgot Password link → `/auth/forgot-password`
- [x] Clean up auth layout dead links

---

### 0.10 Password & Schema Issues

**Password Length:**

- Reset password: 6 character minimum (weak)
- Sign up schema: No minimum length requirement ❌

**Social Media Schema Too Strict:**

- `socialMediaFormSchema` requires ALL fields (facebook, instagram, linkedin, twitter, youtube)
- Most companies won't have all these filled

**Todo:**

- [x] Add password strength validation to signup (min 8 chars, etc.)
- [x] Make social media fields optional in schema

---

### 0.11 Environment Variable Mismatch 🟡

**Issue:** Inconsistent naming for Supabase Anon Key.

| File                          | Variable Used                     |
| ----------------------------- | --------------------------------- |
| `src/lib/supabase.ts`         | `NEXT_PUBLIC_SUPABASE_PUBLIC_KEY` |
| `src/lib/supabase-storage.ts` | `NEXT_PUBLIC_SUPABASE_ANON_KEY`   |

**Impact:** Application might crash if `.env` doesn't have BOTH variables set to the same value.

**Todo:**

- [x] Standardize to `NEXT_PUBLIC_SUPABASE_PUBLIC_KEY`
- [x] Update `supabase-storage.ts`

---

## Priority 1: Broken Pages & Dead Links 🔴

### 1.1 Salaries Page (TIDAK ADA!)

**Problem:** Navbar punya link ke `/salaries` tapi halaman tidak exist → 404 error.

| File                             | Line | Isu                                        |
| -------------------------------- | ---- | ------------------------------------------ |
| `src/components/page/Navbar.tsx` | ~13  | `{ href: "/salaries", label: "Salaries" }` |

**Solusi (Pilih salah satu):**

- [x] **Option A:** Buat halaman `/salaries` dengan fitur salary explorer
- [ ] **Option B:** Hapus link dari Navbar (sementara)

**Jika pilih Option A (Recommended):**

```
src/app/(landing-page)/(page)/salaries/
├── page.tsx         - Main salaries page
└── SalariesClient.tsx - Client component
```

**Fitur yang bisa diimplementasikan:**

- Salary range by job title
- Filter by location/experience
- Data dari existing jobs (aggregate salaryFrom/salaryTo)

---

## Priority 2: Settings Page - Fitur Pajangan 🔴

**File:** `src/app/dashboard/settings/page.tsx` (604 lines)

### 2.1 Tabs yang Tidak Functional

| Tab                | Status                  | Backend?               |
| ------------------ | ----------------------- | ---------------------- |
| Company Profile    | ✅ Works                | `/api/company/profile` |
| Team Members       | ✅ Works (display only) | From CompanyTeam       |
| **Notifications**  | ❌ PAJANGAN             | No API                 |
| **Billing & Plan** | ❌ PAJANGAN             | No API                 |
| **Security**       | ❌ PAJANGAN             | No API                 |
| **Integrations**   | ❌ PAJANGAN             | No API                 |

### 2.2 Hardcoded/Dummy Values

| Item         | Location     | Hardcoded Value           | Status                   |
| ------------ | ------------ | ------------------------- | ------------------------ |
| Storage Used | Line 249-258 | "75%", "15.2 GB of 20 GB" | ✅ REMOVED               |
| Plan Pricing | Line 563     | "$299/month"              | ✅ Dynamic based on plan |

### 2.3 Todo: Implementasi Settings Tabs

#### 2.3.1 Notifications Tab

- [x] Buat model `NotificationPreference` di Prisma
- [x] Buat API `GET/PATCH /api/company/notification-preferences`
- [x] Connect toggle switches ke API
- [x] Simpan preferensi ke database (need `prisma db push`) → DONE

#### 2.3.2 Billing & Plan Tab - ❌ DELETED

~~- [ ] Integrate dengan payment provider Midtrans~~
~~- [ ] Buat halaman upgrade plan~~
~~- [ ] Invoice history dari database~~

- [x] **Atau:** Hapus tab ini jika tidak akan diimplementasi → DELETED

#### 2.3.3 Security Tab

- [x] Change password functionality
- [ ] Two-factor authentication (optional)
- [ ] Session management
- [x] **Minimum:** Implement change password

#### 2.3.4 Integrations Tab - ❌ DELETED

~~- [ ] Define what integrations to support~~
~~- [ ] ATS integrations? Slack? Calendar?~~

- [x] **Atau:** Hapus tab ini jika tidak akan diimplementasi → DELETED

#### 2.3.5 Invite Member Button

- [x] Button "Invite Member" tidak functional (line 438-441) → Connected
- [x] Buat modal invite flow

---

## Priority 3: Fitur Pajangan Lainnya 🟡 - ✅ DONE

### 3.1 Dashboard Header Buttons

**File:** `src/app/dashboard/settings/page.tsx`

| Button             | Status                             |
| ------------------ | ---------------------------------- |
| Notifications Bell | ✅ Now using NotificationsDropdown |
| Support Button     | ✅ DELETED                         |

**Todo:**

- [x] Notification bell → sudah ada `NotificationsDropdown` di dashboard utama, reuse komponen ini
- [x] Support button → Link ke email/form atau hapus → DELETED

### 3.2 Upgrade Plan / Manage Buttons - ✅ DELETED

~~- "Upgrade Plan" button → tidak ada action~~
~~- "Manage" button → tidak ada action~~
~~- "Download Invoices" link → tidak ada action~~

- [x] Implement atau hapus buttons ini → DELETED with Billing section

### 3.3 Delete Account - ✅ DELETED

~~- Button ada tapi tidak functional~~

- [x] **Atau:** Hapus jika tidak akan diimplementasi → DELETED

---

## Priority 4: Email Notifications (Dari todo.md lama) 🟡

### 4.1 Task 2.3 - Belum Selesai

- [ ] Setup email service (Resend/SendGrid)
- [ ] Create email templates:
  - Application confirmation (to applicant)
  - New application alert (to company)
  - Status update notification
- [ ] Send emails on relevant events

**Dependencies:**

- Resend API Key atau SendGrid API Key

---

## Priority 5: Testing Infrastructure 🟡

### 5.1 Status: TIDAK ADA TEST SAMA SEKALI

**Temuan:**

- 0 `.spec.ts` files
- 0 test configuration
- No Playwright, no Vitest, no Jest

### 5.2 Todo: Setup Testing

#### 5.2.1 E2E Tests (Playwright)

- [ ] Install Playwright: `npm install -D @playwright/test`
- [ ] Buat `playwright.config.ts`
- [ ] Test files to create:
  - `tests/e2e/auth.spec.ts` - Login/register flows
  - `tests/e2e/apply-job.spec.ts` - Apply to job flow
  - `tests/e2e/post-job.spec.ts` - Post job flow

#### 5.2.2 API Tests

- [ ] `tests/api/dashboard.spec.ts`
- [ ] `tests/api/jobs.spec.ts`

---

## Priority 6: OAuth Providers (Task 2.4) 🟢

**Status:** Optional, belum dikerjakan

- [ ] Setup Google OAuth
- [ ] Setup GitHub OAuth
- [ ] Link OAuth accounts to existing users

**Dependencies:**

- Google OAuth credentials
- GitHub OAuth credentials

---

## Priority 7: Analytics Export (Task 3.3) 🟢

**Status:** Partial - analytics page works, export tidak

- [ ] Export reports to PDF/Excel
- [ ] Buat API `/api/company/analytics/export`
- [ ] Support format: PDF, Excel, CSV

---

## Priority 8: Code Quality & Architecture 🟢

### 8.1 Status: SUDAH BAIK

**Positif:**

- ✅ Data layer exists (`src/data/`)
- ✅ Prisma schema well-structured (270 lines, 17 models)
- ✅ API routes properly organized
- ✅ Type safety mostly implemented
- ✅ Middleware for auth exists

### 8.2 Minor Improvements

- [ ] Remove duplicate in todo.md (4.4 dan 4.7 sama)
- [ ] `FindJobsClient.tsx` terlalu besar (631 lines) - bisa di-split

---

## Halaman yang Sudah Functional ✅

### Landing Pages

| Page           | Path                     | Status                                                           |
| -------------- | ------------------------ | ---------------------------------------------------------------- |
| Homepage       | `/`                      | ✅ Real data via `getCompanies`, `getJobs`, `getTechStackCounts` |
| Find Jobs      | `/find-jobs`             | ✅ Real data + filtering                                         |
| Find Companies | `/find-companies`        | ✅ Real data                                                     |
| Job Detail     | `/detail/job/[id]`       | ✅ Real data                                                     |
| Company Detail | `/detail/company/[id]`   | ✅ Real data                                                     |
| Apply Job      | `/detail/job/[id]/apply` | ✅ Works                                                         |

### Dashboard (Company)

| Page       | Path                    | Status                      |
| ---------- | ----------------------- | --------------------------- |
| Overview   | `/dashboard`            | ✅ Real data via API        |
| Jobs List  | `/dashboard/jobs`       | ✅ Real data                |
| Job Detail | `/dashboard/jobs/[id]`  | ✅ Real data                |
| Post Job   | `/dashboard/post-job`   | ✅ Works                    |
| Analytics  | `/dashboard/analytics`  | ✅ Real data                |
| Activity   | `/dashboard/activity`   | ✅ Real data                |
| Messages   | `/dashboard/messages`   | ✅ Real data + send works   |
| Interviews | `/dashboard/interviews` | ✅ Real data                |
| Settings   | `/dashboard/settings`   | ⚠️ Partial (see Priority 2) |

### Dashboard (User/Job Seeker)

| Page         | Path                           | Status       |
| ------------ | ------------------------------ | ------------ |
| Overview     | `/dashboard/user`              | ✅ Real data |
| Profile      | `/dashboard/user/profile`      | ✅ Works     |
| Applications | `/dashboard/user/applications` | ✅ Real data |
| Saved Jobs   | `/dashboard/user/saved-jobs`   | ✅ Real data |
| Alerts       | `/dashboard/user/alerts`       | ✅ Works     |
| Messages     | `/dashboard/user/messages`     | ✅ Works     |
| Interviews   | `/dashboard/user/interviews`   | ✅ Real data |

### Auth

| Page            | Path                    | Status   |
| --------------- | ----------------------- | -------- |
| Sign In         | `/auth/signin`          | ✅ Works |
| Sign Up         | `/auth/signup`          | ✅ Works |
| Forgot Password | `/auth/forgot-password` | ✅ Works |
| Reset Password  | `/auth/reset-password`  | ✅ Works |

---

## API Endpoints Summary

| Folder               | Count | Status                                                               |
| -------------------- | ----- | -------------------------------------------------------------------- |
| `/api/applicants`    | 1     | ✅                                                                   |
| `/api/auth`          | 2     | ✅                                                                   |
| `/api/companies`     | 2     | ✅                                                                   |
| `/api/company`       | 11    | ✅ (analytics, export, interviews, messages, profile, etc.)          |
| `/api/dashboard`     | 3     | ✅ (stats, activity, chart)                                          |
| `/api/job`           | 4     | ✅                                                                   |
| `/api/jobs`          | 7     | ✅                                                                   |
| `/api/notifications` | 1     | ✅                                                                   |
| `/api/upload`        | 1     | ✅                                                                   |
| `/api/user`          | 8     | ✅ (applications, alerts, interviews, messages, profile, saved-jobs) |

**Total: ~40 API routes** ✅

---

## Kesimpulan & Prioritas

### HARUS DIKERJAKAN (Blocking Issues)

1. **Fix `/salaries` link** - Users akan kena 404
2. **Settings Notifications toggle** - Currently does nothing
3. **Settings buttons** - Multiple non-functional buttons

### SEBAIKNYA DIKERJAKAN

4. **Setup testing** - No safety net for refactoring
5. **Email notifications** - Expected feature for job platform
6. **Security settings** - At minimum: change password

### OPSIONAL

7. **OAuth providers** - Nice to have
8. **Analytics export** - Nice to have
9. **Full billing integration** - Complex, maybe not needed for MVP

---

## Quick Reference

### Development Commands

```bash
# Start development
npm run dev

# Database
npx prisma studio        # Open database GUI
npx prisma migrate dev   # Create migration
npx prisma generate      # Generate client
npx prisma db seed       # Seed database

# Build & verify
npm run build
npm run lint
```

### Key Files

| Purpose              | File                                  |
| -------------------- | ------------------------------------- |
| Database schema      | `prisma/schema.prisma`                |
| Auth config          | `src/lib/auth.ts`                     |
| Main dashboard       | `src/app/dashboard/page.tsx`          |
| Navbar (broken link) | `src/components/page/Navbar.tsx`      |
| Settings (pajangan)  | `src/app/dashboard/settings/page.tsx` |
| Data services        | `src/data/`                           |

### Login Credentials (Seeded)

| Role    | Email                  | Password    |
| ------- | ---------------------- | ----------- |
| Company | hr@gojektech.co.id     | admin123    |
| Company | careers@tokopedia.com  | password123 |
| User    | budi.santoso@gmail.com | password123 |

---

_Last Updated: 2025-12-28_
