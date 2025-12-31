"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/page/Navbar";
import Footer from "@/components/page/Footer";
import { useState, useEffect } from "react";
import { supabaseUploadFile, supabaseGetPublicUrl } from "@/lib/supabase";
import { useSession } from "next-auth/react";

interface JobData {
  id: string;
  roles: string;
  location?: string;
  Company?: {
    name: string;
    logo?: string;
    CompanyOverview?: Array<{
      name: string;
      location: string;
    }>;
  };
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  resume?: string;
  general?: string;
}

export default function ApplyJobPage() {
  const { data: session, status } = useSession();
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeFileName, setResumeFileName] = useState("");

  // Form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [previousJobTitle, setPreviousJobTitle] = useState("");

  // Pre-fill form if user is logged in
  useEffect(() => {
    if (session?.user) {
      // Assuming session.user has name and email. 
      // You might want to fetch full profile here if needed, 
      // but for now let's use what we have in session or keep blank for manual entry 
      // if names aren't split in session.
      if (session.user.email) setEmail(session.user.email);
      // Split name if possible
      if (session.user.name) {
        const parts = session.user.name.split(" ");
        if (parts.length > 0) setFirstName(parts[0]);
        if (parts.length > 1) setLastName(parts.slice(1).join(" "));
      }
    }
  }, [session]);

  // Fetch job data
  useEffect(() => {
    async function fetchJob() {
      try {
        const res = await fetch(`/api/job/${params.id}`);
        if (!res.ok) throw new Error("Failed to fetch job");
        const data = await res.json();
        setJob(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (params.id) {
      fetchJob();
    }
  }, [params.id]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (phone && !/^[+]?[\d\s()-]{10,}$/.test(phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!resumeFile) {
      newErrors.resume = "Please upload your resume";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, resume: "File size must be less than 5MB" }));
        return;
      }

      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ];
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({ ...prev, resume: "Please upload a PDF, DOCX, or TXT file" }));
        return;
      }

      setResumeFile(file);
      setResumeFileName(file.name);
      setErrors((prev) => ({ ...prev, resume: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    setErrors({});

    try {
      // Upload resume to Supabase
      let resumeUrl = "";
      if (resumeFile) {
        const { data, error, filename } = await supabaseUploadFile(resumeFile, "applicant");
        if (error) {
          console.error("[RESUME_UPLOAD_ERROR]", error);
          throw new Error(`Failed to upload resume: ${error.message || "Unknown storage error. Please check Supabase bucket permissions."}`);
        }
        const { publicUrl } = supabaseGetPublicUrl(filename, "applicant");
        resumeUrl = publicUrl;
      }

      // Require authentication
      if (status !== "authenticated" || !session?.user) {
        setErrors({ general: "You must be logged in to apply." });
        // Optional: Redirect to login
        router.push(`/auth/signin?callbackUrl=${encodeURIComponent(window.location.href)}`);
        return;
      }

      const userId = session.user.id;


      // Submit application
      const applicationData = {
        userId,
        jobId: params.id,
        previousJobTitle: previousJobTitle || "Not specified",
        phone: phone || "Not provided",
        linkedin: linkedin ? `https://linkedin.com/in/${linkedin}` : "",
        portfolio: portfolio || "",
        coverLetter: coverLetter || "",
        resume: resumeUrl,
        source: "direct",
      };

      const res = await fetch("/api/jobs/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicationData),
      });

      if (!res.ok) {
        throw new Error("Failed to submit application");
      }

      // Redirect to success page with job info
      const successParams = new URLSearchParams({
        jobTitle: job?.roles || "Position",
        companyName: job?.Company?.name || "Company",
        companyLogo: job?.Company?.logo || "",
        jobId: params.id as string,
      });
      router.push(`/apply-success?${successParams.toString()}`);
    } catch (err) {
      console.error(err);
      setErrors({
        general: err instanceof Error ? err.message : "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const companyOverview = job?.Company?.CompanyOverview?.[0];

  if (loading) {
    return (
      <div className="bg-background-dark font-display text-white overflow-x-hidden min-h-screen flex flex-col relative">
        <Navbar />
        <main className="flex-grow relative z-10 pt-32 pb-20 px-4 md:px-10 lg:px-20 flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

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
              {job?.roles || "Job"}
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
                {job?.Company?.logo ? (
                  <img
                    alt={job?.Company?.name || "Company"}
                    className="w-full h-full object-contain"
                    src={job.Company.logo}
                  />
                ) : (
                  <span className="text-black font-bold text-2xl">
                    {(job?.Company?.name || "C").charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-sm text-neon-green font-bold tracking-widest uppercase mb-1">
                  Applying for
                </h2>
                <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  {job?.roles || "Job Position"}
                </h1>
                <p className="text-gray-400 mt-1 flex items-center gap-2 text-sm flex-wrap">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">
                      domain
                    </span>
                    {job?.Company?.name || "Company"}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-600 mx-1" />
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">
                      location_on
                    </span>
                    {companyOverview?.location || job?.location || "Remote"}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {errors.general && (
            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 flex items-center gap-3">
              <span className="material-symbols-outlined">error</span>
              {errors.general}
            </div>
          )}

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
                      className={`w-full input-field rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:ring-0 focus:outline-none ${errors.firstName ? "border-red-500" : ""}`}
                      id="firstName"
                      name="firstName"
                      placeholder="Jane"
                      required
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-red-400 text-xs ml-1">{errors.firstName}</p>
                  )}
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
                      className={`w-full input-field rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:ring-0 focus:outline-none ${errors.lastName ? "border-red-500" : ""}`}
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      required
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  {errors.lastName && (
                    <p className="text-red-400 text-xs ml-1">{errors.lastName}</p>
                  )}
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
                      className={`w-full input-field rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:ring-0 focus:outline-none ${errors.email ? "border-red-500" : ""}`}
                      id="email"
                      name="email"
                      placeholder="jane.doe@example.com"
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-xs ml-1">{errors.email}</p>
                  )}
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
                      className={`w-full input-field rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:ring-0 focus:outline-none ${errors.phone ? "border-red-500" : ""}`}
                      id="phone"
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-400 text-xs ml-1">{errors.phone}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label
                    className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1"
                    htmlFor="previousJobTitle"
                  >
                    Current/Previous Job Title
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                      work
                    </span>
                    <input
                      className="w-full input-field rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:ring-0 focus:outline-none"
                      id="previousJobTitle"
                      name="previousJobTitle"
                      placeholder="Senior Developer"
                      type="text"
                      value={previousJobTitle}
                      onChange={(e) => setPreviousJobTitle(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
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
                      value={portfolio}
                      onChange={(e) => setPortfolio(e.target.value)}
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
                Resume / CV <span className="text-red-500">*</span>
              </h2>
              <div
                className={`border-2 border-dashed ${errors.resume ? "border-red-500" : resumeFile ? "border-neon-green/50" : "border-gray-700 hover:border-neon-purple/50"} bg-card-dark/30 rounded-2xl p-10 text-center transition-all cursor-pointer group relative overflow-hidden`}
              >
                <input
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  id="resume-upload"
                  name="resume"
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={handleResumeChange}
                />
                <div className="relative z-0">
                  {resumeFile ? (
                    <>
                      <div className="w-16 h-16 rounded-full bg-neon-green/10 flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-neon-green text-3xl">
                          check_circle
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">
                        {resumeFileName}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4">
                        Click to replace file
                      </p>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>
              </div>
              {errors.resume && (
                <p className="text-red-400 text-xs mt-2">{errors.resume}</p>
              )}
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
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
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
                      value={github}
                      onChange={(e) => setGithub(e.target.value)}
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
                  Cover Letter / Why this role?
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
                <Link href="/terms" className="text-neon-green hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-neon-green hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
              <div className="flex gap-4 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => router.back()}
                  disabled={submitting}
                  className="flex-1 md:flex-none h-14 px-8 rounded-xl bg-card-dark border border-accent-dark hover:border-white/20 text-gray-400 hover:text-white font-bold transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 md:flex-none bg-neon-green hover:bg-[#3cd612] text-background-dark font-extrabold rounded-xl px-10 h-14 transition-all shadow-[0_0_20px_rgba(73,230,25,0.3)] hover:shadow-[0_0_30px_rgba(73,230,25,0.5)] active:scale-95 whitespace-nowrap text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <span className="animate-spin material-symbols-outlined">
                        progress_activity
                      </span>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <span className="material-symbols-outlined text-xl font-bold">
                        send
                      </span>
                    </>
                  )}
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
