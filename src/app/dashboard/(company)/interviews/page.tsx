"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";

interface Interview { id: string; scheduledAt: string; duration: number; type: string; location: string | null; notes: string | null; status: string; applicant: { id: string; user: { id: string; name: string; email: string; avatar: string | null } | null; Job: { id: string; roles: string } | null } }

export default function InterviewsPage() {
  const { data: session } = useSession();
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("upcoming");
  const [updatingInterviewId, setUpdatingInterviewId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInterviews() {
      try { const res = await fetch("/api/company/interviews"); if (res.ok) setInterviews(await res.json()); }
      catch (error) { console.error("Error:", error); }
      finally { setLoading(false); }
    }
    if (session) fetchInterviews();
  }, [session]);

  const getStatusColor = (status: string) => ({ scheduled: "bg-blue-500/20 text-blue-400 border-blue-500/30", completed: "bg-green-500/20 text-green-400 border-green-500/30", cancelled: "bg-red-500/20 text-red-400 border-red-500/30", rescheduled: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" }[status] || "bg-gray-500/20 text-gray-400 border-gray-500/30");
  const getTypeIcon = (type: string) => ({ video: "videocam", phone: "call", onsite: "location_on" }[type] || "event");

  const updateStatus = async (interviewId: string, status: string) => {
    setUpdatingInterviewId(interviewId);
    try { const res = await fetch("/api/company/interviews", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ interviewId, status }) }); if (res.ok) { setInterviews(interviews.map((i) => (i.id === interviewId ? { ...i, status } : i))); toast({ title: "Updated", description: `Interview marked as ${status}` }); } }
    catch (error) { toast({ title: "Error", description: "Failed to update", variant: "destructive" }); }
    finally { setUpdatingInterviewId(null); }
  };

  const now = new Date();
  const filteredInterviews = interviews.filter((i) => {
    const date = new Date(i.scheduledAt);
    if (filter === "upcoming") return date >= now && i.status === "scheduled";
    if (filter === "past") return date < now || i.status === "completed";
    if (filter === "cancelled") return i.status === "cancelled";
    return true;
  });

  if (!session) return <div className="flex items-center justify-center h-[60vh]"><p className="text-gray-400">Please sign in.</p></div>;

  return (
    <>
      <header className="flex items-center justify-between mb-10"><div><h2 className="text-3xl font-bold text-white mb-1">Interview Schedule</h2><p className="text-gray-400 text-sm">Manage your scheduled interviews with candidates.</p></div></header>

      <div className="flex gap-2 mb-6">
        {["upcoming", "past", "cancelled", "all"].map((f) => (<button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === f ? "bg-neon-green text-background-dark" : "bg-card-dark text-gray-300 hover:bg-white/10"}`}>{f.charAt(0).toUpperCase() + f.slice(1)}</button>))}
      </div>

      {loading ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-panel p-6 rounded-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-700 rounded-xl" />
                  <div>
                    <div className="h-5 bg-gray-700 rounded w-36 mb-2" />
                    <div className="h-4 bg-gray-700/50 rounded w-28" />
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <div className="h-3 bg-gray-700/30 rounded w-10 mb-1 mx-auto" />
                    <div className="h-5 bg-gray-700 rounded w-20" />
                  </div>
                  <div className="text-center">
                    <div className="h-3 bg-gray-700/30 rounded w-10 mb-1 mx-auto" />
                    <div className="h-5 bg-gray-700 rounded w-14" />
                  </div>
                  <div className="text-center">
                    <div className="h-3 bg-gray-700/30 rounded w-14 mb-1 mx-auto" />
                    <div className="h-5 bg-gray-700 rounded w-16" />
                  </div>
                  <div className="h-7 bg-gray-700 rounded-full w-20" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 bg-gray-700 rounded-lg w-20" />
                  <div className="h-8 bg-gray-700/50 rounded-lg w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredInterviews.length === 0 ? (
        <div className="glass-panel p-12 rounded-2xl text-center"><span className="material-symbols-outlined text-5xl text-gray-600 mb-4">event_busy</span><h3 className="text-xl font-bold text-white mb-2">No interviews</h3><p className="text-gray-400">Schedule interviews from the applicants page.</p></div>
      ) : (
        <div className="space-y-4">
          {filteredInterviews.map((interview) => (
            <div key={interview.id} className="glass-panel p-6 rounded-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-neon-purple/20 flex items-center justify-center"><span className="material-symbols-outlined text-neon-purple">{getTypeIcon(interview.type)}</span></div>
                  <div><h3 className="font-bold text-white">{interview.applicant.user?.name || "Unknown"}</h3><p className="text-sm text-gray-400">{interview.applicant.Job?.roles || "Position"}</p></div>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center"><p className="text-gray-500 text-xs">Date</p><p className="font-bold text-white">{new Date(interview.scheduledAt).toLocaleDateString()}</p></div>
                  <div className="text-center"><p className="text-gray-500 text-xs">Time</p><p className="font-bold text-white">{new Date(interview.scheduledAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p></div>
                  <div className="text-center"><p className="text-gray-500 text-xs">Duration</p><p className="font-bold text-white">{interview.duration} min</p></div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(interview.status)}`}>{interview.status}</span>
                </div>
                <div className="flex items-center gap-2">
                  {interview.status === "scheduled" && (
                    <>
                      <button onClick={() => updateStatus(interview.id, "completed")} disabled={updatingInterviewId === interview.id} className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg text-xs font-bold hover:bg-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 min-w-[80px] justify-center">{updatingInterviewId === interview.id ? <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span> : "Complete"}</button>
                      <button onClick={() => updateStatus(interview.id, "cancelled")} disabled={updatingInterviewId === interview.id} className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg text-xs font-bold hover:bg-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 min-w-[80px] justify-center">{updatingInterviewId === interview.id ? <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span> : "Cancel"}</button>
                    </>
                  )}
                  {interview.location && <a href={interview.location} target="_blank" className="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg text-xs font-bold hover:bg-blue-500/30">Join</a>}
                </div>
              </div>
              {interview.notes && <p className="mt-4 text-sm text-gray-400 border-t border-white/5 pt-4">{interview.notes}</p>}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

