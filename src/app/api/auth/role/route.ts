import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { role } = await req.json();

    if (role !== "user" && role !== "company") {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    // Update user role
    await prisma.user.update({
      where: { email: session.user.email },
      data: { role },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating role:", error);
    return NextResponse.json(
      { error: "Failed to update role" },
      { status: 500 }
    );
  }
}
