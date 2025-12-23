"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/page/Navbar";
import Footer from "@/components/page/Footer";

// Sample companies data
const companiesData = [
  {
    id: 1,
    name: "Vercel",
    industry: "Frontend Cloud",
    location: "Remote",
    type: "Full-time",
    salary: "$160k - $220k",
    title: "Senior Frontend Engineer",
    skills: ["React", "Next.js", "TS"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAmRxDHv2vweGovYx9DWWH3IOHQUMsap5anKHu2FlbXHWuB_LDnq8eBMNLOBom2vsXEvaQPlESS6KPwIZvZyUqCpW6fScnO1QRU19Zy7gzUCEbI9XatG3gVtJky5DbWxn2k7KQfu_nBMMtAshbXYw2dbz6_AlM7SM0L13rzrEdvAypuNvqSlyj9vCdIyRdXZTLo1O0KIy9axy5lpolMI2xcLP9SdG4yjC_rKsmw1GnST3BgILu0pZt79zXqxyTjAeUmCAj3o7_eg",
    logoBg: "bg-white",
    timeAgo: "2h ago",
  },
  {
    id: 2,
    name: "Linear",
    industry: "Project Management",
    location: "SF / Remote",
    type: "Full-time",
    salary: "$180k - $240k",
    title: "Product Engineer, Core",
    skills: ["TypeScript", "GraphQL", "Node"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeBYuGCEABchKdQW_mJDi7ZhPKMd-rd6T2LwEQBSCJ6AX2FVaKZVKOv2ALHQ4l9DnoKW31y2thUGoIyddScCly8wJ4wwdNl9OCN0SuoL7EHxAb9u6cQVLnOL5XVS4RqyTR5RRdm4Wsd3jS4xyNFHyn2if6_tBTeje7OFr1M9sA5GD3sa0OxNMM6bPjS9uQFlmCHot0ZI4HMzq_xXn0FFoEhGswC2zlkgpvoSCKYZD-iWVCwJJu0VR-klvFUEf-a0EXeMehjLLNRA",
    logoBg: "bg-black border border-gray-700",
    timeAgo: "5h ago",
  },
  {
    id: 3,
    name: "Stripe",
    industry: "Fintech",
    location: "NY / Hybrid",
    type: "Full-time",
    salary: "$220k - $320k",
    title: "Staff Backend Engineer",
    skills: ["Ruby", "Java", "AWS"],
    letter: "S",
    letterBg: "bg-[#635BFF]",
    timeAgo: "1d ago",
  },
  {
    id: 4,
    name: "OpenAI",
    industry: "AI / ML",
    location: "SF / On-site",
    type: "Full-time",
    salary: "$300k - $550k",
    title: "Research Scientist",
    skills: ["Python", "PyTorch", "CUDA"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGwfyDSdpRwqBhWIiRYNcQcm5y8vqoS2STc9RTyM2wNgoI2GMMzYZCi4Vg80MC_X5GSD_de8zLgGMCYt6gZMu8L2shOYE_m9DDpdTk3csCKFVhxG_er6heYHNwVmdtyJn3uYsy36HNylJSaBl-bb735tuuxb5DqLTlIV0K3VFojPGFh49O-xRNWHnsa_O5p2ZHGbvsuUkx_LdYyKd2918GnAH2NhRojynNmoBVTGSwm6XIySi0wW2R6sp2QrK-i1PP9H9SAZfB9w",
    logoBg: "bg-black border border-gray-700",
    timeAgo: "Hot",
    isHot: true,
  },
  {
    id: 5,
    name: "Airbnb",
    industry: "Travel Tech",
    location: "Remote",
    type: "Full-time",
    salary: "$200k - $280k",
    title: "Lead Mobile Engineer",
    skills: ["Swift", "Kotlin", "React N."],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEGcgf3gTYdc96SuM-_DXtO5u3FkgcZmzROQVjlIRkOI_wPH9gWlIm5Ysx0VA3BGtpF0u22c2OAcArklBFLZWcDUbOTTJRf11ptIKnCwTlthbGqwjj-G10GOVevigBIqx0JeBO7Z1TueevaEdVW3wlhy4ktuPYTTzmW_T9BW7Yh_sDL7NFQLucyPZeYVRvHUQ8aSnCl33es0LqisSFGu5fHSOGzHCchDEGu6uTvyXhvhhddK7cICHvaCUAA0TfWKPB5ZmunUk2iQ",
    logoBg: "bg-white",
    timeAgo: "3d ago",
  },
  {
    id: 6,
    name: "Discord",
    industry: "Social",
    location: "SF / Hybrid",
    type: "Full-time",
    salary: "$190k - $250k",
    title: "Senior SRE",
    skills: ["Rust", "Elixir", "GCP"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0P6Sg4EjTkyHcqfJr33vWJT9FBK0jGBCJWFt0uz4rj51c8VPNWmzAWuRGiYttYTkoUhCpQgSnmDfLyCDKJbprQzgXdZx5qAw_XjxvJUXtOpmdN92MCR1LWmSImIFDq22Rs-TYELZLWstKNkl6fyDHMHEiin58Z3l0bLY4lEWDGEIMOU1bKijaKJOGZJxZpyPZALP8oTwBwZz8VCv5vYMDsF_Q792sEhW5K_TbeD4-h3qmooBa4QcQ3lUfdRk16WZkYyl60I9lnw",
    logoBg: "bg-[#5865F2]",
    invertLogo: true,
    timeAgo: "4d ago",
  },
];

export default function FindCompaniesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="bg-background-dark font-display text-white overflow-x-hidden min-h-screen flex flex-col">
      <Navbar />

      {/* Header Section */}
      <section className="relative pt-32 pb-12 px-4 md:px-10 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] bg-grid pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-green/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              Find your{" "}
              <span className="text-neon-green glow-text">Next Role</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              Browse thousands of open positions at top tech companies. Filter
              by role, stack, and salary range.
            </p>
          </div>

          {/* Search Bar */}
          <div className="glass-panel p-4 rounded-2xl md:rounded-full flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 focus:outline-none pl-12 pr-4 py-2"
                placeholder="Search jobs (e.g. 'Senior Frontend Engineer', 'DevOps')..."
              />
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-3 w-full md:w-auto justify-center md:justify-end">
              <div className="relative group">
                <select className="appearance-none bg-card-dark border border-accent-dark hover:border-gray-500 rounded-full px-5 py-2.5 pr-10 text-sm font-medium text-gray-300 focus:ring-1 focus:ring-neon-green cursor-pointer transition-all">
                  <option>Role Type</option>
                  <option>Frontend</option>
                  <option>Backend</option>
                  <option>Fullstack</option>
                  <option>DevOps / SRE</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-sm">
                  expand_more
                </span>
              </div>
              <div className="relative group">
                <select className="appearance-none bg-card-dark border border-accent-dark hover:border-gray-500 rounded-full px-5 py-2.5 pr-10 text-sm font-medium text-gray-300 focus:ring-1 focus:ring-neon-green cursor-pointer transition-all">
                  <option>Experience</option>
                  <option>Junior (0-2y)</option>
                  <option>Mid-Level (2-5y)</option>
                  <option>Senior (5-8y)</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-sm">
                  expand_more
                </span>
              </div>
              <div className="relative group">
                <select className="appearance-none bg-card-dark border border-accent-dark hover:border-gray-500 rounded-full px-5 py-2.5 pr-10 text-sm font-medium text-gray-300 focus:ring-1 focus:ring-neon-green cursor-pointer transition-all">
                  <option>Location</option>
                  <option>Remote</option>
                  <option>On-site</option>
                  <option>Hybrid</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-sm">
                  expand_more
                </span>
              </div>
              <div className="relative group">
                <select className="appearance-none bg-card-dark border border-accent-dark hover:border-gray-500 rounded-full px-5 py-2.5 pr-10 text-sm font-medium text-gray-300 focus:ring-1 focus:ring-neon-green cursor-pointer transition-all">
                  <option>Salary Range</option>
                  <option>$100k+</option>
                  <option>$150k+</option>
                  <option>$200k+</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-sm">
                  expand_more
                </span>
              </div>
            </div>
            <button className="bg-neon-green hover:bg-[#3cd612] text-background-dark font-bold rounded-full px-6 py-2.5 transition-all shadow-lg shadow-neon-green/20 w-full md:w-auto">
              Search Jobs
            </button>
          </div>

          {/* Active Filters */}
          <div className="flex gap-2 mt-6 overflow-x-auto">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-neon-green/30 bg-neon-green/5 text-neon-green text-xs font-bold">
              <span>Remote Only</span>
              <button className="hover:text-white">
                <span className="material-symbols-outlined text-[14px]">
                  close
                </span>
              </button>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-neon-purple/30 bg-neon-purple/5 text-neon-purple text-xs font-bold">
              <span>$150k+</span>
              <button className="hover:text-white">
                <span className="material-symbols-outlined text-[14px]">
                  close
                </span>
              </button>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-accent-dark bg-card-dark text-gray-400 text-xs font-medium hover:border-gray-500 cursor-pointer transition-colors">
              <span>React</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-accent-dark bg-card-dark text-gray-400 text-xs font-medium hover:border-gray-500 cursor-pointer transition-colors">
              <span>TypeScript</span>
            </div>
            <span className="text-xs text-gray-500 self-center ml-2">
              Showing 1,204 jobs
            </span>
          </div>
        </div>
      </section>

      {/* Companies Grid */}
      <section className="px-4 md:px-10 lg:px-20 pb-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companiesData.map((company) => (
              <div
                key={company.id}
                onClick={() => router.push(`/find-companies/${company.id}`)}
                className="glass-panel p-6 rounded-3xl relative overflow-hidden group hover:border-neon-green/50 transition-all duration-300 flex flex-col h-full hover:-translate-y-1 cursor-pointer"
              >
                {/* Hot Badge */}
                {company.isHot && (
                  <div className="absolute top-0 right-0 p-3">
                    <span className="flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-purple opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-purple" />
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div
                    className={`w-14 h-14 rounded-xl ${company.logoBg || company.letterBg} flex items-center justify-center p-2 shadow-lg`}
                  >
                    {company.image ? (
                      <img
                        alt={`${company.name} Logo`}
                        className={`w-full h-full object-contain ${company.invertLogo ? "brightness-0 invert" : ""}`}
                        src={company.image}
                      />
                    ) : (
                      <span className="text-white font-bold text-2xl">
                        {company.letter}
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${company.isHot
                        ? "text-neon-purple border border-neon-purple/30 bg-neon-purple/10"
                        : "text-gray-400 border border-white/10 bg-white/5"
                      }`}
                  >
                    {company.timeAgo}
                  </span>
                </div>

                {/* Job Title & Company */}
                <div className="mb-2">
                  <h3 className="font-bold text-xl text-white group-hover:text-neon-green transition-colors">
                    {company.title}
                  </h3>
                  <p className="text-sm text-gray-400 font-medium">
                    {company.name}
                  </p>
                </div>

                {/* Salary */}
                <div className="mb-5 flex items-baseline gap-2">
                  <span
                    className={`font-bold text-lg ${company.isHot ? "text-neon-purple" : "text-neon-green glow-text"}`}
                  >
                    {company.salary}
                  </span>
                  <span className="text-xs text-gray-500">/ year</span>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {company.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-md bg-accent-dark text-[11px] font-mono text-gray-300 border border-white/5 flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        code
                      </span>
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center text-xs">
                  <div className="flex items-center gap-3 text-gray-400">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">
                        public
                      </span>
                      {company.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">
                        schedule
                      </span>
                      {company.type}
                    </span>
                  </div>
                  <button
                    className={`font-bold px-4 py-2 rounded-full text-xs shadow-lg transition-colors ${company.isHot
                        ? "text-white bg-neon-purple hover:bg-white hover:text-neon-purple shadow-neon-purple/20"
                        : "text-background-dark bg-neon-green hover:bg-white shadow-neon-green/20"
                      }`}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-12 flex justify-center">
            <button className="glass-panel px-8 py-3 rounded-full text-sm font-bold text-gray-300 hover:text-white hover:border-neon-green/50 transition-all flex items-center gap-2">
              Load more jobs
              <span className="material-symbols-outlined text-sm">
                expand_more
              </span>
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
