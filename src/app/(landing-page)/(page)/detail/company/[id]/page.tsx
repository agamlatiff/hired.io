import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import React, { type FC } from "react";
import type { Metadata } from "next";
import { getCompanyById } from "@/data/companies";
import { dateFormat } from "@/lib/helpers";
import type { CompanyTeam, Job } from "@prisma/client";

type Params = {
  id: string;
};

interface DetailCompanyPageProps {
  params: Params;
}

export async function generateMetadata({ params }: DetailCompanyPageProps): Promise<Metadata> {
  const company = await getCompanyById(params.id);

  if (!company || !company.CompanyOverview?.[0]) {
    return {
      title: "Company Not Found | hired.io",
      description: "The company you're looking for doesn't exist.",
    };
  }

  const overview = company.CompanyOverview[0];

  return {
    title: `${overview.name} | hired.io`,
    description: `${overview.name} - ${overview.industry}. ${overview.employee} employees in ${overview.location}. ${overview.description?.slice(0, 100) || "View company profile."}`,
  };
}

const DetailCompanyPage: FC<DetailCompanyPageProps> = async ({ params }) => {
  const data = await getCompanyById(params.id);

  if (!data || !data.CompanyOverview?.[0]) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Company Not Found</h1>
          <p className="text-muted-foreground mb-6">The company you're looking for doesn't exist.</p>
          <Link href="/find-companies" className="text-primary hover:underline">
            ← Back to Companies
          </Link>
        </div>
      </div>
    );
  }

  const overview = data.CompanyOverview[0];
  const socialMedia = data.CompanySocialMedia?.[0];
  const jobs = data.Job || [];
  const team = data.CompanyTeam || [];

  return (
    <main className="relative pt-8 pb-12 px-4 md:px-10 lg:px-20 overflow-hidden min-h-screen">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] bg-grid pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-40 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/find-companies" className="hover:text-primary transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Companies
          </Link>
          <span className="text-muted-foreground/50">/</span>
          <span className="text-white">{overview.name}</span>
        </div>

        {/* Company Header Card */}
        <div className="glass-panel p-8 rounded-[2rem] mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center relative z-10">
            {/* Company Logo */}
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-white flex items-center justify-center p-4 shadow-2xl shadow-black/50 border border-white/10">
              <Image
                src={data.logo || "/images/placeholder-company.png"}
                alt={overview.name || "Company Logo"}
                width={100}
                height={100}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Company Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">{overview.name}</h1>
                <span className="material-symbols-outlined text-blue-400" title="Verified Company">verified</span>
              </div>
              <p className="text-xl text-muted-foreground font-light max-w-2xl mb-6">
                {overview.description ? (
                  <span dangerouslySetInnerHTML={{ __html: overview.description.slice(0, 200) + (overview.description.length > 200 ? '...' : '') }} />
                ) : (
                  `${overview.name} - A company in ${overview.industry}`
                )}
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-4 md:gap-8 border-t border-white/5 pt-6">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-1">Headquarters</span>
                  <div className="flex items-center gap-1.5 text-gray-200">
                    <span className="material-symbols-outlined text-primary text-sm">public</span>
                    {overview.location || "Not specified"}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-1">Company Size</span>
                  <div className="flex items-center gap-1.5 text-gray-200">
                    <span className="material-symbols-outlined text-secondary text-sm">groups</span>
                    {overview.employee || "Not specified"}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-1">Founded</span>
                  <div className="flex items-center gap-1.5 text-gray-200">
                    <span className="material-symbols-outlined text-primary text-sm">calendar_month</span>
                    {overview.dateFounded ? dateFormat(overview.dateFounded, "YYYY") : "Not specified"}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-1">Website</span>
                  <a href={overview.website?.startsWith('http') ? overview.website : `https://${overview.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-primary hover:text-white transition-colors">
                    {overview.website || "N/A"}
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                  </a>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 w-full md:w-auto min-w-[180px]">
              <Link
                href="#open-roles"
                className="bg-primary hover:bg-[#3cd612] text-background-dark font-bold rounded-xl px-6 py-3 transition-all shadow-[0_0_15px_rgba(73,230,25,0.3)] hover:shadow-[0_0_25px_rgba(73,230,25,0.5)] flex items-center justify-center gap-2"
              >
                View All Jobs
                <span className="bg-black/20 text-black px-1.5 py-0.5 rounded text-xs font-mono font-bold">{data._count?.Job || 0}</span>
              </Link>
              <button className="glass-panel hover:bg-white/5 text-white font-bold rounded-xl px-6 py-3 transition-all border border-white/10 flex items-center justify-center gap-2 group">
                <span className="material-symbols-outlined group-hover:text-primary transition-colors">favorite</span>
                Follow
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            {/* About Section */}
            <div className="glass-panel p-6 md:p-8 rounded-[2rem]">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="size-2 rounded-full bg-primary glow-text"></span>
                About {overview.name}
              </h2>
              <div className="text-muted-foreground space-y-4 leading-relaxed">
                {overview.description ? (
                  <div dangerouslySetInnerHTML={{ __html: overview.description }} />
                ) : (
                  <p>No company description available.</p>
                )}
              </div>
            </div>

            {/* Tech Stack Section */}
            {overview.techStack && overview.techStack.length > 0 && (
              <div className="glass-panel p-6 md:p-8 rounded-[2rem]">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary">code</span>
                    Tech Stack
                  </h2>
                  <span className="text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded border border-white/5">Core Technologies</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {overview.techStack.map((tech: string) => (
                    <div key={tech} className="bg-accent-dark/50 border border-white/5 px-4 py-3 rounded-xl flex items-center gap-3 hover:border-primary/50 transition-colors cursor-default">
                      <span className="material-symbols-outlined text-primary">code_blocks</span>
                      <span className="font-mono text-sm text-gray-200">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Open Roles Section */}
            <div id="open-roles" className="relative">
              <div className="flex items-end gap-4 mb-6">
                <h2 className="text-3xl font-bold text-white">Open Roles</h2>
                <span className="text-4xl font-black text-primary glow-text mb-1">{jobs.length}</span>
              </div>

              {jobs.length > 0 ? (
                <div className="space-y-4">
                  {jobs.slice(0, 5).map((job: Job) => (
                    <Link
                      key={job.id}
                      href={`/detail/job/${job.id}`}
                      className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-primary/50 hover:bg-white/[0.02] transition-all duration-300"
                    >
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{job.roles}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-2">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">apartment</span>
                            {job.jobType}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">location_on</span>
                            {job.location || "Remote"}
                          </span>
                          {job.salaryFrom && job.salaryTo && (
                            <span className="text-primary font-mono text-xs px-2 py-0.5 rounded bg-primary/10">
                              ${job.salaryFrom.toLocaleString()} - ${job.salaryTo.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all">
                          <span className="material-symbols-outlined">arrow_forward</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="glass-panel p-8 rounded-2xl text-center">
                  <span className="material-symbols-outlined text-4xl text-muted-foreground mb-4">work_off</span>
                  <p className="text-muted-foreground">No open positions at the moment.</p>
                  <p className="text-sm text-muted-foreground/70 mt-2">Check back later or follow this company for updates.</p>
                </div>
              )}

              {jobs.length > 5 && (
                <div className="mt-6 text-center">
                  <button className="text-sm font-bold text-muted-foreground hover:text-white transition-colors flex items-center justify-center gap-1 mx-auto">
                    View all {jobs.length} open roles
                    <span className="material-symbols-outlined text-sm">expand_more</span>
                  </button>
                </div>
              )}
            </div>

            {/* Team Section */}
            {team.length > 0 && (
              <div className="glass-panel p-6 md:p-8 rounded-[2rem]">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">groups</span>
                  Meet the Team
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {team.map((member: CompanyTeam) => (
                    <div key={member.id} className="bg-white/5 rounded-xl p-4 text-center hover:bg-white/10 transition-colors group">
                      <div className="size-16 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 mx-auto mb-3 flex items-center justify-center">
                        <span className="material-symbols-outlined text-2xl text-white/70">person</span>
                      </div>
                      <div className="font-semibold text-sm text-white truncate">{member.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{member.position}</div>
                      <div className="flex justify-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        {member.instagram && (
                          <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                            <span className="material-symbols-outlined text-sm">photo_camera</span>
                          </a>
                        )}
                        {member.linkedin && (
                          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                            <span className="material-symbols-outlined text-sm">link</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* At a Glance */}
            <div className="glass-panel p-6 rounded-[2rem] space-y-4">
              <h3 className="font-bold text-white mb-2">At a Glance</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <span className="text-xs text-muted-foreground block mb-1">Founded</span>
                  <span className="text-white font-mono font-bold">
                    {overview.dateFounded ? dateFormat(overview.dateFounded, "YYYY") : "N/A"}
                  </span>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <span className="text-xs text-muted-foreground block mb-1">Industry</span>
                  <span className="text-primary font-mono font-bold glow-text">{overview.industry || "N/A"}</span>
                </div>
                <div className="col-span-2 bg-white/5 rounded-xl p-4 border border-white/5">
                  <span className="text-xs text-muted-foreground block mb-1">Location</span>
                  <span className="text-white text-sm">{overview.location || "Not specified"}</span>
                </div>
              </div>
            </div>

            {/* Social Media / Contact */}
            {socialMedia && (
              <div className="glass-panel p-6 rounded-[2rem]">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">share</span>
                  Connect With Us
                </h3>
                <div className="space-y-3">
                  {socialMedia.facebook && (
                    <a href={socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <div className="size-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                        <span className="material-symbols-outlined text-[16px]">facebook</span>
                      </div>
                      Facebook
                    </a>
                  )}
                  {socialMedia.twitter && (
                    <a href={socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <div className="size-8 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400">
                        <span className="material-symbols-outlined text-[16px]">tag</span>
                      </div>
                      Twitter
                    </a>
                  )}
                  {socialMedia.linkedin && (
                    <a href={socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <div className="size-8 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500">
                        <span className="material-symbols-outlined text-[16px]">link</span>
                      </div>
                      LinkedIn
                    </a>
                  )}
                  {socialMedia.instagram && (
                    <a href={socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <div className="size-8 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400">
                        <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                      </div>
                      Instagram
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Benefits - Placeholder for future */}
            <div className="glass-panel p-6 rounded-[2rem] bg-gradient-to-br from-secondary/5 to-transparent border-secondary/10">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">diamond</span>
                Why Work Here?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="size-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
                  </div>
                  Career Growth Opportunities
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="size-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[16px]">groups</span>
                  </div>
                  Collaborative Team Culture
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="size-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[16px]">school</span>
                  </div>
                  Learning & Development
                </li>
              </ul>
            </div>

            {/* Office Photos Placeholder */}
            <div className="grid grid-cols-2 gap-3">
              <div className="glass-panel h-24 rounded-2xl flex items-center justify-center border-dashed border-2 border-white/10 hover:border-white/30 transition-colors cursor-pointer">
                <span className="text-xs text-muted-foreground">Office</span>
              </div>
              <div className="glass-panel h-24 rounded-2xl flex items-center justify-center border-dashed border-2 border-white/10 hover:border-white/30 transition-colors cursor-pointer">
                <span className="text-xs text-muted-foreground">Culture</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetailCompanyPage;
