import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

/**
 * Helper to get authenticated session user with proper typing.
 * Returns null if not authenticated.
 */
export async function getSessionUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  return session.user;
}

/**
 * Helper to require authentication and return typed user.
 * Returns NextResponse error if not authenticated.
 */
export async function requireAuth() {
  const user = await getSessionUser();
  if (!user) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  return { user };
}

/**
 * Helper to require company role.
 */
export async function requireCompany() {
  const result = await requireAuth();
  if ("error" in result) return result;
  if (result.user.role !== "company") {
    return { error: NextResponse.json({ error: "Company access required" }, { status: 403 }) };
  }
  return { user: result.user };
}

/**
 * Helper to require user (job seeker) role.
 */
export async function requireUser() {
  const result = await requireAuth();
  if ("error" in result) return result;
  if (result.user.role !== "user") {
    return { error: NextResponse.json({ error: "Job seeker access required" }, { status: 403 }) };
  }
  return { user: result.user };
}
