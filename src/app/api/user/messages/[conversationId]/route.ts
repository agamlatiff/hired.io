import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// GET - Fetch messages in a conversation
export async function GET(request: Request, { params }: { params: Promise<{ conversationId: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const { conversationId } = await params;

    const conversation = await prisma.conversation.findFirst({
      where: { id: conversationId, userId: user.id },
      include: { company: { select: { id: true, name: true, logo: true } } },
    });

    if (!conversation) return NextResponse.json({ error: "Conversation not found" }, { status: 404 });

    await prisma.message.updateMany({
      where: { conversationId, senderType: "company", read: false },
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

    const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const { conversationId } = await params;
    const { content } = await request.json();

    if (!content?.trim()) return NextResponse.json({ error: "Message required" }, { status: 400 });

    const conversation = await prisma.conversation.findFirst({ where: { id: conversationId, userId: user.id } });
    if (!conversation) return NextResponse.json({ error: "Conversation not found" }, { status: 404 });

    const message = await prisma.message.create({
      data: { conversationId, senderType: "user", senderUserId: user.id, content: content.trim() },
    });

    await prisma.conversation.update({ where: { id: conversationId }, data: { updatedAt: new Date() } });

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
