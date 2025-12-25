import FindJobsClient, { UIJob } from "@/components/page/find-jobs/FindJobsClient";
import { getJobs } from "@/data";
import { formatDistanceToNow } from "date-fns";

export default async function FindJobsPage() {
  const jobs = await getJobs();

  // Map DB jobs to UI jobs
  const uiJobs: UIJob[] = jobs.map((job) => ({
    id: job.id,
    title: job.roles,
    company: job.Company?.name || "Unknown Company",
    location: job.location || "Remote",
    timeAgo: formatDistanceToNow(new Date(job.datePosted), { addSuffix: true }),
    salary: `$${job.salaryFrom}k - $${job.salaryTo}k`,
    skills: job.requiredSkills,
    image: job.Company?.logo || null,
    featured: job.id.charCodeAt(0) % 5 === 0, // Pseudo-random featured status
    logoBg: "bg-white",
  }));

  return <FindJobsClient initialJobs={uiJobs} />;
}
