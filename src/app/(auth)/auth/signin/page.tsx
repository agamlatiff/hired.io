"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

type LoginType = "company" | "user";

const SignInPage = () => {
  const [loginType, setLoginType] = useState<LoginType>("company");
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
  });

  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (val: z.infer<typeof signInFormSchema>) => {
    setLoading(true);

    try {
      const providerId = loginType === "company" ? "company-login" : "user-login";

      const authenticated = await signIn(providerId, {
        ...val,
        redirect: false,
      });

      if (authenticated?.error) {
        toast({
          title: "Error",
          description: "Email or password is incorrect",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Logged in successfully!",
      });

      // Redirect based on login type
      if (loginType === "company") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-background-dark">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] bg-grid" />
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-neon-green/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-black text-white">
                hired<span className="text-neon-green">.io</span>
              </span>
            </Link>
          </div>

          {/* Login Card */}
          <div className="glass-panel border border-white/10 rounded-2xl p-8">
            <div className="font-bold text-center text-2xl text-white mb-2">
              Welcome Back
            </div>
            <div className="text-sm text-gray-400 text-center mb-6">
              Sign in to your account
            </div>

            {/* Login Type Switcher */}
            <div className="flex bg-card-dark rounded-xl p-1 mb-8">
              <button
                type="button"
                onClick={() => setLoginType("company")}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${loginType === "company"
                    ? "bg-neon-green text-background-dark"
                    : "text-gray-400 hover:text-white"
                  }`}
              >
                <span className="material-symbols-outlined text-lg">business</span>
                Employer
              </button>
              <button
                type="button"
                onClick={() => setLoginType("user")}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${loginType === "user"
                    ? "bg-neon-green text-background-dark"
                    : "text-gray-400 hover:text-white"
                  }`}
              >
                <span className="material-symbols-outlined text-lg">person</span>
                Job Seeker
              </button>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wider">
                        Email Address
                      </label>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email..."
                          className="w-full px-4 py-3 rounded-xl bg-card-dark border border-white/10 text-white placeholder-gray-600 focus:border-neon-green focus:ring-0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wider">
                        Password
                      </label>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password..."
                          className="w-full px-4 py-3 rounded-xl bg-card-dark border border-white/10 text-white placeholder-gray-600 focus:border-neon-green focus:ring-0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-neon-green hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <Button
                  className="w-full bg-neon-green hover:bg-[#3cd612] text-background-dark font-bold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(73,230,25,0.3)]"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined animate-spin text-lg">
                        progress_activity
                      </span>
                      Signing in...
                    </span>
                  ) : (
                    <>Sign In as {loginType === "company" ? "Employer" : "Job Seeker"}</>
                  )}
                </Button>

                <div className="text-sm text-center text-gray-400">
                  Don&apos;t have an account?{" "}
                  <Link href="/auth/signup" className="text-neon-green hover:underline font-bold">
                    Sign Up
                  </Link>
                </div>
              </form>
            </Form>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-600 mt-8">
            © 2024 hired.io Inc. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
