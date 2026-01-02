# 🚀 hired.io

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=for-the-badge&logo=postgresql)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)

**A modern, full-stack job portal platform connecting talented professionals with innovative companies.**

[Live Demo](#) • [Features](#-features) • [Getting Started](#-getting-started) • [Tech Stack](#-tech-stack)

</div>

---

## 📋 Overview

**hired.io** is a comprehensive job portal platform built with modern web technologies. It provides a seamless experience for both job seekers looking for their dream jobs and companies seeking top talent.

### ✨ Key Highlights

- 🌙 **Dark Mode First** - Beautiful glassmorphism UI with neon accents
- 🔐 **Dual Authentication** - Separate flows for job seekers and employers
- 📊 **Analytics Dashboard** - Comprehensive dashboard with application tracking
- 💬 **Messaging System** - Direct communication between companies and candidates
- 📱 **Fully Responsive** - Optimized for all device sizes

---

## 🎯 Features

### For Job Seekers

| Feature                     | Description                                                          |
| --------------------------- | -------------------------------------------------------------------- |
| 🔍 **Job Search**           | Advanced filtering by category, location, job type, and salary range |
| 📄 **Easy Apply**           | Multi-step application form with resume upload                       |
| 💼 **Company Profiles**     | Detailed company pages with team info and tech stack                 |
| 🔔 **Job Alerts**           | Custom notifications for matching job postings                       |
| ❤️ **Saved Jobs**           | Bookmark interesting positions for later                             |
| 📈 **Application Tracking** | Monitor your application status with detailed updates                |

### For Employers

| Feature                     | Description                                                     |
| --------------------------- | --------------------------------------------------------------- |
| 📊 **Analytics Dashboard**  | Track views, applications, and conversion rates                 |
| 📝 **Job Management**       | Create, edit, and manage job listings with ease                 |
| 👥 **Applicant Pipeline**   | Visual candidate tracking (New → Screening → Interview → Hired) |
| 📅 **Interview Scheduling** | Schedule and manage candidate interviews                        |
| 💬 **Messaging**            | Direct communication with candidates                            |
| ⚙️ **Settings**             | Company profile, team management, and notification preferences  |

---

## 🖥️ Screenshots

### Landing Page

A stunning dark-themed homepage featuring glassmorphism design, hero section with job search, featured companies, and trending job listings.

### Employer Dashboard

Comprehensive dashboard with statistics cards, application traffic charts, conversion funnels, and live activity feeds.

### Company Detail Page

Detailed company profiles showcasing overview, tech stack, team members, social links, and current job openings.

---

## 🛠️ Tech Stack

| Layer              | Technology                |
| ------------------ | ------------------------- |
| **Framework**      | Next.js 14 (App Router)   |
| **Language**       | TypeScript                |
| **Styling**        | Tailwind CSS              |
| **Database**       | PostgreSQL (Supabase)     |
| **ORM**            | Prisma                    |
| **Authentication** | NextAuth.js               |
| **UI Components**  | shadcn/ui + Radix UI      |
| **File Storage**   | Supabase Storage          |
| **Form Handling**  | React Hook Form + Zod     |
| **Icons**          | Lucide React, React Icons |

---

## 📁 Project Structure

```
hired-io/
├── prisma/                 # Database schema & migrations
├── src/
│   ├── app/
│   │   ├── (auth)/         # Authentication routes
│   │   ├── (landing-page)/ # Public pages
│   │   ├── api/            # API routes
│   │   └── dashboard/      # Protected dashboard pages
│   ├── components/
│   │   ├── dashboard/      # Dashboard-specific components
│   │   ├── page/           # Landing page components
│   │   └── ui/             # Reusable UI components
│   ├── lib/                # Auth, helpers, Prisma client
│   ├── hooks/              # Custom React hooks
│   ├── context/            # React context providers
│   └── types/              # TypeScript type definitions
├── public/                 # Static assets
└── documentation/          # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database (or Supabase account)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/hired-io.git
   cd hired-io
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Fill in your environment variables:

   ```env
   # Database
   DATABASE_URL="postgresql://..."
   DIRECT_URL="postgresql://..."

   # NextAuth.js
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"

   # Supabase (File Storage)
   NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
   NEXT_PUBLIC_SUPABASE_PUBLIC_KEY="your-anon-key"
   ```

4. **Set up the database**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Seed the database (optional)**

   ```bash
   npx prisma db seed
   ```

6. **Start the development server**

   ```bash
   npm run dev
   ```

7. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📦 Available Scripts

| Command             | Description              |
| ------------------- | ------------------------ |
| `npm run dev`       | Start development server |
| `npm run build`     | Build for production     |
| `npm run start`     | Start production server  |
| `npm run lint`      | Run ESLint               |
| `npx prisma studio` | Open Prisma database GUI |

---

## 🗄️ Database Schema

### Core Models

- **User** - Job seeker profiles with skills, experience, and education
- **Company** - Employer accounts with team members and social links
- **Job** - Job listings with requirements, benefits, and salary info
- **Applicant** - Job applications with status tracking
- **Interview** - Scheduled interviews with candidates
- **Conversation/Message** - Direct messaging system between users and companies
- **Notification** - Push notifications for both users and companies

---

## 🎨 Design System

- **Theme**: Dark mode with glassmorphism effects
- **Primary Color**: Neon Green (`#49e619`)
- **Accent Colors**: Purple (`#a259ff`), Cyan (`#00f0ff`)
- **Font**: Manrope
- **Effects**: Glass panels, glow effects, subtle animations

---

## 🔒 Authentication

The platform supports two user types:

| Type           | Description                                                                 |
| -------------- | --------------------------------------------------------------------------- |
| **Job Seeker** | Can browse jobs, apply, save jobs, and manage applications                  |
| **Employer**   | Can post jobs, manage applicants, schedule interviews, and access analytics |

Authentication is handled via **NextAuth.js** with the Credentials provider.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Agam Latiff**

- GitHub: [@agamlatiff](https://github.com/agamlatiff)

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ and ☕

</div>
