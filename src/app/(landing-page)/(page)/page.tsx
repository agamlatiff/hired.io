import Link from "next/link";
import Navbar from "@/components/page/Navbar";
import Footer from "@/components/page/Footer";
import HeroSection from "@/components/page/HeroSection";
import { getCompanies, getJobs } from "@/data";

// Trending tech stacks (Keeping as static for now as per plan, or can be fetched if needed, but sticking to static for simplicity/speed)
const trendingTech = [
  {
    name: "React",
    jobs: "2,400+",
    icon: "code",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    name: "Node.js",
    jobs: "1,800+",
    icon: "terminal",
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    name: "Python",
    jobs: "3,100+",
    icon: "bolt",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  {
    name: "AWS",
    jobs: "4,000+",
    icon: "cloud",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    name: "Rust",
    jobs: "600+",
    icon: "memory",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    name: "Solidity",
    jobs: "450+",
    icon: "layers",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
];

export default async function HomePage() {
  const companies = await getCompanies();
  const jobs = await getJobs();

  // Take top 4 companies
  const displayedCompanies = companies.slice(0, 4);
  // Take top 4 jobs
  const displayedJobs = jobs.slice(0, 4);

  return (
    <div className="bg-background-dark font-display text-white overflow-x-hidden min-h-screen flex flex-col">
      <Navbar />

      <HeroSection />

      {/* Top Companies Section */}
      <section className="px-4 md:px-10 lg:px-20 py-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Top Hiring Companies</h2>
              <p className="text-gray-400 text-sm">
                Companies with the highest dev satisfaction scores
              </p>
            </div>
            <Link
              href="/find-companies"
              className="text-neon-green text-sm font-bold flex items-center hover:underline"
            >
              View all companies{" "}
              <span className="material-symbols-outlined text-base ml-1">
                arrow_forward
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedCompanies.map((company) => (
              <Link
                href={`/detail/company/${company.id}`}
                key={company.id}
                className="glass-panel p-6 rounded-3xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 cursor-pointer block"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-neon-green">
                    arrow_outward
                  </span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center overflow-hidden">
                    {company.logo ? (
                      <img
                        alt={`${company.name} Logo`}
                        className="w-8 h-8 object-contain"
                        src={company.logo}
                      />
                    ) : (
                      <span className="text-black font-bold text-lg">
                        {company.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg truncate w-[150px]">
                      {company.name}
                    </h3>
                    <p className="text-xs text-gray-400">
                      {company.CompanyOverview?.[0]?.industry || "Tech"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mb-4">
                  <span className="bg-neon-green/10 text-neon-green text-[10px] font-bold px-2 py-1 rounded">
                    {company.plan === "enterprise" ? "ENTERPRISE" : "STARTUP"}
                  </span>
                  <span className="bg-white/5 text-gray-300 text-[10px] font-bold px-2 py-1 rounded">
                    Remote
                  </span>
                </div>
                <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                  <span className="text-sm text-gray-400">
                    {company._count.Job} Open Roles
                  </span>
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-gray-700 border border-card-dark" />
                    <div className="w-6 h-6 rounded-full bg-gray-600 border border-card-dark flex items-center justify-center text-[8px]">
                      +{Math.max(0, company._count.Job - 1)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="px-4 md:px-10 lg:px-20 py-16 bg-gradient-to-b from-transparent to-black/30">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl font-black mb-10 text-center">
            Featured Opportunities
          </h2>
          <div className="space-y-4">
            {displayedJobs.map((job) => (
              <Link
                href={`/detail/job/${job.id}`}
                key={job.id}
                className="glow-box group relative bg-card-dark border border-accent-dark hover:border-neon-green/50 rounded-full p-3 pr-8 transition-all duration-300 flex flex-col md:flex-row items-center gap-6 cursor-pointer block"
              >
                <div className="flex items-center gap-4 w-full md:w-auto pl-3">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0 overflow-hidden">
                    {job.Company?.logo ? (
                      <img
                        alt={`${job.Company.name} Logo`}
                        className="w-10 h-10 object-contain"
                        src={job.Company.logo}
                      />
                    ) : (
                      <span className="material-symbols-outlined text-black font-bold text-2xl">
                        work
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-lg font-bold text-white group-hover:text-neon-green transition-colors">
                      {job.roles}
                    </h3>
                    <span className="text-sm text-gray-400">
                      {job.Company?.name} • {job.location || "Remote"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto md:flex-1 md:justify-center px-4">
                  {job.requiredSkills.slice(0, 3).map((skill, i) => (
                    <span
                      key={i}
                      className="shrink-0 px-3 py-1 rounded-full bg-accent-dark text-xs font-mono text-gray-300 border border-white/5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between w-full md:w-auto gap-8 pl-4 md:pl-0 border-t md:border-t-0 border-white/5 pt-3 md:pt-0">
                  <div className="flex flex-col items-end">
                    <span className="text-neon-green font-bold text-lg glow-text">
                      ${job.salaryFrom}k - ${job.salaryTo}k
                    </span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                      {job.jobType}
                    </span>
                  </div>
                  <button className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-neon-green group-hover:text-black transition-colors shrink-0">
                    <span className="material-symbols-outlined">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/find-jobs"
              className="inline-block bg-accent-dark hover:bg-white/10 text-white font-bold py-3 px-8 rounded-full border border-white/10 transition-colors"
            >
              View {Math.max(0, jobs.length - 4)} more jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Tech Stacks Section */}
      <section className="px-4 md:px-10 lg:px-20 py-16">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-gray-300">
            Trending Tech Stacks
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {trendingTech.map((tech) => (
              <Link
                key={tech.name}
                href={`/find-jobs?q=${tech.name}`}
                className="bg-card-dark border border-accent-dark p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-neon-green/50 transition-colors cursor-pointer group block"
              >
                <div
                  className={`w-12 h-12 ${tech.bg} rounded-full flex items-center justify-center ${tech.color} group-hover:scale-110 transition-transform`}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "28px" }}
                  >
                    {tech.icon}
                  </span>
                </div>
                <span className="font-bold text-white">{tech.name}</span>
                <span className="text-xs text-gray-500">{tech.jobs} jobs</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
