"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Activity {
  id: string;
  type: string;
  message: string;
  createdAt: string;
  targetId?: string;
}

export default function ActivityPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const res = await fetch("/api/dashboard/activity?limit=50");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setActivities(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchActivities();
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "application":
      case "new_application":
        return "person_add";
      case "status_change":
        return "swap_horiz";
      case "job_created":
        return "work";
      case "interview_scheduled":
        return "event";
      default:
        return "schedule";
    }
  };

  return (
    <>
      <header className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">Activity Log</h2>
          <p className="text-gray-400 text-sm">
            Complete history of all recruitment activities.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="text-sm text-gray-400 hover:text-white flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Back to Dashboard
        </Link>
      </header>

      <div className="glass-panel rounded-2xl p-6">
        {loading ? (
          <div className="space-y-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-4 rounded-xl bg-white/5 animate-pulse"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-700"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-4xl text-gray-600 mb-4 block">
              history
            </span>
            <p className="text-gray-500">No activity yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex gap-4 items-start p-4 rounded-xl bg-white/5 border border-transparent hover:border-neon-green/20 transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined">
                    {getActivityIcon(activity.type)}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-200">{activity.message}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-500">
                      {new Date(activity.createdAt).toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-600 bg-gray-800 px-2 py-0.5 rounded">
                      {activity.type.replace(/_/g, " ")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
