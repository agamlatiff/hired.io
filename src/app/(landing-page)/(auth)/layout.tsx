import Link from "next/link";

export const metadata = {
  title: "Authentication - Hired.io",
  description: "Sign in or sign up to Hired.io - High-Tech Job Portal",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background-dark font-display text-white overflow-x-hidden flex flex-col">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4">
        <nav className="glass-panel rounded-full px-6 py-3 flex items-center justify-between gap-12 shadow-2xl max-w-5xl w-full">
          <Link href="/" className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-neon-green flex items-center justify-center text-background-dark">
              <span
                className="material-symbols-outlined font-bold"
                style={{ fontSize: "20px" }}
              >
                terminal
              </span>
            </div>
            <h1 className="text-xl font-extrabold tracking-tight text-white">
              hired.io
            </h1>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/find-jobs"
              className="text-sm font-semibold text-gray-400 hover:text-neon-green transition-colors"
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
          <div className="flex items-center gap-3">
            <Link
              href="/auth/signup"
              className="bg-neon-green hover:bg-[#3cd612] text-background-dark text-sm font-bold px-6 py-2.5 rounded-full transition-all shadow-[0_0_15px_rgba(73,230,25,0.3)] hover:shadow-[0_0_25px_rgba(73,230,25,0.5)]"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      {children}

      {/* Footer */}
      <footer className="border-t border-accent-dark bg-background-dark pt-8 pb-8 px-4 md:px-10 lg:px-20">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-gray-600"
              style={{ fontSize: "16px" }}
            >
              terminal
            </span>
            <p>© 2024 hired.io Inc. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Help Center
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
