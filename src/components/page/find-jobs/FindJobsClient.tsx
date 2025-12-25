"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/page/Navbar";
import Footer from "@/components/page/Footer";

// Keep static filter options
const jobTypes = [
  { label: "Full-time", count: "1.2k", checked: true },
  { label: "Contract", count: "230", checked: false },
  { label: "Freelance", count: "85", checked: false },
];

const experienceLevels = [
  { label: "Junior", checked: false },
  { label: "Mid-Level", checked: true },
  { label: "Senior", checked: true },
  { label: "Lead / Manager", checked: false },
];

const techStacks = ["React", "Node.js", "Python", "AWS", "Go"];

// Define the shape that the UI expects
export interface UIJob {
  id: string;
  title: string;
  company: string;
  location: string;
  timeAgo: string;
  salary: string;
  skills: string[];
  image: string | null;
  featured: boolean;
  logoBg?: string;
  invertLogo?: boolean;
  letter?: string;
}

interface FindJobsClientProps {
  initialJobs: UIJob[];
}

export default function FindJobsClient({ initialJobs }: FindJobsClientProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedTech, setSelectedTech] = useState(["React", "Node.js"]);
  const [currentPage, setCurrentPage] = useState(1);

  // For now, we are just displaying initialJobs.
  // Real filtering would happen server-side or we filter here if we had all jobs.
  const jobs = initialJobs;

  return (
    <div className="bg-background-dark font-display text-white overflow-x-hidden min-h-screen flex flex-col">
      <Navbar />

      {/* Header Section */}
      <header className="relative pt-32 pb-10 px-4 md:px-10 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] bg-grid pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-green/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
                Find Your Next{" "}
                <span className="text-neon-green glow-text">Mission</span>
              </h1>
              <p className="text-gray-400 text-lg">
                Browse {jobs.length} new developer roles added today.
              </p>
            </div>
            <div className="flex gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neon-green/10 border border-neon-green/20 text-neon-green text-xs font-bold uppercase tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green" />
                </span>
                Live Updates
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="w-full relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-neon-green/30 to-neon-purple/30 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
            <div className="relative flex flex-col md:flex-row items-center bg-card-dark border border-accent-dark rounded-2xl p-2 shadow-2xl gap-2">
              <div className="flex-1 flex items-center w-full px-4 h-14">
                <span className="material-symbols-outlined text-gray-500 mr-3">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 focus:outline-none text-base p-0"
                  placeholder="Search by job title, technology, or keywords..."
                />
              </div>
              <div className="hidden md:block w-px h-8 bg-accent-dark" />
              <div className="flex-1 flex items-center w-full px-4 h-14">
                <span className="material-symbols-outlined text-gray-500 mr-3">
                  location_on
                </span>
                <input
                  type="text"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  className="w-full bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 focus:outline-none text-base p-0"
                  placeholder="City, state, or zip code"
                />
              </div>
              <button className="w-full md:w-auto bg-neon-green hover:bg-[#3cd612] text-background-dark font-bold rounded-xl px-8 h-12 transition-transform active:scale-95 whitespace-nowrap">
                Find Jobs
              </button>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button className="px-4 py-2 rounded-lg bg-accent-dark/50 border border-accent-dark hover:border-neon-green/50 text-sm font-medium text-gray-300 hover:text-white transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-base">
                filter_list
              </span>
              All Filters
            </button>
            <button className="px-4 py-2 rounded-lg bg-neon-green/10 border border-neon-green/30 text-sm font-medium text-neon-green transition-all">
              Remote Only
            </button>
            <button className="px-4 py-2 rounded-lg bg-accent-dark/50 border border-accent-dark hover:border-white/20 text-sm font-medium text-gray-300 hover:text-white transition-all">
              $150k+
            </button>
            <button className="px-4 py-2 rounded-lg bg-accent-dark/50 border border-accent-dark hover:border-white/20 text-sm font-medium text-gray-300 hover:text-white transition-all">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block mr-2" />
              Entry Level
            </button>
            <button className="px-4 py-2 rounded-lg bg-accent-dark/50 border border-accent-dark hover:border-white/20 text-sm font-medium text-gray-300 hover:text-white transition-all">
              Contract
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-4 md:px-10 lg:px-20 pb-20">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters - Simplified for now */}
          <aside className="hidden lg:block lg:col-span-1 space-y-8 sticky top-32 h-[calc(100vh-140px)] overflow-y-auto pr-4">
            {/* Job Type */}
            <div className="space-y-3">
              <h3 className="font-bold text-white mb-2 flex items-center justify-between">
                Job Type
                <span className="text-xs text-gray-500 font-normal cursor-pointer hover:text-neon-green">
                  Clear
                </span>
              </h3>
              {jobTypes.map((type) => (
                <label
                  key={type.label}
                  className="flex items-center gap-3 group cursor-pointer"
                >
                  <input
                    type="checkbox"
                    defaultChecked={type.checked}
                    className="rounded bg-accent-dark border-gray-600 text-neon-green w-4 h-4 focus:ring-neon-green"
                  />
                  <span className="text-gray-300 group-hover:text-white text-sm transition-colors">
                    {type.label}
                  </span>
                  <span className="ml-auto text-xs text-gray-600">
                    {type.count}
                  </span>
                </label>
              ))}
            </div>

            {/* Salary Range */}
            <div className="space-y-4 pt-4 border-t border-accent-dark">
              <h3 className="font-bold text-white mb-2">Salary Range</h3>
              <div className="flex items-center gap-2">
                <div className="bg-card-dark border border-accent-dark rounded-lg px-3 py-2 flex-1">
                  <span className="text-xs text-gray-500 block">Min</span>
                  <div className="flex items-center text-sm font-mono text-white">
                    <span>$</span>
                    <input
                      type="text"
                      defaultValue="80k"
                      className="w-full bg-transparent border-none p-0 focus:ring-0 text-white"
                    />
                  </div>
                </div>
                <span className="text-gray-500">-</span>
                <div className="bg-card-dark border border-accent-dark rounded-lg px-3 py-2 flex-1">
                  <span className="text-xs text-gray-500 block">Max</span>
                  <div className="flex items-center text-sm font-mono text-white">
                    <span>$</span>
                    <input
                      type="text"
                      defaultValue="300k+"
                      className="w-full bg-transparent border-none p-0 focus:ring-0 text-white"
                    />
                  </div>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="300"
                className="w-full h-1 bg-accent-dark rounded-lg appearance-none cursor-pointer accent-neon-green"
              />
            </div>

            {/* Experience Level */}
            <div className="space-y-3 pt-4 border-t border-accent-dark">
              <h3 className="font-bold text-white mb-2">Experience Level</h3>
              {experienceLevels.map((level) => (
                <label
                  key={level.label}
                  className="flex items-center gap-3 group cursor-pointer"
                >
                  <input
                    type="checkbox"
                    defaultChecked={level.checked}
                    className="rounded bg-accent-dark border-gray-600 text-neon-green w-4 h-4 focus:ring-neon-green"
                  />
                  <span className="text-gray-300 group-hover:text-white text-sm transition-colors">
                    {level.label}
                  </span>
                </label>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="space-y-3 pt-4 border-t border-accent-dark">
              <h3 className="font-bold text-white mb-2">Tech Stack</h3>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-500 text-sm">
                  search
                </span>
                <input
                  type="text"
                  className="w-full bg-card-dark border border-accent-dark rounded-lg py-2 pl-9 pr-3 text-sm text-white focus:border-neon-green/50 focus:ring-0 placeholder-gray-600"
                  placeholder="Filter technologies..."
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedTech.map((tech, i) => (
                  <span
                    key={tech}
                    className={`px-2 py-1 rounded text-xs font-bold border cursor-pointer transition ${i === 0
                      ? "bg-neon-green/20 text-neon-green border-neon-green/30 hover:bg-neon-green/30"
                      : "bg-neon-purple/20 text-neon-purple border-neon-purple/30 hover:bg-neon-purple/30"
                      }`}
                  >
                    {tech} ×
                  </span>
                ))}
                {techStacks
                  .filter((t) => !selectedTech.includes(t))
                  .map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 rounded bg-accent-dark text-gray-400 text-xs border border-gray-700 cursor-pointer hover:text-white transition"
                    >
                      {tech}
                    </span>
                  ))}
              </div>
            </div>
          </aside>

          {/* Job Listings */}
          <div className="col-span-1 lg:col-span-3 space-y-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Showing {jobs.length} Jobs</h2>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>Sort by:</span>
                <select className="bg-transparent border-none text-white font-medium focus:ring-0 cursor-pointer py-0 pl-0 pr-8">
                  <option>Newest First</option>
                  <option>Relevance</option>
                  <option>Salary (High to Low)</option>
                </select>
              </div>
            </div>

            {/* Job Cards */}
            {jobs.map((job) => (
              <div
                key={job.id}
                onClick={() => router.push(`/detail/job/${job.id}`)}
                className={`glow-box group relative bg-card-dark border ${job.featured
                  ? "border-neon-green/30 hover:border-neon-green/60"
                  : "border-accent-dark hover:border-neon-green/30"
                  } rounded-2xl p-6 transition-all duration-300 cursor-pointer`}
              >
                {job.featured && (
                  <div className="absolute top-4 right-4 bg-neon-green/10 text-neon-green text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                    Featured
                  </div>
                )}
                <div className="flex flex-col md:flex-row gap-6">
                  <div
                    className={`w-16 h-16 rounded-xl ${job.logoBg || 'bg-white'} flex items-center justify-center shrink-0 shadow-lg`}
                  >
                    {job.image ? (
                      <img
                        alt={`${job.company} Logo`}
                        className={`w-full h-full object-contain p-3 ${job.invertLogo ? "brightness-0 invert" : ""}`}
                        src={job.image}
                      />
                    ) : (
                      <span className="text-black font-bold text-2xl">
                        {job.letter || job.company.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-neon-green transition-colors">
                        {job.title}
                      </h3>
                      <span
                        className={`${job.featured ? "text-neon-green glow-text" : "text-gray-200"} font-bold text-xl mt-1 md:mt-0`}
                      >
                        {job.salary}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
                      <span className="font-semibold text-white">
                        {job.company}
                      </span>
                      <span>•</span>
                      <span>{job.location}</span>
                      <span>•</span>
                      <span
                        className={
                          job.timeAgo.includes("hours") ? "text-green-400" : ""
                        }
                      >
                        {job.timeAgo}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-white/5">
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill) => (
                          <div
                            key={skill}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-dark border border-white/5 group-hover:border-white/10 transition-colors"
                          >
                            <span className="text-xs font-mono text-gray-300">
                              {skill}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        <button className="w-10 h-10 rounded-full bg-accent-dark hover:bg-white/10 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                          <span className="material-symbols-outlined">
                            bookmark
                          </span>
                        </button>
                        <button
                          className={`px-6 py-2 rounded-full font-bold text-sm transition-colors ${job.featured
                            ? "bg-white text-black hover:bg-neon-green"
                            : "bg-accent-dark hover:bg-white/10 border border-white/10 text-white"
                            }`}
                        >
                          {job.featured ? "Apply Now" : "Details"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Pagination */}
            <div className="flex justify-center mt-12 gap-2">
              <button className="w-10 h-10 rounded-lg bg-card-dark border border-accent-dark text-gray-400 hover:text-white hover:border-gray-500 flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg font-bold flex items-center justify-center ${currentPage === page
                    ? "bg-neon-green text-background-dark"
                    : "bg-card-dark border border-accent-dark text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                    }`}
                >
                  {page}
                </button>
              ))}
              <span className="w-10 h-10 flex items-center justify-center text-gray-500">
                ...
              </span>
              <button className="w-10 h-10 rounded-lg bg-card-dark border border-accent-dark text-gray-400 hover:text-white hover:border-gray-500 flex items-center justify-center transition-colors">
                12
              </button>
              <button className="w-10 h-10 rounded-lg bg-card-dark border border-accent-dark text-gray-400 hover:text-white hover:border-gray-500 flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
