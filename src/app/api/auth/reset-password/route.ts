import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";

// POST - Request password reset (send email)
export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Check if user exists (check both Company and User tables)
    const company = await prisma.company.findUnique({ where: { email } });
    const user = await prisma.user.findUnique({ where: { email } });

    // Always return success to prevent email enumeration attacks
    if (!company && !user) {
      return NextResponse.json({ message: "If account exists, email was sent" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    // Store hashed token in database
    if (company) {
      await prisma.company.update({
        where: { id: company.id },
        data: {
          resetToken: tokenHash,
          resetTokenExpiry,
        },
      });
    } else if (user) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          resetToken: tokenHash,
          resetTokenExpiry,
        },
      });
    }

    // Create reset link
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const userTypeParam = company ? "company" : "user";
    const resetLink = `${baseUrl}/auth/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}&type=${userTypeParam}`;

    // Log the link (Development mode simulation)
    console.log("==================================================================");
    console.log(`[PASSWORD RESET] Link for ${email}:`);
    console.log(resetLink);
    console.log("==================================================================");

    // TODO: Implement actual email sending here using the resetLink

    return NextResponse.json({
      message: "If an account with that email exists, a reset link has been sent.",
      // DEV ONLY - remove in production
      ...(process.env.NODE_ENV === "development" && { devLink: resetLink }),
    });
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}

// PUT - Reset password with token
export async function PUT(request: Request) {
  try {
    const { token, newPassword, email, userType } = await request.json();

    if (!token || !newPassword || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    // Hash the incoming token to compare with stored hash
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    let validUser = null;
    let isCompany = false;

    // Verify token and expiry
    if (userType === "company") {
      const company = await prisma.company.findUnique({
        where: { email },
      });
      if (
        company &&
        company.resetToken === tokenHash &&
        company.resetTokenExpiry &&
        company.resetTokenExpiry > new Date()
      ) {
        validUser = company;
        isCompany = true;
      }
    } else {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (
        user &&
        user.resetToken === tokenHash &&
        user.resetTokenExpiry &&
        user.resetTokenExpiry > new Date()
      ) {
        validUser = user;
      }
    }

    if (!validUser) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear reset token
    if (isCompany) {
      await prisma.company.update({
        where: { id: validUser.id },
        data: {
          password: hashedPassword,
          resetToken: null,
          resetTokenExpiry: null,
        },
      });
    } else {
      await prisma.user.update({
        where: { id: validUser.id },
        data: {
          password: hashedPassword,
          resetToken: null,
          resetTokenExpiry: null,
        },
      });
    }

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Password update error:", error);
    return NextResponse.json({ error: "Failed to update password" }, { status: 500 });
  }
}
