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
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    // In a production app, you would:
    // 1. Store the token in database (add resetToken and resetTokenExpiry fields to User/Company model)
    // 2. Send email with reset link containing the token

    // For now, we'll log the token (in dev) and return success
    console.log(`Password reset requested for: ${email}`);
    console.log(`Reset token: ${resetToken}`);
    console.log(`Token expires: ${resetTokenExpiry}`);

    // TODO: Implement email sending with Resend/SendGrid
    // await sendResetEmail(email, resetToken);

    return NextResponse.json({
      message: "If an account with that email exists, a reset link has been sent.",
      // DEV ONLY - remove in production
      ...(process.env.NODE_ENV === "development" && { devToken: resetToken })
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

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    // In production, you would validate the token from database here
    // For demo purposes, we'll allow direct password reset with email

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    if (userType === "company") {
      await prisma.company.update({
        where: { email },
        data: { password: hashedPassword },
      });
    } else {
      await prisma.user.update({
        where: { email },
        data: { password: hashedPassword },
      });
    }

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Password update error:", error);
    return NextResponse.json({ error: "Failed to update password" }, { status: 500 });
  }
}
