// Type declarations for next-auth
// This extends the session user to include id and role properties

import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: "company" | "user";
    };
  }

  interface User {
    id: string;
    role: "company" | "user";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "company" | "user";
  }
}

export { };

