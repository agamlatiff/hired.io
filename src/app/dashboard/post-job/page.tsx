"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const departments = ["Engineering", "Product", "Design", "Marketing", "Sales"];
const workTypes = ["Remote", "On-site", "Hybrid"];

export default function PostJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    roles: "",
    department: "Engineering",
    location: "",
    jobType: "Remote",
    salaryFrom: "",
    salaryTo: "",
    currency: "USD",
    description: "",
    responsibility: "",
    whoYouAre: "",
    niceToHaves: "",
    dueDate: "",
    needs: 1,
  });
  const [skills, setSkills] = useState<string[]>([]);
  const [benefits, setBenefits] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addSkill = (skill: string) => {
    if (skill.trim() && !skills.includes(skill.trim())) {
      setSkills(prev => [...prev, skill.trim()]);
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(prev => prev.filter(s => s !== skill));
  };

  const toggleBenefit = (benefit: string) => {
    setBenefits(prev =>
      prev.includes(benefit) ? prev.filter(b => b !== benefit) : [...prev, benefit]
    );
  };

  const validateForm = () => {
    if (!formData.roles.trim()) return "Job title is required";
    if (!formData.description.trim()) return "Description is required";
    if (!formData.dueDate) return "Application deadline is required";
    if (!formData.salaryFrom || !formData.salaryTo) return "Salary range is required";
    return null;
  };

  const handleSubmit = async (status: "draft" | "active") => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          requiredSkills: skills,
          benefits: benefits,
          status,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create job");
      }

      const data = await res.json();
      router.push(`/dashboard/jobs/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
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
              <span className="material-symbols-outlined text-base">arrow_back</span>
              Back to Dashboard
            </Link>
          </div>
          <h2 className="text-3xl font-bold text-white mb-1">Create New Job Listing</h2>
          <p className="text-gray-400 text-sm">Fill in the details below to find your next top talent.</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleSubmit("draft")}
            disabled={loading}
            className="px-6 py-2.5 rounded-full bg-card-dark border border-accent-dark hover:border-gray-500 text-gray-300 hover:text-white transition-colors text-sm font-medium disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Draft"}
          </button>
          <button
            onClick={() => handleSubmit("active")}
            disabled={loading}
            className="bg-neon-green hover:bg-[#3cd612] text-background-dark font-bold text-sm px-6 py-2.5 rounded-full transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(73,230,25,0.2)] disabled:opacity-50"
          >
            {loading ? "Publishing..." : "Publish Job"}
            <span className="material-symbols-outlined text-lg">rocket_launch</span>
          </button>
        </div>
      </header>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column - Forms */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {/* Basic Details */}
          <div className="glass-panel p-8 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="bg-neon-green/20 text-neon-green w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
              Basic Details
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Job Title *</label>
                  <input
                    name="roles"
                    value={formData.roles}
                    onChange={handleChange}
                    className="w-full bg-background-dark border border-accent-dark rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:ring-0 focus:border-neon-green focus:outline-none transition-colors"
                    placeholder="e.g. Senior Full Stack Engineer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full bg-background-dark border border-accent-dark rounded-xl px-4 py-3 text-white focus:ring-0 focus:border-neon-green focus:outline-none"
                  >
                    {departments.map(dept => <option key={dept}>{dept}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Location</label>
                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full bg-background-dark border border-accent-dark rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:ring-0 focus:border-neon-green focus:outline-none"
                    placeholder="e.g. San Francisco, CA"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Work Type</label>
                  <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    className="w-full bg-background-dark border border-accent-dark rounded-xl px-4 py-3 text-white focus:ring-0 focus:border-neon-green focus:outline-none"
                  >
                    {workTypes.map(type => <option key={type}>{type}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Required Skills</label>
                <div className="w-full bg-background-dark border border-accent-dark rounded-xl px-3 py-2 flex flex-wrap gap-2 items-center min-h-[50px] focus-within:border-neon-green">
                  {skills.map(skill => (
                    <span key={skill} className="bg-card-dark border border-gray-700 rounded-lg px-2 py-1 text-xs flex items-center gap-1">
                      {skill}
                      <button onClick={() => removeSkill(skill)} className="hover:text-red-400">
                        <span className="material-symbols-outlined text-[14px]">close</span>
                      </button>
                    </span>
                  ))}
                  <input
                    className="bg-transparent border-none p-1 text-sm focus:ring-0 focus:outline-none placeholder-gray-600 flex-1 min-w-[100px]"
                    placeholder="Type and press Enter..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.currentTarget.value.trim()) {
                        e.preventDefault();
                        addSkill(e.currentTarget.value);
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="glass-panel p-8 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="bg-neon-purple/20 text-neon-purple w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
              Job Description
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-background-dark border border-accent-dark rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:ring-0 focus:border-neon-green focus:outline-none h-32 resize-none"
                  placeholder="Describe the role responsibilities, team culture..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Responsibilities</label>
                <textarea
                  name="responsibility"
                  value={formData.responsibility}
                  onChange={handleChange}
                  className="w-full bg-background-dark border border-accent-dark rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:ring-0 focus:border-neon-green focus:outline-none h-24 resize-none"
                  placeholder="Key responsibilities..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">What We&apos;re Looking For</label>
                <textarea
                  name="whoYouAre"
                  value={formData.whoYouAre}
                  onChange={handleChange}
                  className="w-full bg-background-dark border border-accent-dark rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:ring-0 focus:border-neon-green focus:outline-none h-24 resize-none"
                  placeholder="Ideal candidate profile..."
                />
              </div>
            </div>
          </div>

          {/* Compensation */}
          <div className="glass-panel p-8 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="bg-blue-500/20 text-blue-500 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</span>
              Compensation & Timeline
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Min Salary *</label>
                  <input
                    name="salaryFrom"
                    value={formData.salaryFrom}
                    onChange={handleChange}
                    type="number"
                    className="w-full bg-background-dark border border-accent-dark rounded-xl px-4 py-3 text-white focus:ring-0 focus:border-neon-green focus:outline-none"
                    placeholder="80000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Max Salary *</label>
                  <input
                    name="salaryTo"
                    value={formData.salaryTo}
                    onChange={handleChange}
                    type="number"
                    className="w-full bg-background-dark border border-accent-dark rounded-xl px-4 py-3 text-white focus:ring-0 focus:border-neon-green focus:outline-none"
                    placeholder="120000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Currency</label>
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    className="w-full bg-background-dark border border-accent-dark rounded-xl px-4 py-3 text-white focus:ring-0 focus:border-neon-green focus:outline-none"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Application Deadline *</label>
                  <input
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    type="date"
                    className="w-full bg-background-dark border border-accent-dark rounded-xl px-4 py-3 text-white focus:ring-0 focus:border-neon-green focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Positions Available</label>
                  <input
                    name="needs"
                    value={formData.needs}
                    onChange={handleChange}
                    type="number"
                    min="1"
                    className="w-full bg-background-dark border border-accent-dark rounded-xl px-4 py-3 text-white focus:ring-0 focus:border-neon-green focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Benefits</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {["Health Insurance", "401(k)", "Remote Work", "Unlimited PTO"].map(benefit => (
                    <label key={benefit} className="cursor-pointer">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={benefits.includes(benefit)}
                        onChange={() => toggleBenefit(benefit)}
                      />
                      <div className="h-full border border-accent-dark bg-background-dark rounded-xl p-3 flex items-center justify-center text-center peer-checked:border-neon-purple peer-checked:bg-neon-purple/10 transition-all text-xs text-gray-300">
                        {benefit}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Preview */}
        <div className="col-span-12 lg:col-span-4">
          <div className="glass-panel p-6 rounded-2xl sticky top-6">
            <h3 className="text-lg font-bold text-white mb-4">Job Preview</h3>
            <div className="bg-card-dark rounded-xl p-4 border border-white/5 space-y-4">
              <div>
                <h4 className="font-bold text-white text-sm">{formData.roles || "Job Title"}</h4>
                <p className="text-xs text-gray-400">{formData.department} • {formData.jobType}</p>
              </div>
              <div className="h-px bg-white/10 w-full" />
              <div className="space-y-2 text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-neon-green">payments</span>
                  <span>{formData.currency} {formData.salaryFrom || "0"} - {formData.salaryTo || "0"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-neon-purple">location_on</span>
                  <span>{formData.location || "Not specified"}</span>
                </div>
                {skills.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-blue-500">code</span>
                    <span>{skills.join(", ")}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-neon-green/20 to-transparent border border-neon-green/20">
              <h4 className="text-sm font-bold text-white mb-2">Tips</h4>
              <ul className="text-xs text-gray-400 space-y-2">
                <li>• Include salary to get 40% more applicants</li>
                <li>• Be specific about tech stack</li>
                <li>• Describe your engineering culture</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
