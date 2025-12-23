"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import type { FC, FormEvent } from "react";
import { useState } from "react";
import MaterialIcon from "../ui/MaterialIcon";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  showLocationFilter?: boolean;
}

const SearchBar: FC<SearchBarProps> = ({
  className,
  placeholder = "Search by technology, role (e.g. 'Rust', 'Senior Backend')...",
  showLocationFilter = true,
}) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("Remote");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (location) params.set("location", location);
    router.push(`/find-jobs?${params.toString()}`);
  };

  return (
    <div className={cn("w-full max-w-2xl relative group", className)}>
      {/* Gradient glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-neon-green to-neon-purple rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />

      {/* Search container */}
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center bg-card-dark border border-accent-dark rounded-2xl p-2 shadow-2xl"
      >
        {/* Search icon */}
        <div className="pl-4 text-gray-500">
          <MaterialIcon icon="search" />
        </div>

        {/* Input */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 focus:outline-none px-4 py-3 text-base md:text-lg"
          placeholder={placeholder}
        />

        {/* Location filter */}
        {showLocationFilter && (
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
        )}

        {/* Search button */}
        <button
          type="submit"
          className="bg-neon-green hover:bg-[#3cd612] text-background-dark font-bold rounded-xl px-6 py-3 ml-2 transition-transform active:scale-95"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
