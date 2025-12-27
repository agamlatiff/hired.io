import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Protect company dashboard routes
    if (path.startsWith("/dashboard") && !path.startsWith("/dashboard/user")) {
      if (token?.role !== "company") {
        return NextResponse.redirect(new URL("/auth/signin", req.url));
      }
    }

    // Protect user dashboard routes
    if (path.startsWith("/dashboard/user")) {
      if (token?.role !== "user") {
        return NextResponse.redirect(new URL("/auth/signin", req.url));
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};
