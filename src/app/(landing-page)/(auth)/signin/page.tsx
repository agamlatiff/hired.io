"use client";

import { formSignInSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const form = useForm<z.infer<typeof formSignInSchema>>({
    resolver: zodResolver(formSignInSchema),
  });

  const { toast } = useToast()
  const router = useRouter()

  const onSubmit = async (val: z.infer<typeof formSignInSchema>) => {
    const authenticated = await signIn('credentials', {
      ...val,
      redirect: false
    })

    if (authenticated?.error) {
      toast({
        title: 'Error',
        description: 'Email or password maybe wrong'
      })

      return
    }

    router.push('/')
  };

  return (
    <div>
      <div className="text-3xl text-center font-semibold mb-7">
        Welcome Back, Dude
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">Sign In</Button>

          <div className="text-gray-500 text-sm mt-6">
            Don&apos;t have an account {' '}
            <Link href={'/auth/signup'} className="text-primary font-medium">Sign Up</Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignInPage;
