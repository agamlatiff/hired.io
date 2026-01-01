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
import { signIn, getSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const SignInPage = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
  });

  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (val: z.infer<typeof signInFormSchema>) => {
    setLoading(true);

    try {
      const authenticated = await signIn("credentials", {
        ...val,
        redirect: false,
      });

      if (authenticated?.error) {
        toast({
          title: "Error",
          description: "Invalid email or password",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Logged in successfully!",
      });

      // Get session to check role for redirection
      const session = await getSession();

      if (session?.user?.role === "company") {
        router.push("/dashboard");
      } else {
        router.push("/dashboard/user");
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
            <div className="text-sm text-gray-400 text-center mb-8">
              Sign in to manage your account
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
                    <>Sign In</>
                  )}
                </Button>

                {/* Google Sign In Option */}
                <>
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-white/10" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card-dark px-2 text-gray-500">Or continue with</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => signIn("google", { callbackUrl: "/dashboard/user" })}
                    className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-bold py-3 rounded-xl transition-all hover:bg-gray-100"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Continue with Google
                  </button>
                </>

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
