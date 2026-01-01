import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/page/Navbar";
import Footer from "@/components/page/Footer";
import { getJobById, getSimilarJobs } from "@/data/jobs";
import { formatDistanceToNow } from "date-fns";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import JobActionButtons from "@/components/job/JobActionButtons";

// Default perks (since DB doesn't have per-job perks)
const DEFAULT_PERKS = [
  { icon: "monitor_heart", label: "Comprehensive Health" },
  { icon: "flight_takeoff", label: "Flexible PTO" },
  { icon: "devices", label: "Home Office Stipend" },
  { icon: "trending_up", label: "Equity Package" },
  { icon: "lunch_dining", label: "Meal Allowance" },
  { icon: "school", label: "Learning Budget" },
];

// Helper to get tech icon and color
function getTechDisplay(techName: string) {
  const techMap: Record<string, { icon: string; color: string; category: string }> = {
    React: { icon: "code", color: "text-blue-400", category: "Frontend" },
    "Next.js": { icon: "javascript", color: "text-white", category: "Framework" },
    TypeScript: { icon: "data_object", color: "text-blue-500", category: "Language" },
    JavaScript: { icon: "javascript", color: "text-yellow-400", category: "Language" },
    Python: { icon: "bolt", color: "text-yellow-300", category: "Language" },
    Go: { icon: "data_object", color: "text-blue-300", category: "Language" },
    Golang: { icon: "data_object", color: "text-blue-300", category: "Language" },
    Rust: { icon: "terminal", color: "text-orange-400", category: "Language" },
    Java: { icon: "code", color: "text-red-400", category: "Language" },
    "Node.js": { icon: "terminal", color: "text-green-400", category: "Backend" },
    Node: { icon: "terminal", color: "text-green-400", category: "Backend" },
    AWS: { icon: "cloud", color: "text-orange-400", category: "Cloud" },
    GCP: { icon: "cloud", color: "text-blue-400", category: "Cloud" },
    Docker: { icon: "deployed_code", color: "text-blue-400", category: "DevOps" },
    Kubernetes: { icon: "deployed_code", color: "text-blue-500", category: "DevOps" },
    PostgreSQL: { icon: "database", color: "text-blue-400", category: "Database" },
    MongoDB: { icon: "database", color: "text-green-400", category: "Database" },
    Redis: { icon: "database", color: "text-red-400", category: "Database" },
    GraphQL: { icon: "api", color: "text-purple-400", category: "API" },
    "Tailwind CSS": { icon: "brush", color: "text-cyan-400", category: "Styling" },
    Tailwind: { icon: "brush", color: "text-cyan-400", category: "Styling" },
    Vue: { icon: "code", color: "text-green-400", category: "Frontend" },
    Angular: { icon: "code", color: "text-red-400", category: "Frontend" },
  };
  return techMap[techName] || { icon: "code", color: "text-gray-400", category: "Tech" };
}

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const job = await getJobById(params.id);

  if (!job) {
    return {
      title: "Job Not Found | hired.io",
      description: "The job you're looking for doesn't exist or has been removed.",
    };
  }

  const companyName = job.Company?.name || "Unknown Company";
  const salary = `$${job.salaryFrom}k - $${job.salaryTo}k`;

  return {
    title: `${job.roles} at ${companyName} | hired.io`,
    description: `${job.roles} position at ${companyName}. ${job.jobType} role with ${salary} salary. ${job.description?.slice(0, 120) || "Apply now!"}`,
    openGraph: {
      title: `${job.roles} at ${companyName}`,
      description: `${job.jobType} • ${salary} • ${job.location || "Remote"}`,
      type: "website",
    },
  };
}

export default async function JobDetailPage({ params }: PageProps) {
  const job = await getJobById(params.id);

  if (!job) {
    notFound();
  }

  // Check if current user has applied
  const session = await getServerSession(authOptions);
  let hasApplied = false;

  if (session?.user?.id && session?.user?.role === "user") {
    const application = await prisma.applicant.findFirst({
      where: {
        jobId: job.id,
        userId: session.user.id,
      },
      select: { id: true },
    });
    hasApplied = !!application;
  }

  const company = job.Company;
  const overview = company?.CompanyOverview?.[0];
  const similarJobs = company ? await getSimilarJobs(job.id, company.id, 3) : [];

  // Parse description as about paragraphs
  const aboutParagraphs = job.description
    ? job.description.replace(/<[^>]*>/g, "").split(/\n\n|\n/).filter(Boolean)
    : ["This position offers an exciting opportunity to join our team."];

  // Parse responsibilities from description or use default
  const responsibilities = job.responsibility
    ? job.responsibility.replace(/<[^>]*>/g, "").split(/\n|•|·/).filter(Boolean).map(r => r.trim())
    : [
      "Collaborate with cross-functional teams to deliver high-quality solutions.",
      "Write clean, maintainable code following best practices.",
      "Participate in code reviews and mentor team members.",
      "Contribute to architectural decisions and technical documentation.",
    ];

  const postedAgo = formatDistanceToNow(new Date(job.datePosted), { addSuffix: true });
  const applicantsCount = job._count?.Applicant || 0;

  return (
    <div className="bg-background-dark font-display text-white overflow-x-hidden min-h-screen flex flex-col relative">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] bg-grid" />
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-neon-green/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[100px]" />
      </div>

      <Navbar />

      <main className="flex-grow relative z-10 pt-32 pb-20 px-4 md:px-10 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-medium">
            <Link href="/" className="hover:text-neon-green transition-colors">
              Home
            </Link>
            <span className="material-symbols-outlined text-[10px]">
              chevron_right
            </span>
            <Link
              href="/find-jobs"
              className="hover:text-neon-green transition-colors"
            >
              Find Jobs
            </Link>
            <span className="material-symbols-outlined text-[10px]">
              chevron_right
            </span>
            <span className="text-white">{job.roles}</span>
          </div>

          {/* Job Header Card */}
          <div className="relative group mb-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-neon-green/20 via-transparent to-neon-purple/20 rounded-3xl blur-lg opacity-40 group-hover:opacity-60 transition duration-700" />
            <div className="glass-panel relative rounded-3xl p-8 md:p-10 border border-white/10">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Company Logo */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white flex items-center justify-center shrink-0 p-4 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  {company?.logo ? (
                    <img
                      alt={`${company.name} Logo`}
                      className="w-full h-full object-contain"
                      src={company.logo}
                    />
                  ) : (
                    <span className="text-3xl font-bold text-black">
                      {company?.name?.charAt(0) || "?"}
                    </span>
                  )}
                </div>

                <div className="flex-1 w-full">
                  <div className="flex flex-col xl:flex-row justify-between xl:items-start gap-6">
                    <div>
                      <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-3">
                        {job.roles}
                      </h1>
                      <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm md:text-base font-medium">
                        <Link
                          href={company ? `/find-companies/${company.id}` : "#"}
                          className="text-white flex items-center gap-1 hover:text-neon-green transition-colors"
                        >
                          {company?.name || "Unknown Company"}
                          <span className="material-symbols-outlined text-blue-400 text-sm ml-1">
                            verified
                          </span>
                        </Link>
                        <span className="w-1 h-1 rounded-full bg-gray-600" />
                        <span>{job.location || "Remote"}</span>
                        <span className="px-2 py-0.5 rounded text-xs bg-neon-green/10 text-neon-green border border-neon-green/20">
                          {job.jobType}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-gray-600" />
                        <span>Posted {postedAgo}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto mt-2 xl:mt-0">
                      <JobActionButtons
                        jobId={job.id}
                        jobTitle={job.roles}
                        companyName={company?.name || "Unknown Company"}
                      />

                      {hasApplied ? (
                        <div className="flex-1 sm:flex-none bg-gray-700 text-gray-400 font-extrabold rounded-xl px-10 h-12 cursor-not-allowed text-lg flex items-center justify-center gap-2">
                          <span>Applied</span>
                          <span className="material-symbols-outlined text-xl">
                            check_circle
                          </span>
                        </div>
                      ) : (
                        <Link
                          href={`/detail/job/${params.id}/apply`}
                          className="flex-1 sm:flex-none bg-neon-green hover:bg-[#3cd612] text-background-dark font-extrabold rounded-xl px-10 h-12 transition-all shadow-[0_0_20px_rgba(73,230,25,0.3)] hover:shadow-[0_0_30px_rgba(73,230,25,0.5)] active:scale-95 whitespace-nowrap text-lg flex items-center justify-center gap-2"
                        >
                          <span>Apply Now</span>
                          <span className="material-symbols-outlined text-xl">
                            arrow_outward
                          </span>
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap items-center gap-y-6 gap-x-10 mt-8 pt-8 border-t border-white/5">
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">
                        Salary Range
                      </div>
                      <div className="text-2xl md:text-3xl font-bold text-neon-green glow-text font-mono tracking-tight">
                        ${job.salaryFrom}k - ${job.salaryTo}k
                        <span className="text-lg text-gray-500 font-normal">
                          /yr
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">
                        Job Type
                      </div>
                      <div className="text-xl md:text-2xl font-bold text-white">
                        {job.jobType}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">
                        Experience
                      </div>
                      <div className="text-xl md:text-2xl font-bold text-white">
                        {job.needs || 1}+ Years
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">
                        Applicants
                      </div>
                      <div className="flex -space-x-2 overflow-hidden mt-1.5">
                        <div className="inline-block h-8 w-8 rounded-full bg-gray-600 ring-2 ring-[#1e261c]" />
                        <div className="inline-block h-8 w-8 rounded-full bg-gray-500 ring-2 ring-[#1e261c]" />
                        <div className="inline-block h-8 w-8 rounded-full bg-gray-400 ring-2 ring-[#1e261c]" />
                        <div className="inline-block h-8 w-8 rounded-full bg-card-dark ring-2 ring-[#1e261c] flex items-center justify-center text-[10px] font-bold text-gray-400 border border-gray-700">
                          +{applicantsCount}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-6">
              {/* About the Role */}
              <section className="glass-panel rounded-2xl p-8 border border-accent-dark">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="p-2 rounded-lg bg-neon-green/10 text-neon-green">
                    <span className="material-symbols-outlined">
                      description
                    </span>
                  </span>
                  About the Role
                </h2>
                <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-4">
                  {aboutParagraphs.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </section>

              {/* Tech Stack */}
              {job.requiredSkills && job.requiredSkills.length > 0 && (
                <section className="glass-panel rounded-2xl p-8 border border-accent-dark">
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-neon-purple/10 text-neon-purple">
                      <span className="material-symbols-outlined">code</span>
                    </span>
                    Tech Stack
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {job.requiredSkills.map((tech) => {
                      const { icon, color, category } = getTechDisplay(tech);
                      return (
                        <div
                          key={tech}
                          className="px-4 py-2 rounded-xl bg-card-dark border border-accent-dark flex items-center gap-3 cursor-default group hover:-translate-y-0.5 hover:border-neon-green/30 transition-all"
                        >
                          <div
                            className={`w-6 h-6 rounded-full bg-white/5 flex items-center justify-center ${color}`}
                          >
                            <span className="material-symbols-outlined text-sm">
                              {icon}
                            </span>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 font-bold uppercase tracking-wide">
                              {category}
                            </div>
                            <div className="text-white font-mono text-sm group-hover:text-neon-green transition-colors">
                              {tech}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* What You'll Do */}
              <section className="glass-panel rounded-2xl p-8 border border-accent-dark">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="p-2 rounded-lg bg-green-500/10 text-green-500">
                    <span className="material-symbols-outlined">
                      check_circle
                    </span>
                  </span>
                  What You&apos;ll Do
                </h2>
                <ul className="space-y-4">
                  {responsibilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 group">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-neon-green group-hover:shadow-[0_0_8px_#49e619] transition-all shrink-0" />
                      <span className="text-gray-300 group-hover:text-white transition-colors">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Perks & Benefits */}
              <section className="glass-panel rounded-2xl p-8 border border-accent-dark">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                    <span className="material-symbols-outlined">redeem</span>
                  </span>
                  Perks & Benefits
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {DEFAULT_PERKS.map((perk) => (
                    <div
                      key={perk.label}
                      className="flex items-center gap-3 p-4 rounded-xl bg-card-dark border border-white/5 hover:border-white/10 transition-colors"
                    >
                      <span className="material-symbols-outlined text-neon-purple">
                        {perk.icon}
                      </span>
                      <span className="text-sm font-medium text-gray-200">
                        {perk.label}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column - Sidebar */}
            <aside className="lg:col-span-4 space-y-6 sticky top-32">
              {/* Company Card */}
              <div className="glass-panel rounded-2xl p-6 border border-accent-dark">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center p-2">
                    {company?.logo ? (
                      <img
                        alt={`${company.name} Logo`}
                        className="w-full h-full object-contain"
                        src={company.logo}
                      />
                    ) : (
                      <span className="text-xl font-bold text-black">
                        {company?.name?.charAt(0) || "?"}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{company?.name || "Unknown"}</h3>
                    {overview?.website && (
                      <a
                        className="text-neon-green text-xs hover:text-[#3cd612] hover:underline flex items-center gap-1"
                        href={overview.website.startsWith("http") ? overview.website : `https://${overview.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {overview.website.replace(/^https?:\/\//, "")}
                        <span className="material-symbols-outlined text-[10px]">
                          open_in_new
                        </span>
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  {overview?.description
                    ? overview.description.replace(/<[^>]*>/g, "").slice(0, 120) + "..."
                    : "A great company to work for."}
                </p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-card-dark p-3 rounded-lg border border-white/5">
                    <div className="text-xs text-gray-500 mb-1">Employees</div>
                    <div className="font-bold text-white text-sm">
                      {overview?.employee || "N/A"}
                    </div>
                  </div>
                  <div className="bg-card-dark p-3 rounded-lg border border-white/5">
                    <div className="text-xs text-gray-500 mb-1">Industry</div>
                    <div className="font-bold text-white text-sm">
                      {overview?.industry || "Technology"}
                    </div>
                  </div>
                  <div className="bg-card-dark p-3 rounded-lg border border-white/5">
                    <div className="text-xs text-gray-500 mb-1">Location</div>
                    <div className="font-bold text-white text-sm">
                      {overview?.location || "Remote"}
                    </div>
                  </div>
                  <div className="bg-card-dark p-3 rounded-lg border border-white/5">
                    <div className="text-xs text-gray-500 mb-1">Open Jobs</div>
                    <div className="font-bold text-white text-sm">
                      {similarJobs.length + 1}
                    </div>
                  </div>
                </div>
                {company && (
                  <Link
                    href={`/find-companies/${company.id}`}
                    className="w-full py-2.5 rounded-lg bg-card-dark border border-accent-dark text-gray-300 hover:text-white hover:border-gray-500 hover:bg-white/5 transition-all text-sm font-semibold block text-center"
                  >
                    View Company Profile
                  </Link>
                )}
              </div>

              {/* Similar Jobs */}
              {similarJobs.length > 0 && (
                <div className="glass-panel rounded-2xl p-6 border border-accent-dark">
                  <h3 className="font-bold text-white mb-4">Similar Jobs</h3>
                  <div className="space-y-4">
                    {similarJobs.map((similarJob) => (
                      <Link
                        key={similarJob.id}
                        href={`/detail/job/${similarJob.id}`}
                        className="block group"
                      >
                        <div className="flex gap-3 items-center">
                          <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-lg transition-transform group-hover:scale-105 p-1">
                            {similarJob.Company?.logo ? (
                              <img
                                alt={`${similarJob.Company.name} Logo`}
                                className="w-full h-full object-contain"
                                src={similarJob.Company.logo}
                              />
                            ) : (
                              <span className="text-black font-bold">
                                {similarJob.Company?.name?.charAt(0) || "?"}
                              </span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white font-bold text-sm truncate group-hover:text-neon-green transition-colors">
                              {similarJob.roles}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                              <span>{similarJob.Company?.name || "Company"}</span>
                              <span>•</span>
                              <span className="text-green-400">
                                ${similarJob.salaryFrom}k - ${similarJob.salaryTo}k
                              </span>
                            </div>
                          </div>
                          <span className="material-symbols-outlined text-gray-600 group-hover:text-white text-sm">
                            chevron_right
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
