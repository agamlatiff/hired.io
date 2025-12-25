// Job types constant
export const JOBTYPES = [
  "Full-Time",
  "Part-Time",
  "Remote",
  "Internship",
] as const;

export type JobTypeValue = (typeof JOBTYPES)[number];

export type optionType = {
  id: string;
  label: string;
};

// Table columns
export const JOB_LISTING_COLUMNS: string[] = [
  "Roles",
  "Status",
  "Date Posted",
  "Due Date",
  "Job Type",
  "Applicants",
  "Needs",
];

export const JOB_APPLICANTS_COLUMNS: string[] = ["Name"];

// Form options
export const LOCATION_OPTIONS: optionType[] = [
  { id: "Indonesia", label: "Indonesia" },
  { id: "Malaysia", label: "Malaysia" },
  { id: "Singapore", label: "Singapore" },
  { id: "Thailand", label: "Thailand" },
  { id: "Remote", label: "Remote" },
];

export const LOCATION_OPTIONS_PAGE: optionType[] = [
  { id: "Indonesia", label: "Indonesia" },
  { id: "Malaysia", label: "Malaysia" },
  { id: "Singapore", label: "Singapore" },
  { id: "Thailand", label: "Thailand" },
];

export const EMPLOYEE_OPTIONS: optionType[] = [
  { id: "1-50", label: "1-50" },
  { id: "51-100", label: "51-100" },
  { id: "101-200", label: "101-200" },
  { id: "201-500", label: "201-500" },
  { id: "501-1000", label: "501-1000" },
  { id: "1000+", label: "1000+" },
];

// Post Job form options
export const DEPARTMENTS = [
  "Engineering",
  "Product",
  "Design",
  "Marketing",
  "Sales",
  "Operations",
  "Finance",
  "HR",
] as const;

export const WORK_TYPES = ["Remote", "On-site", "Hybrid"] as const;

export const CURRENCIES = [
  { id: "USD", label: "USD ($)", symbol: "$" },
  { id: "EUR", label: "EUR (€)", symbol: "€" },
  { id: "GBP", label: "GBP (£)", symbol: "£" },
  { id: "IDR", label: "IDR (Rp)", symbol: "Rp" },
] as const;

export const EXPERIENCE_LEVELS = [
  { id: "entry", label: "Entry Level (0-2 years)" },
  { id: "mid", label: "Mid Level (2-5 years)" },
  { id: "senior", label: "Senior (5-8 years)" },
  { id: "lead", label: "Lead / Manager (8+ years)" },
] as const;

// Landing page assets
export const CLIENT_LOGOS = [
  "/images/jobox.png",
  "/images/design.png",
  "/images/wave.png",
  "/images/twins.png",
  "/images/bubles.png",
];
