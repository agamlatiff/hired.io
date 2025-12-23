"use client";

import Link from "next/link";
import Navbar from "@/components/page/Navbar";
import Footer from "@/components/page/Footer";

export default function ApplySuccessPage() {
  return (
    <div className="bg-background-dark font-display text-white overflow-x-hidden min-h-screen flex flex-col relative">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] bg-grid" />
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-neon-green/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[100px]" />
      </div>

      <Navbar />

      <main className="flex-grow relative z-10 pt-32 pb-20 px-4 md:px-10 lg:px-20 flex items-center justify-center min-h-[calc(100vh-350px)]">
        <div className="max-w-2xl w-full">
          <div className="glass-panel rounded-3xl p-8 md:p-12 border border-neon-green/20 relative overflow-hidden text-center shadow-[0_0_50px_rgba(0,0,0,0.3)]">
            {/* Background glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-neon-green/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-neon-purple/10 rounded-full blur-[60px] pointer-events-none" />

            {/* Success Icon */}
            <div className="relative mx-auto mb-8 w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 bg-neon-green/30 rounded-full animate-ping" />
              <div className="relative w-full h-full rounded-full bg-background-dark border border-neon-green/40 shadow-[0_0_30px_rgba(73,230,25,0.2)] flex items-center justify-center z-10">
                <span className="material-symbols-outlined text-5xl text-neon-green font-bold">
                  check_circle
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight glow-text">
              Application Submitted!
            </h1>

            {/* Description */}
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Great news! We&apos;ve successfully received your application for
              the{" "}
              <strong className="text-white">Senior Frontend Engineer</strong>{" "}
              position at <strong className="text-white">Vercel</strong>.
            </p>

            {/* Job Card */}
            <div className="glass-panel rounded-xl p-4 mb-10 flex items-center justify-center gap-4 inline-flex mx-auto pr-8 hover:bg-white/5 transition-colors duration-300 cursor-default">
              <div className="w-12 h-12 rounded-lg bg-white p-2 flex items-center justify-center shrink-0 shadow-lg">
                <img
                  alt="Vercel Logo"
                  className="w-full h-full object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAmRxDHv2vweGovYx9DWWH3IOHQUMsap5anKHu2FlbXHWuB_LDnq8eBMNLOBom2vsXEvaQPlESS6KPwIZvZyUqCpW6fScnO1QRU19Zy7gzUCEbI9XatG3gVtJky5DbWxn2k7KQfu_nBMMtAshbXYw2dbz6_AlM7SM0L13rzrEdvAypuNvqSlyj9vCdIyRdXZTLo1O0KIy9axy5lpolMI2xcLP9SdG4yjC_rKsmw1GnST3BgILu0pZt79zXqxyTjAeUmCAj3o7_eg"
                />
              </div>
              <div className="text-left">
                <div className="text-base font-bold text-white leading-tight">
                  Senior Frontend Engineer
                </div>
                <div className="text-xs text-gray-500 font-mono mt-1">
                  REQ-2024-FE-01
                </div>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="space-y-6 mb-12 max-w-lg mx-auto">
              <div className="relative pt-6 pb-2">
                <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-neon-green to-[#3cd612] w-[25%] shadow-[0_0_10px_rgba(73,230,25,0.5)]" />
                </div>
                <div className="flex justify-between mt-4 text-[10px] md:text-xs font-bold uppercase tracking-widest relative">
                  <div className="absolute -top-2 left-[12.5%] -translate-x-1/2 w-3 h-3 bg-neon-green rounded-full shadow-[0_0_10px_rgba(73,230,25,0.8)] border-2 border-background-dark" />
                  <div className="text-neon-green text-center w-1/4">
                    Applied
                  </div>
                  <div className="text-gray-600 text-center w-1/4">Review</div>
                  <div className="text-gray-600 text-center w-1/4">
                    Interview
                  </div>
                  <div className="text-gray-600 text-center w-1/4">Offer</div>
                </div>
              </div>

              {/* Confirmation Message */}
              <div className="bg-neon-green/5 border border-neon-green/10 rounded-xl p-4 text-left flex gap-4 items-start">
                <div className="p-2 rounded-lg bg-neon-green/10 text-neon-green">
                  <span className="material-symbols-outlined text-xl">
                    mark_email_read
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Confirmation Email Sent
                  </h4>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    We&apos;ve sent a receipt to your email address. Our team
                    typically reviews applications within 3-5 business days.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="bg-neon-green hover:bg-[#3cd612] text-background-dark font-extrabold rounded-xl px-8 py-4 transition-all shadow-[0_0_20px_rgba(73,230,25,0.3)] hover:shadow-[0_0_30px_rgba(73,230,25,0.5)] active:scale-95 flex items-center justify-center gap-2 min-w-[200px]"
              >
                <span>View Dashboard</span>
                <span className="material-symbols-outlined text-lg font-bold">
                  dashboard
                </span>
              </Link>
              <Link
                href="/find-jobs"
                className="bg-card-dark/50 hover:bg-card-dark text-white border border-gray-600 hover:border-white font-bold rounded-xl px-8 py-4 transition-all flex items-center justify-center gap-2 min-w-[200px]"
              >
                <span>Browse More Jobs</span>
                <span className="material-symbols-outlined text-lg">
                  search
                </span>
              </Link>
            </div>

            {/* Back Link */}
            <div className="mt-8 pt-8 border-t border-white/5">
              <Link
                href="/"
                className="text-xs font-bold text-gray-500 hover:text-neon-green transition-colors inline-flex items-center gap-1 uppercase tracking-wider"
              >
                <span className="material-symbols-outlined text-sm">
                  arrow_back
                </span>
                Back to Homepage
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
