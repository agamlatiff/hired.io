import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET - Fetch user's conversations
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const conversations = await prisma.conversation.findMany({
      where: { userId: user.id },
      include: {
        company: { select: { id: true, name: true, logo: true } },
        messages: { orderBy: { createdAt: "desc" }, take: 1 },
        _count: { select: { messages: { where: { read: false, senderType: "company" } } } },
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(conversations);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
