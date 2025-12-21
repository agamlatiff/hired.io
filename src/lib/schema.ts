import { JOBTYPES } from "@/constants";
import { z } from "zod";

// Dashboard job form schema
export const jobFormSchema = z.object({
  roles: z
    .string()
    .min(1, { message: "Job Title is required" })
    .min(3, { message: "Job Title must be at least 3 characters" }),
  jobType: z.enum(JOBTYPES, { message: "You need to select a job type" }),
  salaryFrom: z.string({ message: "Salary From is required" }),
  salaryTo: z.string({ message: "Salary To is required" }),
  categoryId: z.string({ message: "You need to select a category" }),
  requiredSkills: z
    .string()
    .array()
    .min(1, { message: "Required Skill must be at least 1 skill" }),
  jobDescription: z
    .string({ message: "Job Description is required" })
    .min(10, { message: "Job Description must be at least 10 characters" }),
  responsibility: z
    .string({ message: "Responsibility is required" })
    .min(10, { message: "Responsibility must be at least 10 characters" }),
  whoYouAre: z
    .string({ message: "Who You Are is required" })
    .min(10, { message: "Who You Are must be at least 10 characters" }),
  niceToHaves: z
    .string({ message: "Nice To Haves is required" })
    .min(10, { message: "Nice To Haves must be at least 10 characters" }),
  benefits: z
    .object({
      benefit: z.string(),
      description: z.string(),
    })
    .array()
    .min(1, { message: "Benefits must be at least 1 benefit" }),
});

// Company overview form schema
export const overviewFormSchema = z.object({
  image: z.any(),
  name: z.string({ message: "Name is required" }),
  website: z.string({ message: "Website is required" }),
  location: z.string({ message: "Location is required" }),
  employee: z.string({ message: "Employee is required" }),
  industry: z.string({ message: "Industry is required" }),
  dateFounded: z.date({ message: "Date Founded is required" }),
  techStack: z
    .string({ message: "Tech stack is required" })
    .array()
    .min(1, { message: "Tech stack must be at least 1 data" }),
  description: z.string({ message: "Description is required" }),
});

// Social media form schema
export const socialMediaFormSchema = z.object({
  facebook: z.string({ message: "Facebook link is required" }),
  instagram: z.string({ message: "Instagram link is required" }),
  linkedin: z.string({ message: "Linkedin link is required" }),
  twitter: z.string({ message: "Twitter link is required" }),
  youtube: z.string({ message: "Youtube link is required" }),
});

// Team form schema
export const teamFormSchema = z.object({
  name: z.string({ message: "Name is required" }),
  position: z.string({ message: "Position is required" }),
  instagram: z.string({ message: "Instagram is required" }),
  linkedin: z.string({ message: "Linkedin is required" }),
});

// Auth schemas (consolidated - single source of truth)
export const formSignInSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Email is not valid" }),
  password: z.string({ message: "Password is required" }),
});

export const formSignUpSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(3, { message: "Name should have minimal 3 characters" }),
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Email is not valid" }),
  password: z.string({ message: "Password is required" }),
});

// Legacy aliases for backwards compatibility
export const signInFormSchema = formSignInSchema;
export const signUpFormSchema = formSignUpSchema;
