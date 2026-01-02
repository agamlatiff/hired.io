import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // 1. Handle Unauthenticated Users
    if (!token) {
      // If trying to access protected routes (Dashboard), redirect to Login
      if (path.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/auth/signin", req.url));
      }
      // Otherwise, allow access to public pages (Landing, Auth, Jobs, etc.)
      return NextResponse.next();
    }

    // 2. Handle Authenticated Users (Role Check)
    // Redirect to role selection if user has no role
    // @ts-ignore
    if (!token.role || token.role === "null") {
      if (!path.startsWith("/auth/role-selection") && !path.startsWith("/api/auth")) {
        return NextResponse.redirect(new URL("/auth/role-selection", req.url));
      }
    }

    // 3. Protect Role-Specific Routes
    // Company routes
    if (path.startsWith("/dashboard") && !path.startsWith("/dashboard/user")) {
      if (token.role !== "company") {
        // If not company (e.g. user), shouldn't be here. 
        // Could redirect to user dashboard or show 403.
        return NextResponse.redirect(new URL("/dashboard/user", req.url));
      }
    }

    // User routes
    if (path.startsWith("/dashboard/user")) {
      if (token.role !== "user") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }
  },
  {
    callbacks: {
      authorized: () => true, // Let middleware handle the logic checks
    },
  }
);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
