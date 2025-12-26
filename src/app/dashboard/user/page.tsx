"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Application {
  id: string;
  status: string;
  appliedAt: string;
  Job: {
    id: string;
    roles: string;
    Company: {
      name: string;
      logo: string | null;
    } | null;
  } | null;
}

interface SavedJob {
  id: string;
  savedAt: string;
  job: {
    id: string;
    roles: string;
    Company: {
      name: string;
    } | null;
  };
}

export default function UserDashboardPage() {
  const { data: session } = useSession();
  const [applications, setApplications] = useState<Application[]>([]);
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [appsRes, savedRes] = await Promise.all([
          fetch("/api/user/applications"),
          fetch("/api/user/saved-jobs"),
        ]);

        if (appsRes.ok) {
          setApplications(await appsRes.json());
        }
        if (savedRes.ok) {
          setSavedJobs(await savedRes.json());
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    if (session) {
      fetchData();
    }
  }, [session]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "reviewing":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "interview":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "hired":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "rejected":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-gray-400">Please sign in to access your dashboard.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-gray-700 rounded w-1/3"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-700 rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <header className="mb-10">
        <h2 className="text-3xl font-bold text-white mb-1">
          Welcome back, <span className="text-neon-green">{session.user?.name}</span>
        </h2>
        <p className="text-gray-400 text-sm">
          Track your applications and discover new opportunities.
        </p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="glass-panel p-6 rounded-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-400">description</span>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">{applications.length}</p>
              <p className="text-sm text-gray-400">Applications</p>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-purple-400">bookmark</span>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">{savedJobs.length}</p>
              <p className="text-sm text-gray-400">Saved Jobs</p>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-green-400">check_circle</span>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">
                {applications.filter((a) => a.status === "interview").length}
              </p>
              <p className="text-sm text-gray-400">Interviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="glass-panel p-6 rounded-2xl mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">Recent Applications</h3>
          <Link
            href="/dashboard/user/applications"
            className="text-sm text-neon-green hover:underline"
          >
            View All →
          </Link>
        </div>

        {applications.length === 0 ? (
          <div className="text-center py-8">
            <span className="material-symbols-outlined text-4xl text-gray-600 mb-2">inbox</span>
            <p className="text-gray-400">No applications yet.</p>
            <Link
              href="/find-jobs"
              className="inline-block mt-4 px-4 py-2 bg-neon-green text-background-dark font-bold rounded-full text-sm"
            >
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {applications.slice(0, 5).map((app) => (
              <div
                key={app.id}
                className="flex items-center justify-between p-4 bg-card-dark rounded-xl border border-white/5"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center">
                    {app.Job?.Company?.logo ? (
                      <img
                        src={app.Job.Company.logo}
                        alt=""
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <span className="text-gray-400 font-bold">
                        {app.Job?.Company?.name?.charAt(0) || "?"}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-white">{app.Job?.roles || "Unknown Role"}</p>
                    <p className="text-xs text-gray-400">
                      {app.Job?.Company?.name || "Unknown Company"}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(
                    app.status
                  )}`}
                >
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/find-jobs"
          className="glass-panel p-6 rounded-2xl flex items-center gap-4 hover:border-neon-green/50 transition-colors group"
        >
          <div className="w-12 h-12 rounded-xl bg-neon-green/20 flex items-center justify-center group-hover:bg-neon-green/30 transition-colors">
            <span className="material-symbols-outlined text-neon-green">search</span>
          </div>
          <div>
            <p className="font-bold text-white">Find New Jobs</p>
            <p className="text-sm text-gray-400">Discover opportunities</p>
          </div>
        </Link>

        <Link
          href="/dashboard/user/profile"
          className="glass-panel p-6 rounded-2xl flex items-center gap-4 hover:border-neon-purple/50 transition-colors group"
        >
          <div className="w-12 h-12 rounded-xl bg-neon-purple/20 flex items-center justify-center group-hover:bg-neon-purple/30 transition-colors">
            <span className="material-symbols-outlined text-neon-purple">edit</span>
          </div>
          <div>
            <p className="font-bold text-white">Update Profile</p>
            <p className="text-sm text-gray-400">Improve your visibility</p>
          </div>
        </Link>
      </div>
    </>
  );
}
