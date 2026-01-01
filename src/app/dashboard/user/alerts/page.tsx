"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";

interface JobAlert { id: string; keyword: string | null; location: string | null; jobType: string | null; minSalary: number | null; frequency: string; isActive: boolean; createdAt: string }

const Spinner = () => (
  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export default function JobAlertsPage() {
  const { data: session } = useSession();
  const [alerts, setAlerts] = useState<JobAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [creatingAlert, setCreatingAlert] = useState(false);
  const [togglingAlertId, setTogglingAlertId] = useState<string | null>(null);
  const [deletingAlertId, setDeletingAlertId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAlerts() {
      try { const res = await fetch("/api/user/alerts"); if (res.ok) setAlerts(await res.json()); }
      catch (error) { console.error("Error:", error); }
      finally { setLoading(false); }
    }
    if (session) fetchAlerts();
  }, [session]);

  const createAlert = async () => {
    setCreatingAlert(true);
    try {
      const res = await fetch("/api/user/alerts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ keyword: keyword || null, location: location || null, jobType: jobType || null, frequency }) });
      if (res.ok) { const newAlert = await res.json(); setAlerts([newAlert, ...alerts]); setShowForm(false); setKeyword(""); setLocation(""); setJobType(""); setFrequency("daily"); toast({ title: "Alert Created" }); }
    } catch (error) { toast({ title: "Error", variant: "destructive" }); }
    finally { setCreatingAlert(false); }
  };

  const toggleAlert = async (alertId: string, isActive: boolean) => {
    setTogglingAlertId(alertId);
    try { const res = await fetch("/api/user/alerts", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ alertId, isActive: !isActive }) }); if (res.ok) setAlerts(alerts.map((a) => (a.id === alertId ? { ...a, isActive: !isActive } : a))); }
    catch (error) { toast({ title: "Error", variant: "destructive" }); }
    finally { setTogglingAlertId(null); }
  };

  const deleteAlert = async (alertId: string) => {
    setDeletingAlertId(alertId);
    try { const res = await fetch("/api/user/alerts", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ alertId }) }); if (res.ok) { setAlerts(alerts.filter((a) => a.id !== alertId)); toast({ title: "Alert Deleted" }); } }
    catch (error) { toast({ title: "Error", variant: "destructive" }); }
    finally { setDeletingAlertId(null); }
  };

  if (!session) return <div className="flex items-center justify-center h-[60vh]"><p className="text-gray-400">Please sign in.</p></div>;

  return (
    <>
      <header className="flex items-center justify-between mb-10">
        <div><h2 className="text-3xl font-bold text-white mb-1">Job Alerts</h2><p className="text-gray-400 text-sm">Get notified when new jobs match your criteria.</p></div>
        <button onClick={() => setShowForm(true)} className="bg-neon-green hover:bg-[#3cd612] text-background-dark font-bold text-sm px-6 py-2.5 rounded-full transition-all flex items-center gap-2"><span className="material-symbols-outlined text-lg">add</span>Create Alert</button>
      </header>

      {showForm && (
        <div className="glass-panel p-6 rounded-2xl mb-8">
          <h3 className="text-lg font-bold text-white mb-6">New Job Alert</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div><label className="block text-xs font-medium text-gray-400 mb-1.5">Keyword</label><input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="e.g. Frontend Developer" className="w-full px-4 py-3 rounded-xl bg-card-dark border border-white/10 text-white focus:border-neon-green focus:outline-none" /></div>
            <div><label className="block text-xs font-medium text-gray-400 mb-1.5">Location</label><input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Jakarta" className="w-full px-4 py-3 rounded-xl bg-card-dark border border-white/10 text-white focus:border-neon-green focus:outline-none" /></div>
            <div><label className="block text-xs font-medium text-gray-400 mb-1.5">Job Type</label><select value={jobType} onChange={(e) => setJobType(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-card-dark border border-white/10 text-white focus:border-neon-green focus:outline-none"><option value="">Any</option><option value="Remote">Remote</option><option value="On-site">On-site</option><option value="Hybrid">Hybrid</option></select></div>
            <div><label className="block text-xs font-medium text-gray-400 mb-1.5">Frequency</label><select value={frequency} onChange={(e) => setFrequency(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-card-dark border border-white/10 text-white focus:border-neon-green focus:outline-none"><option value="instant">Instant</option><option value="daily">Daily</option><option value="weekly">Weekly</option></select></div>
          </div>
          <div className="flex gap-3"><button onClick={createAlert} disabled={creatingAlert} className="px-6 py-2.5 bg-neon-green text-background-dark font-bold rounded-full flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">{creatingAlert ? <><Spinner />Creating...</> : 'Create Alert'}</button><button onClick={() => setShowForm(false)} disabled={creatingAlert} className="px-6 py-2.5 bg-white/10 text-white rounded-full hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed">Cancel</button></div>
        </div>
      )}

      {loading ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2].map((i) => (
            <div key={i} className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-2">
                  <div className="h-7 bg-gray-700 rounded-full w-24" />
                  <div className="h-7 bg-gray-700/50 rounded-full w-20" />
                  <div className="h-7 bg-gray-700/30 rounded-full w-16" />
                </div>
                <div className="h-4 bg-gray-700/30 rounded w-48" />
              </div>
              <div className="flex items-center gap-3">
                <div className="h-9 bg-gray-700 rounded-full w-20" />
                <div className="w-10 h-10 bg-gray-700/50 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      ) : alerts.length === 0 ? (
        <div className="glass-panel p-12 rounded-2xl text-center">
          <span className="material-symbols-outlined text-5xl text-gray-600 mb-4">notifications_off</span>
          <h3 className="text-xl font-bold text-white mb-2">No job alerts</h3>
          <p className="text-gray-400 mb-6">Create an alert to get notified.</p>
          <button onClick={() => setShowForm(true)} className="inline-block px-6 py-3 bg-neon-green text-background-dark font-bold rounded-full">Create Your First Alert</button>
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className={`glass-panel p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 ${!alert.isActive ? "opacity-50" : ""}`}>
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-2">
                  {alert.keyword && <span className="px-3 py-1 bg-neon-green/10 text-neon-green rounded-full text-sm font-medium">{alert.keyword}</span>}
                  {alert.location && <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm">📍 {alert.location}</span>}
                  {alert.jobType && <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm">{alert.jobType}</span>}
                </div>
                <p className="text-xs text-gray-500">{alert.frequency.charAt(0).toUpperCase() + alert.frequency.slice(1)} • Created {new Date(alert.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => toggleAlert(alert.id, alert.isActive)} disabled={togglingAlertId === alert.id} className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 min-w-[90px] justify-center disabled:cursor-not-allowed ${alert.isActive ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}`}>{togglingAlertId === alert.id ? <Spinner /> : (alert.isActive ? "Active" : "Paused")}</button>
                <button onClick={() => deleteAlert(alert.id)} disabled={deletingAlertId === alert.id} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">{deletingAlertId === alert.id ? <Spinner /> : <span className="material-symbols-outlined">delete</span>}</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
