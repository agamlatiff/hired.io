"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";

interface SavedJob {
  id: string;
  savedAt: string;
  job: {
    id: string;
    roles: string;
    location: string | null;
    jobType: string;
    salaryFrom: string;
    salaryTo: string;
    currency: string;
    Company: {
      id: string;
      name: string;
      logo: string | null;
    } | null;
  };
}

export default function SavedJobsPage() {
  const { data: session } = useSession();
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSavedJobs() {
      try {
        const res = await fetch("/api/user/saved-jobs");
        if (res.ok) {
          setSavedJobs(await res.json());
        }
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
      } finally {
        setLoading(false);
      }
    }

    if (session) {
      fetchSavedJobs();
    }
  }, [session]);

  const unsaveJob = async (jobId: string) => {
    try {
      const res = await fetch("/api/user/saved-jobs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId }),
      });

      if (res.ok) {
        setSavedJobs(savedJobs.filter((sj) => sj.job.id !== jobId));
        toast({ title: "Job Removed", description: "Job removed from saved list." });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to remove job.", variant: "destructive" });
    }
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-gray-400">Please sign in to view saved jobs.</p>
      </div>
    );
  }

  return (
    <>
      <header className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">Saved Jobs</h2>
          <p className="text-gray-400 text-sm">
            Jobs you&apos;ve bookmarked for later.
          </p>
        </div>
        <Link
          href="/find-jobs"
          className="bg-neon-green hover:bg-[#3cd612] text-background-dark font-bold text-sm px-6 py-2.5 rounded-full transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-lg">search</span>
          Find More
        </Link>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-gray-700 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      ) : savedJobs.length === 0 ? (
        <div className="glass-panel p-12 rounded-2xl text-center">
          <span className="material-symbols-outlined text-5xl text-gray-600 mb-4">
            bookmark_border
          </span>
          <h3 className="text-xl font-bold text-white mb-2">No saved jobs</h3>
          <p className="text-gray-400 mb-6">
            Save jobs while browsing to review them later.
          </p>
          <Link
            href="/find-jobs"
            className="inline-block px-6 py-3 bg-neon-green text-background-dark font-bold rounded-full"
          >
            Browse Jobs
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedJobs.map((saved) => (
            <div
              key={saved.id}
              className="glass-panel p-6 rounded-2xl flex flex-col group hover:border-neon-green/50 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center overflow-hidden">
                  {saved.job.Company?.logo ? (
                    <img
                      src={saved.job.Company.logo}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-gray-800 font-bold text-lg">
                      {saved.job.Company?.name?.charAt(0) || "?"}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => unsaveJob(saved.job.id)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                  title="Remove from saved"
                >
                  <span className="material-symbols-outlined">bookmark_remove</span>
                </button>
              </div>

              <h3 className="font-bold text-white text-lg mb-1 group-hover:text-neon-green transition-colors">
                {saved.job.roles}
              </h3>
              <p className="text-sm text-gray-400 mb-2">
                {saved.job.Company?.name || "Unknown Company"}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {saved.job.location && (
                  <span className="px-2 py-1 bg-card-dark rounded text-xs text-gray-300">
                    {saved.job.location}
                  </span>
                )}
                <span className="px-2 py-1 bg-card-dark rounded text-xs text-gray-300">
                  {saved.job.jobType}
                </span>
              </div>

              <p className="text-sm text-neon-green font-bold mb-4">
                {saved.job.currency} {parseInt(saved.job.salaryFrom).toLocaleString()} - {parseInt(saved.job.salaryTo).toLocaleString()}
              </p>

              <div className="mt-auto flex gap-2">
                <Link
                  href={`/detail/job/${saved.job.id}`}
                  className="flex-1 text-center px-4 py-2 bg-white/10 rounded-xl text-sm font-medium hover:bg-white/20 transition-colors"
                >
                  View Details
                </Link>
                <Link
                  href={`/detail/job/${saved.job.id}#apply`}
                  className="flex-1 text-center px-4 py-2 bg-neon-green text-background-dark rounded-xl text-sm font-bold hover:bg-[#3cd612] transition-colors"
                >
                  Apply Now
                </Link>
              </div>

              <p className="text-xs text-gray-500 mt-3 text-center">
                Saved {new Date(saved.savedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
