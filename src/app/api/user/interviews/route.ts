import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const applicants = await prisma.applicant.findMany({ where: { userId: user.id }, select: { id: true } });
    const applicantIds = applicants.map((a) => a.id);

    const interviews = await prisma.interview.findMany({
      where: { applicantId: { in: applicantIds }, status: { not: "cancelled" } },
      include: {
        company: { select: { id: true, name: true, logo: true } },
        applicant: { include: { Job: { select: { id: true, roles: true } } } },
      },
      orderBy: { scheduledAt: "asc" },
    });

    return NextResponse.json(interviews);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
