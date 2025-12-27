import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// GET - Fetch company's conversations
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const company = await prisma.company.findUnique({ where: { email: session.user.email }, select: { id: true } });
    if (!company) return NextResponse.json({ error: "Company not found" }, { status: 404 });

    const conversations = await prisma.conversation.findMany({
      where: { companyId: company.id },
      include: {
        user: { select: { id: true, name: true, email: true, avatar: true } },
        messages: { orderBy: { createdAt: "desc" }, take: 1 },
        _count: { select: { messages: { where: { read: false, senderType: "user" } } } },
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(conversations);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

// POST - Create new conversation or get existing
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const company = await prisma.company.findUnique({ where: { email: session.user.email }, select: { id: true } });
    if (!company) return NextResponse.json({ error: "Company not found" }, { status: 404 });

    const { userId, jobId } = await request.json();
    if (!userId) return NextResponse.json({ error: "User ID required" }, { status: 400 });

    const conversation = await prisma.conversation.upsert({
      where: { companyId_userId: { companyId: company.id, userId } },
      create: { companyId: company.id, userId, jobId },
      update: { updatedAt: new Date() },
      include: { user: { select: { id: true, name: true, avatar: true } } },
    });

    return NextResponse.json(conversation);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
