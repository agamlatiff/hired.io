"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/page/Navbar";
import Footer from "@/components/page/Footer";

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
  jobType?: string;
  experienceLevel?: string;
  salaryFrom?: number;
  salaryTo?: number;
}

interface FindJobsClientProps {
  initialJobs: UIJob[];
}

// Static filter options
const JOB_TYPES = ["Full-time", "Contract", "Freelance", "Remote"];
const EXPERIENCE_LEVELS = ["Junior", "Mid-Level", "Senior", "Lead / Manager"];
const TECH_STACKS = ["React", "Node.js", "Python", "AWS", "Go", "TypeScript", "Next.js", "Docker", "PostgreSQL"];

export default function FindJobsClient({ initialJobs }: FindJobsClientProps) {
  const router = useRouter();

  // Search & Location
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  // Filter states
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>(["Full-time"]);
  const [selectedExperienceLevels, setSelectedExperienceLevels] = useState<string[]>(["Mid-Level", "Senior"]);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [salaryMin, setSalaryMin] = useState(0);
  const [salaryMax, setSalaryMax] = useState(300);
  const [remoteOnly, setRemoteOnly] = useState(false);

  // Sorting and pagination
  const [sortBy, setSortBy] = useState<"newest" | "salary" | "relevance">("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Toggle filter helpers
  const toggleJobType = (type: string) => {
    setSelectedJobTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
    setCurrentPage(1);
  };

  const toggleExperienceLevel = (level: string) => {
    setSelectedExperienceLevels(prev =>
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
    setCurrentPage(1);
  };

  const toggleTech = (tech: string) => {
    setSelectedTech(prev =>
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    );
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSelectedJobTypes([]);
    setSelectedExperienceLevels([]);
    setSelectedTech([]);
    setSalaryMin(0);
    setSalaryMax(300);
    setRemoteOnly(false);
    setSearchQuery("");
    setLocationQuery("");
    setCurrentPage(1);
  };

  // Filter and sort jobs
  const filteredJobs = useMemo(() => {
    let result = [...initialJobs];

    // Search filter (title, company, skills)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(job =>
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }

    // Location filter
    if (locationQuery.trim()) {
      const query = locationQuery.toLowerCase();
      result = result.filter(job =>
        job.location.toLowerCase().includes(query)
      );
    }

    // Remote only filter
    if (remoteOnly) {
      result = result.filter(job =>
        job.location.toLowerCase().includes("remote") ||
        job.jobType?.toLowerCase().includes("remote")
      );
    }

    // Job type filter
    if (selectedJobTypes.length > 0) {
      result = result.filter(job => {
        // If job has jobType, match it; otherwise include if Full-time is selected (default)
        if (job.jobType) {
          return selectedJobTypes.some(type =>
            job.jobType?.toLowerCase().includes(type.toLowerCase())
          );
        }
        return selectedJobTypes.includes("Full-time"); // Default to full-time
      });
    }

    // Experience level filter
    if (selectedExperienceLevels.length > 0) {
      result = result.filter(job => {
        if (job.experienceLevel) {
          return selectedExperienceLevels.some(level =>
            job.experienceLevel?.toLowerCase().includes(level.toLowerCase())
          );
        }
        return true; // Include jobs without experience level set
      });
    }

    // Tech stack filter
    if (selectedTech.length > 0) {
      result = result.filter(job =>
        selectedTech.some(tech =>
          job.skills.some(skill => skill.toLowerCase().includes(tech.toLowerCase()))
        )
      );
    }

    // Salary range filter
    if (salaryMin > 0 || salaryMax < 300) {
      result = result.filter(job => {
        // Parse salary from string like "$12000000k - $22000000k" or use salaryFrom/To
        const salaryFrom = job.salaryFrom || parseInt(job.salary.replace(/[^0-9]/g, '')) / 1000;
        return salaryFrom >= salaryMin && salaryFrom <= salaryMax;
      });
    }

    // Sorting
    if (sortBy === "newest") {
      // Jobs are already sorted by newest from API
    } else if (sortBy === "salary") {
      result.sort((a, b) => {
        const aSalary = a.salaryFrom || parseInt(a.salary.replace(/[^0-9]/g, ''));
        const bSalary = b.salaryFrom || parseInt(b.salary.replace(/[^0-9]/g, ''));
        return bSalary - aSalary;
      });
    }

    return result;
  }, [initialJobs, searchQuery, locationQuery, selectedJobTypes, selectedExperienceLevels, selectedTech, salaryMin, salaryMax, remoteOnly, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Count jobs by type for sidebar
  const jobTypeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    JOB_TYPES.forEach(type => {
      counts[type] = initialJobs.filter(job =>
        job.jobType?.toLowerCase().includes(type.toLowerCase()) ||
        (type === "Full-time" && !job.jobType)
      ).length;
    });
    return counts;
  }, [initialJobs]);


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
                Browse {filteredJobs.length} developer roles{searchQuery || locationQuery ? ' matching your criteria' : ' added today'}.
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
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 rounded-lg bg-accent-dark/50 border border-accent-dark hover:border-neon-green/50 text-sm font-medium text-gray-300 hover:text-white transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">
                filter_list
              </span>
              Clear Filters
            </button>
            <button
              onClick={() => setRemoteOnly(!remoteOnly)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${remoteOnly ? 'bg-neon-green/10 border border-neon-green/30 text-neon-green' : 'bg-accent-dark/50 border border-accent-dark text-gray-300 hover:text-white'}`}
            >
              Remote Only
            </button>
            <button
              onClick={() => { setSalaryMin(150); setCurrentPage(1); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${salaryMin >= 150 ? 'bg-neon-green/10 border border-neon-green/30 text-neon-green' : 'bg-accent-dark/50 border border-accent-dark text-gray-300 hover:text-white'}`}
            >
              $150k+
            </button>
            <button
              onClick={() => toggleExperienceLevel('Junior')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedExperienceLevels.includes('Junior') ? 'bg-neon-green/10 border border-neon-green/30 text-neon-green' : 'bg-accent-dark/50 border border-accent-dark text-gray-300 hover:text-white'}`}
            >
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block mr-2" />
              Entry Level
            </button>
            <button
              onClick={() => toggleJobType('Contract')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedJobTypes.includes('Contract') ? 'bg-neon-green/10 border border-neon-green/30 text-neon-green' : 'bg-accent-dark/50 border border-accent-dark text-gray-300 hover:text-white'}`}
            >
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
              {JOB_TYPES.map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-3 group cursor-pointer"
                  onClick={() => toggleJobType(type)}
                >
                  <input
                    type="checkbox"
                    checked={selectedJobTypes.includes(type)}
                    onChange={() => { }}
                    className="rounded bg-accent-dark border-gray-600 text-neon-green w-4 h-4 focus:ring-neon-green"
                  />
                  <span className="text-gray-300 group-hover:text-white text-sm transition-colors">
                    {type}
                  </span>
                  <span className="ml-auto text-xs text-gray-600">
                    {jobTypeCounts[type] || 0}
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
              {EXPERIENCE_LEVELS.map((level) => (
                <label
                  key={level}
                  className="flex items-center gap-3 group cursor-pointer"
                  onClick={() => toggleExperienceLevel(level)}
                >
                  <input
                    type="checkbox"
                    checked={selectedExperienceLevels.includes(level)}
                    onChange={() => { }}
                    className="rounded bg-accent-dark border-gray-600 text-neon-green w-4 h-4 focus:ring-neon-green"
                  />
                  <span className="text-gray-300 group-hover:text-white text-sm transition-colors">
                    {level}
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
                    onClick={() => toggleTech(tech)}
                    className={`px-2 py-1 rounded text-xs font-bold border cursor-pointer transition ${i === 0
                      ? "bg-neon-green/20 text-neon-green border-neon-green/30 hover:bg-neon-green/30"
                      : "bg-neon-purple/20 text-neon-purple border-neon-purple/30 hover:bg-neon-purple/30"
                      }`}
                  >
                    {tech} ×
                  </span>
                ))}
                {TECH_STACKS
                  .filter((t) => !selectedTech.includes(t))
                  .map((tech) => (
                    <span
                      key={tech}
                      onClick={() => toggleTech(tech)}
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
              <h2 className="text-xl font-bold">Showing {filteredJobs.length} Jobs</h2>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "newest" | "salary" | "relevance")}
                  className="bg-transparent border-none text-white font-medium focus:ring-0 cursor-pointer py-0 pl-0 pr-8"
                >
                  <option value="newest">Newest First</option>
                  <option value="relevance">Relevance</option>
                  <option value="salary">Salary (High to Low)</option>
                </select>
              </div>
            </div>

            {/* Empty State */}
            {paginatedJobs.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <span className="material-symbols-outlined text-6xl text-gray-600 mb-4">
                  search_off
                </span>
                <h3 className="text-xl font-bold text-white mb-2">No jobs found</h3>
                <p className="text-gray-400 mb-6 max-w-md">
                  We couldn&apos;t find any jobs matching your filters. Try adjusting your search criteria or clearing some filters.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-3 bg-neon-green hover:bg-[#3cd612] text-background-dark font-bold rounded-xl transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Job Cards */}
            {paginatedJobs.map((job) => (
              <Link
                href={`/detail/job/${job.id}`}
                key={job.id}
                className={`glow-box group relative bg-card-dark border ${job.featured
                  ? "border-neon-green/30 hover:border-neon-green/60"
                  : "border-accent-dark hover:border-neon-green/30"
                  } rounded-2xl p-6 transition-all duration-300 cursor-pointer block`}
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
              </Link>
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12 gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-lg bg-card-dark border border-accent-dark text-gray-400 hover:text-white hover:border-gray-500 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum: number;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-lg font-bold flex items-center justify-center ${currentPage === pageNum
                        ? "bg-neon-green text-background-dark"
                        : "bg-card-dark border border-accent-dark text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                        }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <>
                    <span className="w-10 h-10 flex items-center justify-center text-gray-500">
                      ...
                    </span>
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      className="w-10 h-10 rounded-lg bg-card-dark border border-accent-dark text-gray-400 hover:text-white hover:border-gray-500 flex items-center justify-center transition-colors"
                    >
                      {totalPages}
                    </button>
                  </>
                )}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-lg bg-card-dark border border-accent-dark text-gray-400 hover:text-white hover:border-gray-500 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
