"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Application { id: string; status: string; appliedAt: string; coverLetter: string; Job: { id: string; roles: string; location: string | null; jobType: string; Company: { id: string; name: string; logo: string | null } | null } | null }

export default function ApplicationsPage() {
  const { data: session } = useSession();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function fetchApplications() {
      try { const res = await fetch("/api/user/applications"); if (res.ok) setApplications(await res.json()); }
      catch (error) { console.error("Error:", error); }
      finally { setLoading(false); }
    }
    if (session) fetchApplications();
  }, [session]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = { new: "bg-blue-500/20 text-blue-400 border-blue-500/30", reviewing: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", interview: "bg-purple-500/20 text-purple-400 border-purple-500/30", hired: "bg-green-500/20 text-green-400 border-green-500/30", rejected: "bg-red-500/20 text-red-400 border-red-500/30" };
    return colors[status.toLowerCase()] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
  };

  const filteredApplications = filter === "all" ? applications : applications.filter((a) => a.status.toLowerCase() === filter);

  if (!session) return <div className="flex items-center justify-center h-[60vh]"><p className="text-gray-400">Please sign in.</p></div>;

  return (
    <>
      <header className="flex items-center justify-between mb-10">
        <div><h2 className="text-3xl font-bold text-white mb-1">My Applications</h2><p className="text-gray-400 text-sm">Track the status of your job applications.</p></div>
        <Link href="/find-jobs" className="bg-neon-green hover:bg-[#3cd612] text-background-dark font-bold text-sm px-6 py-2.5 rounded-full transition-all flex items-center gap-2"><span className="material-symbols-outlined text-lg">search</span>Find Jobs</Link>
      </header>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {["all", "new", "reviewing", "interview", "hired", "rejected"].map((status) => (
          <button key={status} onClick={() => setFilter(status)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === status ? "bg-neon-green text-background-dark" : "bg-card-dark text-gray-300 hover:bg-white/10"}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}{status !== "all" && <span className="ml-2 text-xs opacity-70">({applications.filter((a) => a.status.toLowerCase() === status).length})</span>}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-700 rounded-xl" />
                <div>
                  <div className="h-5 bg-gray-700 rounded w-44 mb-2" />
                  <div className="h-4 bg-gray-700/50 rounded w-32 mb-1" />
                  <div className="h-3 bg-gray-700/30 rounded w-24" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-7 bg-gray-700 rounded-full w-24" />
                <div className="w-6 h-6 bg-gray-700/50 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredApplications.length === 0 ? (
        <div className="glass-panel p-12 rounded-2xl text-center">
          <span className="material-symbols-outlined text-5xl text-gray-600 mb-4">inbox</span>
          <h3 className="text-xl font-bold text-white mb-2">No applications found</h3>
          <p className="text-gray-400 mb-6">{filter === "all" ? "Start applying to jobs." : `No "${filter}" applications.`}</p>
          <Link href="/find-jobs" className="inline-block px-6 py-3 bg-neon-green text-background-dark font-bold rounded-full">Browse Jobs</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApplications.map((app) => (
            <div key={app.id} className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-700 flex items-center justify-center overflow-hidden">{app.Job?.Company?.logo ? <img src={app.Job.Company.logo} alt="" className="w-full h-full object-cover" /> : <span className="text-gray-400 font-bold text-lg">{app.Job?.Company?.name?.charAt(0) || "?"}</span>}</div>
                <div><h3 className="font-bold text-white">{app.Job?.roles || "Unknown"}</h3><p className="text-sm text-gray-400">{app.Job?.Company?.name || "Unknown"}{app.Job?.location && ` • ${app.Job.location}`}</p><p className="text-xs text-gray-500 mt-1">Applied {new Date(app.appliedAt).toLocaleDateString()}</p></div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${getStatusColor(app.status)}`}>{app.status}</span>
                {app.Job && <Link href={`/detail/job/${app.Job.id}`} className="text-gray-400 hover:text-white transition-colors"><span className="material-symbols-outlined">open_in_new</span></Link>}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
