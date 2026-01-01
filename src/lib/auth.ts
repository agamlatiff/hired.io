import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";
import { comparePassword } from "@/lib/helpers";

type UserRole = "company" | "user";

interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    // Unified Login Provider
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<AuthUser | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // 1. Check Company first
        const company = await prisma.company.findFirst({
          where: { email: credentials.email },
        });

        if (company) {
          const isMatch = await comparePassword(
            credentials.password,
            company.password
          );

          if (isMatch) {
            return {
              id: company.id,
              email: company.email,
              name: company.name,
              role: "company",
            };
          }
        }

        // 2. Check User (Job Seeker) second
        const user = await prisma.user.findFirst({
          where: { email: credentials.email },
        });

        if (user) {
          const isMatch = await comparePassword(
            credentials.password,
            user.password
          );

          if (isMatch) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: "user",
            };
          }
        }

        // 3. No match found
        return null;
      },
    }),
    // Google OAuth Provider (for job seekers)
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      profile(profile) {
        return {
          id: profile.sub,
          email: profile.email,
          name: profile.name,
          image: profile.picture,
          role: "user" as UserRole,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/signup",
  },
  callbacks: {
    async signIn({ user, account }) {
      // Handle Google OAuth - create user if not exists
      if (account?.provider === "google" && user.email) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          // Create new user from Google OAuth
          await prisma.user.create({
            data: {
              email: user.email,
              name: user.name || "Google User",
              password: "", // OAuth users don't have password
              // Ensure role is default (User model doesn't have role field usually, logic handles it)
            },
          });
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        if (account?.provider === "credentials") {
          token.id = user.id;
          token.role = (user as AuthUser).role;
        } else if (account?.provider === "google") {
          // For Google, verify against DB to get the Real CUID
          const dbUser = await prisma.user.findUnique({
            where: { email: user.email! }
          });
          if (dbUser) {
            token.id = dbUser.id;
            token.role = "user";
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
      }

      return session;
    },
  },
};


