"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Application { id: string; status: string; appliedAt: string; Job: { id: string; roles: string; Company: { name: string; logo: string | null } | null } | null }
interface SavedJob { id: string; savedAt: string; job: { id: string; roles: string; Company: { name: string } | null } }

export default function UserDashboardPage() {
  const { data: session } = useSession();
  const [applications, setApplications] = useState<Application[]>([]);
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [appsRes, savedRes] = await Promise.all([fetch("/api/user/applications"), fetch("/api/user/saved-jobs")]);
        if (appsRes.ok) setApplications(await appsRes.json());
        if (savedRes.ok) setSavedJobs(await savedRes.json());
      } catch (error) { console.error("Error:", error); }
      finally { setLoading(false); }
    }
    if (session) fetchData();
  }, [session]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = { new: "bg-blue-500/20 text-blue-400", reviewing: "bg-yellow-500/20 text-yellow-400", interview: "bg-purple-500/20 text-purple-400", hired: "bg-green-500/20 text-green-400", rejected: "bg-red-500/20 text-red-400" };
    return colors[status.toLowerCase()] || "bg-gray-500/20 text-gray-400";
  };

  if (!session) return <div className="flex items-center justify-center h-[60vh]"><p className="text-gray-400">Please sign in.</p></div>;
  if (loading) return (
    <div className="animate-pulse">
      {/* Header */}
      <div className="mb-10">
        <div className="h-8 bg-gray-700 rounded w-80 mb-2" />
        <div className="h-4 bg-gray-700/50 rounded w-72" />
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass-panel p-6 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-700 rounded-xl" />
              <div className="flex-1">
                <div className="h-8 bg-gray-700 rounded w-12 mb-2" />
                <div className="h-4 bg-gray-700/50 rounded w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Recent Applications Card */}
      <div className="glass-panel p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="h-5 bg-gray-700 rounded w-40" />
          <div className="h-4 bg-gray-700/50 rounded w-20" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-card-dark rounded-xl border border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-700 rounded-lg" />
                <div>
                  <div className="h-4 bg-gray-700 rounded w-40 mb-2" />
                  <div className="h-3 bg-gray-700/50 rounded w-28" />
                </div>
              </div>
              <div className="h-6 bg-gray-700 rounded-full w-20" />
            </div>
          ))}
        </div>
      </div>
      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="glass-panel p-6 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-700 rounded-xl" />
            <div className="flex-1">
              <div className="h-5 bg-gray-700 rounded w-32 mb-2" />
              <div className="h-4 bg-gray-700/50 rounded w-40" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <header className="mb-10">
        <h2 className="text-3xl font-bold text-white mb-1">Welcome back, <span className="text-neon-green">{session.user?.name}</span></h2>
        <p className="text-gray-400 text-sm">Track your applications and discover new opportunities.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[{ icon: "description", color: "blue", value: applications.length, label: "Applications" }, { icon: "bookmark", color: "purple", value: savedJobs.length, label: "Saved Jobs" }, { icon: "check_circle", color: "green", value: applications.filter((a) => a.status === "interview").length, label: "Interviews" }].map((stat) => (
          <div key={stat.label} className="glass-panel p-6 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-${stat.color}-500/20 flex items-center justify-center`}><span className={`material-symbols-outlined text-${stat.color}-400`}>{stat.icon}</span></div>
              <div><p className="text-3xl font-bold text-white">{stat.value}</p><p className="text-sm text-gray-400">{stat.label}</p></div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-panel p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">Recent Applications</h3>
          <Link href="/dashboard/user/applications" className="text-sm text-neon-green hover:underline">View All →</Link>
        </div>
        {applications.length === 0 ? (
          <div className="text-center py-8">
            <span className="material-symbols-outlined text-4xl text-gray-600 mb-2">inbox</span>
            <p className="text-gray-400">No applications yet.</p>
            <Link href="/find-jobs" className="inline-block mt-4 px-4 py-2 bg-neon-green text-background-dark font-bold rounded-full text-sm">Browse Jobs</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {applications.slice(0, 5).map((app) => (
              <div key={app.id} className="flex items-center justify-between p-4 bg-card-dark rounded-xl border border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center">{app.Job?.Company?.logo ? <img src={app.Job.Company.logo} alt="" className="w-full h-full object-cover rounded-lg" /> : <span className="text-gray-400 font-bold">{app.Job?.Company?.name?.charAt(0) || "?"}</span>}</div>
                  <div><p className="font-bold text-white">{app.Job?.roles || "Unknown"}</p><p className="text-xs text-gray-400">{app.Job?.Company?.name || "Unknown"}</p></div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(app.status)}`}>{app.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/find-jobs" className="glass-panel p-6 rounded-2xl flex items-center gap-4 hover:border-neon-green/50 transition-colors group">
          <div className="w-12 h-12 rounded-xl bg-neon-green/20 flex items-center justify-center group-hover:bg-neon-green/30"><span className="material-symbols-outlined text-neon-green">search</span></div>
          <div><p className="font-bold text-white">Find New Jobs</p><p className="text-sm text-gray-400">Discover opportunities</p></div>
        </Link>
        <Link href="/dashboard/user/profile" className="glass-panel p-6 rounded-2xl flex items-center gap-4 hover:border-neon-purple/50 transition-colors group">
          <div className="w-12 h-12 rounded-xl bg-neon-purple/20 flex items-center justify-center group-hover:bg-neon-purple/30"><span className="material-symbols-outlined text-neon-purple">edit</span></div>
          <div><p className="font-bold text-white">Update Profile</p><p className="text-sm text-gray-400">Improve your visibility</p></div>
        </Link>
      </div>
    </>
  );
}
