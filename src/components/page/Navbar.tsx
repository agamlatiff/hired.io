"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import MenuAuth from "./MenuAuth";

const navLinks = [
  { href: "/find-jobs", label: "Find Jobs" },
  { href: "/find-companies", label: "Companies" },
  { href: "/salaries", label: "Salaries" },
  { href: "/dashboard/user/saved-jobs", label: "Saved Jobs" },
];

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4">
        <nav className="glass-panel rounded-full px-6 py-3 flex items-center justify-between gap-4 md:gap-12 shadow-2xl max-w-5xl w-full">
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

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${isActive(link.href)
                  ? "font-semibold text-neon-green"
                  : "font-medium text-gray-400 hover:text-white"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons + Mobile Menu Button */}
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
                  className="bg-neon-green hover:bg-[#3cd612] text-background-dark text-sm font-bold px-4 md:px-6 py-2.5 rounded-full transition-all shadow-[0_0_15px_rgba(73,230,25,0.3)] hover:shadow-[0_0_25px_rgba(73,230,25,0.5)]"
                >
                  Sign Up
                </button>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-card-dark border-l border-accent-dark transform transition-transform duration-300 md:hidden ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <span className="text-lg font-bold text-white">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive(link.href)
                  ? "bg-neon-green/10 text-neon-green font-semibold"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          {!session && (
            <div className="mt-8 pt-8 border-t border-accent-dark space-y-3">
              <button
                onClick={() => {
                  router.push("/auth/signin");
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 px-4 rounded-xl bg-white/5 text-white font-bold hover:bg-white/10 transition-colors"
              >
                Log In
              </button>
              <button
                onClick={() => {
                  router.push("/auth/signup");
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 px-4 rounded-xl bg-neon-green text-background-dark font-bold hover:bg-[#3cd612] transition-colors"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;

