import { z } from "zod";

// Landing page form schemas
export const formFilterSchema = z.object({
  categories: z.array(z.string()),
});

export const formFilterCompanySchema = z.object({
  industry: z.array(z.string()),
});

export const formApplySchema = z.object({
  resume: z.any().refine((file: any) => file?.name, "Please Upload Resume"),
  fullname: z
    .string({ message: "Fullname is required" })
    .min(5, { message: "Full name minimal 5 characters" }),
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Email not valid" }),
  phone: z.string().min(6, { message: "Phone have min 6 characters" }),
  previousJobTitle: z.string(),
  linkedIn: z.string(),
  portfolio: z.string(),
  coverLetter: z.string(),
});

// Re-export auth schemas from schema.ts for backwards compatibility
export { formSignInSchema, formSignUpSchema } from "./schema";
