import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// GET - Fetch messages in a conversation
export async function GET(request: Request, { params }: { params: Promise<{ conversationId: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const company = await prisma.company.findUnique({ where: { email: session.user.email }, select: { id: true } });
    if (!company) return NextResponse.json({ error: "Company not found" }, { status: 404 });

    const { conversationId } = await params;

    // Verify conversation belongs to company
    const conversation = await prisma.conversation.findFirst({
      where: { id: conversationId, companyId: company.id },
      include: { user: { select: { id: true, name: true, avatar: true } } },
    });

    if (!conversation) return NextResponse.json({ error: "Conversation not found" }, { status: 404 });

    // Mark messages as read
    await prisma.message.updateMany({
      where: { conversationId, senderType: "user", read: false },
      data: { read: true },
    });

    const messages = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ conversation, messages });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

// POST - Send a message
export async function POST(request: Request, { params }: { params: Promise<{ conversationId: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const company = await prisma.company.findUnique({ where: { email: session.user.email }, select: { id: true } });
    if (!company) return NextResponse.json({ error: "Company not found" }, { status: 404 });

    const { conversationId } = await params;
    const { content } = await request.json();

    if (!content?.trim()) return NextResponse.json({ error: "Message required" }, { status: 400 });

    // Verify conversation belongs to company
    const conversation = await prisma.conversation.findFirst({ where: { id: conversationId, companyId: company.id } });
    if (!conversation) return NextResponse.json({ error: "Conversation not found" }, { status: 404 });

    const message = await prisma.message.create({
      data: { conversationId, senderType: "company", senderCompanyId: company.id, content: content.trim() },
    });

    // Update conversation timestamp
    await prisma.conversation.update({ where: { id: conversationId }, data: { updatedAt: new Date() } });

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
