# 04 - API Endpoints

## API Routes Structure

```
src/app/api/
├── auth/[...nextauth]/     # NextAuth handlers
├── companies/              # Public company endpoints
├── company/                # Company management (auth required)
├── jobs/                   # Job endpoints
├── job/                    # Single job operations
└── user/                   # User management
```

---

## Authentication API

| Method | Endpoint            | Description |
| ------ | ------------------- | ----------- |
| POST   | `/api/auth/signin`  | Sign in     |
| POST   | `/api/auth/signout` | Sign out    |
| GET    | `/api/auth/session` | Get session |

---

## Jobs API

### Public Endpoints

| Method | Endpoint               | Description        |
| ------ | ---------------------- | ------------------ |
| GET    | `/api/jobs`            | List all jobs      |
| GET    | `/api/jobs/[id]`       | Get job by ID      |
| GET    | `/api/jobs/categories` | Get job categories |
| GET    | `/api/jobs/featured`   | Get featured jobs  |

### Protected Endpoints (Company Auth)

| Method | Endpoint        | Description    |
| ------ | --------------- | -------------- |
| POST   | `/api/job`      | Create new job |
| PUT    | `/api/job/[id]` | Update job     |
| DELETE | `/api/job/[id]` | Delete job     |

---

## Companies API

### Public Endpoints

| Method | Endpoint              | Description        |
| ------ | --------------------- | ------------------ |
| GET    | `/api/companies`      | List all companies |
| GET    | `/api/companies/[id]` | Get company by ID  |

### Protected Endpoints

| Method | Endpoint                    | Description             |
| ------ | --------------------------- | ----------------------- |
| GET    | `/api/company`              | Get current company     |
| PUT    | `/api/company/overview`     | Update company overview |
| POST   | `/api/company/team`         | Add team member         |
| PUT    | `/api/company/social-media` | Update social links     |

---

## User API

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| POST   | `/api/user`      | Create user account |
| GET    | `/api/user/[id]` | Get user profile    |

---

## Applicant API

| Method | Endpoint                  | Description              |
| ------ | ------------------------- | ------------------------ |
| POST   | `/api/jobs/[id]/apply`    | Apply to job             |
| GET    | `/api/company/applicants` | Get company's applicants |
