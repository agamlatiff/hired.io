"use client";

import { formSignInSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const form = useForm<z.infer<typeof formSignInSchema>>({
    resolver: zodResolver(formSignInSchema),
  });

  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (val: z.infer<typeof formSignInSchema>) => {
    const authenticated = await signIn("credentials", {
      ...val,
      redirect: false,
    });

    if (authenticated?.error) {
      toast({
        title: "Error",
        description: "Email or password maybe wrong",
      });
      return;
    }

    router.push("/");
  };

  return (
    <section className="relative flex-grow flex items-center justify-center px-4 py-32 overflow-hidden min-h-screen">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.07] bg-grid pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-green/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="glass-panel p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
          {/* Top gradient line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-neon-green to-transparent opacity-50" />

          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
            <p className="text-gray-400 text-sm">
              Access your developer dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label
                className="block text-sm font-medium text-gray-300 ml-1"
                htmlFor="email"
              >
                Email or Username
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-gray-500 group-focus-within:text-neon-green transition-colors">
                    person
                  </span>
                </div>
                <input
                  {...form.register("email")}
                  className="input-field block w-full pl-11 pr-4 py-3 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-0 sm:text-sm"
                  id="email"
                  placeholder="dev@example.com"
                  type="text"
                />
              </div>
              {form.formState.errors.email && (
                <p className="text-red-400 text-xs ml-1">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label
                  className="block text-sm font-medium text-gray-300"
                  htmlFor="password"
                >
                  Password
                </label>
                <Link
                  href="#"
                  className="text-xs text-neon-green hover:text-white transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-gray-500 group-focus-within:text-neon-green transition-colors">
                    lock
                  </span>
                </div>
                <input
                  {...form.register("password")}
                  className="input-field block w-full pl-11 pr-4 py-3 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-0 sm:text-sm"
                  id="password"
                  placeholder="••••••••"
                  type="password"
                />
              </div>
              {form.formState.errors.password && (
                <p className="text-red-400 text-xs ml-1">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-neon-green hover:bg-[#3cd612] text-background-dark font-bold py-3.5 px-4 rounded-xl transition-all shadow-[0_0_20px_rgba(73,230,25,0.2)] hover:shadow-[0_0_30px_rgba(73,230,25,0.4)] transform active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <span>Login to Dashboard</span>
              <span className="material-symbols-outlined text-lg">
                arrow_forward
              </span>
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#181f16] text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-3 border border-white/10 rounded-xl hover:bg-white/5 transition-colors group"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
              </svg>
              <span className="text-sm font-medium text-gray-300 group-hover:text-white">
                Google
              </span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-3 border border-white/10 rounded-xl hover:bg-white/5 transition-colors group"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  fillRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium text-gray-300 group-hover:text-white">
                GitHub
              </span>
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-neon-green font-bold hover:underline decoration-neon-green/50 underline-offset-4"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>

        {/* Decorative blurs */}
        <div className="absolute -z-10 -bottom-10 -right-10 w-32 h-32 bg-neon-purple/20 rounded-full blur-2xl" />
        <div className="absolute -z-10 -top-10 -left-10 w-32 h-32 bg-neon-green/10 rounded-full blur-2xl" />
      </div>
    </section>
  );
};

export default SignInPage;
