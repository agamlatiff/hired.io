import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const company = await prisma.company.findUnique({ where: { email: session.user.email }, select: { id: true } });
    if (!company) return NextResponse.json({ error: "Company not found" }, { status: 404 });

    const interviews = await prisma.interview.findMany({
      where: { companyId: company.id },
      include: {
        applicant: {
          include: {
            user: { select: { id: true, name: true, email: true, avatar: true } },
            Job: { select: { id: true, roles: true } },
          },
        },
      },
      orderBy: { scheduledAt: "asc" },
    });

    return NextResponse.json(interviews);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const company = await prisma.company.findUnique({ where: { email: session.user.email }, select: { id: true } });
    if (!company) return NextResponse.json({ error: "Company not found" }, { status: 404 });

    const { applicantId, scheduledAt, duration, type, location, notes } = await request.json();
    if (!applicantId || !scheduledAt) return NextResponse.json({ error: "Required" }, { status: 400 });

    const interview = await prisma.interview.create({
      data: { applicantId, companyId: company.id, scheduledAt: new Date(scheduledAt), duration: duration || 60, type: type || "video", location, notes },
    });

    await prisma.applicant.update({ where: { id: applicantId }, data: { status: "interview" } });
    return NextResponse.json(interview, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const company = await prisma.company.findUnique({ where: { email: session.user.email }, select: { id: true } });
    if (!company) return NextResponse.json({ error: "Company not found" }, { status: 404 });

    const { interviewId, scheduledAt, duration, type, location, notes, status } = await request.json();
    const interview = await prisma.interview.update({
      where: { id: interviewId, companyId: company.id },
      data: {
        ...(scheduledAt && { scheduledAt: new Date(scheduledAt) }),
        ...(duration && { duration }),
        ...(type && { type }),
        ...(location !== undefined && { location }),
        ...(notes !== undefined && { notes }),
        ...(status && { status }),
      },
    });

    return NextResponse.json(interview);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const company = await prisma.company.findUnique({ where: { email: session.user.email }, select: { id: true } });
    if (!company) return NextResponse.json({ error: "Company not found" }, { status: 404 });

    const { interviewId } = await request.json();
    await prisma.interview.delete({ where: { id: interviewId, companyId: company.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
