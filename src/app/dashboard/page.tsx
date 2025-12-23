"use client";

import Link from "next/link";
import { useState } from "react";

// Sample data
const statsData = [
  {
    label: "Active Jobs",
    value: "12",
    change: "+2",
    changeLabel: "since last week",
    icon: "work",
    iconColor: "text-neon-green/30",
    changeColor: "text-neon-green",
  },
  {
    label: "Total Applicants",
    value: "843",
    change: "+12%",
    changeLabel: "vs last month",
    icon: "group_add",
    iconColor: "text-neon-purple/30",
    changeColor: "text-neon-purple",
  },
  {
    label: "Job Views",
    value: "12.5k",
    progress: 65,
    icon: "visibility",
    iconColor: "text-blue-500/30",
  },
  {
    label: "Pending Review",
    value: "45",
    change: "Action Required",
    icon: "schedule",
    iconColor: "text-orange-500/30",
    changeColor: "text-orange-400",
  },
];

const activityData = [
  {
    name: "John Doe",
    initials: "JD",
    gradient: "from-purple-500 to-pink-500",
    action: "applied for",
    target: "Senior Frontend Engineer",
    targetColor: "text-neon-green",
    time: "2 minutes ago",
  },
  {
    name: "Alice Smith",
    initials: "AS",
    gradient: "from-blue-500 to-cyan-500",
    action: "moved to",
    target: "Technical Interview",
    targetColor: "text-neon-purple",
    time: "15 minutes ago",
  },
  {
    name: null,
    initials: null,
    icon: "schedule",
    action: "Interview scheduled with",
    target: "Mike Ross",
    targetColor: "text-white",
    time: "1 hour ago",
  },
  {
    name: "Maria K.",
    initials: "MK",
    gradient: "from-yellow-500 to-orange-500",
    action: "commented on",
    target: "Backend Dev #402",
    targetColor: "text-gray-400",
    time: "2 hours ago",
  },
];

const jobsData = [
  {
    title: "Senior Frontend Engineer",
    skills: "React, TypeScript",
    posted: "2d ago",
    type: "REMOTE",
    applicants: 44,
    status: "Active",
    statusColor: "text-neon-green",
  },
  {
    title: "Backend Team Lead",
    skills: "Node.js, AWS",
    posted: "5d ago",
    type: "HYBRID",
    applicants: 20,
    status: "Active",
    statusColor: "text-neon-green",
  },
  {
    title: "Product Designer",
    skills: "Figma, UI/UX",
    posted: "1w ago",
    type: "REMOTE",
    applicants: 127,
    status: "Paused",
    statusColor: "text-yellow-500",
  },
];

const chartBars = [30, 45, 20, 60, 75, 50, 80, 65, 40, 55, 35, 45, 60, 70, 85, 50];

export default function DashboardPage() {
  const [chartView, setChartView] = useState<"day" | "week">("day");

  return (
    <>
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">
            Company Dashboard
          </h2>
          <p className="text-gray-400 text-sm">
            Real-time overview of your recruitment pipeline.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 material-symbols-outlined text-lg">
              search
            </span>
            <input
              className="bg-card-dark border border-accent-dark text-sm rounded-full pl-10 pr-4 py-2.5 w-64 focus:ring-1 focus:ring-neon-green focus:border-neon-green text-white placeholder-gray-500 focus:outline-none"
              placeholder="Search candidates, jobs..."
              type="text"
            />
          </div>
          <button className="relative p-2.5 rounded-full bg-card-dark border border-accent-dark hover:text-white text-gray-400 transition-colors">
            <span className="material-symbols-outlined text-xl">
              notifications
            </span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-neon-green rounded-full animate-pulse" />
          </button>
          <Link
            href="/dashboard/post-job"
            className="bg-neon-green hover:bg-[#3cd612] text-background-dark font-bold text-sm px-5 py-2.5 rounded-full transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(73,230,25,0.2)]"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            Create Job
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6">
        {/* Stats Cards */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((stat) => (
            <div
              key={stat.label}
              className="glass-panel p-5 rounded-2xl flex flex-col justify-between h-32 relative overflow-hidden group"
            >
              <div className="absolute right-0 top-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                <span
                  className={`material-symbols-outlined ${stat.iconColor} text-4xl`}
                >
                  {stat.icon}
                </span>
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold mb-1">
                  {stat.label}
                </p>
                <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
              </div>
              {stat.progress ? (
                <div className="w-full bg-gray-800 h-1 mt-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full"
                    style={{ width: `${stat.progress}%` }}
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={`flex items-center ${stat.changeColor} bg-${stat.changeColor?.split("-")[1]}/10 px-1.5 py-0.5 rounded text-[10px] font-bold`}
                  >
                    {stat.change?.startsWith("+") && (
                      <span className="material-symbols-outlined text-xs mr-0.5">
                        trending_up
                      </span>
                    )}
                    {stat.change}
                  </span>
                  {stat.changeLabel && (
                    <span className="text-gray-500">{stat.changeLabel}</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Main Charts Area */}
        <div className="col-span-12 lg:col-span-8 grid grid-cols-2 gap-4">
          {/* Traffic Chart */}
          <div className="glass-panel p-6 rounded-2xl col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold">Application Traffic</h3>
                <p className="text-xs text-gray-400">
                  Real-time candidate application flow
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setChartView("day")}
                  className={`text-xs font-medium px-3 py-1 rounded ${chartView === "day" ? "text-white bg-white/10" : "text-gray-500 hover:text-white hover:bg-white/10"}`}
                >
                  Day
                </button>
                <button
                  onClick={() => setChartView("week")}
                  className={`text-xs font-medium px-3 py-1 rounded ${chartView === "week" ? "text-white bg-white/10" : "text-gray-500 hover:text-white hover:bg-white/10"}`}
                >
                  Week
                </button>
              </div>
            </div>
            <div className="h-48 w-full flex items-end gap-1">
              {chartBars.map((height, i) => (
                <div
                  key={i}
                  className={`flex-1 ${i === 7 ? "bg-neon-green/20" : "bg-accent-dark"} hover:bg-neon-green/50 transition-colors rounded-t-sm relative group`}
                  style={{ height: `${height}%` }}
                >
                  {i === 7 && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-xs px-2 py-1 rounded text-white opacity-0 group-hover:opacity-100 whitespace-nowrap border border-gray-700 pointer-events-none">
                      Today: 65 apps
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-gray-500 uppercase font-mono">
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
            </div>
          </div>

          {/* Funnel Conversion */}
          <div className="glass-panel p-5 rounded-2xl">
            <h4 className="text-sm font-bold mb-4 text-gray-300">
              Funnel Conversion
            </h4>
            <div className="space-y-3">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Views</span>
                  <span className="text-white font-mono">12,402</span>
                </div>
                <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-full rounded-full" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Clicks</span>
                  <span className="text-white font-mono">3,205</span>
                </div>
                <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400 w-[25%] rounded-full" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Applications</span>
                  <span className="text-white font-mono">843</span>
                </div>
                <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-neon-purple w-[6%] rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Candidate Sources */}
          <div className="glass-panel p-5 rounded-2xl">
            <h4 className="text-sm font-bold mb-4 text-gray-300">
              Candidate Sources
            </h4>
            <div className="flex items-center gap-4 h-full pb-4">
              <div className="relative w-24 h-24 shrink-0">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 36 36"
                >
                  <path
                    className="text-gray-800"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="text-neon-green"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="40, 100"
                    strokeWidth="4"
                  />
                  <path
                    className="text-neon-purple"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="25, 100"
                    strokeDashoffset="-40"
                    strokeWidth="4"
                  />
                  <path
                    className="text-blue-500"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="35, 100"
                    strokeDashoffset="-65"
                    strokeWidth="4"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-[10px] text-gray-400">Total</span>
                  <span className="text-xs font-bold text-white">100%</span>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-2 w-full text-xs">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-neon-green" />
                    <span className="text-gray-400">Direct</span>
                  </div>
                  <span className="font-bold">40%</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-neon-purple" />
                    <span className="text-gray-400">LinkedIn</span>
                  </div>
                  <span className="font-bold">25%</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-gray-400">Referral</span>
                  </div>
                  <span className="font-bold">35%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Activity Panel */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
          <div className="glass-panel p-6 rounded-2xl h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Live Activity</h3>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-[10px] font-bold text-green-500 uppercase">
                  Live
                </span>
              </div>
            </div>
            <div
              className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar"
              style={{ maxHeight: "400px" }}
            >
              {activityData.map((activity, i) => (
                <div
                  key={i}
                  className="flex gap-3 items-start p-3 rounded-xl bg-white/5 border border-transparent hover:border-neon-green/20 transition-all cursor-pointer"
                >
                  {activity.icon ? (
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-[10px] font-bold shrink-0">
                      <span className="material-symbols-outlined text-sm">
                        {activity.icon}
                      </span>
                    </div>
                  ) : (
                    <div
                      className={`w-8 h-8 rounded-full bg-gradient-to-br ${activity.gradient} flex items-center justify-center text-[10px] font-bold shrink-0`}
                    >
                      {activity.initials}
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-200">
                      {activity.name && (
                        <span className="font-bold text-white">
                          {activity.name}
                        </span>
                      )}{" "}
                      {activity.action}{" "}
                      <span className={activity.targetColor}>
                        {activity.target}
                      </span>
                    </p>
                    <span className="text-[10px] text-gray-500 mt-1 block">
                      {activity.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-xs font-medium text-gray-400 hover:text-white py-2 border-t border-white/5 transition-colors">
              View All Activity
            </button>
          </div>
        </div>

        {/* Jobs Table */}
        <div className="col-span-12">
          <div className="glass-panel rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-lg font-bold">Active Job Listings</h3>
              <Link
                href="/dashboard/jobs"
                className="text-sm text-neon-green hover:text-white transition-colors"
              >
                View All Jobs
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs text-gray-500 border-b border-white/5 bg-white/[0.02]">
                    <th className="p-4 font-semibold uppercase tracking-wider">
                      Role
                    </th>
                    <th className="p-4 font-semibold uppercase tracking-wider">
                      Type
                    </th>
                    <th className="p-4 font-semibold uppercase tracking-wider">
                      Applicants
                    </th>
                    <th className="p-4 font-semibold uppercase tracking-wider">
                      Status
                    </th>
                    <th className="p-4 font-semibold uppercase tracking-wider text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-300">
                  {jobsData.map((job, i) => (
                    <tr
                      key={i}
                      className="hover:bg-white/5 transition-colors group border-b border-white/5 last:border-0"
                    >
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-white group-hover:text-neon-green transition-colors">
                            {job.title}
                          </span>
                          <span className="text-xs text-gray-500">
                            {job.skills} • Posted {job.posted}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="bg-gray-800 text-gray-300 text-[10px] font-bold px-2 py-1 rounded border border-gray-700">
                          {job.type}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            <div className="w-6 h-6 rounded-full bg-gray-600 border border-card-dark" />
                            <div className="w-6 h-6 rounded-full bg-gray-500 border border-card-dark" />
                            <div className="w-6 h-6 rounded-full bg-gray-400 border border-card-dark flex items-center justify-center text-[8px] text-black font-bold">
                              +{job.applicants}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`flex items-center gap-1.5 ${job.statusColor} text-xs font-bold`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${job.statusColor === "text-neon-green" ? "bg-neon-green" : "bg-yellow-500"}`}
                          />
                          {job.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button className="text-gray-400 hover:text-white p-1">
                          <span className="material-symbols-outlined text-lg">
                            more_vert
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
