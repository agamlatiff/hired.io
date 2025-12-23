"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/page/Navbar";
import Footer from "@/components/page/Footer";

// Sample company data
const companyData = {
  id: 1,
  name: "Vercel",
  tagline:
    "The platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration.",
  location: "San Francisco (Remote First)",
  employees: "201-500 Employees",
  funding: "Series D",
  website: "vercel.com",
  founded: "2015",
  totalFunding: "$313M",
  investors: "Accel, CRV, GV, Bedrock Capital, Geodesic Capital",
  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAmRxDHv2vweGovYx9DWWH3IOHQUMsap5anKHu2FlbXHWuB_LDnq8eBMNLOBom2vsXEvaQPlESS6KPwIZvZyUqCpW6fScnO1QRU19Zy7gzUCEbI9XatG3gVtJky5DbWxn2k7KQfu_nBMMtAshbXYw2dbz6_AlM7SM0L13rzrEdvAypuNvqSlyj9vCdIyRdXZTLo1O0KIy9axy5lpolMI2xcLP9SdG4yjC_rKsmw1GnST3BgILu0pZt79zXqxyTjAeUmCAj3o7_eg",
  about: [
    "Vercel is the platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration. We enable teams to iterate quickly and develop, preview, and ship delightful user experiences. Vercel has built-in CI/CD, automatic preview deployments, and is the creators of Next.js.",
    "We are backed by some of the world's best investors including Accel, GV, and Bedrock Capital. We are a remote-first company with a strong focus on developer experience and community.",
  ],
  techStack: [
    { name: "React", icon: "code_blocks", color: "text-blue-400" },
    { name: "Next.js", icon: "deployed_code", color: "text-white" },
    { name: "TypeScript", icon: "javascript", color: "text-yellow-400" },
    { name: "Go", icon: "data_object", color: "text-blue-300" },
    { name: "AWS", icon: "cloud", color: "text-orange-400" },
    { name: "GraphQL", icon: "api", color: "text-purple-400" },
    { name: "Rust", icon: "terminal", color: "text-gray-400" },
  ],
  perks: [
    { icon: "public", label: "Remote-first culture" },
    { icon: "all_inclusive", label: "Unlimited PTO" },
    { icon: "health_and_safety", label: "100% Health Coverage" },
    { icon: "monitor", label: "$2.5k Home Office Setup" },
  ],
  quote: {
    text: "The engineering culture at Vercel is unmatched. We are building the tools we use ourselves every day. It's incredibly satisfying to ship features that immediately impact millions of developers.",
    author: "Sarah Jenkins",
    role: "VP of Engineering",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuChdboI_OHS0a8NMuuC9MQ4bYSvBrn0B9whDNPQfmOBh9iqV143BmnowG0830fBE9zdgaVByCi8dkgXu9axr7sTPQckta4JFIYasGL2GQnoIxu5gNH9zcbwt9Pjf8BNc5tTkmvL0dQ8w2BCOTIZcXjGB5_W2sQxapB0U5Ju5lcVD0LNcSRsPxmgM0euzmMK9-T4aCP62PVLsyMpkhj4vsVmfx5eyeLHg-NGOZHsHL8NsWlbJ5LQTypYEpN28fgV6N1avfG0r4r5PA",
  },
  openRoles: [
    {
      id: 1,
      title: "Senior Frontend Engineer",
      department: "Engineering",
      location: "Remote (US)",
      salary: "$180k - $240k",
      skills: ["React", "TypeScript"],
    },
    {
      id: 2,
      title: "Staff Product Designer",
      department: "Design",
      location: "San Francisco",
      salary: "$200k - $260k",
      skills: [],
    },
    {
      id: 3,
      title: "Developer Advocate",
      department: "Marketing",
      location: "London / Remote",
      salary: "$140k - $190k",
      skills: [],
    },
    {
      id: 4,
      title: "Backend Engineer, Infrastructure",
      department: "Infrastructure",
      location: "Remote (EU)",
      salary: "$160k - $220k",
      skills: ["Go", "Rust"],
    },
  ],
};

export default function CompanyDetailPage() {
  const params = useParams();
  const router = useRouter();

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
            <span className="text-white">{companyData.name}</span>
          </div>

          {/* Company Header Card */}
          <div className="glass-panel p-8 rounded-[2rem] mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-neon-green/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center relative z-10">
              {/* Logo */}
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-white flex items-center justify-center p-4 shadow-2xl shadow-black/50 border border-white/10">
                <img
                  alt={`${companyData.name} Logo`}
                  className="w-full h-full object-contain"
                  src={companyData.image}
                />
              </div>

              {/* Company Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
                    {companyData.name}
                  </h1>
                  <span
                    className="material-symbols-outlined text-blue-400"
                    title="Verified Company"
                  >
                    verified
                  </span>
                </div>
                <p className="text-xl text-gray-400 font-light max-w-2xl mb-6">
                  {companyData.tagline}
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
                      {companyData.location}
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
                      {companyData.employees}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">
                      Funding Stage
                    </span>
                    <div className="flex items-center gap-1.5 text-gray-200">
                      <span className="material-symbols-outlined text-neon-green text-sm">
                        monetization_on
                      </span>
                      {companyData.funding}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">
                      Website
                    </span>
                    <a
                      className="flex items-center gap-1.5 text-neon-green hover:text-white transition-colors"
                      href="#"
                    >
                      {companyData.website}
                      <span className="material-symbols-outlined text-sm">
                        open_in_new
                      </span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 w-full md:w-auto min-w-[180px]">
                <button className="bg-neon-green hover:bg-[#3cd612] text-background-dark font-bold rounded-xl px-6 py-3 transition-all shadow-[0_0_15px_rgba(73,230,25,0.3)] hover:shadow-[0_0_25px_rgba(73,230,25,0.5)] flex items-center justify-center gap-2">
                  View All Jobs
                  <span className="bg-black/20 text-black px-1.5 py-0.5 rounded text-xs font-mono font-bold">
                    {companyData.openRoles.length}
                  </span>
                </button>
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
                  About {companyData.name}
                </h2>
                <div className="text-gray-400 space-y-4 leading-relaxed">
                  {companyData.about.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
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
                  {companyData.techStack.map((tech) => (
                    <div
                      key={tech.name}
                      className="bg-accent-dark/50 border border-white/5 px-4 py-3 rounded-xl flex items-center gap-3 hover:border-neon-green/50 transition-colors cursor-default"
                    >
                      <span
                        className={`material-symbols-outlined ${tech.color}`}
                      >
                        {tech.icon}
                      </span>
                      <span className="font-mono text-sm text-gray-200">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Open Roles */}
              <div className="relative">
                <div className="flex items-end gap-4 mb-6">
                  <h2 className="text-3xl font-bold text-white">Open Roles</h2>
                  <span className="text-4xl font-black text-neon-green glow-text mb-1">
                    {companyData.openRoles.length}
                  </span>
                </div>
                <div className="space-y-4">
                  {companyData.openRoles.map((role) => (
                    <Link
                      key={role.id}
                      href={`/detail/job/${role.id}`}
                      className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-neon-green/50 hover:bg-white/[0.02] transition-all duration-300"
                    >
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-neon-green transition-colors">
                          {role.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-400 mt-2">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">
                              apartment
                            </span>
                            {role.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">
                              location_on
                            </span>
                            {role.location}
                          </span>
                          <span className="text-neon-green font-mono text-xs px-2 py-0.5 rounded bg-neon-green/10">
                            {role.salary}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {role.skills.length > 0 && (
                          <div className="flex -space-x-2">
                            {role.skills.map((skill, i) => (
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
                <div className="mt-6 text-center">
                  <button className="text-sm font-bold text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-1 mx-auto">
                    View all {companyData.openRoles.length} open roles
                    <span className="material-symbols-outlined text-sm">
                      expand_more
                    </span>
                  </button>
                </div>
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
                      {companyData.founded}
                    </span>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <span className="text-xs text-gray-500 block mb-1">
                      Total Funding
                    </span>
                    <span className="text-neon-green font-mono font-bold glow-text">
                      {companyData.totalFunding}
                    </span>
                  </div>
                  <div className="col-span-2 bg-white/5 rounded-xl p-4 border border-white/5">
                    <span className="text-xs text-gray-500 block mb-1">
                      Investors
                    </span>
                    <span className="text-white text-sm">
                      {companyData.investors}
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
                  {companyData.perks.map((perk) => (
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

              {/* Quote */}
              <div className="glass-panel p-6 rounded-[2rem] relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <span className="material-symbols-outlined text-6xl">
                    format_quote
                  </span>
                </div>
                <div className="relative z-10">
                  <p className="text-gray-300 italic mb-6 text-sm leading-relaxed">
                    &quot;{companyData.quote.text}&quot;
                  </p>
                  <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                    <div className="size-10 rounded-full bg-gradient-to-br from-neon-green to-blue-500 p-0.5">
                      <img
                        alt="Avatar"
                        className="w-full h-full rounded-full bg-black object-cover"
                        src={companyData.quote.avatar}
                      />
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm">
                        {companyData.quote.author}
                      </div>
                      <div className="text-neon-green text-xs">
                        {companyData.quote.role}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Photo Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="glass-panel h-24 rounded-2xl flex items-center justify-center border-dashed border-2 border-white/10 hover:border-white/30 transition-colors cursor-pointer">
                  <span className="text-xs text-gray-500">Office</span>
                </div>
                <div className="glass-panel h-24 rounded-2xl flex items-center justify-center border-dashed border-2 border-white/10 hover:border-white/30 transition-colors cursor-pointer">
                  <span className="text-xs text-gray-500">Retreats</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
