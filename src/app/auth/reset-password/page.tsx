"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const type = searchParams.get("type") || "user";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, email, newPassword: password, userType: type }),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to reset password");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="glass-panel p-8 rounded-3xl text-center">
        <div className="w-16 h-16 bg-neon-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-neon-green text-3xl">check_circle</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Password Reset!</h1>
        <p className="text-gray-400 mb-6">Your password has been successfully updated.</p>
        <Link href="/auth/signin" className="inline-block bg-neon-green text-background-dark font-bold px-6 py-3 rounded-full">
          Sign In
        </Link>
      </div>
    );
  }

  if (!email) {
    return (
      <div className="glass-panel p-8 rounded-3xl text-center">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-red-400 text-3xl">error</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Invalid Link</h1>
        <p className="text-gray-400 mb-6">This password reset link is invalid or has expired.</p>
        <Link href="/auth/forgot-password" className="inline-block bg-neon-green text-background-dark font-bold px-6 py-3 rounded-full">
          Request New Link
        </Link>
      </div>
    );
  }

  return (
    <div className="glass-panel p-8 rounded-3xl">
      <h1 className="text-2xl font-bold text-white text-center mb-2">Reset Password</h1>
      <p className="text-gray-400 text-center mb-6">Enter your new password for {email}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password..."
            required
            minLength={6}
            className="w-full px-4 py-3 bg-card-dark border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-neon-green transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password..."
            required
            minLength={6}
            className="w-full px-4 py-3 bg-card-dark border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-neon-green transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-neon-green hover:bg-[#3cd612] text-background-dark font-bold py-3 rounded-full transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="material-symbols-outlined animate-spin">progress_activity</span>
              Updating...
            </>
          ) : (
            "Update Password"
          )}
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-green/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-[150px]" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="size-10 rounded-full bg-neon-green flex items-center justify-center shadow-[0_0_20px_rgba(73,230,25,0.4)]">
              <span className="material-symbols-outlined text-background-dark font-bold">terminal</span>
            </div>
            <span className="text-2xl font-extrabold text-white">hired.io</span>
          </Link>
        </div>

        <Suspense fallback={<div className="glass-panel p-8 rounded-3xl text-center text-gray-400">Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
