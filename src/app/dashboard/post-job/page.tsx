"use client";

import Link from "next/link";
import { useState } from "react";

const departments = ["Engineering", "Product", "Design", "Marketing", "Sales"];
const workTypes = ["Remote", "On-site", "Hybrid"];
const currencies = ["USD ($)", "EUR (€)", "GBP (£)", "CAD ($)"];

const perksOptions = [
  { icon: "medical_services", label: "Health Insurance" },
  { icon: "savings", label: "401(k) Matching" },
  { icon: "monitor", label: "Home Office" },
  { icon: "flight_takeoff", label: "Unlimited PTO" },
];

export default function PostJobPage() {
  const [skills, setSkills] = useState(["React", "TypeScript", "Tailwind CSS"]);
  const [requirements, setRequirements] = useState([
    "5+ years of experience with React and TypeScript",
    "Experience with state management (Redux, Zustand)",
  ]);
  const [selectedPerks, setSelectedPerks] = useState<string[]>(["Unlimited PTO"]);

  const togglePerk = (perk: string) => {
    setSelectedPerks((prev) =>
      prev.includes(perk) ? prev.filter((p) => p !== perk) : [...prev, perk]
    );
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  return (
    <>
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link
              href="/dashboard"
              className="text-gray-400 hover:text-neon-green transition-colors text-sm flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-base">
                arrow_back
              </span>
              Back to Dashboard
            </Link>
          </div>
          <h2 className="text-3xl font-bold text-white mb-1">
            Create New Job Listing
          </h2>
          <p className="text-gray-400 text-sm">
            Fill in the details below to find your next top talent.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-6 py-2.5 rounded-full bg-card-dark border border-accent-dark hover:border-gray-500 text-gray-300 hover:text-white transition-colors text-sm font-medium">
            Save Draft
          </button>
          <button className="bg-neon-green hover:bg-[#3cd612] text-background-dark font-bold text-sm px-6 py-2.5 rounded-full transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(73,230,25,0.2)]">
            Publish Job
            <span className="material-symbols-outlined text-lg">
              rocket_launch
            </span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column - Forms */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {/* Basic Details */}
          <div className="glass-panel p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
              <span className="material-symbols-outlined text-8xl">
                description
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="bg-neon-green/20 text-neon-green w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                1
              </span>
              Basic Details
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Job Title
                  </label>
                  <input
                    className="w-full bg-background-dark border border-accent-dark rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:ring-0 focus:border-neon-green focus:outline-none transition-colors"
                    placeholder="e.g. Senior Full Stack Engineer"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Department
                  </label>
                  <select className="w-full bg-background-dark border border-accent-dark rounded-xl px-4 py-3 text-white focus:ring-0 focus:border-neon-green focus:outline-none transition-colors">
                    {departments.map((dept) => (
                      <option key={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      location_on
                    </span>
                    <input
                      className="w-full bg-background-dark border border-accent-dark rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:ring-0 focus:border-neon-green focus:outline-none transition-colors"
                      placeholder="e.g. San Francisco, CA"
                      type="text"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Work Type
                  </label>
                  <select className="w-full bg-background-dark border border-accent-dark rounded-xl px-4 py-3 text-white focus:ring-0 focus:border-neon-green focus:outline-none transition-colors">
                    {workTypes.map((type) => (
                      <option key={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Tech Stack
                </label>
                <div className="w-full bg-background-dark border border-accent-dark rounded-xl px-3 py-2 text-white transition-colors flex flex-wrap gap-2 items-center min-h-[50px] focus-within:border-neon-purple">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-card-dark border border-gray-700 rounded-lg px-2 py-1 text-xs flex items-center gap-1"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="hover:text-red-400"
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          close
                        </span>
                      </button>
                    </span>
                  ))}
                  <input
                    className="bg-transparent border-none p-1 text-sm focus:ring-0 focus:outline-none placeholder-gray-600 flex-1 min-w-[100px]"
                    placeholder="Type stack and press Enter..."
                    type="text"
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter" &&
                        e.currentTarget.value.trim()
                      ) {
                        setSkills((prev) => [
                          ...prev,
                          e.currentTarget.value.trim(),
                        ]);
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  These tags help match candidates with the right skills.
                </p>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="glass-panel p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
              <span className="material-symbols-outlined text-8xl">
                edit_note
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="bg-neon-purple/20 text-neon-purple w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                2
              </span>
              Job Description
            </h3>
            <div className="space-y-6">
              <div>
                <div className="bg-background-dark border border-accent-dark rounded-t-xl p-2 flex items-center gap-1 border-b-0">
                  <button className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-white/5">
                    <span className="material-symbols-outlined text-sm">
                      format_bold
                    </span>
                  </button>
                  <button className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-white/5">
                    <span className="material-symbols-outlined text-sm">
                      format_italic
                    </span>
                  </button>
                  <button className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-white/5">
                    <span className="material-symbols-outlined text-sm">
                      format_underlined
                    </span>
                  </button>
                  <div className="w-px h-4 bg-gray-700 mx-1" />
                  <button className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-white/5">
                    <span className="material-symbols-outlined text-sm">
                      format_list_bulleted
                    </span>
                  </button>
                  <button className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-white/5">
                    <span className="material-symbols-outlined text-sm">
                      format_list_numbered
                    </span>
                  </button>
                  <div className="w-px h-4 bg-gray-700 mx-1" />
                  <button className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-white/5">
                    <span className="material-symbols-outlined text-sm">
                      link
                    </span>
                  </button>
                </div>
                <textarea
                  className="w-full bg-background-dark border border-accent-dark rounded-b-xl px-4 py-3 text-white placeholder-gray-600 focus:ring-0 focus:outline-none focus:border-neon-green transition-colors h-64 resize-none"
                  placeholder="Describe the role responsibilities, team culture, etc..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Key Requirements
                </label>
                <div className="space-y-3">
                  {requirements.map((req, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-neon-green shrink-0" />
                      <input
                        className="w-full bg-transparent border-b border-gray-700 focus:border-neon-green focus:outline-none px-2 py-1 text-sm text-white placeholder-gray-600 focus:ring-0"
                        placeholder={`Requirement ${i + 1}`}
                        type="text"
                        defaultValue={req}
                      />
                      <button className="text-gray-500 hover:text-red-400">
                        <span className="material-symbols-outlined text-sm">
                          delete
                        </span>
                      </button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-neon-green shrink-0" />
                    <input
                      className="w-full bg-transparent border-b border-gray-700 focus:border-neon-green focus:outline-none px-2 py-1 text-sm text-white placeholder-gray-600 focus:ring-0"
                      placeholder="Add a new requirement..."
                      type="text"
                    />
                    <button className="text-gray-500 hover:text-neon-green">
                      <span className="material-symbols-outlined text-sm">
                        add
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Compensation & Timeline */}
          <div className="glass-panel p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
              <span className="material-symbols-outlined text-8xl">
                payments
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="bg-blue-500/20 text-blue-500 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                3
              </span>
              Compensation & Timeline
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Salary Range (Annual)
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="relative w-full">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-serif italic">
                        $
                      </span>
                      <input
                        className="w-full bg-background-dark border border-accent-dark rounded-xl pl-8 pr-4 py-3 text-white placeholder-gray-600 focus:ring-0 focus:border-neon-green focus:outline-none transition-colors"
                        placeholder="Min"
                        type="number"
                      />
                    </div>
                    <span className="text-gray-500">-</span>
                    <div className="relative w-full">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-serif italic">
                        $
                      </span>
                      <input
                        className="w-full bg-background-dark border border-accent-dark rounded-xl pl-8 pr-4 py-3 text-white placeholder-gray-600 focus:ring-0 focus:border-neon-green focus:outline-none transition-colors"
                        placeholder="Max"
                        type="number"
                      />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      className="rounded bg-background-dark border-gray-600 text-neon-green focus:ring-neon-green"
                      id="negotiable"
                      type="checkbox"
                    />
                    <label className="text-xs text-gray-400" htmlFor="negotiable">
                      Salary is negotiable
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Currency
                  </label>
                  <select className="w-full bg-background-dark border border-accent-dark rounded-xl px-4 py-3 text-white focus:ring-0 focus:border-neon-green focus:outline-none transition-colors">
                    {currencies.map((cur) => (
                      <option key={cur}>{cur}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Perks & Benefits
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {perksOptions.map((perk) => (
                    <label key={perk.label} className="cursor-pointer group">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={selectedPerks.includes(perk.label)}
                        onChange={() => togglePerk(perk.label)}
                      />
                      <div className="h-full border border-accent-dark bg-background-dark rounded-xl p-3 flex flex-col items-center justify-center gap-2 text-center peer-checked:border-neon-purple peer-checked:bg-neon-purple/10 transition-all hover:border-gray-500">
                        <span className="material-symbols-outlined text-neon-purple text-xl">
                          {perk.icon}
                        </span>
                        <span className="text-xs text-gray-300">
                          {perk.label}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Application Deadline
                </label>
                <input
                  className="w-full bg-background-dark border border-accent-dark rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:ring-0 focus:border-neon-green focus:outline-none transition-colors"
                  type="date"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Preview & Tips */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="glass-panel p-6 rounded-2xl sticky top-6">
            <h3 className="text-lg font-bold text-white mb-4">Job Preview</h3>
            <div className="bg-card-dark rounded-xl p-4 border border-white/5 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-green to-blue-500 flex items-center justify-center text-black font-bold shrink-0">
                  TC
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">
                    Senior Full Stack Engineer
                  </h4>
                  <p className="text-xs text-gray-400">TechCorp Inc. • Remote</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-gray-800 text-gray-300 border border-gray-700">
                  Full-time
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Engineering
                </span>
              </div>
              <div className="h-px bg-white/10 w-full my-2" />
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <span className="material-symbols-outlined text-sm text-neon-green">
                    payments
                  </span>
                  <span>$120k - $160k / year</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <span className="material-symbols-outlined text-sm text-neon-purple">
                    code
                  </span>
                  <span>{skills.join(", ")}</span>
                </div>
              </div>
              <button className="w-full mt-2 bg-white/5 hover:bg-white/10 text-white text-xs font-bold py-2 rounded-lg transition-colors border border-white/10">
                See Full Preview
              </button>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-bold text-white mb-3">
                Tips for a great job post
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-gray-400">
                  <span className="material-symbols-outlined text-green-500 text-base mt-0.5 shrink-0">
                    check_circle
                  </span>
                  <span>Be specific about the tech stack versions you use.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-400">
                  <span className="material-symbols-outlined text-green-500 text-base mt-0.5 shrink-0">
                    check_circle
                  </span>
                  <span>
                    Include a salary range to increase applicant quality by 40%.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-400">
                  <span className="material-symbols-outlined text-green-500 text-base mt-0.5 shrink-0">
                    check_circle
                  </span>
                  <span>Describe your engineering culture clearly.</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-neon-green/20 to-transparent border border-neon-green/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-neon-green">
                  auto_awesome
                </span>
                <h4 className="text-sm font-bold text-white">AI Assistant</h4>
              </div>
              <p className="text-xs text-gray-300 mb-3">
                Want help writing the job description? Our AI can generate a
                draft based on the title.
              </p>
              <button className="w-full bg-neon-green text-background-dark text-xs font-bold py-2 rounded-lg hover:bg-[#3cd612] transition-colors">
                Generate Description
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
