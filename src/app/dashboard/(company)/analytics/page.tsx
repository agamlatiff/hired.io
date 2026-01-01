"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface Analytics {
  overview: { totalViews: number; totalApplications: number; conversionRate: string | number; activeJobs: number; hiredCount: number };
  statusBreakdown: Record<string, number>;
  sourceBreakdown: Record<string, number>;
  trends: { viewsByDay: Record<string, number>; applicationsByDay: Record<string, number> };
  jobPerformance: { id: string; title: string; views: number; applications: number; conversion: string | number; status: string }[];
}

export default function AnalyticsPage() {
  const { data: session } = useSession();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    async function fetchAnalytics() {
      try { const res = await fetch("/api/company/analytics"); if (res.ok) setAnalytics(await res.json()); }
      catch (error) { console.error("Error:", error); }
      finally { setLoading(false); }
    }
    if (session) fetchAnalytics();
  }, [session]);

  if (!session) return <div className="flex items-center justify-center h-[60vh]"><p className="text-gray-400">Please sign in.</p></div>;
  if (loading) return <div className="animate-pulse space-y-6"><div className="h-8 bg-gray-700 rounded w-1/4" /><div className="grid grid-cols-4 gap-6">{[1, 2, 3, 4].map((i) => <div key={i} className="h-32 bg-gray-700 rounded-2xl" />)}</div></div>;
  if (!analytics) return <div className="text-center py-12"><p className="text-gray-400">Failed to load analytics.</p></div>;

  const statusColors: Record<string, string> = { new: "bg-blue-500", reviewing: "bg-yellow-500", interview: "bg-purple-500", hired: "bg-green-500", rejected: "bg-red-500" };

  const handleExport = async () => {
    setExporting(true);
    try {
      const res = await fetch("/api/company/analytics/export?format=csv");
      if (!res.ok) throw new Error("Export failed");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `analytics-report-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (error) {
      console.error("Export error:", error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <>
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">Analytics & Reporting</h2>
          <p className="text-gray-400 text-sm">Track your hiring performance and metrics.</p>
        </div>
        <button
          onClick={handleExport}
          disabled={exporting}
          className="bg-neon-green hover:bg-[#3cd612] text-background-dark font-bold text-sm px-5 py-2.5 rounded-full transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(73,230,25,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {exporting ? (
            <>
              <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
              Exporting...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-lg">download</span>
              Export CSV
            </>
          )}
        </button>
      </header>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Total Views", value: analytics.overview.totalViews.toLocaleString(), icon: "visibility", color: "blue" },
          { label: "Applications", value: analytics.overview.totalApplications, icon: "description", color: "purple" },
          { label: "Conversion Rate", value: `${analytics.overview.conversionRate}%`, icon: "trending_up", color: "green" },
          { label: "Hired", value: analytics.overview.hiredCount, icon: "check_circle", color: "neon-green" },
        ].map((stat) => (
          <div key={stat.label} className="glass-panel p-6 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-${stat.color}-500/20 flex items-center justify-center`}><span className={`material-symbols-outlined text-${stat.color === "neon-green" ? "neon-green" : stat.color + "-400"}`}>{stat.icon}</span></div>
              <div><p className="text-2xl font-bold text-white">{stat.value}</p><p className="text-sm text-gray-400">{stat.label}</p></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6 mb-10">
        {/* Status Breakdown */}
        <div className="col-span-12 md:col-span-4 glass-panel p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Application Status</h3>
          <div className="space-y-4">
            {Object.entries(analytics.statusBreakdown).map(([status, count]) => {
              const total = analytics.overview.totalApplications || 1;
              const percentage = ((count / total) * 100).toFixed(0);
              return (
                <div key={status}>
                  <div className="flex justify-between text-sm mb-1"><span className="text-gray-400 capitalize">{status}</span><span className="text-white font-bold">{count} ({percentage}%)</span></div>
                  <div className="h-2 bg-card-dark rounded-full overflow-hidden"><div className={`h-full ${statusColors[status] || "bg-gray-500"} rounded-full`} style={{ width: `${percentage}%` }} /></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Source Breakdown */}
        <div className="col-span-12 md:col-span-4 glass-panel p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Traffic Sources</h3>
          <div className="space-y-4">
            {Object.entries(analytics.sourceBreakdown).map(([source, count]) => {
              const total = analytics.overview.totalApplications || 1;
              const percentage = ((count / total) * 100).toFixed(0);
              return (
                <div key={source} className="flex items-center justify-between">
                  <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-neon-green" /><span className="text-gray-300">{source}</span></div>
                  <span className="text-white font-bold">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Jobs */}
        <div className="col-span-12 md:col-span-4 glass-panel p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-card-dark rounded-xl"><span className="text-gray-400">Active Jobs</span><span className="text-white font-bold">{analytics.overview.activeJobs}</span></div>
            <div className="flex items-center justify-between p-3 bg-card-dark rounded-xl"><span className="text-gray-400">Avg. Conversion</span><span className="text-neon-green font-bold">{analytics.overview.conversionRate}%</span></div>
            <div className="flex items-center justify-between p-3 bg-card-dark rounded-xl"><span className="text-gray-400">Hired This Month</span><span className="text-green-400 font-bold">{analytics.overview.hiredCount}</span></div>
          </div>
        </div>
      </div>

      {/* Job Performance Table */}
      <div className="glass-panel p-6 rounded-2xl">
        <h3 className="text-lg font-bold text-white mb-6">Job Performance</h3>
        {analytics.jobPerformance.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No job data available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase">Job Title</th>
                <th className="text-right py-3 px-4 text-xs font-bold text-gray-500 uppercase">Views</th>
                <th className="text-right py-3 px-4 text-xs font-bold text-gray-500 uppercase">Applications</th>
                <th className="text-right py-3 px-4 text-xs font-bold text-gray-500 uppercase">Conversion</th>
                <th className="text-center py-3 px-4 text-xs font-bold text-gray-500 uppercase">Status</th>
              </tr></thead>
              <tbody>
                {analytics.jobPerformance.map((job) => (
                  <tr key={job.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-4 px-4 font-medium text-white">{job.title}</td>
                    <td className="py-4 px-4 text-right text-gray-300">{job.views.toLocaleString()}</td>
                    <td className="py-4 px-4 text-right text-gray-300">{job.applications}</td>
                    <td className="py-4 px-4 text-right"><span className="text-neon-green font-bold">{job.conversion}%</span></td>
                    <td className="py-4 px-4 text-center"><span className={`px-2 py-1 rounded-full text-xs font-bold ${job.status === "active" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}`}>{job.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
