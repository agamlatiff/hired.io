"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface Job {
  id: string;
  roles: string;
  location?: string;
  jobType: string;
  status: string;
  salaryFrom: string;
  salaryTo: string;
  currency: string;
  datePosted: string;
  views: number;
  department?: string;
  description: string;
  requiredSkills: string[];
}

interface Applicant {
  id: string;
  status: string;
  appliedAt: string;
  user: {
    name: string;
    email: string;
    avatar?: string;
    skills: string[];
  };
}

export default function JobDetailAdminPage() {
  const params = useParams();
  const jobId = params.id as string;

  const [job, setJob] = useState<Job | null>(null);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [jobRes, applicantsRes] = await Promise.all([
          fetch(`/api/job/${jobId}`),
          fetch(`/api/jobs/${jobId}/applicants`),
        ]);

        if (!jobRes.ok || !applicantsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const jobData = await jobRes.json();
        const applicantsData = await applicantsRes.json();

        setJob(jobData);
        setApplicants(applicantsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    if (jobId) {
      fetchData();
    }
  }, [jobId]);

  const handleStatusUpdate = async (applicantId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/applicants/${applicantId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        // Refresh applicants
        setApplicants(prev =>
          prev.map(a => (a.id === applicantId ? { ...a, status: newStatus } : a))
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "screening":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "interview":
        return "bg-neon-purple/10 text-neon-purple border-neon-purple/20";
      case "offered":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "rejected":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-gray-800 text-gray-400 border-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-neon-green border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">Error: {error || "Job not found"}</p>
          <Link
            href="/dashboard/jobs"
            className="bg-neon-green text-background-dark px-6 py-2 rounded-full"
          >
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  const statusCount = {
    new: applicants.filter(a => a.status === "new").length,
    screening: applicants.filter(a => a.status === "screening").length,
    interview: applicants.filter(a => a.status === "interview").length,
    offered: applicants.filter(a => a.status === "offered").length,
  };

  return (
    <>
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
        <div className="flex items-start gap-4">
          <Link
            href="/dashboard/jobs"
            className="bg-card-dark border border-accent-dark p-2 rounded-full text-gray-400 hover:text-white hover:border-neon-green transition-all"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-3xl font-bold text-white tracking-tight">
                {job.roles}
              </h2>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 border ${job.status === "active"
                  ? "bg-neon-green/20 text-neon-green border-neon-green/20"
                  : job.status === "paused"
                    ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/20"
                    : "bg-gray-800 text-gray-400 border-gray-700"
                }`}>
                {job.status === "active" && (
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                )}
                {job.status}
              </span>
            </div>
            <div className="flex items-center gap-4 text-gray-400 text-sm flex-wrap">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-base">location_on</span>
                {job.location || "Not specified"}
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-base">schedule</span>
                {job.jobType}
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-base">payments</span>
                {job.currency} {job.salaryFrom} - {job.salaryTo}
              </span>
              <span className="text-gray-600">•</span>
              <span>Posted {new Date(job.datePosted).toLocaleDateString()}</span>
              <span className="text-gray-600">•</span>
              <span className="font-mono text-xs text-gray-500">ID: #{job.id.slice(0, 8)}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        {[
          { label: "Total Views", value: job.views, icon: "visibility", color: "text-neon-green/30" },
          { label: "Applied", value: applicants.length, icon: "group_add", color: "text-neon-purple/30" },
          { label: "In Interview", value: statusCount.interview, icon: "video_call", color: "text-blue-500/30" },
          { label: "Offers", value: statusCount.offered, icon: "handshake", color: "text-yellow-500/30" },
        ].map((stat) => (
          <div key={stat.label} className="col-span-12 md:col-span-3">
            <div className="glass-panel p-5 rounded-2xl">
              <div className="flex justify-between items-start mb-2">
                <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                  {stat.label}
                </span>
                <span className={`material-symbols-outlined ${stat.color}`}>
                  {stat.icon}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Applicants List */}
      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h3 className="text-lg font-bold">Applicants ({applicants.length})</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/[0.02]">
              <tr className="text-xs text-gray-500 border-b border-white/5">
                <th className="p-5 font-semibold uppercase tracking-wider">Name</th>
                <th className="p-5 font-semibold uppercase tracking-wider">Skills</th>
                <th className="p-5 font-semibold uppercase tracking-wider">Status</th>
                <th className="p-5 font-semibold uppercase tracking-wider">Applied</th>
                <th className="p-5 font-semibold uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-white/5">
              {applicants.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-gray-500">
                    No applicants yet
                  </td>
                </tr>
              ) : (
                applicants.map((applicant) => (
                  <tr key={applicant.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-purple to-blue-500 flex items-center justify-center text-white font-bold">
                          {applicant.user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-white">{applicant.user.name}</div>
                          <div className="text-xs text-gray-500">{applicant.user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex gap-1 flex-wrap max-w-xs">
                        {applicant.user.skills?.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-gray-400"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-5">
                      <select
                        value={applicant.status}
                        onChange={(e) => handleStatusUpdate(applicant.id, e.target.value)}
                        className={`px-2.5 py-1 rounded-full text-xs font-bold border capitalize ${getStatusColor(applicant.status)} bg-transparent cursor-pointer`}
                      >
                        <option value="new">New</option>
                        <option value="screening">Screening</option>
                        <option value="interview">Interview</option>
                        <option value="offered">Offered</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="p-5 text-gray-400">
                      {new Date(applicant.appliedAt).toLocaleDateString()}
                    </td>
                    <td className="p-5 text-right">
                      <button className="p-2 hover:bg-neon-green/20 hover:text-neon-green rounded-lg transition-colors text-gray-400">
                        <span className="material-symbols-outlined text-lg">visibility</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
