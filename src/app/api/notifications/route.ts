import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// GET - Fetch notifications
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Try to find as company first, then as user
    const company = await prisma.company.findUnique({ where: { email: session.user.email }, select: { id: true } });
    const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });

    let notifications;
    if (company) {
      notifications = await prisma.notification.findMany({
        where: { companyId: company.id },
        orderBy: { createdAt: "desc" },
        take: 20,
      });
    } else if (user) {
      notifications = await prisma.notification.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
        take: 20,
      });
    } else {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    const unreadCount = notifications.filter((n) => !n.read).length;

    return NextResponse.json({ notifications, unreadCount });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

// PATCH - Mark notification(s) as read
export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { notificationId, markAll } = await request.json();

    const company = await prisma.company.findUnique({ where: { email: session.user.email }, select: { id: true } });
    const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });

    if (markAll) {
      if (company) {
        await prisma.notification.updateMany({ where: { companyId: company.id, read: false }, data: { read: true } });
      } else if (user) {
        await prisma.notification.updateMany({ where: { userId: user.id, read: false }, data: { read: true } });
      }
    } else if (notificationId) {
      await prisma.notification.update({ where: { id: notificationId }, data: { read: true } });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
