import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
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
  ],
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/signup",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as AuthUser).role;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }

      return session;
    },
  },
};

// Type declaration for session
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: UserRole;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
  }
}
