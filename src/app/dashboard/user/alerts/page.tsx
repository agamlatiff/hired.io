"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";

interface JobAlert {
  id: string;
  keyword: string | null;
  location: string | null;
  jobType: string | null;
  minSalary: number | null;
  frequency: string;
  isActive: boolean;
  createdAt: string;
}

export default function JobAlertsPage() {
  const { data: session } = useSession();
  const [alerts, setAlerts] = useState<JobAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [frequency, setFrequency] = useState("daily");

  useEffect(() => {
    async function fetchAlerts() {
      try {
        const res = await fetch("/api/user/alerts");
        if (res.ok) {
          setAlerts(await res.json());
        }
      } catch (error) {
        console.error("Error fetching alerts:", error);
      } finally {
        setLoading(false);
      }
    }

    if (session) {
      fetchAlerts();
    }
  }, [session]);

  const createAlert = async () => {
    try {
      const res = await fetch("/api/user/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keyword: keyword || null,
          location: location || null,
          jobType: jobType || null,
          minSalary: minSalary || null,
          frequency,
        }),
      });

      if (res.ok) {
        const newAlert = await res.json();
        setAlerts([newAlert, ...alerts]);
        setShowForm(false);
        setKeyword("");
        setLocation("");
        setJobType("");
        setMinSalary("");
        setFrequency("daily");
        toast({ title: "Alert Created", description: "You'll receive notifications for matching jobs." });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to create alert.", variant: "destructive" });
    }
  };

  const toggleAlert = async (alertId: string, isActive: boolean) => {
    try {
      const res = await fetch("/api/user/alerts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alertId, isActive: !isActive }),
      });

      if (res.ok) {
        setAlerts(alerts.map((a) => (a.id === alertId ? { ...a, isActive: !isActive } : a)));
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to update alert.", variant: "destructive" });
    }
  };

  const deleteAlert = async (alertId: string) => {
    try {
      const res = await fetch("/api/user/alerts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alertId }),
      });

      if (res.ok) {
        setAlerts(alerts.filter((a) => a.id !== alertId));
        toast({ title: "Alert Deleted", description: "Job alert removed." });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete alert.", variant: "destructive" });
    }
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-gray-400">Please sign in to manage job alerts.</p>
      </div>
    );
  }

  return (
    <>
      <header className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">Job Alerts</h2>
          <p className="text-gray-400 text-sm">
            Get notified when new jobs match your criteria.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-neon-green hover:bg-[#3cd612] text-background-dark font-bold text-sm px-6 py-2.5 rounded-full transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Create Alert
        </button>
      </header>

      {/* Create Alert Form */}
      {showForm && (
        <div className="glass-panel p-6 rounded-2xl mb-8">
          <h3 className="text-lg font-bold text-white mb-6">New Job Alert</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Keyword</label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g. Frontend Developer"
                className="w-full px-4 py-3 rounded-xl bg-card-dark border border-white/10 text-white focus:border-neon-green focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Jakarta"
                className="w-full px-4 py-3 rounded-xl bg-card-dark border border-white/10 text-white focus:border-neon-green focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Job Type</label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-card-dark border border-white/10 text-white focus:border-neon-green focus:outline-none"
              >
                <option value="">Any</option>
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Frequency</label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-card-dark border border-white/10 text-white focus:border-neon-green focus:outline-none"
              >
                <option value="instant">Instant</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={createAlert}
              className="px-6 py-2.5 bg-neon-green text-background-dark font-bold rounded-full"
            >
              Create Alert
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-6 py-2.5 bg-white/10 text-white rounded-full hover:bg-white/20"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-20 bg-gray-700 rounded-xl animate-pulse"></div>
          ))}
        </div>
      ) : alerts.length === 0 ? (
        <div className="glass-panel p-12 rounded-2xl text-center">
          <span className="material-symbols-outlined text-5xl text-gray-600 mb-4">
            notifications_off
          </span>
          <h3 className="text-xl font-bold text-white mb-2">No job alerts</h3>
          <p className="text-gray-400 mb-6">
            Create an alert to get notified about new matching jobs.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-block px-6 py-3 bg-neon-green text-background-dark font-bold rounded-full"
          >
            Create Your First Alert
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`glass-panel p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 ${!alert.isActive ? "opacity-50" : ""
                }`}
            >
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-2">
                  {alert.keyword && (
                    <span className="px-3 py-1 bg-neon-green/10 text-neon-green rounded-full text-sm font-medium">
                      {alert.keyword}
                    </span>
                  )}
                  {alert.location && (
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm">
                      📍 {alert.location}
                    </span>
                  )}
                  {alert.jobType && (
                    <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm">
                      {alert.jobType}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  {alert.frequency.charAt(0).toUpperCase() + alert.frequency.slice(1)} notifications •
                  Created {new Date(alert.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleAlert(alert.id, alert.isActive)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${alert.isActive
                    ? "bg-green-500/20 text-green-400"
                    : "bg-gray-500/20 text-gray-400"
                    }`}
                >
                  {alert.isActive ? "Active" : "Paused"}
                </button>
                <button
                  onClick={() => deleteAlert(alert.id)}
                  className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
