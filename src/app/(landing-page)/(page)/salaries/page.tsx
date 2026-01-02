"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/page/Navbar";
import Footer from "@/components/page/Footer";

interface SalaryData {
  role: string;
  avgSalary: number;
  minSalary: number;
  maxSalary: number;
  jobCount: number;
}

export default function SalariesPage() {
  const [salaryData, setSalaryData] = useState<SalaryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"role" | "avgSalary" | "jobCount">("avgSalary");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    async function fetchSalaries() {
      try {
        const res = await fetch("/api/jobs");
        if (!res.ok) throw new Error("Failed to fetch");
        const jobs = await res.json();

        // Aggregate salary data by role
        const roleMap = new Map<string, { salaries: number[]; count: number }>();

        for (const job of jobs) {
          const role = job.roles || "Unknown";
          const salaryFrom = parseInt(String(job.salaryFrom)) || 0;
          const salaryTo = parseInt(String(job.salaryTo)) || 0;
          const avgSalary = (salaryFrom + salaryTo) / 2;

          if (!roleMap.has(role)) {
            roleMap.set(role, { salaries: [], count: 0 });
          }

          const data = roleMap.get(role)!;
          data.salaries.push(salaryFrom, salaryTo);
          data.count++;
        }

        // Convert to array
        const aggregated: SalaryData[] = Array.from(roleMap.entries()).map(
          ([role, data]) => {
            const validSalaries = data.salaries.filter((s) => s > 0);
            const min = validSalaries.length > 0 ? Math.min(...validSalaries) : 0;
            const max = validSalaries.length > 0 ? Math.max(...validSalaries) : 0;
            const avg =
              validSalaries.length > 0
                ? validSalaries.reduce((a, b) => a + b, 0) / validSalaries.length
                : 0;

            return {
              role,
              avgSalary: Math.round(avg),
              minSalary: min,
              maxSalary: max,
              jobCount: data.count,
            };
          }
        );

        setSalaryData(aggregated);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchSalaries();
  }, []);

  const filteredAndSorted = useMemo(() => {
    let result = salaryData.filter((item) =>
      item.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    result.sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortOrder === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      return sortOrder === "asc"
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });

    return result;
  }, [salaryData, searchQuery, sortBy, sortOrder]);

  const formatSalary = (amount: number) => {
    if (amount >= 1000) {
      return `$${Math.round(amount)}k`;
    }
    return `$${amount}k`;
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
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-green/20 bg-neon-green/10 text-neon-green text-xs font-bold uppercase tracking-wider mb-4">
              <span className="material-symbols-outlined text-sm">payments</span>
              Salary Explorer
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Developer Salaries
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore salary ranges for different developer roles. Data is
              aggregated from real job postings on hired.io.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="glass-panel rounded-2xl p-6 mb-8 border border-white/10">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by job title..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-card-dark border border-white/10 text-white placeholder-gray-600 focus:border-neon-green focus:outline-none"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="px-4 py-3 rounded-xl bg-card-dark border border-white/10 text-white focus:border-neon-green focus:outline-none cursor-pointer"
                >
                  <option value="avgSalary">Sort by Salary</option>
                  <option value="role">Sort by Role</option>
                  <option value="jobCount">Sort by Job Count</option>
                </select>
                <button
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                  className="px-4 py-3 rounded-xl bg-card-dark border border-white/10 text-white hover:border-neon-green transition-colors"
                >
                  <span className="material-symbols-outlined">
                    {sortOrder === "asc" ? "arrow_upward" : "arrow_downward"}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Salary Table */}
          {loading ? (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-4xl text-neon-green animate-spin">
                progress_activity
              </span>
              <p className="text-gray-400 mt-4">Loading salary data...</p>
            </div>
          ) : filteredAndSorted.length === 0 ? (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-4xl text-gray-600">
                search_off
              </span>
              <p className="text-gray-400 mt-4">No roles found matching your search.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAndSorted.map((item, index) => (
                <div
                  key={item.role}
                  className="glass-panel rounded-2xl p-6 border border-white/10 hover:border-neon-green/30 transition-all group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-green/20 to-neon-purple/20 flex items-center justify-center text-neon-green font-bold text-lg">
                        #{index + 1}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-neon-green transition-colors">
                          {item.role}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {item.jobCount} open position{item.jobCount !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                          Range
                        </p>
                        <p className="text-sm text-gray-300">
                          {formatSalary(item.minSalary)} - {formatSalary(item.maxSalary)}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                          Average
                        </p>
                        <p className="text-2xl font-black text-neon-green">
                          {formatSalary(item.avgSalary)}
                        </p>
                      </div>
                      <Link
                        href={`/find-jobs?q=${encodeURIComponent(item.role)}`}
                        className="px-4 py-2 rounded-lg bg-neon-green/10 text-neon-green text-sm font-bold hover:bg-neon-green hover:text-background-dark transition-all"
                      >
                        View Jobs
                      </Link>
                    </div>
                  </div>

                  {/* Salary Bar Visualization */}
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <div className="relative h-2 bg-card-dark rounded-full overflow-hidden">
                      <div
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-neon-green/50 to-neon-green rounded-full"
                        style={{
                          width: `${Math.min((item.avgSalary / 250) * 100, 100)}%`,
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>$0k</span>
                      <span>$250k+</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
