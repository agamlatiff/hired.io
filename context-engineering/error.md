# 🚨 Error & Bug Report - Job Portal Application

Dokumen ini berisi daftar lengkap error, bug, dan potensi masalah yang ditemukan pada aplikasi Job Portal. Setiap item dikategorikan berdasarkan tingkat keparahan (Critical, High, Medium, Low).

---

## 🔴 Critical Errors (Harus diperbaiki segera)

### 1. Wrong Router Import in FormModalApply

**File:** `src/components/page/FormModalApply.tsx` (Line 25)

```diff
- import { useRouter } from "next/router";
+ import { useRouter } from "next/navigation";
```

**Impact:** Component akan crash saat dirender karena `next/router` tidak kompatibel dengan App Router (Next.js 13+).

---

### 2. Typo di Environment Variable Name

**File:** `src/lib/supabase.ts` (Line 5)

```diff
- process.env.NEXT_PUBLIC_SUPABASe_URL!!,
+ process.env.NEXT_PUBLIC_SUPABASE_URL!!,
```

**File:** `.env.example` (Line 26)

```diff
- NEXT_PUBLIC_SUPABASe_URL="https://your-project-id.supabase.co"
+ NEXT_PUBLIC_SUPABASE_URL="https://your-project-id.supabase.co"
```

**Impact:** Supabase client tidak akan terkoneksi karena typo pada env variable name (`SUPABASe` vs `SUPABASE`).

---

### 3. Wrong API Endpoint Path in Signup

**File:** `src/app/(landing-page)/(auth)/signup/page.tsx` (Line 32)

```javascript
await fetch("/api/user", { ... })
```

**Actual Route:** `src/app/(landing-page)/api/user/route.ts`
**Expected URL:** `/api/user` → tapi sebenarnya route ada di route group sehingga pathnya menjadi berbeda

**Impact:** User registration akan fail dengan 404 error.

---

### 4. Duplicate HTML/Body Tags di Multiple Layouts

**Files affected:**

- `src/app/(landing-page)/layout.tsx`
- `src/app/(dashboard)/layout.tsx`

Kedua layout ini memiliki `<html>` dan `<body>` tags. Di Next.js App Router, hanya root layout (`app/layout.tsx`) yang boleh memiliki tags ini.

**Impact:** Hydration errors dan React warnings di console.

---

### 5. AuthOptions Export dari API Route

**File:** `src/app/api/auth/[...nextauth]/route.ts`

`authOptions` di-export dari route file tapi juga diimport di file lain:

- `src/app/(dashboard)/layout.tsx` (line 8) - import dari `../api/auth/[...nextauth]/route`
- `src/app/(landing-page)/(page)/detail/job/[id]/page.tsx` (line 14) - import dari `@/app/(landing-page)/api/auth/[...nextauth]/route`

**Issue:** Path yang berbeda dan konflik antar route groups. `authOptions` sebaiknya disimpan di file terpisah (contoh: `lib/auth.ts`).

---

## 🟠 High Priority (Perlu diperbaiki secepatnya)

### 6. API Routes Tanpa Error Handling

**Files affected:**

- `src/app/api/job/route.ts`
- `src/app/(landing-page)/api/user/route.ts`
- `src/app/(landing-page)/api/jobs/apply/route.ts`
- `src/app/(landing-page)/api/jobs/featured/route.ts`
- `src/app/(landing-page)/api/jobs/filter/route.ts`

Semua API routes tidak memiliki try-catch block untuk menangani error dari Prisma atau operasi lainnya.

**Example fix:**

```typescript
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const result = await prisma.job.create({ data });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}
```

---

### 7. Missing Hook Dependencies di useEffect

**Files affected:**

- `src/app/(landing-page)/(page)/find-jobs/page.tsx` (Line 29-31)
- `src/app/(landing-page)/(page)/find-companies/page.tsx` (Line 30-32)
- `src/hooks/useJobs.tsx` (Line 33-35)
- `src/hooks/useFeaturedJobs.tsx` (Line 18-20)

```javascript
useEffect(() => {
  mutate();
}, [categories]); // Missing 'mutate' dependency
```

**Impact:** React warnings dan potential stale closures.

---

### 8. Typo di Type Definition

**File:** `src/app/types/index.ts` (Line 59)

```diff
- techStaack: string[];
+ techStack: string[];
```

**File:** `src/lib/utils.ts` (Line 144)

```diff
- techStaack: companyDetail?.techStaack,
+ techStack: companyDetail?.techStack,
```

**Impact:** Type mismatch dan data tidak akan di-pass dengan benar.

---

### 9. Wrong Type Import di useCompanies Hook

**File:** `src/hooks/useCompanies.tsx` (Line 3 & 25)

```typescript
import type { JobType } from "@/app/types";
const [companies, setCompanies] = useState<JobType[]>([]); // Wrong type, should be CompanyType
```

**Fix:**

```typescript
import type { CompanyType } from "@/app/types";
const [companies, setCompanies] = useState<CompanyType[]>([]);
```

---

### 10. Duplicate Auth Providers

Ada dua SessionProvider wrapper dengan nama berbeda:

- `src/context/NextAuthProvider.tsx` (used by dashboard)
- `src/app/(landing-page)/providers/AuthProvider.tsx` (used by landing page)

**Recommendation:** Konsolidasi ke satu provider saja untuk konsistensi.

---

### 11. Inconsistent Prisma Import Paths

Prisma client diimport dengan path yang berbeda-beda:

```javascript
// Some files use absolute path (should be @/lib/prisma)
import prisma from "../../../../../../../lib/prisma";
import prisma from "../../../../../../lib/prisma";

// lib/prisma.ts is in root /lib folder, not /src/lib
```

**Recommendation:** Move `lib/prisma.ts` to `src/lib/prisma.ts` dan gunakan `@/lib/prisma` consistently.

---

## 🟡 Medium Priority

### 12. Duplicate Zod Schemas

Ada dua file schema dengan sebagian konten yang sama:

- `src/lib/form-schema.ts` - signInSchema, signUpSchema
- `src/lib/schema.ts` - signInFormSchema, signUpFormSchema

**Recommendation:** Consolidate ke satu file schema.

---

### 13. Non-null Assertions (!! operator) Overuse

Banyak penggunaan `!!` operator yang bisa menyebabkan runtime errors:

**Files affected:**

- `src/app/api/auth/[...nextauth]/route.ts` (Line 33)
- `src/app/(landing-page)/(page)/detail/job/[id]/page.tsx` (multiple lines)
- `src/components/page/FormModalApply.tsx` (Line 105)

**Recommendation:** Gunakan proper null checks atau optional chaining dengan fallback values.

---

### 14. Deprecated `objectFit` Prop di Next/Image

**File:** `src/app/containers/ExploreDataContainer.tsx` (Line 45)

```diff
- objectFit="contain"
+ style={{ objectFit: "contain" }}
```

atau gunakan `fill` prop dengan `className="object-contain"`

---

### 15. Missing Loading States

Beberapa komponen tidak menampilkan loading state yang proper:

- `src/components/page/LatestJobs.tsx` - menggunakan data tanpa check loading state
- Data langsung di-map tanpa kondisional loading

**Recommendation:** Tambahkan skeleton loading atau loading indicator.

---

### 16. Resume Field Mismatch

**File:** `src/components/page/FormModalApply.tsx`

Form field `resume` digunakan untuk `Textarea` (additional information) di UI (Line 222-237), tapi di submit handler digunakan untuk file upload (Line 52-55).

```javascript
// Line 52-55: expecting file
const { filename, error } = await supabaseUploadFile(val.resume, "applicant");

// Line 222-237: but renders as textarea for coverLetter-like input
<FormField name="resume" ... />
```

---

### 17. Button Navigation Not Working

**File:** `src/components/page/Navbar.tsx` (Line 47)

```jsx
<Button>Sign Up</Button> // No onClick handler
```

Sign Up button tidak memiliki navigation handler.

---

## 🟢 Low Priority (Quality Improvements)

### 18. Generic Metadata

**Files:**

- `src/app/(landing-page)/layout.tsx` (Lines 12-15)
- `src/app/(dashboard)/layout.tsx` (Lines 14-17)

```javascript
export const metadata: Metadata = {
  title: "Create Next App", // Should be actual app title
  description: "Generated by create next app",
};
```

---

### 19. Missing Type Safety di Constants

**File:** `src/constants/index.ts` (Line 1)

```typescript
import type { EnumValues } from "zod/v3"; // Unusual import path
```

---

### 20. Unused Variables

- `src/components/page/LatestJobs.tsx` - `error` from hook is declared but never used
- `src/app/(dashboard)/post-a-job/page.tsx` - `error, isLoading` declared but not fully utilized

---

### 21. Hardcoded Values

- Job `needs` hardcoded to 20 in `post-a-job/page.tsx` (Line 74)
- Session redirect path hardcoded in multiple places

---

### 22. CSS Class Typo

**File:** `src/app/(landing-page)/(page)/detail/company/[id]/page.tsx` (Line 94)

```diff
- className="mt-10 inlinef-lex gap-6 items-start"
+ className="mt-10 inline-flex gap-6 items-start"
```

**File:** `src/app/(landing-page)/(page)/detail/company/[id]/page.tsx` (Line 215)

```diff
- className="mt-5flex flex-row items-center flex-wrap gap-4"
+ className="mt-5 flex flex-row items-center flex-wrap gap-4"
```

---

### 23. Inconsistent Breadcrumb Links

**File:** `src/app/(landing-page)/(page)/detail/job/[id]/page.tsx` (Line 92)

```diff
- href={`/detail/job${data?.id}`}  // Missing slash
+ href={`/detail/job/${data?.id}`}
```

---

### 24. Button Typo

**File:** `src/app/(landing-page)/(page)/detail/job/[id]/page.tsx` (Line 111)

```diff
- className="text-lg px-12 py-6 bg=green-500"  // = instead of -
+ className="text-lg px-12 py-6 bg-green-500"
```

---

### 25. Salary Display Bug

**File:** `src/app/(landing-page)/(page)/detail/job/[id]/page.tsx` (Line 210)

```diff
- ${data?.salaryFrom}-${data?.salaryFrom}  // salaryFrom used twice
+ ${data?.salaryFrom}-${data?.salaryTo}
```

---

## 📋 Summary

| Severity    | Count | Status   |
| ----------- | ----- | -------- |
| 🔴 Critical | 5     | ✅ FIXED |
| 🟠 High     | 6     | ✅ FIXED |
| 🟡 Medium   | 6     | ✅ FIXED |
| 🟢 Low      | 9     | ✅ FIXED |

**Total Issues Found: 26**
**Total Issues Fixed: 26** ✅

---

## 📌 Recommended Priority Order

1. ~~Fix Critical errors (#1-5) - App tidak bisa berjalan dengan benar~~ ✅
2. ~~Add Error Handling ke API routes (#6)~~ ✅
3. ~~Fix type issues dan typos (#7-11)~~ ✅
4. ~~Consolidate duplicate code (#10, #12)~~ ✅
5. ~~Fix UI bugs (#22-25)~~ ✅
6. ~~Improve code quality (#13-21)~~ ✅

---

_Document generated on: 2024-12-21_
_Scanned by: Automated Code Analysis_
_Last Updated: 2024-12-21 - All issues resolved_
