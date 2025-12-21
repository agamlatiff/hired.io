# 📚 Panduan Belajar: Error & Solusi pada Next.js App Router

Dokumen ini berisi rangkuman error yang ditemukan beserta penjelasan dan cara memperbaikinya. Cocok untuk dipelajari agar tidak mengulangi kesalahan yang sama.

---

## 🎯 Kategori Error

1. [Import & Module Errors](#1-import--module-errors)
2. [Layout & Routing Errors](#2-layout--routing-errors)
3. [Type Safety & TypeScript Errors](#3-type-safety--typescript-errors)
4. [Hook & React Errors](#4-hook--react-errors)
5. [API & Backend Errors](#5-api--backend-errors)
6. [UI & Styling Errors](#6-ui--styling-errors)

---

## 1. Import & Module Errors

### ❌ Wrong Router Import

**Masalah:**

```typescript
import { useRouter } from "next/router"; // ❌ SALAH
```

**Kenapa Salah?**

- `next/router` adalah untuk **Pages Router** (Next.js 12 ke bawah)
- Next.js 13+ dengan **App Router** harus pakai `next/navigation`

**Solusi:**

```typescript
import { useRouter } from "next/navigation"; // ✅ BENAR
```

**Pelajaran:** Selalu cek dokumentasi Next.js untuk versi yang dipakai.

---

### ❌ Inconsistent Import Paths

**Masalah:**

```typescript
// File A
import prisma from "../../../lib/prisma";

// File B
import prisma from "../../../../../../lib/prisma";
```

**Kenapa Salah?**

- Path relatif susah di-maintain
- Rawan typo dan error saat refactor

**Solusi:**

```typescript
// Gunakan path alias yang sudah dikonfigurasi di tsconfig.json
import prisma from "@/lib/prisma"; // ✅ BENAR
```

**Pelajaran:** Gunakan path alias (`@/`) untuk import yang konsisten.

---

## 2. Layout & Routing Errors

### ❌ Duplicate HTML/Body Tags

**Masalah:**

```tsx
// src/app/(landing-page)/layout.tsx
export default function Layout({ children }) {
  return (
    <html lang="en">
      {" "}
      {/* ❌ Duplicate! */}
      <body>
        {" "}
        {/* ❌ Duplicate! */}
        {children}
      </body>
    </html>
  );
}
```

**Kenapa Salah?**

- Di Next.js App Router, hanya **root layout** (`app/layout.tsx`) yang boleh punya `<html>` dan `<body>`
- Route group layouts (`(group-name)/layout.tsx`) **TIDAK BOLEH** memiliki tags ini

**Solusi:**

```tsx
// src/app/layout.tsx (ROOT - boleh punya html/body)
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

// src/app/(landing-page)/layout.tsx (CHILD - tidak boleh html/body)
export default function LandingLayout({ children }) {
  return (
    <div className="landing-wrapper">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
```

**Pelajaran:** Pahami hierarki layout di Next.js App Router.

---

### ❌ API Routes di Dalam Route Groups

**Masalah:**

```
src/app/(landing-page)/api/user/route.ts  // ❌ Di dalam route group
src/app/api/user/route.ts                  // ✅ Di folder utama
```

**Kenapa Salah?**

- Route groups `(name)` tidak mempengaruhi URL
- Tapi bisa menyebabkan konflik dan kebingungan

**Solusi:**
Simpan semua API routes di `src/app/api/`:

```
src/app/api/
├── auth/
├── user/
├── jobs/
└── companies/
```

---

## 3. Type Safety & TypeScript Errors

### ❌ Typo di Type Definition

**Masalah:**

```typescript
interface CompanyType {
  techStaack: string[]; // ❌ Typo: "Staack" harusnya "Stack"
}
```

**Solusi:**

```typescript
interface CompanyType {
  techStack: string[]; // ✅ BENAR
}
```

**Pelajaran:** Gunakan spell checker di IDE dan review nama variable dengan teliti.

---

### ❌ Wrong Type Import

**Masalah:**

```typescript
import type { JobType } from "@/types";
const [companies, setCompanies] = useState<JobType[]>([]); // ❌ Type salah!
```

**Solusi:**

```typescript
import type { CompanyType } from "@/types";
const [companies, setCompanies] = useState<CompanyType[]>([]); // ✅ Type sesuai
```

**Pelajaran:** Pastikan type sesuai dengan data yang akan disimpan.

---

### ❌ Session Type Unknown

**Masalah:**

```typescript
const session = await getServerSession(authOptions);
console.log(session?.user.id); // ❌ Error: Property 'user' does not exist on type 'unknown'
```

**Solusi:**

```typescript
// Option 1: Type casting
const session = (await getServerSession(authOptions)) as {
  user?: { id: string };
} | null;
console.log(session?.user?.id); // ✅

// Option 2: Buat type declaration (next-auth.d.ts)
declare module "next-auth" {
  interface Session {
    user: { id: string; name?: string; email?: string };
  }
}
```

---

## 4. Hook & React Errors

### ❌ Missing useEffect Dependencies

**Masalah:**

```typescript
useEffect(() => {
  mutate();
}, [categories]); // ❌ Missing 'mutate' in dependency array
```

**Kenapa Salah?**

- React akan warning karena `mutate` digunakan tapi tidak di dependency
- Bisa menyebabkan stale closures atau behavior tidak terduga

**Solusi:**

```typescript
useEffect(() => {
  mutate();
}, [categories, mutate]); // ✅ Semua dependencies included
```

**Pelajaran:** Gunakan ESLint rule `react-hooks/exhaustive-deps` untuk deteksi otomatis.

---

### ❌ Missing Loading States

**Masalah:**

```tsx
const { data, isLoading } = useSWR("/api/jobs");

return (
  <div>
    {data.map((job) => (
      <JobCard key={job.id} {...job} />
    ))}{" "}
    {/* ❌ No loading check */}
  </div>
);
```

**Solusi:**

```tsx
const { data, isLoading, error } = useSWR("/api/jobs");

if (error) return <ErrorMessage />;
if (isLoading) return <LoadingSkeleton />;

return (
  <div>
    {data.map((job) => (
      <JobCard key={job.id} {...job} />
    ))}
  </div>
);
```

---

## 5. API & Backend Errors

### ❌ API Routes Tanpa Error Handling

**Masalah:**

```typescript
export async function POST(request: Request) {
  const data = await request.json();
  const result = await prisma.user.create({ data }); // ❌ No try-catch!
  return NextResponse.json(result);
}
```

**Kenapa Salah?**

- Jika Prisma error, server akan crash
- Response tidak informatif untuk debugging

**Solusi:**

```typescript
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const result = await prisma.user.create({ data });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
```

**Pelajaran:** Selalu wrap database operations dengan try-catch.

---

### ❌ Environment Variable Typo

**Masalah:**

```typescript
process.env.NEXT_PUBLIC_SUPABASe_URL; // ❌ Typo: huruf 'e' kecil
```

**Solusi:**

```typescript
process.env.NEXT_PUBLIC_SUPABASE_URL; // ✅ Konsisten uppercase
```

**Pelajaran:** Copy-paste env variable names untuk hindari typo.

---

## 6. UI & Styling Errors

### ❌ CSS Class Typos

**Masalah:**

```tsx
<div className="mt-10 inlinef-lex gap-6">  {/* ❌ "inlinef-lex" */}
<div className="mt-5flex flex-row">        {/* ❌ "mt-5flex" tanpa spasi */}
<Button className="bg=green-500">          {/* ❌ "bg=" bukan "bg-" */}
```

**Solusi:**

```tsx
<div className="mt-10 inline-flex gap-6">  {/* ✅ */}
<div className="mt-5 flex flex-row">       {/* ✅ */}
<Button className="bg-green-500">          {/* ✅ */}
```

**Pelajaran:** Gunakan Tailwind CSS IntelliSense extension untuk autocomplete.

---

### ❌ Deprecated Props

**Masalah:**

```tsx
<Image src="/img.png" objectFit="contain" /> {/* ❌ Deprecated di Next.js 13+ */}
```

**Solusi:**

```tsx
<Image src="/img.png" className="object-contain" /> {/* ✅ Gunakan className */}
// atau
<Image src="/img.png" style={{ objectFit: "contain" }} /> {/* ✅ Gunakan style */}
```

---

## 📝 Checklist Sebelum Deploy

- [ ] Semua import menggunakan path alias (`@/`)
- [ ] Hanya root layout yang punya `<html>` dan `<body>`
- [ ] Semua API routes punya error handling
- [ ] useEffect punya dependency array yang lengkap
- [ ] Tidak ada typo di class names dan env variables
- [ ] Type definitions sesuai dengan data
- [ ] Loading dan error states ditampilkan

---

## 🔗 Resources untuk Belajar Lebih Lanjut

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Hooks Rules](https://react.dev/reference/rules/rules-of-hooks)
- [Prisma Best Practices](https://www.prisma.io/docs/guides)

---

_Dokumen ini dibuat untuk pembelajaran. Semoga bermanfaat! 🚀_
