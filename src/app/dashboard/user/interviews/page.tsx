"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface Interview {
  id: string;
  scheduledAt: string;
  duration: number;
  type: string;
  location: string | null;
  status: string;
  company: { id: string; name: string; logo: string | null };
  applicant: { Job: { id: string; roles: string } | null };
}

export default function UserInterviewsPage() {
  const { data: session } = useSession();
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInterviews() {
      try {
        const res = await fetch("/api/user/interviews");
        if (res.ok) setInterviews(await res.json());
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    if (session) fetchInterviews();
  }, [session]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video": return "videocam";
      case "phone": return "call";
      case "onsite": return "location_on";
      default: return "event";
    }
  };

  const now = new Date();
  const upcomingInterviews = interviews.filter((i) => new Date(i.scheduledAt) >= now);

  if (!session) {
    return <div className="flex items-center justify-center h-[60vh]"><p className="text-gray-400">Please sign in.</p></div>;
  }

  return (
    <>
      <header className="mb-10">
        <h2 className="text-3xl font-bold text-white mb-1">My Interviews</h2>
        <p className="text-gray-400 text-sm">Your upcoming interview schedule.</p>
      </header>

      {loading ? (
        <div className="space-y-4">{[1, 2].map((i) => <div key={i} className="h-24 bg-gray-700 rounded-xl animate-pulse" />)}</div>
      ) : upcomingInterviews.length === 0 ? (
        <div className="glass-panel p-12 rounded-2xl text-center">
          <span className="material-symbols-outlined text-5xl text-gray-600 mb-4">event_available</span>
          <h3 className="text-xl font-bold text-white mb-2">No upcoming interviews</h3>
          <p className="text-gray-400">When companies schedule interviews, they will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {upcomingInterviews.map((interview) => (
            <div key={interview.id} className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center overflow-hidden">
                  {interview.company.logo ? (
                    <img src={interview.company.logo} alt="" className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-gray-800 font-bold">{interview.company.name.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-white">{interview.applicant.Job?.roles || "Position"}</h3>
                  <p className="text-sm text-gray-400">{interview.company.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-neon-purple">
                  <span className="material-symbols-outlined">{getTypeIcon(interview.type)}</span>
                  <span className="capitalize">{interview.type}</span>
                </div>
                <div className="text-center">
                  <p className="font-bold text-white">{new Date(interview.scheduledAt).toLocaleDateString()}</p>
                  <p className="text-xs text-gray-400">{new Date(interview.scheduledAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-white">{interview.duration} min</p>
                </div>
              </div>

              {interview.location && (
                <a
                  href={interview.location}
                  target="_blank"
                  className="px-6 py-2 bg-neon-green text-background-dark font-bold rounded-full text-sm hover:bg-[#3cd612] transition-colors"
                >
                  Join Meeting
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
