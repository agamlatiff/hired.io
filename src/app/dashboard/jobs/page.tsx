"use client";

import Link from "next/link";

const statsData = [
  { label: "Active Jobs", value: "12", icon: "work", color: "primary", borderColor: "border-l-neon-green" },
  { label: "Paused", value: "3", icon: "pause_circle", color: "yellow-500", borderColor: "border-l-yellow-500" },
  { label: "Closed", value: "45", icon: "archive", color: "gray-500", borderColor: "border-l-gray-500" },
  { label: "Total Views", value: "12.5k", icon: "visibility", color: "secondary", borderColor: "border-l-neon-purple", accent: true },
];

const jobsData = [
  {
    title: "Senior Frontend Engineer",
    type: "REMOTE",
    department: "Engineering",
    id: "FE-204",
    status: "Active",
    statusColor: "text-neon-green bg-neon-green/10 border-neon-green/20",
    applicants: 45,
    trend: "+12",
    trendUp: true,
    views: "1,240",
    posted: "Oct 24, 2023",
    ago: "2 days ago",
  },
  {
    title: "Backend Team Lead",
    type: "HYBRID",
    department: "Engineering",
    id: "BE-109",
    status: "Active",
    statusColor: "text-neon-green bg-neon-green/10 border-neon-green/20",
    applicants: 18,
    trend: "0",
    trendUp: false,
    views: "856",
    posted: "Oct 20, 2023",
    ago: "6 days ago",
  },
  {
    title: "Product Designer",
    type: "REMOTE",
    department: "Design",
    id: "PD-332",
    status: "Paused",
    statusColor: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20",
    applicants: 125,
    trend: "0",
    trendUp: false,
    views: "3,402",
    posted: "Oct 15, 2023",
    ago: "1 week ago",
  },
  {
    title: "DevOps Engineer",
    type: "ONSITE",
    department: "Infrastructure",
    id: "DO-101",
    status: "Active",
    statusColor: "text-neon-green bg-neon-green/10 border-neon-green/20",
    applicants: 8,
    trend: "+3",
    trendUp: true,
    views: "420",
    posted: "Oct 26, 2023",
    ago: "Just now",
    isNew: true,
  },
  {
    title: "Marketing Intern",
    type: "ONSITE",
    department: "Marketing",
    id: "MK-005",
    status: "Closed",
    statusColor: "text-gray-500 bg-gray-800 border-gray-700",
    applicants: 92,
    views: "2,100",
    posted: "Sep 01, 2023",
    ago: "Archived",
    isClosed: true,
  },
];

export default function JobListingsPage() {
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
        {statsData.map((stat) => (
          <div
            key={stat.label}
            className={`glass-panel p-5 rounded-2xl flex items-center gap-4 border-l-4 ${stat.borderColor} ${stat.accent ? "bg-neon-purple/5 border-neon-purple/10" : ""}`}
          >
            <div className={`p-3 bg-${stat.color}/10 rounded-xl text-${stat.color}`}>
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
                placeholder="Search by job title, ID..."
                type="text"
              />
            </div>
            <div className="flex items-center gap-2">
              <select className="bg-black/20 border border-white/10 text-sm rounded-xl px-4 py-2.5 text-gray-300 focus:ring-1 focus:ring-neon-green focus:border-neon-green cursor-pointer hover:bg-black/30 outline-none">
                <option>All Statuses</option>
                <option>Active</option>
                <option>Paused</option>
                <option>Closed</option>
              </select>
              <select className="bg-black/20 border border-white/10 text-sm rounded-xl px-4 py-2.5 text-gray-300 focus:ring-1 focus:ring-neon-green focus:border-neon-green cursor-pointer hover:bg-black/30 outline-none hidden sm:block">
                <option>All Departments</option>
                <option>Engineering</option>
                <option>Design</option>
                <option>Product</option>
                <option>Marketing</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              title="Grid View"
            >
              <span className="material-symbols-outlined">grid_view</span>
            </button>
            <button
              className="p-2 text-neon-green bg-neon-green/10 transition-colors rounded-lg"
              title="List View"
            >
              <span className="material-symbols-outlined">view_list</span>
            </button>
            <div className="h-6 w-px bg-white/10 mx-2" />
            <button className="flex items-center gap-2 text-sm text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
              <span className="material-symbols-outlined text-lg">
                filter_list
              </span>
              Filter
            </button>
            <button className="flex items-center gap-2 text-sm text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
              <span className="material-symbols-outlined text-lg">download</span>
              Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/[0.02] sticky top-0 z-10 backdrop-blur-md">
              <tr className="text-xs text-gray-500 border-b border-white/5">
                <th className="p-5 font-semibold uppercase tracking-wider w-12">
                  <input
                    className="rounded border-gray-600 bg-gray-800 text-neon-green focus:ring-offset-gray-900 focus:ring-neon-green"
                    type="checkbox"
                  />
                </th>
                <th className="p-5 font-semibold uppercase tracking-wider cursor-pointer group hover:text-gray-300">
                  Job Title
                  <span className="material-symbols-outlined align-middle text-sm opacity-0 group-hover:opacity-100 transition-opacity ml-1">
                    arrow_downward
                  </span>
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
              {jobsData.map((job, i) => (
                <tr
                  key={i}
                  className="hover:bg-white/[0.02] transition-colors group"
                >
                  <td className="p-5 align-middle">
                    <input
                      className="rounded border-gray-600 bg-gray-800 text-neon-green focus:ring-offset-gray-900 focus:ring-neon-green"
                      type="checkbox"
                    />
                  </td>
                  <td className="p-5 align-middle">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/dashboard/jobs/${job.id}`}
                          className={`font-bold text-base group-hover:text-neon-green transition-colors ${job.isClosed ? "text-gray-500 line-through" : "text-white"}`}
                        >
                          {job.title}
                        </Link>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-gray-800 text-gray-300 border border-gray-700">
                          {job.type}
                        </span>
                      </div>
                      <span
                        className={`text-xs mt-1 ${job.isClosed ? "text-gray-600" : "text-gray-500"}`}
                      >
                        {job.department} • ID: #{job.id}
                      </span>
                    </div>
                  </td>
                  <td className="p-5 align-middle">
                    <span
                      className={`inline-flex items-center gap-1.5 ${job.statusColor} px-2.5 py-1 rounded-full text-xs font-bold border ${job.status === "Active" ? "shadow-[0_0_10px_rgba(73,230,25,0.1)]" : ""}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${job.status === "Active" ? "bg-neon-green animate-pulse" : job.status === "Paused" ? "bg-yellow-500" : "bg-gray-500"}`}
                      />
                      {job.status}
                    </span>
                  </td>
                  <td className="p-5 align-middle text-center">
                    <div className="flex flex-col items-center">
                      <span
                        className={`font-bold text-lg ${job.isClosed ? "text-gray-500" : "text-white"}`}
                      >
                        {job.applicants}
                      </span>
                      {job.trend && !job.isClosed && (
                        <div
                          className={`flex items-center text-[10px] gap-0.5 ${job.trendUp ? "text-neon-green" : "text-gray-500"}`}
                        >
                          <span className="material-symbols-outlined text-[10px]">
                            {job.trendUp ? "trending_up" : "trending_flat"}
                          </span>
                          {job.trend}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-5 align-middle text-center">
                    <span
                      className={`font-mono ${job.isClosed ? "text-gray-600" : "text-gray-300"}`}
                    >
                      {job.views}
                    </span>
                  </td>
                  <td className="p-5 align-middle">
                    <span
                      className={job.isClosed ? "text-gray-500" : "text-gray-400"}
                    >
                      {job.posted}
                    </span>
                    <span
                      className={`block text-[10px] ${job.isNew ? "text-neon-green" : "text-gray-600"}`}
                    >
                      {job.ago}
                    </span>
                  </td>
                  <td className="p-5 align-middle text-right">
                    <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-2 hover:bg-neon-purple/20 hover:text-neon-purple rounded-lg transition-colors text-gray-400"
                        title="View Candidates"
                      >
                        <span className="material-symbols-outlined text-lg">
                          group
                        </span>
                      </button>
                      <button
                        className="p-2 hover:bg-neon-green/20 hover:text-neon-green rounded-lg transition-colors text-gray-400"
                        title={job.isClosed ? "Reopen Job" : "Edit Job"}
                      >
                        <span className="material-symbols-outlined text-lg">
                          {job.isClosed ? "replay" : "edit"}
                        </span>
                      </button>
                      <button
                        className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-colors text-gray-400"
                        title={job.isClosed ? "Delete" : "Archive"}
                      >
                        <span className="material-symbols-outlined text-lg">
                          {job.isClosed ? "delete" : "archive"}
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-white/5 flex items-center justify-between bg-white/[0.01]">
          <div className="text-xs text-gray-500">
            Showing <span className="text-white font-bold">1-5</span> of{" "}
            <span className="text-white font-bold">12</span> active jobs
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-lg border border-white/10 text-xs font-medium text-gray-400 hover:text-white hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <div className="flex gap-1">
              <button className="w-8 h-8 rounded-lg bg-neon-green text-black font-bold text-xs flex items-center justify-center">
                1
              </button>
              <button className="w-8 h-8 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 text-xs flex items-center justify-center transition-colors">
                2
              </button>
              <button className="w-8 h-8 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 text-xs flex items-center justify-center transition-colors">
                3
              </button>
            </div>
            <button className="px-3 py-1.5 rounded-lg border border-white/10 text-xs font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
