# 03 - Authentication

## Auth Provider

**NextAuth.js** with Credentials Provider

---

## Configuration

**File**: `src/lib/auth.ts`

```typescript
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [CredentialsProvider({ ... })],
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/signup",
  },
  callbacks: { jwt, session }
}
```

---

## Auth Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Login      │────▶│  NextAuth    │────▶│   Session    │
│   Form       │     │  Verify      │     │   Created    │
└──────────────┘     └──────────────┘     └──────────────┘
        │                    │                    │
        ▼                    ▼                    ▼
   Email/Password     Company lookup      JWT Token + Cookie
                      Password compare
```

---

## Protected Routes

### Dashboard Layout (`src/app/(dashboard)/layout.tsx`)

```typescript
const session = await getServerSession(authOptions);

if (session === null) {
  return redirect("/auth/signin");
}
```

---

## User Types

| Type        | Login            | Role                                    |
| ----------- | ---------------- | --------------------------------------- |
| **Company** | Email + Password | Employer - Post jobs, manage applicants |
| **User**    | Email + Password | Job Seeker - Apply to jobs              |

> **Note**: Current auth only supports Company login. User auth for job seekers needs implementation.

---

## Auth Pages

| Page    | Path           | Description          |
| ------- | -------------- | -------------------- |
| Sign In | `/auth/signin` | Company login        |
| Sign Up | `/auth/signup` | Company registration |

---

## Environment Variables

```env
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

---

## Session Data

```typescript
session.user = {
  id: string, // Company ID
  email: string,
  name: string,
};
```
