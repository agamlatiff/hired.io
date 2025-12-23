# 08 - Admin Panels

## Dashboard Overview

The admin dashboard is accessible at `/dashboard` and requires company authentication.

---

## Dashboard Sidebar Navigation

| Menu Item    | Route                 | Description            |
| ------------ | --------------------- | ---------------------- |
| Dashboard    | `/dashboard`          | Main overview page     |
| Job Listings | `/dashboard/jobs`     | Manage all job posts   |
| Post a Job   | `/dashboard/post-job` | Create new job listing |
| Settings     | `/dashboard/settings` | Company settings       |

---

## Dashboard Pages

### 1. Main Dashboard (`/dashboard`)

**Stats Cards:**

- Active Jobs - Total open positions
- Total Applicants - Applications received
- Profile Views - Company profile visits
- Pending Reviews - Applicants awaiting review

**Widgets:**

- Application Traffic Chart (weekly bar chart)
- Funnel Conversion (screening → interview → hired)
- Candidate Sources (direct, linkedin, referral)
- Live Activity Feed (real-time updates)
- Active Jobs Table (quick overview)

---

### 2. Job Listings (`/dashboard/jobs`)

**Features:**

- Stats: Total Jobs, Active, Closed, Draft
- Search by job title
- Filter by status, department, date
- Sortable table
- Actions: Edit, Duplicate, Delete
- Pagination

---

### 3. Job Detail Admin (`/dashboard/jobs/[id]`)

**Sections:**

- Job Stats (views, applications, shortlisted, interviewed)
- Candidate Pipeline (visual funnel)
- Job Description (read-only)
- Recent Applicants Table

**Applicant Actions:**

- Schedule Interview
- Send Message
- Reject

---

### 4. Post a Job (`/dashboard/post-job`)

**Form Sections:**

1. Basic Details (title, department, location, type)
2. Job Description (rich text editor)
3. Compensation (salary range, benefits)

**Features:**

- Dynamic tech stack tags
- Requirements list (add/remove)
- Benefits/perks selection
- Live preview sidebar
- Save Draft / Publish buttons

---

### 5. Settings (`/dashboard/settings`)

**Tabs:**

- Company Profile (logo, name, about)
- Team Management (add/remove members)
- Notifications (email preferences)
- Billing (plan, payment method)
- Security (password, 2FA)
