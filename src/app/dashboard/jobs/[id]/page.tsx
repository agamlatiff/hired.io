"use client";

import Link from "next/link";

const statsCards = [
  { label: "Total Views", value: "2,402", change: "12%", changeUp: true, icon: "visibility", iconColor: "text-neon-green/30", progress: 65 },
  { label: "Applied", value: "148", change: "5", changeUp: true, icon: "group_add", iconColor: "text-neon-purple/30", changeColor: "text-neon-purple bg-neon-purple/10", progress: 35 },
  { label: "Interviewing", value: "12", change: "3 scheduled", icon: "video_call", iconColor: "text-blue-500/30", changeColor: "text-blue-400 bg-blue-500/10", progress: 25 },
  { label: "Offer Stage", value: "2", change: "1 pending", icon: "handshake", iconColor: "text-yellow-500/30", changeColor: "text-yellow-400 bg-yellow-500/10", progress: 15 },
];

const pipelineStages = [
  { label: "Applied", count: 148, hoverColor: "hover:border-neon-green hover:text-neon-green" },
  { label: "Screening", count: 42, hoverColor: "hover:border-blue-500 hover:text-blue-500" },
  { label: "Interview", count: 12, hoverColor: "hover:border-neon-purple hover:text-neon-purple" },
  { label: "Offer", count: 2, hoverColor: "hover:border-yellow-500 hover:text-yellow-500" },
  { label: "Hired", count: 0, hoverColor: "hover:border-green-500 hover:text-green-500" },
];

const recentApplicants = [
  { name: "John Doe", initials: "JD", gradient: "from-purple-500 to-pink-500", role: "Senior Frontend Dev @ Tech...", skills: ["React", "Node"], time: "2h ago", statusColor: "bg-neon-green" },
  { name: "Alice Smith", initials: "AS", gradient: "from-blue-500 to-cyan-500", role: "Fullstack Engineer @ Start...", skills: ["Vue", "AWS"], time: "5h ago", statusColor: "bg-neon-purple" },
  { name: "Mike K.", initials: "MK", gradient: "", role: "Frontend Developer", skills: ["Angular"], time: "1d ago" },
];

const perks = ["Health Insurance", "Unlimited PTO", "Remote Budget", "Stock Options"];

export default function JobDetailAdminPage() {
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
                Senior Frontend Engineer
              </h2>
              <span className="bg-neon-green/20 text-neon-green border border-neon-green/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                Active
              </span>
            </div>
            <div className="flex items-center gap-4 text-gray-400 text-sm flex-wrap">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-base">location_on</span>
                Remote, Worldwide
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-base">schedule</span>
                Full-time
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-base">payments</span>
                $120k - $160k
              </span>
              <span className="text-gray-600">•</span>
              <span>Posted 2 days ago</span>
              <span className="text-gray-600">•</span>
              <span className="font-mono text-xs text-gray-500">ID: #FE-2024-004</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-xl bg-card-dark border border-accent-dark text-gray-300 hover:text-white hover:border-gray-500 transition-colors text-sm font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">share</span>
            Share
          </button>
          <button className="px-4 py-2 rounded-xl bg-card-dark border border-accent-dark text-gray-300 hover:text-white hover:border-gray-500 transition-colors text-sm font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">edit</span>
            Edit Job
          </button>
          <button className="bg-neon-green hover:bg-[#3cd612] text-background-dark font-bold text-sm px-5 py-2 rounded-xl transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(73,230,25,0.2)]">
            <span className="material-symbols-outlined text-lg">pause_circle</span>
            Pause Hiring
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        {statsCards.map((stat) => (
          <div key={stat.label} className="col-span-12 md:col-span-3">
            <div className="glass-panel p-5 rounded-2xl flex flex-col h-full relative overflow-hidden group">
              <div className="flex justify-between items-start mb-2">
                <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                  {stat.label}
                </span>
                <span className={`material-symbols-outlined ${stat.iconColor}`}>
                  {stat.icon}
                </span>
              </div>
              <div className="flex items-end gap-3">
                <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                <span className={`text-xs font-bold mb-1.5 px-1.5 py-0.5 rounded flex items-center ${stat.changeColor || "text-neon-green bg-neon-green/10"}`}>
                  {stat.changeUp && (
                    <span className="material-symbols-outlined text-[10px] mr-0.5">
                      arrow_upward
                    </span>
                  )}
                  {stat.change}
                </span>
              </div>
              <div className="w-full bg-gray-800 h-1 mt-auto rounded-full overflow-hidden opacity-50">
                <div
                  className={`h-full ${stat.label === "Applied" ? "bg-neon-purple" : stat.label === "Interviewing" ? "bg-blue-500" : stat.label === "Offer Stage" ? "bg-yellow-500" : "bg-neon-green"}`}
                  style={{ width: `${stat.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          {/* Job Description */}
          <div className="glass-panel p-8 rounded-2xl">
            <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
              <h3 className="text-lg font-bold">Job Description</h3>
              <div className="flex gap-2">
                <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] text-gray-400 font-mono">
                  React
                </span>
                <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] text-gray-400 font-mono">
                  TypeScript
                </span>
                <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] text-gray-400 font-mono">
                  Tailwind
                </span>
              </div>
            </div>
            <div className="space-y-6 text-gray-300 text-sm leading-relaxed">
              <p>
                We are looking for an experienced Senior Frontend Engineer to join
                our core product team. You will be responsible for architecting
                and building the client-side of our next-generation hiring
                platform. You should have a deep understanding of modern web
                technologies and a passion for creating high-performance,
                accessible, and beautiful user interfaces.
              </p>
              <div>
                <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-neon-green text-sm">
                    check_circle
                  </span>
                  Key Responsibilities
                </h4>
                <ul className="list-disc pl-5 space-y-2 marker:text-gray-500">
                  <li>
                    Lead the development of new features using React, TypeScript,
                    and Tailwind CSS.
                  </li>
                  <li>
                    Collaborate with product designers and backend engineers to
                    deliver high-quality user experiences.
                  </li>
                  <li>
                    Optimize application performance for maximum speed and
                    scalability.
                  </li>
                  <li>Mentor junior engineers and conduct code reviews.</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-neon-green text-sm">
                    check_circle
                  </span>
                  Requirements
                </h4>
                <ul className="list-disc pl-5 space-y-2 marker:text-gray-500">
                  <li>5+ years of experience in frontend development.</li>
                  <li>
                    Strong proficiency in JavaScript (ES6+), TypeScript, and React.
                  </li>
                  <li>
                    Experience with modern state management (Zustand, Redux, or
                    Context API).
                  </li>
                  <li>
                    Familiarity with server-side rendering (Next.js) and static
                    site generation.
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
              <div className="flex -space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-2 border-card-dark" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 border-2 border-card-dark" />
                <div className="w-8 h-8 rounded-full border-2 border-card-dark bg-gray-700 flex items-center justify-center text-[10px] font-bold text-gray-300">
                  +2
                </div>
              </div>
              <span className="text-xs text-gray-500">Hiring Team</span>
            </div>
          </div>

          {/* Candidate Pipeline */}
          <div className="glass-panel p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Candidate Pipeline</h3>
              <select className="bg-card-dark border-none text-xs text-gray-400 focus:ring-0 rounded-lg py-1 pl-2 pr-8 cursor-pointer">
                <option>Last 30 Days</option>
                <option>All Time</option>
              </select>
            </div>
            <div className="relative h-48 w-full flex items-center justify-between px-4">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-800 -translate-y-1/2 rounded-full z-0" />
              {pipelineStages.map((stage) => (
                <div
                  key={stage.label}
                  className={`relative z-10 flex flex-col items-center gap-2 group cursor-pointer`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center ${stage.hoverColor} transition-colors`}
                  >
                    <span className="text-lg font-bold">{stage.count}</span>
                  </div>
                  <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                    {stage.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          {/* Manage Candidates CTA */}
          <div className="glass-panel p-6 rounded-2xl bg-gradient-to-br from-neon-green/10 to-transparent border-neon-green/20">
            <h3 className="text-lg font-bold mb-2">Manage Candidates</h3>
            <p className="text-xs text-gray-400 mb-4">
              You have <span className="text-white font-bold">18 new applicants</span>{" "}
              waiting for review.
            </p>
            <button className="w-full bg-neon-green hover:bg-[#3cd612] text-background-dark font-bold text-sm py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(73,230,25,0.2)] mb-3">
              Review Applicants
            </button>
            <button className="w-full bg-card-dark border border-accent-dark hover:bg-white/5 text-white text-sm py-3 rounded-xl transition-all">
              Bulk Message
            </button>
          </div>

          {/* Recent Applicants */}
          <div className="glass-panel p-6 rounded-2xl flex-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold">Recent Applicants</h3>
              <button className="text-xs text-neon-green hover:text-white transition-colors">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentApplicants.map((applicant, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-white/5 border border-transparent hover:border-neon-green/30 transition-all group cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div
                        className={`w-10 h-10 rounded-full ${applicant.gradient ? `bg-gradient-to-tr ${applicant.gradient}` : "bg-gray-700"} flex items-center justify-center text-xs font-bold text-white`}
                      >
                        {applicant.initials}
                      </div>
                      {applicant.statusColor && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-card-dark flex items-center justify-center">
                          <div className={`w-2 h-2 rounded-full ${applicant.statusColor}`} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-bold text-white truncate">
                          {applicant.name}
                        </h4>
                        <span className="text-[10px] text-gray-500">
                          {applicant.time}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 truncate">
                        {applicant.role}
                      </p>
                      <div className="flex gap-1 mt-2">
                        {applicant.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-1.5 py-0.5 rounded bg-white/5 text-[10px] text-gray-500 border border-white/5"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                    <button className="flex-1 py-1 rounded bg-green-500/10 text-green-400 text-[10px] font-bold hover:bg-green-500/20">
                      Accept
                    </button>
                    <button className="flex-1 py-1 rounded bg-red-500/10 text-red-400 text-[10px] font-bold hover:bg-red-500/20">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-xs font-medium text-gray-400 hover:text-white py-2 border-t border-white/5 transition-colors">
              View All 148 Candidates
            </button>
          </div>

          {/* Perks */}
          <div className="glass-panel p-5 rounded-2xl">
            <h3 className="text-sm font-bold mb-3 text-gray-300">
              Included Perks
            </h3>
            <div className="flex flex-wrap gap-2">
              {perks.map((perk) => (
                <span
                  key={perk}
                  className="bg-gray-800 text-gray-300 text-[10px] font-bold px-2 py-1 rounded border border-gray-700"
                >
                  {perk}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
