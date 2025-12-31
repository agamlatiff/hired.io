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
import { useToast } from "@/hooks/use-toast";
import { signUpFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type z from "zod";
import { useState } from "react";

type SignupType = "company" | "user";

const SignUpPage = () => {
  const [signupType, setSignupType] = useState<SignupType>("company");
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
  });

  const router = useRouter();

  const onSubmit = async (val: z.infer<typeof signUpFormSchema>) => {
    setLoading(true);

    try {
      const endpoint = signupType === "company" ? "/api/company/new-user" : "/api/user";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(val),
      });

      if (!res.ok) {
        throw new Error("Registration failed");
      }

      toast({
        title: "Account Created!",
        description: "Please sign in with your new account.",
      });

      await router.push("/auth/signin");
    } catch (e) {
      toast({
        title: "Error",
        description: "Registration failed. Please try again.",
        variant: "destructive",
      });
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

          {/* Signup Card */}
          <div className="glass-panel border border-white/10 rounded-2xl p-8">
            <div className="font-bold text-center text-2xl text-white mb-2">
              Create Account
            </div>
            <div className="text-sm text-gray-400 text-center mb-6">
              Join hired.io today
            </div>

            {/* Signup Type Switcher */}
            <div className="flex bg-card-dark rounded-xl p-1 mb-8">
              <button
                type="button"
                onClick={() => setSignupType("company")}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${signupType === "company"
                  ? "bg-neon-green text-background-dark"
                  : "text-gray-400 hover:text-white"
                  }`}
              >
                <span className="material-symbols-outlined text-lg">business</span>
                Employer
              </button>
              <button
                type="button"
                onClick={() => setSignupType("user")}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${signupType === "user"
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wider">
                        {signupType === "company" ? "Company Name" : "Full Name"}
                      </label>
                      <FormControl>
                        <Input
                          placeholder={signupType === "company" ? "Your company name..." : "Your full name..."}
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
                          placeholder="Create a password..."
                          className="w-full px-4 py-3 rounded-xl bg-card-dark border border-white/10 text-white placeholder-gray-600 focus:border-neon-green focus:ring-0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  className="w-full bg-neon-green hover:bg-[#3cd612] text-background-dark font-bold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(73,230,25,0.3)]"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined animate-spin text-lg">
                        progress_activity
                      </span>
                      Creating Account...
                    </span>
                  ) : (
                    <>Create {signupType === "company" ? "Employer" : "Job Seeker"} Account</>
                  )}
                </Button>

                <div className="text-sm text-center text-gray-400">
                  Already have an account?{" "}
                  <Link href="/auth/signin" className="text-neon-green hover:underline font-bold">
                    Sign In
                  </Link>
                </div>
              </form>
            </Form>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-600 mt-8">
            By signing up, you agree to our{" "}
            <Link href="/terms" className="text-neon-green hover:underline">Terms</Link> and{" "}
            <Link href="/privacy" className="text-neon-green hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
