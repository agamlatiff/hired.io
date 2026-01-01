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
    // Company Login Provider
    CredentialsProvider({
      id: "company-login",
      name: "Company",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials): Promise<AuthUser | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const company = await prisma.company.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!company) {
          return null;
        }

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

        return null;
      },
    }),
    // User (Job Seeker) Login Provider
    CredentialsProvider({
      id: "user-login",
      name: "User",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials): Promise<AuthUser | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

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
            },
          });
        }
      }
      return true;
    },
    jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = (user as AuthUser).role;
      }
      // For Google OAuth, set role to user
      if (account?.provider === "google") {
        token.role = "user";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }

      return session;
    },
  },
};


