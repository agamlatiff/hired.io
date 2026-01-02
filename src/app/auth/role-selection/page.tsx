"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

export default function RoleSelectionPage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // If session is loading or user already has a role, redirect (handled by guard, but safe to have)
  if (session?.user?.role && session.user.role !== "null") {
    if (session.user.role === "user") router.push("/dashboard/user");
    // if (session.user.role === "company") router.push("/dashboard/company");
  }

  const handleSelectRole = async (role: "user" | "company") => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      });

      if (!res.ok) throw new Error("Failed to update role");

      // Update local session
      await update({ role });

      toast({
        title: "Welcome aboard! 🚀",
        description: role === "user" ? "Setting up your candidate profile..." : "Let's create your company profile.",
        variant: "default",
      });

      // Redirect
      if (role === "user") {
        router.push("/dashboard/user");
      } else {
        // Assuming we want to guide them to company creation or dashboard
        router.push("/dashboard/company/new"); // Or wherever the create company flow is
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-dark font-display text-white flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] bg-grid" />
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-neon-green/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[100px]" />
      </div>

      {/* Navbar Logo */}
      <div className="relative z-10 p-6 md:p-10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-neon-green rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(57,255,20,0.3)]">
            <span className="material-symbols-outlined text-background-dark font-black text-2xl">
              work
            </span>
          </div>
          <span className="text-2xl font-black tracking-tight text-white">
            hired.io
          </span>
        </div>
      </div>

      <main className="flex-grow flex items-center justify-center relative z-10 p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              How do you want to use <span className="text-neon-green">hired.io</span>?
            </h1>
            <p className="text-gray-400 text-lg">
              Select your role to get started. You can't change this later for this account.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Job Seeker Card */}
            <button
              onClick={() => handleSelectRole("user")}
              disabled={loading}
              className="group relative h-[320px] rounded-3xl bg-card-dark border border-white/10 p-8 text-left hover:border-neon-green transition-all duration-300 hover:shadow-[0_0_30px_rgba(57,255,20,0.1)] flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neon-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-neon-green group-hover:border-neon-green">
                  <span className="material-symbols-outlined text-3xl text-gray-400 group-hover:text-background-dark">
                    person_search
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-neon-green transition-colors">
                  I'm a Job Seeker
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  Find your dream job at top tech companies. Apply with one click and track your applications.
                </p>
              </div>

              <div className="relative z-10 flex items-center text-sm font-bold text-gray-500 group-hover:text-neon-green mt-auto">
                Continue as Candidate
                <span className="material-symbols-outlined ml-2 text-lg transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </div>
            </button>

            {/* Employer Card */}
            <button
              onClick={() => handleSelectRole("company")}
              disabled={loading}
              className="group relative h-[320px] rounded-3xl bg-card-dark border border-white/10 p-8 text-left hover:border-neon-purple transition-all duration-300 hover:shadow-[0_0_30px_rgba(188,19,254,0.1)] flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-neon-purple group-hover:border-neon-purple">
                  <span className="material-symbols-outlined text-3xl text-gray-400 group-hover:text-white">
                    business_center
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-neon-purple transition-colors">
                  I'm Hiring
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  Post jobs, manage candidates, and hire the top 1% of tech talent for your team.
                </p>
              </div>

              <div className="relative z-10 flex items-center text-sm font-bold text-gray-500 group-hover:text-neon-purple mt-auto">
                Continue as Employer
                <span className="material-symbols-outlined ml-2 text-lg transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
