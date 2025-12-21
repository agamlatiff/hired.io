export type JobType = {
  id: string;
  image: string;
  jobType: string;
  name: string;
  type: string;
  location: string;
  desc: string;
  category: categoryJobType;
  needs: number;
  applicants: number;
  skills: string[];
};

export type optionType = {
  id: string;
  label: string;
};

export type filterFormType = {
  label: string;
  name: string;
  items: optionType[];
};

export type CompanyTeamType = {
  id: string;
  name: string;
  position: string;
  instagram: string;
  linkedin: string;
};

export type CompanySosmedType = {
  id: string;
  instagram: string;
  twitter: string;
  facebook: string;
  linkedin: string;
  youtube: string;
};

export type categoryJobType = {
  id: string;
  name: string;
  totalJobs: number;
};

export type CompanyType = {
  id: string;
  image: string;
  totalJobs: number;
  name: string;
  description: string;
  website: string;
  location: string;
  industry: string;
  dateFounded: Date;
  techStack: string[];
  sosmed: CompanySosmedType;
  teams: CompanyTeamType;
  employee: string
};
