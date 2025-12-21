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

export const JOB_APPLICANTS_DATA = [
  {
    name: "Agam",
    appliedDate: "15 Aug 2023",
  },
];

export const JOB_LISTING_DATA = [
  {
    roles: "Software Engineer",
    status: "Live",
    datePosted: "12 Aug 2023",
    dueDate: "12 Sep 2023",
    jobType: "Full-Time",
    applicants: 1,
    needs: 10,
  },
];

export const LOCATION_OPTIONS: optionType[] = [
  {
    id: "Indonesia",
    label: "Indonesia",
  },
  {
    id: "Malaysia",
    label: "Malaysia",
  },
  {
    id: "Singapore",
    label: "Singapore",
  },
  {
    id: "Thailand",
    label: "Thailand",
  },
];

export const EMPLOYEE_OPTIONS: optionType[] = [
  {
    id: "1-50",
    label: "1-50",
  },
  {
    id: "51-100",
    label: "51-100",
  },

  {
    id: "151-200",
    label: "151-200",
  },
  {
    id: "251-500",
    label: "251-500",
  },
  {
    id: "501-1000",
    label: "501-1000",
  },
  {
    id: "1000-above",
    label: "1000-above",
  },
];

export const LOCATION_OPTIONS_PAGE: optionType[] = [
  {
    id: "Indonesia",
    label: "Indonesia",
  },
  {
    id: "Malaysia",
    label: "Malaysia",
  },
  {
    id: "Singapura",
    label: "Singapura",
  },
  {
    id: "Thailand",
    label: "Thailand",
  },
];

export const CATEGORIES_OPTIONS: optionType[] = [
  {
    id: "recents",
    label: "Recents",
  },
  {
    id: "home",
    label: "Home",
  },
  {
    id: "applications",
    label: "Applications",
  },
  {
    id: "desktop",
    label: "Desktop",
  },
  {
    id: "downloads",
    label: "Downloads",
  },
  {
    id: "documents",
    label: "Documents",
  },
];
