# 06 - Features

## Public Features

### Home Page (`/`)

- Hero section with search bar
- Top companies showcase
- Featured job listings
- Trending tech stacks

### Find Jobs (`/find-jobs`)

- Job listings with filters
- Filter by: job type, salary, experience, tech stack
- Sort by: date, salary, relevance
- Pagination

### Job Detail (`/detail/job/[id]`)

- Full job description
- Company information sidebar
- Tech stack requirements
- Apply button → Apply form
- Similar jobs suggestions

### Find Companies (`/find-companies`)

- Company directory
- Filter by industry, size, location
- Search functionality

### Company Detail (`/find-companies/[id]`)

- Company profile
- About section
- Open positions list
- Team members

### Apply to Job (`/detail/job/[id]/apply`)

- Multi-step application form
- Resume upload (Supabase storage)
- Cover letter
- Personal info & links

### Apply Success (`/apply-success`)

- Confirmation message
- Application timeline
- Next steps

---

## Dashboard Features (Protected)

### Main Dashboard (`/dashboard`)

- Stats cards (Active Jobs, Applicants, Views, Pending)
- Application traffic chart
- Conversion funnel
- Candidate sources
- Live activity feed
- Active jobs table

### Job Listings (`/dashboard/jobs`)

- All company jobs table
- Status badges (Active, Closed, Draft)
- Actions: Edit, Duplicate, Delete
- Search & filters

### Job Detail Admin (`/dashboard/jobs/[id]`)

- Job statistics
- Candidate pipeline visualization
- Recent applicants list
- Applicant actions (Schedule, Message, Reject)

### Post a Job (`/dashboard/post-job`)

- Multi-section form
- Basic details, description, compensation
- Tech stack tags
- Benefits selection
- Preview sidebar
- AI Assist button (placeholder)

### Settings (`/dashboard/settings`)

- Company profile section
- Team management
- Notification preferences
- Billing section
- Security settings

---

## Auth Features

### Sign In (`/auth/signin`)

- Email/password login
- OAuth placeholders (Google, GitHub)
- Forgot password link

### Sign Up (`/auth/signup`)

- Job Seeker / Company toggle
- Registration form
- Password strength indicator
- Skills input (for seekers)
