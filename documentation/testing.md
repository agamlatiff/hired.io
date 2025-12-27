# Testing Guide

> Automated testing strategy for hired.io using Playwright.

---

## Overview

| Test Type      | Tool       | Coverage                                 |
| -------------- | ---------- | ---------------------------------------- |
| **E2E**        | Playwright | Auth flows, navigation, form submissions |
| **API**        | Playwright | All `/api/*` endpoints                   |
| **Components** | Vitest     | (Optional) UI components in isolation    |

---

## Setup

### Install Playwright

```bash
npm install -D @playwright/test
npx playwright install
```

### Create Config

Create `playwright.config.ts` at project root:

```typescript
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
```

---

## Test Structure

```
tests/
├── api/
│   ├── dashboard.spec.ts    # Dashboard API tests
│   ├── jobs.spec.ts         # Jobs API tests
│   └── auth.spec.ts         # Auth API tests
├── e2e/
│   ├── auth.spec.ts         # Login/register flows
│   ├── post-job.spec.ts     # Job posting flow
│   └── apply-job.spec.ts    # Job application flow
└── fixtures/
    └── test-data.ts         # Shared test data
```

---

## Test Files to Create

### 1. API Tests - `tests/api/dashboard.spec.ts`

```typescript
import { test, expect } from "@playwright/test";

test.describe("Dashboard API", () => {
  test("GET /api/dashboard/stats returns stats", async ({ request }) => {
    const response = await request.get("/api/dashboard/stats");
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data).toHaveProperty("totalJobs");
    expect(data).toHaveProperty("totalApplicants");
  });

  test("GET /api/dashboard/activity returns activities", async ({
    request,
  }) => {
    const response = await request.get("/api/dashboard/activity");
    expect(response.ok()).toBeTruthy();
  });
});
```

### 2. API Tests - `tests/api/jobs.spec.ts`

```typescript
import { test, expect } from "@playwright/test";

test.describe("Jobs API", () => {
  test("GET /api/jobs returns job list", async ({ request }) => {
    const response = await request.get("/api/jobs");
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy();
  });

  test("GET /api/jobs with search query", async ({ request }) => {
    const response = await request.get("/api/jobs?search=engineer");
    expect(response.ok()).toBeTruthy();
  });
});
```

### 3. E2E Tests - `tests/e2e/auth.spec.ts`

```typescript
import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test("Company can login", async ({ page }) => {
    await page.goto("/auth/signin");
    await page.fill('input[name="email"]', "hr@gojektech.co.id");
    await page.fill('input[name="password"]', "admin123");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL("/dashboard");
  });

  test("User can login", async ({ page }) => {
    await page.goto("/auth/signin");
    await page.fill('input[name="email"]', "budi.santoso@gmail.com");
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL("/");
  });

  test("Invalid credentials show error", async ({ page }) => {
    await page.goto("/auth/signin");
    await page.fill('input[name="email"]', "wrong@email.com");
    await page.fill('input[name="password"]', "wrongpassword");
    await page.click('button[type="submit"]');
    await expect(page.locator("text=Invalid")).toBeVisible();
  });
});
```

### 4. E2E Tests - `tests/e2e/post-job.spec.ts`

```typescript
import { test, expect } from "@playwright/test";

test.describe("Post Job Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Login as company first
    await page.goto("/auth/signin");
    await page.fill('input[name="email"]', "hr@gojektech.co.id");
    await page.fill('input[name="password"]', "admin123");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL("/dashboard");
  });

  test("Company can post a new job", async ({ page }) => {
    await page.goto("/dashboard/post-job");

    // Fill form
    await page.fill('input[name="roles"]', "Test Engineer");
    await page.fill('input[name="location"]', "Jakarta, Indonesia");
    await page.fill('textarea[name="description"]', "Test job description");
    await page.fill('input[name="salaryFrom"]', "10000000");
    await page.fill('input[name="salaryTo"]', "15000000");
    await page.fill('input[name="dueDate"]', "2025-12-31");

    // Submit as draft
    await page.click("text=Save Draft");

    // Verify redirect or success
    await expect(page.locator("text=Job Created")).toBeVisible();
  });
});
```

---

## Running Tests

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/api/dashboard.spec.ts

# Run with UI mode (debug)
npx playwright test --ui

# Run headed (visible browser)
npx playwright test --headed

# Generate HTML report
npx playwright show-report
```

---

## Task 1.4 Testing Checklist

| Test                          | File                          | Status |
| ----------------------------- | ----------------------------- | ------ |
| GET /api/dashboard/stats      | `tests/api/dashboard.spec.ts` | [ ]    |
| GET /api/dashboard/activity   | `tests/api/dashboard.spec.ts` | [ ]    |
| GET /api/jobs                 | `tests/api/jobs.spec.ts`      | [ ]    |
| POST /api/job                 | `tests/api/jobs.spec.ts`      | [ ]    |
| GET /api/jobs/[id]/applicants | `tests/api/jobs.spec.ts`      | [ ]    |
| POST /api/jobs/[id]/apply     | `tests/api/jobs.spec.ts`      | [ ]    |
| Company login                 | `tests/e2e/auth.spec.ts`      | [ ]    |
| User login                    | `tests/e2e/auth.spec.ts`      | [ ]    |
| Post job form                 | `tests/e2e/post-job.spec.ts`  | [ ]    |
| Apply to job                  | `tests/e2e/apply-job.spec.ts` | [ ]    |
| File uploads                  | `tests/e2e/upload.spec.ts`    | [ ]    |
| Build verification            | `npm run build`               | [ ]    |

---

## CI Integration (Optional)

Add to `.github/workflows/test.yml`:

```yaml
name: Playwright Tests
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      - name: Run Playwright tests
        run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

---

## Quick Commands

```bash
# Install Playwright
npm install -D @playwright/test && npx playwright install

# Run tests
npx playwright test

# Debug mode
npx playwright test --debug

# View report
npx playwright show-report
```

---

## Manual Testing Results (2025-12-27)

### Bug Fixed

| Bug                     | Description                                                                                              | Fix                                                                                                |
| ----------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| SessionProvider Missing | `useSession` not wrapped in `<SessionProvider />` causing Analytics, Interviews, Messages pages to crash | Added `NextAuthProvider` to `src/app/dashboard/layout.tsx` and `src/app/dashboard/user/layout.tsx` |

### Test Results

| Feature           | Page                       | Status  |
| ----------------- | -------------------------- | ------- |
| Landing Page      | `/`                        | ✅ PASS |
| Find Jobs         | `/find-jobs`               | ✅ PASS |
| Find Companies    | `/find-companies`          | ✅ PASS |
| Company Login     | `/auth/signin`             | ✅ PASS |
| Company Dashboard | `/dashboard`               | ✅ PASS |
| Job Listings      | `/dashboard/jobs`          | ✅ PASS |
| Analytics         | `/dashboard/analytics`     | ✅ PASS |
| Interviews        | `/dashboard/interviews`    | ✅ PASS |
| Messages          | `/dashboard/messages`      | ✅ PASS |
| Export CSV        | `/dashboard/jobs` (button) | ✅ PASS |
| User Dashboard    | `/dashboard/user`          | ✅ PASS |

### Test Credentials

**Company:**

- Email: `hr@techcorp.id`
- Password: `password123`

**Job Seeker:**

- Email: `budi.santoso@gmail.com`
- Password: `password123`
