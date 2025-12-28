import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-accent-dark bg-background-dark pt-16 pb-8 px-4 md:px-10 lg:px-20">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        {/* Logo & Description */}
        <div className="max-w-xs">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-6 rounded-full bg-neon-green flex items-center justify-center text-background-dark">
              <span
                className="material-symbols-outlined font-bold"
                style={{ fontSize: "14px" }}
              >
                terminal
              </span>
            </div>
            <h2 className="text-lg font-bold text-white">hired.io</h2>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            The #1 job board for 10x developers. Built for devs, by devs.
          </p>
        </div>

        {/* Links Grid */}
        <div className="flex flex-wrap gap-12 md:gap-24">
          {/* Candidates */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              Candidates
            </h4>
            <Link
              href="/find-jobs"
              className="text-gray-400 hover:text-neon-green text-sm transition-colors"
            >
              Find Jobs
            </Link>
            <Link
              href="/find-companies"
              className="text-gray-400 hover:text-neon-green text-sm transition-colors"
            >
              Company Directory
            </Link>
          </div>

          {/* Employers */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              Employers
            </h4>
            <Link
              href="/dashboard/post-job"
              className="text-gray-400 hover:text-neon-green text-sm transition-colors"
            >
              Post a Job
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-400 hover:text-neon-green text-sm transition-colors"
            >
              Dashboard
            </Link>
          </div>

          {/* Auth */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              Account
            </h4>
            <Link
              href="/auth/signin"
              className="text-gray-400 hover:text-neon-green text-sm transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="text-gray-400 hover:text-neon-green text-sm transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1200px] mx-auto mt-16 pt-8 border-t border-accent-dark flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
        <p>© 2024 hired.io Inc. All rights reserved.</p>
        <div className="flex gap-6">
          <span className="text-gray-600">
            Built with ❤️ for developers
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
