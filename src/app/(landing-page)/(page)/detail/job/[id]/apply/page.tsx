"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/page/Navbar";
import Footer from "@/components/page/Footer";
import { useState } from "react";

export default function ApplyJobPage() {
  const params = useParams();
  const router = useRouter();
  const [coverLetter, setCoverLetter] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    router.push("/apply-success");
  };

  return (
    <div className="bg-background-dark font-display text-white overflow-x-hidden min-h-screen flex flex-col relative">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] bg-grid" />
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-neon-green/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[100px]" />
      </div>

      <Navbar />

      <main className="flex-grow relative z-10 pt-32 pb-20 px-4 md:px-10 lg:px-20">
        <div className="max-w-[1000px] mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-medium">
            <Link href="/" className="hover:text-neon-green transition-colors">
              Home
            </Link>
            <span className="material-symbols-outlined text-[10px]">
              chevron_right
            </span>
            <Link
              href="/find-jobs"
              className="hover:text-neon-green transition-colors"
            >
              Find Jobs
            </Link>
            <span className="material-symbols-outlined text-[10px]">
              chevron_right
            </span>
            <Link
              href={`/detail/job/${params.id}`}
              className="hover:text-neon-green transition-colors"
            >
              Senior Frontend Engineer
            </Link>
            <span className="material-symbols-outlined text-[10px]">
              chevron_right
            </span>
            <span className="text-white">Application</span>
          </div>

          {/* Job Summary Card */}
          <div className="relative group mb-12">
            <div className="absolute -inset-1 bg-gradient-to-r from-neon-green/20 via-transparent to-neon-purple/20 rounded-3xl blur-lg opacity-40 group-hover:opacity-60 transition duration-700" />
            <div className="glass-panel relative rounded-3xl p-8 border border-white/10 flex items-center gap-6">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white flex items-center justify-center shrink-0 p-3 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                <img
                  alt="Vercel Logo"
                  className="w-full h-full object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAmRxDHv2vweGovYx9DWWH3IOHQUMsap5anKHu2FlbXHWuB_LDnq8eBMNLOBom2vsXEvaQPlESS6KPwIZvZyUqCpW6fScnO1QRU19Zy7gzUCEbI9XatG3gVtJky5DbWxn2k7KQfu_nBMMtAshbXYw2dbz6_AlM7SM0L13rzrEdvAypuNvqSlyj9vCdIyRdXZTLo1O0KIy9axy5lpolMI2xcLP9SdG4yjC_rKsmw1GnST3BgILu0pZt79zXqxyTjAeUmCAj3o7_eg"
                />
              </div>
              <div>
                <h2 className="text-sm text-neon-green font-bold tracking-widest uppercase mb-1">
                  Applying for
                </h2>
                <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  Senior Frontend Engineer
                </h1>
                <p className="text-gray-400 mt-1 flex items-center gap-2 text-sm flex-wrap">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">
                      domain
                    </span>
                    Vercel
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-600 mx-1" />
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">
                      location_on
                    </span>
                    San Francisco, CA (Remote Friendly)
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Application Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <section className="glass-panel rounded-2xl p-8 border border-accent-dark">
              <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="p-2 rounded-lg bg-neon-green/10 text-neon-green border border-neon-green/20">
                  <span className="material-symbols-outlined">person</span>
                </span>
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-2">
                  <label
                    className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1"
                    htmlFor="firstName"
                  >
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                      badge
                    </span>
                    <input
                      className="w-full input-field rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:ring-0 focus:outline-none"
                      id="firstName"
                      name="firstName"
                      placeholder="Jane"
                      required
                      type="text"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1"
                    htmlFor="lastName"
                  >
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                      badge
                    </span>
                    <input
                      className="w-full input-field rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:ring-0 focus:outline-none"
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      required
                      type="text"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1"
                    htmlFor="email"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                      mail
                    </span>
                    <input
                      className="w-full input-field rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:ring-0 focus:outline-none"
                      id="email"
                      name="email"
                      placeholder="jane.doe@example.com"
                      required
                      type="email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1"
                    htmlFor="phone"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                      call
                    </span>
                    <input
                      className="w-full input-field rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:ring-0 focus:outline-none"
                      id="phone"
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                      type="tel"
                    />
                  </div>
                </div>
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <label
                    className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1"
                    htmlFor="portfolio"
                  >
                    Portfolio / Website
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                      language
                    </span>
                    <input
                      className="w-full input-field rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:ring-0 focus:outline-none"
                      id="portfolio"
                      name="portfolio"
                      placeholder="https://janedoe.dev"
                      type="url"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Resume Upload */}
            <section className="glass-panel rounded-2xl p-8 border border-accent-dark">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="p-2 rounded-lg bg-neon-purple/10 text-neon-purple border border-neon-purple/20">
                  <span className="material-symbols-outlined">description</span>
                </span>
                Resume / CV
              </h2>
              <div className="border-2 border-dashed border-gray-700 hover:border-neon-purple/50 bg-card-dark/30 rounded-2xl p-10 text-center transition-all cursor-pointer group relative overflow-hidden">
                <input
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  id="resume-upload"
                  name="resume"
                  type="file"
                  accept=".pdf,.docx,.txt"
                />
                <div className="relative z-0">
                  <div className="w-16 h-16 rounded-full bg-neon-purple/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="material-symbols-outlined text-neon-purple text-3xl">
                      cloud_upload
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-neon-purple transition-colors">
                    Click to upload or drag and drop
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    PDF, DOCX or TXT (Max 5MB)
                  </p>
                  <button
                    type="button"
                    className="bg-card-dark border border-gray-600 text-gray-300 px-4 py-2 rounded-lg text-sm font-medium group-hover:bg-neon-purple group-hover:text-white group-hover:border-neon-purple transition-all"
                  >
                    Select File
                  </button>
                </div>
              </div>
            </section>

            {/* Professional Profiles */}
            <section className="glass-panel rounded-2xl p-8 border border-accent-dark">
              <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <span className="material-symbols-outlined">
                    work_history
                  </span>
                </span>
                Professional Profiles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1"
                    htmlFor="linkedin"
                  >
                    LinkedIn Profile
                  </label>
                  <div className="flex rounded-xl overflow-hidden input-field focus-within:border-neon-green">
                    <div className="bg-card-dark/80 px-4 py-3 border-r border-gray-700 flex items-center justify-center">
                      <span className="text-gray-400 font-mono text-sm">
                        linkedin.com/in/
                      </span>
                    </div>
                    <input
                      className="flex-1 bg-transparent py-3 px-4 text-white placeholder-gray-600 focus:outline-none"
                      id="linkedin"
                      name="linkedin"
                      placeholder="username"
                      type="text"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1"
                    htmlFor="github"
                  >
                    GitHub Profile
                  </label>
                  <div className="flex rounded-xl overflow-hidden input-field focus-within:border-neon-green">
                    <div className="bg-card-dark/80 px-4 py-3 border-r border-gray-700 flex items-center justify-center">
                      <span className="text-gray-400 font-mono text-sm">
                        github.com/
                      </span>
                    </div>
                    <input
                      className="flex-1 bg-transparent py-3 px-4 text-white placeholder-gray-600 focus:outline-none"
                      id="github"
                      name="github"
                      placeholder="username"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Cover Letter */}
            <section className="glass-panel rounded-2xl p-8 border border-accent-dark">
              <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="p-2 rounded-lg bg-green-500/10 text-green-500 border border-green-500/20">
                  <span className="material-symbols-outlined">format_quote</span>
                </span>
                Additional Information
              </h2>
              <div className="space-y-2">
                <label
                  className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1"
                  htmlFor="coverLetter"
                >
                  Cover Letter / Why Vercel?
                </label>
                <textarea
                  className="w-full input-field rounded-xl py-4 px-4 text-white placeholder-gray-600 focus:ring-0 focus:outline-none min-h-[160px]"
                  id="coverLetter"
                  name="coverLetter"
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Tell us a bit about yourself and why you're interested in this role..."
                  maxLength={2000}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
                  <span>Markdown supported</span>
                  <span>{coverLetter.length}/2000 characters</span>
                </div>
              </div>
            </section>

            {/* Submit Section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-white/10">
              <p className="text-sm text-gray-500 text-center md:text-left max-w-md">
                By submitting this application, you agree to our{" "}
                <Link href="#" className="text-neon-green hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-neon-green hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
              <div className="flex gap-4 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex-1 md:flex-none h-14 px-8 rounded-xl bg-card-dark border border-accent-dark hover:border-white/20 text-gray-400 hover:text-white font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 md:flex-none bg-neon-green hover:bg-[#3cd612] text-background-dark font-extrabold rounded-xl px-10 h-14 transition-all shadow-[0_0_20px_rgba(73,230,25,0.3)] hover:shadow-[0_0_30px_rgba(73,230,25,0.5)] active:scale-95 whitespace-nowrap text-lg flex items-center justify-center gap-2"
                >
                  <span>Submit Application</span>
                  <span className="material-symbols-outlined text-xl font-bold">
                    send
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
