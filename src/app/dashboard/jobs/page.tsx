"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

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

export default function JobListingsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.roles.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
          <button className="relative p-2.5 rounded-full bg-card-dark border border-accent-dark hover:text-white text-gray-400 transition-colors">
            <span className="material-symbols-outlined text-xl">
              notifications
            </span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-neon-green rounded-full animate-pulse" />
          </button>
          <Link
            href="/dashboard/post-job"
            className="bg-neon-green hover:bg-[#3cd612] text-background-dark font-bold text-sm px-6 py-3 rounded-full transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(73,230,25,0.2)] hover:shadow-[0_0_25px_rgba(73,230,25,0.4)]"
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
          <div className="flex flex-1 items-center gap-3">
            <div className="relative flex-1 max-w-md">
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
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/[0.02] sticky top-0 z-10 backdrop-blur-md">
              <tr className="text-xs text-gray-500 border-b border-white/5">
                <th className="p-5 font-semibold uppercase tracking-wider">
                  Job Title
                </th>
                <th className="p-5 font-semibold uppercase tracking-wider">
                  Status
                </th>
                <th className="p-5 font-semibold uppercase tracking-wider text-center">
                  Applicants
                </th>
                <th className="p-5 font-semibold uppercase tracking-wider text-center">
                  Views
                </th>
                <th className="p-5 font-semibold uppercase tracking-wider">
                  Posted Date
                </th>
                <th className="p-5 font-semibold uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-white/5">
              {loading ? (
                Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="p-5">
                        <div className="h-4 bg-gray-700 rounded w-48"></div>
                      </td>
                      <td className="p-5">
                        <div className="h-6 bg-gray-700 rounded w-20"></div>
                      </td>
                      <td className="p-5">
                        <div className="h-4 bg-gray-700 rounded w-12 mx-auto"></div>
                      </td>
                      <td className="p-5">
                        <div className="h-4 bg-gray-700 rounded w-12 mx-auto"></div>
                      </td>
                      <td className="p-5">
                        <div className="h-4 bg-gray-700 rounded w-24"></div>
                      </td>
                      <td className="p-5"></td>
                    </tr>
                  ))
              ) : filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-gray-500">
                    No jobs found
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => (
                  <tr
                    key={job.id}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="p-5 align-middle">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/dashboard/jobs/${job.id}`}
                            className="font-bold text-base group-hover:text-neon-green transition-colors text-white"
                          >
                            {job.roles}
                          </Link>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-gray-800 text-gray-300 border border-gray-700">
                            {job.jobType}
                          </span>
                        </div>
                        <span className="text-xs mt-1 text-gray-500">
                          {job.department || "No Department"} • ID: #{job.id.slice(0, 8)}
                        </span>
                      </div>
                    </td>
                    <td className="p-5 align-middle">
                      <span
                        className={`inline-flex items-center gap-1.5 ${getStatusColor(job.status)} px-2.5 py-1 rounded-full text-xs font-bold border capitalize`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${job.status === "active"
                              ? "bg-neon-green animate-pulse"
                              : job.status === "paused"
                                ? "bg-yellow-500"
                                : "bg-gray-500"
                            }`}
                        />
                        {job.status}
                      </span>
                    </td>
                    <td className="p-5 align-middle text-center">
                      <span className="font-bold text-lg text-white">
                        {job.applicants}
                      </span>
                    </td>
                    <td className="p-5 align-middle text-center">
                      <span className="font-mono text-gray-300">{job.views}</span>
                    </td>
                    <td className="p-5 align-middle">
                      <span className="text-gray-400">
                        {new Date(job.datePosted).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="p-5 align-middle text-right">
                      <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/dashboard/jobs/${job.id}`}
                          className="p-2 hover:bg-neon-green/20 hover:text-neon-green rounded-lg transition-colors text-gray-400"
                          title="View"
                        >
                          <span className="material-symbols-outlined text-lg">
                            visibility
                          </span>
                        </Link>
                        <button
                          className="p-2 hover:bg-neon-green/20 hover:text-neon-green rounded-lg transition-colors text-gray-400"
                          title="Edit Job"
                        >
                          <span className="material-symbols-outlined text-lg">
                            edit
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
