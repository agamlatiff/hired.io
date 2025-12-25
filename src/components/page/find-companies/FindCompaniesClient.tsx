"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/page/Navbar";
import Footer from "@/components/page/Footer";

export interface UICompany {
  id: string;
  name: string;
  industry: string;
  location: string;
  openRoles: number;
  techStack: string[];
  logo: string | null;
  description: string;
}

interface FindCompaniesClientProps {
  initialCompanies: UICompany[];
}

export default function FindCompaniesClient({
  initialCompanies,
}: FindCompaniesClientProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // For now, simple filter (client-side for MVP as we fetch all for now)
  const companies = initialCompanies.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="bg-background-dark font-display text-white overflow-x-hidden min-h-screen flex flex-col">
      <Navbar />

      {/* Header Section */}
      <section className="relative pt-32 pb-12 px-4 md:px-10 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] bg-grid pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-green/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              Find your{" "}
              <span className="text-neon-green glow-text">Dream Company</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              Browse {initialCompanies.length} top tech companies hiring now.
            </p>
          </div>

          {/* Search Bar */}
          <div className="glass-panel p-4 rounded-2xl md:rounded-full flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 focus:outline-none pl-12 pr-4 py-2"
                placeholder="Search companies, chemical, or tech stack..."
              />
            </div>
            <button className="bg-neon-green hover:bg-[#3cd612] text-background-dark font-bold rounded-full px-6 py-2.5 transition-all shadow-lg shadow-neon-green/20 w-full md:w-auto">
              Search Companies
            </button>
          </div>
        </div>
      </section>

      {/* Companies Grid */}
      <section className="px-4 md:px-10 lg:px-20 pb-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => (
              <div
                key={company.id}
                onClick={() => router.push(`/detail/company/${company.id}`)}
                className="glass-panel p-6 rounded-3xl relative overflow-hidden group hover:border-neon-green/50 transition-all duration-300 flex flex-col h-full hover:-translate-y-1 cursor-pointer"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center p-2 shadow-lg">
                    {company.logo ? (
                      <img
                        alt={`${company.name} Logo`}
                        className="w-full h-full object-contain"
                        src={company.logo}
                      />
                    ) : (
                      <span className="text-black font-bold text-2xl">
                        {company.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full text-neon-green border border-neon-green/30 bg-neon-green/10">
                    {company.openRoles} Jobs
                  </span>
                </div>

                {/* Company Info */}
                <div className="mb-2">
                  <h3 className="font-bold text-xl text-white group-hover:text-neon-green transition-colors">
                    {company.name}
                  </h3>
                  <p className="text-sm text-gray-400 font-medium">
                    {company.industry}
                  </p>
                </div>

                <div className="mb-5">
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {company.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {company.techStack.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-md bg-accent-dark text-[11px] font-mono text-gray-300 border border-white/5 flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        code
                      </span>
                      {skill}
                    </span>
                  ))}
                  {company.techStack.length > 3 && (
                    <span className="px-2.5 py-1 rounded-md bg-accent-dark text-[11px] font-mono text-gray-300 border border-white/5">
                      +{company.techStack.length - 3}
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center text-xs">
                  <div className="flex items-center gap-3 text-gray-400">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">
                        public
                      </span>
                      {company.location}
                    </span>
                  </div>
                  <button className="font-bold px-4 py-2 rounded-full text-xs shadow-lg transition-colors text-background-dark bg-neon-green hover:bg-white shadow-neon-green/20">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
