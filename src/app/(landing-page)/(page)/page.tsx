"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/page/Navbar";
import Footer from "@/components/page/Footer";
import { useState } from "react";

// Sample data for companies
const topCompanies = [
  {
    id: 1,
    name: "Vercel",
    industry: "Frontend Cloud",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAmRxDHv2vweGovYx9DWWH3IOHQUMsap5anKHu2FlbXHWuB_LDnq8eBMNLOBom2vsXEvaQPlESS6KPwIZvZyUqCpW6fScnO1QRU19Zy7gzUCEbI9XatG3gVtJky5DbWxn2k7KQfu_nBMMtAshbXYw2dbz6_AlM7SM0L13rzrEdvAypuNvqSlyj9vCdIyRdXZTLo1O0KIy9axy5lpolMI2xcLP9SdG4yjC_rKsmw1GnST3BgILu0pZt79zXqxyTjAeUmCAj3o7_eg",
    badges: ["REMOTE FIRST", "SERIES D"],
    openRoles: 12,
    bgColor: "bg-white",
  },
  {
    id: 2,
    name: "Stripe",
    industry: "Fintech",
    image: null,
    letter: "S",
    letterBg: "bg-[#635BFF]",
    badges: ["HYBRID", "PUBLIC"],
    openRoles: 45,
  },
  {
    id: 3,
    name: "Linear",
    industry: "Project Mgmt",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeBYuGCEABchKdQW_mJDi7ZhPKMd-rd6T2LwEQBSCJ6AX2FVaKZVKOv2ALHQ4l9DnoKW31y2thUGoIyddScCly8wJ4wwdNl9OCN0SuoL7EHxAb9u6cQVLnOL5XVS4RqyTR5RRdm4Wsd3jS4xyNFHyn2if6_tBTeje7OFr1M9sA5GD3sa0OxNMM6bPjS9uQFlmCHot0ZI4HMzq_xXn0FFoEhGswC2zlkgpvoSCKYZD-iWVCwJJu0VR-klvFUEf-a0EXeMehjLLNRA",
    badges: ["REMOTE", "SERIES B"],
    openRoles: 8,
    bgColor: "bg-black border border-gray-700",
  },
  {
    id: 4,
    name: "OpenAI",
    industry: "Artificial Intelligence",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGwfyDSdpRwqBhWIiRYNcQcm5y8vqoS2STc9RTyM2wNgoI2GMMzYZCi4Vg80MC_X5GSD_de8zLgGMCYt6gZMu8L2shOYE_m9DDpdTk3csCKFVhxG_er6heYHNwVmdtyJn3uYsy36HNylJSaBl-bb735tuuxb5DqLTlIV0K3VFojPGFh49O-xRNWHnsa_O5p2ZHGbvsuUkx_LdYyKd2918GnAH2NhRojynNmoBVTGSwm6XIySi0wW2R6sp2QrK-i1PP9H9SAZfB9w",
    badges: ["ON-SITE", "ENTERPRISE"],
    openRoles: 80,
    bgColor: "bg-black border border-gray-700",
  },
];

// Sample data for featured jobs
const featuredJobs = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    company: "Airbnb",
    location: "Remote, US",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEGcgf3gTYdc96SuM-_DXtO5u3FkgcZmzROQVjlIRkOI_wPH9gWlIm5Ysx0VA3BGtpF0u22c2OAcArklBFLZWcDUbOTTJRf11ptIKnCwTlthbGqwjj-G10GOVevigBIqx0JeBO7Z1TueevaEdVW3wlhy4ktuPYTTzmW_T9BW7Yh_sDL7NFQLucyPZeYVRvHUQ8aSnCl33es0LqisSFGu5fHSOGzHCchDEGu6uTvyXhvhhddK7cICHvaCUAA0TfWKPB5ZmunUk2iQ",
    skills: ["React", "GraphQL", "TypeScript"],
    salary: "$180k - $240k",
    salaryType: "Salary + Equity",
    logoBg: "bg-white",
  },
  {
    id: 2,
    title: "Staff Backend Engineer",
    company: "Discord",
    location: "San Francisco",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0P6Sg4EjTkyHcqfJr33vWJT9FBK0jGBCJWFt0uz4rj51c8VPNWmzAWuRGiYttYTkoUhCpQgSnmDfLyCDKJbprQzgXdZx5qAw_XjxvJUXtOpmdN92MCR1LWmSImIFDq22Rs-TYELZLWstKNkl6fyDHMHEiin58Z3l0bLY4lEWDGEIMOU1bKijaKJOGZJxZpyPZALP8oTwBwZz8VCv5vYMDsF_Q792sEhW5K_TbeD4-h3qmooBa4QcQ3lUfdRk16WZkYyl60I9lnw",
    skills: ["Rust", "Elixir", "Distributed Systems"],
    salary: "$220k - $300k",
    salaryType: "Total Comp",
    logoBg: "bg-[#5865F2]",
    invertLogo: true,
  },
  {
    id: 3,
    title: "Mobile Engineer, iOS",
    company: "Uber",
    location: "New York, NY",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOQC2BT7d6myeRXvKJNUXUNgdIdsjlQqFsu9SpuMPbduHn5u-7mlqHz3_0YM7DJeWLI-GGsj0MvdPMporzfw8Whpo9nvZ2CN8arheZr23ehzgqoY5DhJwZHinqzHyAyo1WGqz5Me2kN7kgViCAIxh3YVa5-5T87D0X2jgpeMyI6c-1HmhN1UBuxuZNYRUi7ozSm9GgqLiKcwrmuKKrPRi1s4dAPJU5VGgQqxZRVj2j5tKdUGTFVwn2mp5z1PDsx8OAQknWJdzVuQ",
    skills: ["Swift", "Obj-C", "Mobile"],
    salary: "$160k - $210k",
    salaryType: "Base Salary",
    logoBg: "bg-black border border-gray-700",
    invertLogo: true,
  },
  {
    id: 4,
    title: "Fullstack Developer",
    company: "Startup Stealth",
    location: "Remote",
    image: null,
    icon: "code",
    skills: ["Next.js", "Supabase", "Tailwind"],
    salary: "$120k - $160k",
    salaryType: "Salary + Stock",
    logoBg: "bg-[#61DAFB]",
  },
];

// Tech chips for hero
const techChips = [
  { name: "React", icon: "code", color: "text-neon-green" },
  { name: "Node.js", icon: "database", color: "text-purple-400" },
  { name: "Python", icon: "terminal", color: "text-blue-400" },
  { name: "Rust", icon: "deployed_code", color: "text-orange-400" },
  { name: "Solidity", icon: "token", color: "text-yellow-400" },
];

// Trending tech stacks
const trendingTech = [
  { name: "React", jobs: "2,400+", icon: "code", color: "text-blue-400", bg: "bg-blue-500/10" },
  { name: "Node.js", jobs: "1,800+", icon: "terminal", color: "text-green-400", bg: "bg-green-500/10" },
  { name: "Python", jobs: "3,100+", icon: "bolt", color: "text-yellow-400", bg: "bg-yellow-500/10" },
  { name: "AWS", jobs: "4,000+", icon: "cloud", color: "text-cyan-400", bg: "bg-cyan-500/10" },
  { name: "Rust", jobs: "600+", icon: "memory", color: "text-orange-400", bg: "bg-orange-500/10" },
  { name: "Solidity", jobs: "450+", icon: "layers", color: "text-purple-400", bg: "bg-purple-500/10" },
];

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("Remote");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (location) params.set("location", location);
    router.push(`/find-jobs?${params.toString()}`);
  };

  return (
    <div className="bg-background-dark font-display text-white overflow-x-hidden min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 md:px-10 lg:px-20 min-h-[85vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.07] bg-grid pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-green/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl w-full text-center relative z-10 flex flex-col items-center gap-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-green/20 bg-neon-green/10 text-neon-green text-xs font-bold uppercase tracking-wider mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green" />
            </span>
            Over 500+ new dev jobs added today
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] bg-clip-text text-transparent bg-gradient-to-br from-white via-gray-200 to-gray-500 pb-2">
            Code Your Future.
            <br />
            <span className="text-white relative">
              Find the top 1%
              <svg
                className="absolute -bottom-2 w-full h-3 text-neon-green"
                preserveAspectRatio="none"
                viewBox="0 0 100 10"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </svg>
            </span>{" "}
            dev jobs.
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Join the exclusive network where top tech companies compete to hire
            you. Transparent salaries, direct access to founders, and zero spam.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="w-full max-w-2xl mt-6 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-neon-green to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            <div className="relative flex items-center bg-card-dark border border-accent-dark rounded-2xl p-2 shadow-2xl">
              <div className="pl-4 text-gray-500">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 focus:outline-none px-4 py-3 text-base md:text-lg"
                placeholder="Search by technology, role (e.g. 'Rust', 'Senior Backend')..."
              />
              <div className="hidden sm:flex border-l border-accent-dark pl-2">
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-transparent border-none text-gray-300 text-sm font-medium focus:ring-0 focus:outline-none cursor-pointer py-3 pr-8"
                >
                  <option value="Remote">Remote</option>
                  <option value="On-site">On-site</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-neon-green hover:bg-[#3cd612] text-background-dark font-bold rounded-xl px-6 py-3 ml-2 transition-transform active:scale-95"
              >
                Search
              </button>
            </div>
          </form>

          {/* Tech Chips */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {techChips.map((chip) => (
              <button
                key={chip.name}
                onClick={() => {
                  setSearchQuery(chip.name);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent-dark hover:bg-white/10 border border-transparent hover:border-white/20 transition-all group"
              >
                <span
                  className={`material-symbols-outlined ${chip.color} group-hover:scale-110 transition-transform text-lg`}
                >
                  {chip.icon}
                </span>
                <span className="text-sm font-medium text-gray-300 group-hover:text-white">
                  {chip.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

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
            {topCompanies.map((company) => (
              <div
                key={company.id}
                onClick={() => router.push(`/find-companies/${company.id}`)}
                className="glass-panel p-6 rounded-3xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-neon-green">
                    arrow_outward
                  </span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl ${company.bgColor || company.letterBg} flex items-center justify-center overflow-hidden`}
                  >
                    {company.image ? (
                      <img
                        alt={`${company.name} Logo`}
                        className="w-8 h-8 object-contain"
                        src={company.image}
                      />
                    ) : (
                      <span className="text-white font-bold text-lg">
                        {company.letter}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{company.name}</h3>
                    <p className="text-xs text-gray-400">{company.industry}</p>
                  </div>
                </div>
                <div className="flex gap-2 mb-4">
                  {company.badges.map((badge, i) => (
                    <span
                      key={i}
                      className={`${i === 0 ? "bg-neon-green/10 text-neon-green" : "bg-white/5 text-gray-300"} text-[10px] font-bold px-2 py-1 rounded`}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                  <span className="text-sm text-gray-400">
                    {company.openRoles} Open Roles
                  </span>
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-gray-700 border border-card-dark" />
                    <div className="w-6 h-6 rounded-full bg-gray-600 border border-card-dark flex items-center justify-center text-[8px]">
                      +{Math.max(0, company.openRoles - 5)}
                    </div>
                  </div>
                </div>
              </div>
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
            {featuredJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => router.push(`/detail/job/${job.id}`)}
                className="glow-box group relative bg-card-dark border border-accent-dark hover:border-neon-green/50 rounded-full p-3 pr-8 transition-all duration-300 flex flex-col md:flex-row items-center gap-6 cursor-pointer"
              >
                <div className="flex items-center gap-4 w-full md:w-auto pl-3">
                  <div
                    className={`w-14 h-14 rounded-full ${job.logoBg} flex items-center justify-center shrink-0`}
                  >
                    {job.image ? (
                      <img
                        alt={`${job.company} Logo`}
                        className={`w-8 h-8 object-contain ${job.invertLogo ? "brightness-0 invert" : ""}`}
                        src={job.image}
                      />
                    ) : (
                      <span className="material-symbols-outlined text-black font-bold text-2xl">
                        {job.icon}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-lg font-bold text-white group-hover:text-neon-green transition-colors">
                      {job.title}
                    </h3>
                    <span className="text-sm text-gray-400">
                      {job.company} • {job.location}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto md:flex-1 md:justify-center px-4">
                  {job.skills.map((skill, i) => (
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
                      {job.salary}
                    </span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                      {job.salaryType}
                    </span>
                  </div>
                  <button className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-neon-green group-hover:text-black transition-colors shrink-0">
                    <span className="material-symbols-outlined">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <button
              onClick={() => router.push("/find-jobs")}
              className="bg-accent-dark hover:bg-white/10 text-white font-bold py-3 px-8 rounded-full border border-white/10 transition-colors"
            >
              View 248 more jobs
            </button>
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
              <div
                key={tech.name}
                onClick={() => {
                  setSearchQuery(tech.name);
                  router.push(`/find-jobs?q=${tech.name}`);
                }}
                className="bg-card-dark border border-accent-dark p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-neon-green/50 transition-colors cursor-pointer group"
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
                <span className="font-bold">{tech.name}</span>
                <span className="text-xs text-gray-500">{tech.jobs} jobs</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
