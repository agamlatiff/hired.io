"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

// Tech chips for hero
const techChips = [
  { name: "React", icon: "code", color: "text-neon-green" },
  { name: "Node.js", icon: "database", color: "text-purple-400" },
  { name: "Python", icon: "terminal", color: "text-blue-400" },
  { name: "Rust", icon: "deployed_code", color: "text-orange-400" },
  { name: "Solidity", icon: "token", color: "text-yellow-400" },
];

export default function HeroSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("Remote");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (location) params.set("location", location);
    router.push(`/find-jobs?${params.toString()}`);
  };

  return (
    <section className="relative pt-32 pb-20 px-4 md:px-10 lg:px-20 min-h-[85vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.07] bg-grid pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-green/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl w-full text-center relative z-10 flex flex-col items-center gap-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-green/20 bg-neon-green/10 text-neon-green text-xs font-bold uppercase tracking-wider mb-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green" />
          </span>
          New dev jobs added daily
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] bg-clip-text text-transparent bg-gradient-to-br from-white via-gray-200 to-gray-500 pb-2">
          Code Your Future.
          <br />
          <span className="text-white relative">
            Find the top 1%
            <svg
              className="absolute -bottom-2 w-full h-3 text-neon-green"
              preserveAspectRatio="none"
              viewBox="0 0 100 10"
            >
              <path
                d="M0 5 Q 50 10 100 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
            </svg>
          </span>{" "}
          dev jobs.
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Join the exclusive network where top tech companies compete to hire
          you. Transparent salaries, direct access to founders, and zero spam.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="w-full max-w-2xl mt-6 relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-neon-green to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
          <div className="relative flex items-center bg-card-dark border border-accent-dark rounded-2xl p-2 shadow-2xl">
            <div className="pl-4 text-gray-500">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 focus:outline-none px-4 py-3 text-base md:text-lg"
              placeholder="Search by technology, role (e.g. 'Rust', 'Senior Backend')..."
            />
            <div className="hidden sm:flex border-l border-accent-dark pl-2">
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-transparent border-none text-gray-300 text-sm font-medium focus:ring-0 focus:outline-none cursor-pointer py-3 pr-8"
              >
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-neon-green hover:bg-[#3cd612] text-background-dark font-bold rounded-xl px-6 py-3 ml-2 transition-transform active:scale-95"
            >
              Search
            </button>
          </div>
        </form>

        {/* Tech Chips */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {techChips.map((chip) => (
            <button
              key={chip.name}
              onClick={() => {
                setSearchQuery(chip.name);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent-dark hover:bg-white/10 border border-transparent hover:border-white/20 transition-all group"
            >
              <span
                className={`material-symbols-outlined ${chip.color} group-hover:scale-110 transition-transform text-lg`}
              >
                {chip.icon}
              </span>
              <span className="text-sm font-medium text-gray-300 group-hover:text-white">
                {chip.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
