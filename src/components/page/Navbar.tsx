"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import MenuAuth from "./MenuAuth";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4">
      <nav className="glass-panel rounded-full px-6 py-3 flex items-center justify-between gap-12 shadow-2xl max-w-5xl w-full">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-neon-green flex items-center justify-center text-background-dark">
            <span className="material-symbols-outlined font-bold text-xl">
              terminal
            </span>
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-white">
            hired.io
          </h1>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/find-jobs"
            className="text-sm font-semibold text-white hover:text-neon-green transition-colors"
          >
            Find Jobs
          </Link>
          <Link
            href="/find-companies"
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Companies
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Salaries
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            For Employers
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          {session ? (
            <MenuAuth />
          ) : (
            <>
              <button
                onClick={() => router.push("/auth/signin")}
                className="hidden sm:flex text-sm font-bold text-white hover:text-neon-green px-4 py-2 transition-colors"
              >
                Log In
              </button>
              <button
                onClick={() => router.push("/auth/signup")}
                className="bg-neon-green hover:bg-[#3cd612] text-background-dark text-sm font-bold px-6 py-2.5 rounded-full transition-all shadow-[0_0_15px_rgba(73,230,25,0.3)] hover:shadow-[0_0_25px_rgba(73,230,25,0.5)]"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
