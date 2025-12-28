import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/page/Navbar";
import Footer from "@/components/page/Footer";
import { getCompanyById } from "@/data/companies";
import { formatDistanceToNow } from "date-fns";

// Default perks to show (since DB doesn't have perks field yet)
const DEFAULT_PERKS = [
  { icon: "public", label: "Remote-first culture" },
  { icon: "all_inclusive", label: "Flexible PTO" },
  { icon: "health_and_safety", label: "Health Coverage" },
  { icon: "monitor", label: "Home Office Setup" },
];

// Helper to get icon/color based on tech name
function getTechIcon(techName: string) {
  const techMap: Record<string, { icon: string; color: string }> = {
    React: { icon: "code_blocks", color: "text-blue-400" },
    "Next.js": { icon: "deployed_code", color: "text-white" },
    TypeScript: { icon: "javascript", color: "text-yellow-400" },
    JavaScript: { icon: "javascript", color: "text-yellow-400" },
    Go: { icon: "data_object", color: "text-blue-300" },
    Golang: { icon: "data_object", color: "text-blue-300" },
    AWS: { icon: "cloud", color: "text-orange-400" },
    GraphQL: { icon: "api", color: "text-purple-400" },
    Rust: { icon: "terminal", color: "text-gray-400" },
    Python: { icon: "bolt", color: "text-yellow-300" },
    Node: { icon: "terminal", color: "text-green-400" },
    "Node.js": { icon: "terminal", color: "text-green-400" },
    Docker: { icon: "deployed_code", color: "text-blue-400" },
    Kubernetes: { icon: "deployed_code", color: "text-blue-500" },
    PostgreSQL: { icon: "database", color: "text-blue-400" },
    MongoDB: { icon: "database", color: "text-green-400" },
    Redis: { icon: "database", color: "text-red-400" },
  };
  return techMap[techName] || { icon: "code", color: "text-gray-400" };
}

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const company = await getCompanyById(params.id);

  if (!company) {
    return {
      title: "Company Not Found | hired.io",
      description: "The company you're looking for doesn't exist or has been removed.",
    };
  }

  const overview = company.CompanyOverview?.[0];
  const jobCount = company.Job?.length || 0;
  const companyName = overview?.name || company.name;

  return {
    title: `${companyName} Careers | hired.io`,
    description: `Explore ${jobCount} open positions at ${companyName}. ${overview?.industry || "Technology"} company based in ${overview?.location || "Remote"}. ${overview?.description?.slice(0, 100) || "Join our team!"}`,
    openGraph: {
      title: `${companyName} - Jobs & Careers`,
      description: `${jobCount} open positions • ${overview?.employee || "N/A"} employees • ${overview?.industry || "Technology"}`,
      type: "website",
    },
  };
}

export default async function CompanyDetailPage({ params }: PageProps) {
  const company = await getCompanyById(params.id);

  if (!company) {
    notFound();
  }

  const overview = company.CompanyOverview?.[0];
  const jobs = company.Job || [];
  const techStack = overview?.techStack || [];

  // Parse description as about paragraphs (split by newlines or use as single)
  const aboutParagraphs = overview?.description
    ? overview.description.replace(/<[^>]*>/g, "").split(/\n\n|\n/).filter(Boolean)
    : ["This company has not provided a description yet."];

  return (
    <div className="bg-background-dark font-display text-white overflow-x-hidden min-h-screen flex flex-col">
      <Navbar />

      <main className="relative pt-32 pb-12 px-4 md:px-10 lg:px-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] bg-grid pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-green/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-40 left-0 w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-sm text-gray-400">
            <Link
              href="/find-companies"
              className="hover:text-neon-green transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">
                arrow_back
              </span>
              Back to Companies
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-white">{overview?.name || company.name}</span>
          </div>

          {/* Company Header Card */}
          <div className="glass-panel p-8 rounded-[2rem] mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-neon-green/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center relative z-10">
              {/* Logo */}
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-white flex items-center justify-center p-4 shadow-2xl shadow-black/50 border border-white/10">
                {company.logo ? (
                  <img
                    alt={`${overview?.name || company.name} Logo`}
                    className="w-full h-full object-contain"
                    src={company.logo}
                  />
                ) : (
                  <span className="text-4xl font-bold text-black">
                    {(overview?.name || company.name).charAt(0)}
                  </span>
                )}
              </div>

              {/* Company Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
                    {overview?.name || company.name}
                  </h1>
                  <span
                    className="material-symbols-outlined text-blue-400"
                    title="Verified Company"
                  >
                    verified
                  </span>
                </div>
                <p className="text-xl text-gray-400 font-light max-w-2xl mb-6">
                  {overview?.description
                    ? overview.description.replace(/<[^>]*>/g, "").slice(0, 150) + "..."
                    : "Building innovative solutions."}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-4 md:gap-8 border-t border-white/5 pt-6">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">
                      Headquarters
                    </span>
                    <div className="flex items-center gap-1.5 text-gray-200">
                      <span className="material-symbols-outlined text-neon-green text-sm">
                        public
                      </span>
                      {overview?.location || "Remote"}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">
                      Company Size
                    </span>
                    <div className="flex items-center gap-1.5 text-gray-200">
                      <span className="material-symbols-outlined text-neon-purple text-sm">
                        groups
                      </span>
                      {overview?.employee || "N/A"} Employees
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">
                      Industry
                    </span>
                    <div className="flex items-center gap-1.5 text-gray-200">
                      <span className="material-symbols-outlined text-neon-green text-sm">
                        business
                      </span>
                      {overview?.industry || "Technology"}
                    </div>
                  </div>
                  {overview?.website && (
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">
                        Website
                      </span>
                      <a
                        className="flex items-center gap-1.5 text-neon-green hover:text-white transition-colors"
                        href={overview.website.startsWith("http") ? overview.website : `https://${overview.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {overview.website.replace(/^https?:\/\//, "")}
                        <span className="material-symbols-outlined text-sm">
                          open_in_new
                        </span>
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 w-full md:w-auto min-w-[180px]">
                <Link
                  href="#open-roles"
                  className="bg-neon-green hover:bg-[#3cd612] text-background-dark font-bold rounded-xl px-6 py-3 transition-all shadow-[0_0_15px_rgba(73,230,25,0.3)] hover:shadow-[0_0_25px_rgba(73,230,25,0.5)] flex items-center justify-center gap-2"
                >
                  View All Jobs
                  <span className="bg-black/20 text-black px-1.5 py-0.5 rounded text-xs font-mono font-bold">
                    {jobs.length}
                  </span>
                </Link>
                <button className="glass-panel hover:bg-white/5 text-white font-bold rounded-xl px-6 py-3 transition-all border border-white/10 flex items-center justify-center gap-2 group">
                  <span className="material-symbols-outlined group-hover:text-neon-green transition-colors">
                    favorite
                  </span>
                  Follow
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6 md:space-y-8">
              {/* About Section */}
              <div className="glass-panel p-6 md:p-8 rounded-[2rem]">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="size-2 rounded-full bg-neon-green glow-text" />
                  About {overview?.name || company.name}
                </h2>
                <div className="text-gray-400 space-y-4 leading-relaxed">
                  {aboutParagraphs.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              {techStack.length > 0 && (
                <div className="glass-panel p-6 md:p-8 rounded-[2rem]">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                      <span className="material-symbols-outlined text-neon-purple">
                        code
                      </span>
                      Tech Stack
                    </h2>
                    <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded border border-white/5">
                      Core Technologies
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {techStack.map((tech) => {
                      const { icon, color } = getTechIcon(tech);
                      return (
                        <div
                          key={tech}
                          className="bg-accent-dark/50 border border-white/5 px-4 py-3 rounded-xl flex items-center gap-3 hover:border-neon-green/50 transition-colors cursor-default"
                        >
                          <span className={`material-symbols-outlined ${color}`}>
                            {icon}
                          </span>
                          <span className="font-mono text-sm text-gray-200">
                            {tech}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Open Roles */}
              <div className="relative" id="open-roles">
                <div className="flex items-end gap-4 mb-6">
                  <h2 className="text-3xl font-bold text-white">Open Roles</h2>
                  <span className="text-4xl font-black text-neon-green glow-text mb-1">
                    {jobs.length}
                  </span>
                </div>
                {jobs.length > 0 ? (
                  <div className="space-y-4">
                    {jobs.map((job) => (
                      <Link
                        key={job.id}
                        href={`/detail/job/${job.id}`}
                        className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-neon-green/50 hover:bg-white/[0.02] transition-all duration-300"
                      >
                        <div>
                          <h3 className="text-lg font-bold text-white group-hover:text-neon-green transition-colors">
                            {job.roles}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-400 mt-2">
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-xs">
                                apartment
                              </span>
                              {job.jobType}
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-xs">
                                location_on
                              </span>
                              {job.location || "Remote"}
                            </span>
                            <span className="text-neon-green font-mono text-xs px-2 py-0.5 rounded bg-neon-green/10">
                              ${job.salaryFrom}k - ${job.salaryTo}k
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {job.requiredSkills && job.requiredSkills.length > 0 && (
                            <div className="flex -space-x-2">
                              {job.requiredSkills.slice(0, 3).map((skill, i) => (
                                <div
                                  key={i}
                                  className="w-8 h-8 rounded-full bg-accent-dark border border-card-dark flex items-center justify-center text-[10px] text-gray-400"
                                  title={skill}
                                >
                                  {skill.slice(0, 2)}
                                </div>
                              ))}
                            </div>
                          )}
                          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-neon-green group-hover:text-black group-hover:border-neon-green transition-all">
                            <span className="material-symbols-outlined">
                              arrow_forward
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="glass-panel p-8 rounded-2xl text-center">
                    <span className="material-symbols-outlined text-4xl text-gray-600 mb-4">
                      work_off
                    </span>
                    <p className="text-gray-400">No open positions at the moment.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* At a Glance */}
              <div className="glass-panel p-6 rounded-[2rem] space-y-4">
                <h3 className="font-bold text-white mb-2">At a Glance</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <span className="text-xs text-gray-500 block mb-1">
                      Founded
                    </span>
                    <span className="text-white font-mono font-bold">
                      {overview?.dateFounded
                        ? new Date(overview.dateFounded).getFullYear()
                        : "N/A"}
                    </span>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <span className="text-xs text-gray-500 block mb-1">
                      Open Jobs
                    </span>
                    <span className="text-neon-green font-mono font-bold glow-text">
                      {jobs.length}
                    </span>
                  </div>
                  <div className="col-span-2 bg-white/5 rounded-xl p-4 border border-white/5">
                    <span className="text-xs text-gray-500 block mb-1">
                      Industry
                    </span>
                    <span className="text-white text-sm">
                      {overview?.industry || "Technology"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Perks & Benefits */}
              <div className="glass-panel p-6 rounded-[2rem] border-neon-purple/10 bg-neon-purple/5">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-neon-purple">
                    diamond
                  </span>
                  Perks & Benefits
                </h3>
                <ul className="space-y-3">
                  {DEFAULT_PERKS.map((perk) => (
                    <li
                      key={perk.label}
                      className="flex items-center gap-3 text-sm text-gray-300"
                    >
                      <div className="size-8 rounded-full bg-neon-purple/20 flex items-center justify-center text-neon-purple">
                        <span
                          className="material-symbols-outlined"
                          style={{ fontSize: "16px" }}
                        >
                          {perk.icon}
                        </span>
                      </div>
                      {perk.label}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Links */}
              {company.CompanySocialMedia?.[0] && (
                <div className="glass-panel p-6 rounded-[2rem]">
                  <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-neon-green">
                      share
                    </span>
                    Connect
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {company.CompanySocialMedia[0].twitter && (
                      <a
                        href={company.CompanySocialMedia[0].twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 bg-white/5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        Twitter
                      </a>
                    )}
                    {company.CompanySocialMedia[0].linkedin && (
                      <a
                        href={company.CompanySocialMedia[0].linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 bg-white/5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        LinkedIn
                      </a>
                    )}
                    {company.CompanySocialMedia[0].facebook && (
                      <a
                        href={company.CompanySocialMedia[0].facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 bg-white/5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        Facebook
                      </a>
                    )}
                    {company.CompanySocialMedia[0].instagram && (
                      <a
                        href={company.CompanySocialMedia[0].instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 bg-white/5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        Instagram
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
