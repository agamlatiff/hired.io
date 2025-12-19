# Bug Fixes Documentation - DC1

**Date:** December 19, 2025  
**Developer:** AI Assistant (Antigravity)

---

## Summary

This documentation records all bugs and errors found and fixed in the Next.js job portal application.

---

## Bugs Fixed

### 1. Module Resolution Error - `tsconfig.json`

**Problem:** Application failed to compile with error "Module not found: Can't resolve '@/components/page/Navbar'"

**Cause:** The `tsconfig.json` file was missing `baseUrl` and `paths` configuration for the `@/` alias.

**Solution:** Added the following configuration to `compilerOptions`:

```json
"baseUrl": ".",
"paths": {
  "@/*": ["./src/*"]
}
```

**File:** `tsconfig.json`

---

### 2. CSS Import Typo - Auth Layout

**Problem:** CSS was not loading on authentication pages.

**Cause:** Typo in import path: `"../..globals.css"` (missing slash).

**Solution:** Fixed path to `"../../globals.css"`.

**File:** `src/app/(landing-page)/(auth)/layout.tsx`

---

### 3. Wrong Array in Footer Resources Section

**Problem:** The "Resources" section in Footer displayed the same content as "About".

**Cause:** Mapping was using `aboutLinks` array instead of `resourceLinks`.

**Solution:** Changed `aboutLinks.map` to `resourceLinks.map` on line 53.

**File:** `src/components/page/Footer.tsx`

---

### 4. Image Path Typo - Utils

**Problem:** Fallback image was not loading for jobs and companies.

**Cause:** Incorrect path: `"/images/company/png"` (missing dot).

**Solution:** Fixed to `"/images/company.png"` in both `parsingJobs` and `parsingCompanies` functions.

**File:** `src/lib/utils.ts`

---

### 5. Auth Navigation Links Missing Prefix

**Problem:** Sign Up and Sign In links were not working on auth pages.

**Cause:** Links were using `/signup` and `/signin` without the `/auth/` prefix.

**Solution:** Fixed paths to `/auth/signup` and `/auth/signin`.

**Files:**

- `src/app/(landing-page)/(auth)/signin/page.tsx`
- `src/app/(landing-page)/(auth)/signup/page.tsx`

---

### 6. Missing Image Dimensions - Landing Page

**Problem:** Runtime warning/error because Image component had no dimensions.

**Cause:** Image component for pattern.png had no `width`, `height`, or `fill` prop.

**Solution:** Added `fill` prop and `className="object-cover"`.

**File:** `src/app/(landing-page)/(page)/page.tsx`

---

### 7. Deprecated objectFit/objectPosition Props

**Problem:** Console warnings about deprecated props on Next.js Image component.

**Cause:** Using `objectFit` and `objectPosition` props which are deprecated in Next.js 13+.

**Solution:** Replaced with Tailwind CSS classes (`object-cover`, `object-contain`, `object-top`).

**Files:**

- `src/app/(landing-page)/(auth)/layout.tsx`
- `src/components/page/Hero.tsx`

---

### 8. Wrong API Endpoint Path - useFeaturedJobs

**Problem:** Hook `useFeaturedJobs` could not fetch data.

**Cause:** Using endpoint `/api/job/featured` which doesn't exist.

**Solution:** Fixed to `/api/jobs/featured` matching the actual route location.

**File:** `src/hooks/useFeaturedJobs.tsx`

---

### 9. SelectItem Bug - Post Job Page

**Problem:** Job category dropdown was not functioning correctly.

**Cause:**

- `key` was using object `item` instead of `item.id`
- `value` was hardcoded to `"m@example.com"` instead of `item.id`
- Displaying `{item}` (object) instead of `{item.name}`

**Solution:** Fixed to:

```tsx
{
  data?.map((item: CategoryJob) => (
    <SelectItem key={item.id} value={item.id}>
      {item.name}
    </SelectItem>
  ));
}
```

**File:** `src/app/(dashboard)/post-a-job/page.tsx`

---

### 10. Missing "use client" Directive - Hooks and Components

**Problem:** React Server Components error - hooks using useState/useEffect need to be in Client Components.

**Cause:** Custom hooks and components using React hooks were missing the `"use client"` directive.

**Solution:** Added `"use client"` directive at the top of each file.

**Files:**

- `src/hooks/useFeaturedJobs.tsx`
- `src/hooks/useJobs.tsx`
- `src/hooks/useCompanies.tsx`
- `src/hooks/useCategoryJobFilter.tsx`
- `src/hooks/useCategoryCompanyFilter.tsx`
- `src/components/page/FeaturedJobs.tsx`
- `src/components/page/LatestJobs.tsx`

---

### 11. Wrong CSS Import Path - Landing Page Layout

**Problem:** Module not found error for globals.css in landing page layout.

**Cause:** Import path was `../../globals.css` but should be `../globals.css` (only one level up).

**Solution:** Fixed import path to `../globals.css`.

**File:** `src/app/(landing-page)/layout.tsx`

---

### 12. Missing SessionProvider - Landing Page Layout

**Problem:** `useSession must be wrapped in a <SessionProvider />` error.

**Cause:** Navbar component uses `useSession()` but its parent layout wasn't wrapping children with SessionProvider.

**Solution:** Added `AuthProvider` wrapper to the layout.

**File:** `src/app/(landing-page)/layout.tsx`

---

### 13. Image Path Errors - Clients Component

**Problem:** `Failed to parse src 'images/bubles.png'` - relative image path must start with leading slash.

**Cause:**

- `images/bubles.png` missing leading `/`
- `wave,png` typo (comma instead of dot)

**Solution:** Fixed paths to `/images/bubles.png` and `/images/wave.png`.

**File:** `src/components/page/Clients.tsx`

---

## Recommendations for Future Development

1. **Type Safety:** Consider enabling `strict: true` in `tsconfig.json` to catch more errors at compile time.

2. **Image Optimization:** Ensure all Image components have explicit dimensions or use `fill` with a sized container.

3. **API Route Consistency:** Consider consolidating all API routes in one location (`/api/*`) rather than spreading across route groups.

4. **Error Handling:** Add error boundaries and better handling for API calls.

5. **Testing:** Add unit tests for utility functions and integration tests for API routes.

6. **Client/Server Components:** Always add `"use client"` directive to files that use React hooks (useState, useEffect, useMemo, useCallback, etc.).

7. **Image Paths:** Always use absolute paths starting with `/` for static images in Next.js Image component.

---

## Status

✅ All bugs above have been fixed and are ready for testing.
