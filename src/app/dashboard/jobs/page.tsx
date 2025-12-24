"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";

interface Job {
  id: string;
  roles: string;
  department?: string | null;
  jobType: string;
  status: string;
  applicants: number;
  views: number;
  datePosted: string;
}

type SortField = "roles" | "applicants" | "views" | "datePosted";
type SortOrder = "asc" | "desc";

const ITEMS_PER_PAGE = 10;

export default function JobListingsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [sortField, setSortField] = useState<SortField>("datePosted");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch("/api/jobs");
        if (!res.ok) throw new Error("Failed to fetch jobs");
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  // Get unique departments
  const departments = useMemo(() => {
    const depts = new Set(jobs.map(j => j.department).filter(Boolean));
    return Array.from(depts) as string[];
  }, [jobs]);

  // Filter, sort, and paginate
  const { filteredJobs, paginatedJobs, totalPages } = useMemo(() => {
    let filtered = jobs.filter((job) => {
      const matchesSearch = job.roles.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || job.status === statusFilter;
      const matchesDept = departmentFilter === "all" || job.department === departmentFilter;
      return matchesSearch && matchesStatus && matchesDept;
    });

    // Sort
    filtered.sort((a, b) => {
      let aVal: string | number = a[sortField] ?? "";
      let bVal: string | number = b[sortField] ?? "";

      if (sortField === "datePosted") {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }

      if (typeof aVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = (bVal as string).toLowerCase();
      }

      if (sortOrder === "asc") {
        return aVal > bVal ? 1 : -1;
      }
      return aVal < bVal ? 1 : -1;
    });

    // Paginate
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginated = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);

    return { filteredJobs: filtered, paginatedJobs: paginated, totalPages };
  }, [jobs, searchTerm, statusFilter, departmentFilter, sortField, sortOrder, currentPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, departmentFilter]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const stats = {
    active: jobs.filter((j) => j.status === "active").length,
    paused: jobs.filter((j) => j.status === "paused").length,
    closed: jobs.filter((j) => j.status === "closed").length,
    totalViews: jobs.reduce((sum, j) => sum + j.views, 0),
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-neon-green bg-neon-green/10 border-neon-green/20";
      case "paused":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
      case "closed":
        return "text-gray-500 bg-gray-800 border-gray-700";
      default:
        return "text-gray-400 bg-gray-800 border-gray-700";
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => (
    <span className={`material-symbols-outlined text-xs ml-1 ${sortField === field ? "text-neon-green" : "text-gray-600"}`}>
      {sortField === field && sortOrder === "asc" ? "arrow_upward" : "arrow_downward"}
    </span>
  );

  return (
    <>
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">Job Listings</h2>
          <p className="text-gray-400 text-sm">
            Manage, track, and optimize your open positions.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/post-job"
            className="bg-neon-green hover:bg-[#3cd612] text-background-dark font-bold text-sm px-6 py-3 rounded-full transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(73,230,25,0.2)]"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            Create New Job
          </Link>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Active Jobs", value: stats.active, icon: "work", borderColor: "border-l-neon-green" },
          { label: "Paused", value: stats.paused, icon: "pause_circle", borderColor: "border-l-yellow-500" },
          { label: "Closed", value: stats.closed, icon: "archive", borderColor: "border-l-gray-500" },
          { label: "Total Views", value: stats.totalViews.toLocaleString(), icon: "visibility", borderColor: "border-l-neon-purple" },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`glass-panel p-5 rounded-2xl flex items-center gap-4 border-l-4 ${stat.borderColor}`}
          >
            <div className="p-3 bg-white/5 rounded-xl">
              <span className="material-symbols-outlined">{stat.icon}</span>
            </div>
            <div>
              <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                {stat.label}
              </p>
              <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Jobs Table */}
      <div className="glass-panel rounded-2xl flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="p-5 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/[0.01]">
          <div className="flex flex-1 items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 material-symbols-outlined text-lg">
                search
              </span>
              <input
                className="bg-black/20 border border-white/10 text-sm rounded-xl pl-10 pr-4 py-2.5 w-full focus:ring-1 focus:ring-neon-green focus:border-neon-green focus:outline-none text-white placeholder-gray-500 transition-all hover:bg-black/30"
                placeholder="Search by job title..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="bg-black/20 border border-white/10 text-sm rounded-xl px-4 py-2.5 text-gray-300 focus:ring-1 focus:ring-neon-green focus:border-neon-green cursor-pointer hover:bg-black/30 outline-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="closed">Closed</option>
              <option value="draft">Draft</option>
            </select>
            <select
              className="bg-black/20 border border-white/10 text-sm rounded-xl px-4 py-2.5 text-gray-300 focus:ring-1 focus:ring-neon-green focus:border-neon-green cursor-pointer hover:bg-black/30 outline-none"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <div className="text-xs text-gray-500">
            Showing {paginatedJobs.length} of {filteredJobs.length} jobs
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/[0.02] sticky top-0 z-10 backdrop-blur-md">
              <tr className="text-xs text-gray-500 border-b border-white/5">
                <th
                  className="p-5 font-semibold uppercase tracking-wider cursor-pointer hover:text-white"
                  onClick={() => handleSort("roles")}
                >
                  Job Title <SortIcon field="roles" />
                </th>
                <th className="p-5 font-semibold uppercase tracking-wider">
                  Status
                </th>
                <th
                  className="p-5 font-semibold uppercase tracking-wider text-center cursor-pointer hover:text-white"
                  onClick={() => handleSort("applicants")}
                >
                  Applicants <SortIcon field="applicants" />
                </th>
                <th
                  className="p-5 font-semibold uppercase tracking-wider text-center cursor-pointer hover:text-white"
                  onClick={() => handleSort("views")}
                >
                  Views <SortIcon field="views" />
                </th>
                <th
                  className="p-5 font-semibold uppercase tracking-wider cursor-pointer hover:text-white"
                  onClick={() => handleSort("datePosted")}
                >
                  Posted Date <SortIcon field="datePosted" />
                </th>
                <th className="p-5 font-semibold uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-white/5">
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="p-5"><div className="h-4 bg-gray-700 rounded w-48"></div></td>
                    <td className="p-5"><div className="h-6 bg-gray-700 rounded w-20"></div></td>
                    <td className="p-5"><div className="h-4 bg-gray-700 rounded w-12 mx-auto"></div></td>
                    <td className="p-5"><div className="h-4 bg-gray-700 rounded w-12 mx-auto"></div></td>
                    <td className="p-5"><div className="h-4 bg-gray-700 rounded w-24"></div></td>
                    <td className="p-5"></td>
                  </tr>
                ))
              ) : paginatedJobs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-gray-500">
                    No jobs found
                  </td>
                </tr>
              ) : (
                paginatedJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="p-5">
                      <div>
                        <Link href={`/dashboard/jobs/${job.id}`} className="font-bold text-white group-hover:text-neon-green transition-colors">
                          {job.roles}
                        </Link>
                        <p className="text-xs text-gray-500 mt-0.5">{job.department || "General"} • {job.jobType}</p>
                      </div>
                    </td>
                    <td className="p-5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(job.status)}`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="p-5 text-center font-bold">{job.applicants}</td>
                    <td className="p-5 text-center text-gray-400">{job.views.toLocaleString()}</td>
                    <td className="p-5 text-gray-400">
                      {new Date(job.datePosted).toLocaleDateString()}
                    </td>
                    <td className="p-5 text-right">
                      <Link
                        href={`/dashboard/jobs/${job.id}`}
                        className="p-2 hover:bg-neon-green/20 hover:text-neon-green rounded-lg transition-colors text-gray-400 inline-block"
                      >
                        <span className="material-symbols-outlined text-lg">visibility</span>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-5 border-t border-white/5 flex items-center justify-between bg-white/[0.01]">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-card-dark border border-accent-dark text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/5"
            >
              Previous
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${currentPage === page
                      ? "bg-neon-green text-background-dark"
                      : "bg-card-dark border border-accent-dark hover:bg-white/5"
                    }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-card-dark border border-accent-dark text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/5"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
}
