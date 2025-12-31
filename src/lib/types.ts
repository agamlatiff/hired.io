// Shared TypeScript interfaces for common data shapes
// This file centralizes type definitions used across the application

import type { UseFormReturn, FieldValues } from "react-hook-form";

// ==========================================
// Company & Profile Types
// ==========================================

export interface Company {
  id: string;
  name: string;
  email: string;
  logo: string | null;
  plan: "free" | "pro" | "enterprise";
  CompanyOverview?: CompanyOverview[];
  CompanySocialMedia?: CompanySocialMedia[];
  CompanyTeam?: TeamMember[];
}

export interface CompanyOverview {
  id: string;
  name: string;
  image: string;
  website: string;
  location: string;
  employee: string;
  industry: string;
  description: string;
  dateFounded?: Date;
  techStack?: string[];
}

export interface CompanySocialMedia {
  id: string;
  instagram: string;
  twitter: string;
  facebook: string;
  linkedin: string;
  youtube: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  instagram: string;
  linkedin: string;
}

// ==========================================
// Job Types
// ==========================================

export interface Job {
  id: string;
  roles: string;
  description?: string;
  responsibility?: string;
  whoYouAre?: string;
  niceToHaves?: string;
  jobType: string;
  salaryFrom?: number;
  salaryTo?: number;
  currency?: string;
  requiredSkills: string[];
  benefits: Benefit[];
  needs?: number;
  department?: string;
  location?: string;
  experienceLevel?: string;
  status: "draft" | "published" | "closed";
  datePosted: Date;
  dueDate?: Date;
  categoryId?: string;
  companyId: string;
  Company?: Company;
  applicants?: Applicant[];
}

export interface Benefit {
  benefit: string;
  description: string;
}

export interface JobCategory {
  id: string;
  name: string;
}

// ==========================================
// Applicant Types
// ==========================================

export interface Applicant {
  id: string;
  jobId: string;
  userId: string;
  previousJobTitle: string;
  phone?: string;
  linkedIn?: string;
  portfolio?: string;
  coverLetter?: string;
  resume?: string;
  source?: string;
  appliedAt: Date;
  status: "pending" | "reviewed" | "shortlisted" | "rejected" | "hired";
  User?: User;
  Job?: Job;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: "user" | "company";
  createdAt?: Date;
}

// ==========================================
// UI & Form Types
// ==========================================

export interface UIJob {
  id: string;
  title: string;
  company: string;
  location: string;
  timeAgo: string;
  salary: string;
  skills: string[];
  image: string | null;
  featured: boolean;
  logoBg: string;
}

export interface OptionType {
  id: string;
  label: string;
}

// Generic form props type
export type FormProps<T extends FieldValues = FieldValues> = {
  form: UseFormReturn<T>;
};

// ==========================================
// Filter Types
// ==========================================

export interface FilterOption {
  id: string;
  label: string;
  checked?: boolean;
}

export interface JobFilters {
  search?: string;
  location?: string;
  jobType?: string[];
  experienceLevel?: string[];
  salaryRange?: string[];
  techStack?: string[];
}

// ==========================================
// API Response Types
// ==========================================

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ==========================================
// Notification Types
// ==========================================

export interface NotificationPreference {
  title: string;
  desc: string;
  enabled: boolean;
  key: string;
}
