"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/page/Navbar";
import Footer from "@/components/page/Footer";

// Sample job data
const jobData = {
  id: 1,
  title: "Senior Frontend Engineer",
  company: "Vercel",
  companyUrl: "vercel.com",
  location: "San Francisco, CA",
  remote: "Remote Friendly",
  postedAgo: "2 hours ago",
  salary: "$180k - $240k",
  equity: "0.05% - 0.1%",
  experience: "5+ Years",
  applicants: 42,
  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAmRxDHv2vweGovYx9DWWH3IOHQUMsap5anKHu2FlbXHWuB_LDnq8eBMNLOBom2vsXEvaQPlESS6KPwIZvZyUqCpW6fScnO1QRU19Zy7gzUCEbI9XatG3gVtJky5DbWxn2k7KQfu_nBMMtAshbXYw2dbz6_AlM7SM0L13rzrEdvAypuNvqSlyj9vCdIyRdXZTLo1O0KIy9axy5lpolMI2xcLP9SdG4yjC_rKsmw1GnST3BgILu0pZt79zXqxyTjAeUmCAj3o7_eg",
  about: [
    "Vercel is looking for a Senior Frontend Engineer to join our Core Product team. In this role, you will be responsible for building and maintaining the user interface of our platform, ensuring a seamless and performant experience for developers worldwide.",
    "You will work closely with our design and product teams to translate complex requirements into clean, efficient, and reusable code. We value craftsmanship, attention to detail, and a passion for building tools that empower other developers.",
    "If you love Next.js, obsess over web performance, and enjoy working in a fast-paced environment where your work has immediate impact, we'd love to hear from you.",
  ],
  techStack: [
    { category: "Frontend", name: "React", icon: "code", color: "text-blue-400" },
    { category: "Framework", name: "Next.js", icon: "javascript", color: "text-white" },
    { category: "Language", name: "TypeScript", icon: "data_object", color: "text-blue-500" },
    { category: "Styling", name: "Tailwind CSS", icon: "brush", color: "text-cyan-400" },
    { category: "Testing", name: "Jest / RTL", icon: "deployed_code", color: "text-purple-400" },
  ],
  responsibilities: [
    "Design and implement new features for the Vercel dashboard using React, Next.js, and TypeScript.",
    "Collaborate with designers to maintain and evolve our design system, ensuring consistency across the platform.",
    "Optimize application performance for maximum speed and scalability, aiming for 100 lighthouse scores.",
    "Conduct code reviews and mentor junior engineers, fostering a culture of technical excellence.",
  ],
  perks: [
    { icon: "monitor_heart", label: "Comprehensive Health" },
    { icon: "flight_takeoff", label: "Unlimited PTO" },
    { icon: "devices", label: "$3k Home Office Stipend" },
    { icon: "trending_up", label: "Equity Package" },
    { icon: "lunch_dining", label: "Daily Lunch Stipend" },
    { icon: "school", label: "Learning Budget" },
  ],
  companyInfo: {
    description: "Vercel is the platform for Frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration.",
    employees: "500-1000",
    industry: "Cloud",
    series: "Series D",
  },
  similarJobs: [
    { id: 2, title: "Staff Backend Engineer", company: "Stripe", salary: "$220k+", letter: "S", letterBg: "bg-[#635BFF]" },
    { id: 3, title: "Product Designer", company: "Linear", salary: "$160k+", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeBYuGCEABchKdQW_mJDi7ZhPKMd-rd6T2LwEQBSCJ6AX2FVaKZVKOv2ALHQ4l9DnoKW31y2thUGoIyddScCly8wJ4wwdNl9OCN0SuoL7EHxAb9u6cQVLnOL5XVS4RqyTR5RRdm4Wsd3jS4xyNFHyn2if6_tBTeje7OFr1M9sA5GD3sa0OxNMM6bPjS9uQFlmCHot0ZI4HMzq_xXn0FFoEhGswC2zlkgpvoSCKYZD-iWVCwJJu0VR-klvFUEf-a0EXeMehjLLNRA", logoBg: "bg-black border border-gray-700" },
    { id: 4, title: "iOS Engineer", company: "Discord", salary: "$190k+", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0P6Sg4EjTkyHcqfJr33vWJT9FBK0jGBCJWFt0uz4rj51c8VPNWmzAWuRGiYttYTkoUhCpQgSnmDfLyCDKJbprQzgXdZx5qAw_XjxvJUXtOpmdN92MCR1LWmSImIFDq22Rs-TYELZLWstKNkl6fyDHMHEiin58Z3l0bLY4lEWDGEIMOU1bKijaKJOGZJxZpyPZALP8oTwBwZz8VCv5vYMDsF_Q792sEhW5K_TbeD4-h3qmooBa4QcQ3lUfdRk16WZkYyl60I9lnw", logoBg: "bg-[#5865F2]", invertLogo: true },
  ],
};

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();

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
            <span className="text-white">{jobData.title}</span>
          </div>

          {/* Job Header Card */}
          <div className="relative group mb-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-neon-green/20 via-transparent to-neon-purple/20 rounded-3xl blur-lg opacity-40 group-hover:opacity-60 transition duration-700" />
            <div className="glass-panel relative rounded-3xl p-8 md:p-10 border border-white/10">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Company Logo */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white flex items-center justify-center shrink-0 p-4 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  <img
                    alt={`${jobData.company} Logo`}
                    className="w-full h-full object-contain"
                    src={jobData.image}
                  />
                </div>

                <div className="flex-1 w-full">
                  <div className="flex flex-col xl:flex-row justify-between xl:items-start gap-6">
                    <div>
                      <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-3">
                        {jobData.title}
                      </h1>
                      <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm md:text-base font-medium">
                        <span className="text-white flex items-center gap-1">
                          {jobData.company}
                          <span className="material-symbols-outlined text-blue-400 text-sm ml-1">
                            verified
                          </span>
                        </span>
                        <span className="w-1 h-1 rounded-full bg-gray-600" />
                        <span>{jobData.location}</span>
                        <span className="px-2 py-0.5 rounded text-xs bg-neon-green/10 text-neon-green border border-neon-green/20">
                          {jobData.remote}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-gray-600" />
                        <span>Posted {jobData.postedAgo}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto mt-2 xl:mt-0">
                      <div className="flex gap-3">
                        <button
                          className="flex-1 sm:flex-none h-12 px-4 rounded-xl bg-card-dark border border-accent-dark hover:border-white/20 text-gray-400 hover:text-white flex items-center justify-center transition-all group/btn"
                          title="Save Job"
                        >
                          <span className="material-symbols-outlined group-hover/btn:scale-110 transition-transform">
                            bookmark_border
                          </span>
                        </button>
                        <button
                          className="flex-1 sm:flex-none h-12 px-4 rounded-xl bg-card-dark border border-accent-dark hover:border-white/20 text-gray-400 hover:text-white flex items-center justify-center transition-all group/btn"
                          title="Share"
                        >
                          <span className="material-symbols-outlined group-hover/btn:scale-110 transition-transform">
                            share
                          </span>
                        </button>
                      </div>
                      <button
                        onClick={() =>
                          router.push(`/detail/job/${params.id}/apply`)
                        }
                        className="flex-1 sm:flex-none bg-neon-green hover:bg-[#3cd612] text-background-dark font-extrabold rounded-xl px-10 h-12 transition-all shadow-[0_0_20px_rgba(73,230,25,0.3)] hover:shadow-[0_0_30px_rgba(73,230,25,0.5)] active:scale-95 whitespace-nowrap text-lg flex items-center justify-center gap-2"
                      >
                        <span>Apply Now</span>
                        <span className="material-symbols-outlined text-xl">
                          arrow_outward
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap items-center gap-y-6 gap-x-10 mt-8 pt-8 border-t border-white/5">
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">
                        Salary Range
                      </div>
                      <div className="text-2xl md:text-3xl font-bold text-neon-green glow-text font-mono tracking-tight">
                        {jobData.salary}
                        <span className="text-lg text-gray-500 font-normal">
                          /yr
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">
                        Equity
                      </div>
                      <div className="text-xl md:text-2xl font-bold text-white font-mono">
                        {jobData.equity}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">
                        Experience
                      </div>
                      <div className="text-xl md:text-2xl font-bold text-white">
                        {jobData.experience}
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
                          +{jobData.applicants}
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
                  {jobData.about.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </section>

              {/* Tech Stack */}
              <section className="glass-panel rounded-2xl p-8 border border-accent-dark">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="p-2 rounded-lg bg-neon-purple/10 text-neon-purple">
                    <span className="material-symbols-outlined">code</span>
                  </span>
                  Tech Stack
                </h2>
                <div className="flex flex-wrap gap-3">
                  {jobData.techStack.map((tech) => (
                    <div
                      key={tech.name}
                      className="px-4 py-2 rounded-xl bg-card-dark border border-accent-dark flex items-center gap-3 cursor-default group hover:-translate-y-0.5 hover:border-neon-green/30 transition-all"
                    >
                      <div
                        className={`w-6 h-6 rounded-full bg-white/5 flex items-center justify-center ${tech.color}`}
                      >
                        <span className="material-symbols-outlined text-sm">
                          {tech.icon}
                        </span>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 font-bold uppercase tracking-wide">
                          {tech.category}
                        </div>
                        <div className="text-white font-mono text-sm group-hover:text-neon-green transition-colors">
                          {tech.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

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
                  {jobData.responsibilities.map((item, i) => (
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
                  {jobData.perks.map((perk) => (
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
                    <img
                      alt={`${jobData.company} Logo`}
                      className="w-full h-full object-contain"
                      src={jobData.image}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{jobData.company}</h3>
                    <a
                      className="text-neon-green text-xs hover:text-[#3cd612] hover:underline flex items-center gap-1"
                      href="#"
                    >
                      {jobData.companyUrl}
                      <span className="material-symbols-outlined text-[10px]">
                        open_in_new
                      </span>
                    </a>
                  </div>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  {jobData.companyInfo.description}
                </p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-card-dark p-3 rounded-lg border border-white/5">
                    <div className="text-xs text-gray-500 mb-1">Employees</div>
                    <div className="font-bold text-white text-sm">
                      {jobData.companyInfo.employees}
                    </div>
                  </div>
                  <div className="bg-card-dark p-3 rounded-lg border border-white/5">
                    <div className="text-xs text-gray-500 mb-1">Industry</div>
                    <div className="font-bold text-white text-sm">
                      {jobData.companyInfo.industry}
                    </div>
                  </div>
                  <div className="bg-card-dark p-3 rounded-lg border border-white/5">
                    <div className="text-xs text-gray-500 mb-1">Location</div>
                    <div className="font-bold text-white text-sm">SF, CA</div>
                  </div>
                  <div className="bg-card-dark p-3 rounded-lg border border-white/5">
                    <div className="text-xs text-gray-500 mb-1">Series</div>
                    <div className="font-bold text-white text-sm">
                      {jobData.companyInfo.series}
                    </div>
                  </div>
                </div>
                <button className="w-full py-2.5 rounded-lg bg-card-dark border border-accent-dark text-gray-300 hover:text-white hover:border-gray-500 hover:bg-white/5 transition-all text-sm font-semibold">
                  View Company Profile
                </button>
              </div>

              {/* Similar Jobs */}
              <div className="glass-panel rounded-2xl p-6 border border-accent-dark">
                <h3 className="font-bold text-white mb-4">Similar Jobs</h3>
                <div className="space-y-4">
                  {jobData.similarJobs.map((job) => (
                    <Link
                      key={job.id}
                      href={`/detail/job/${job.id}`}
                      className="block group"
                    >
                      <div className="flex gap-3 items-center">
                        <div
                          className={`w-10 h-10 rounded-lg ${job.letterBg || job.logoBg} flex items-center justify-center shrink-0 shadow-lg transition-transform group-hover:scale-105`}
                        >
                          {job.image ? (
                            <img
                              alt={`${job.company} Logo`}
                              className={`w-5 h-5 object-contain ${job.invertLogo ? "brightness-0 invert" : ""}`}
                              src={job.image}
                            />
                          ) : (
                            <span className="text-white font-bold">
                              {job.letter}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-bold text-sm truncate group-hover:text-neon-green transition-colors">
                            {job.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                            <span>{job.company}</span>
                            <span>•</span>
                            <span className="text-green-400">{job.salary}</span>
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
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
