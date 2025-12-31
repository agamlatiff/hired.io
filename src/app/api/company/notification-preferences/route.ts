import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET - Get notification preferences for current company
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get or create notification preferences
    let preferences = await prisma.notificationPreference.findUnique({
      where: { companyId: session.user.id },
    });

    // If no preferences exist, create default ones
    if (!preferences) {
      preferences = await prisma.notificationPreference.create({
        data: {
          companyId: session.user.id,
          newApplicantAlert: true,
          interviewReminders: true,
          weeklyPerformanceReport: true,
          marketingUpdates: false,
        },
      });
    }

    return NextResponse.json(preferences);
  } catch (error) {
    console.error("Error fetching notification preferences:", error);
    return NextResponse.json(
      { error: "Failed to fetch notification preferences" },
      { status: 500 }
    );
  }
}

// PATCH - Update notification preferences
export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Validate and extract preference fields
    const {
      newApplicantAlert,
      interviewReminders,
      weeklyPerformanceReport,
      marketingUpdates,
    } = body;

    const updateData: Record<string, boolean> = {};

    if (typeof newApplicantAlert === "boolean") {
      updateData.newApplicantAlert = newApplicantAlert;
    }
    if (typeof interviewReminders === "boolean") {
      updateData.interviewReminders = interviewReminders;
    }
    if (typeof weeklyPerformanceReport === "boolean") {
      updateData.weeklyPerformanceReport = weeklyPerformanceReport;
    }
    if (typeof marketingUpdates === "boolean") {
      updateData.marketingUpdates = marketingUpdates;
    }

    // Upsert preferences
    const preferences = await prisma.notificationPreference.upsert({
      where: { companyId: session.user.id },
      update: updateData,
      create: {
        companyId: session.user.id,
        newApplicantAlert: newApplicantAlert ?? true,
        interviewReminders: interviewReminders ?? true,
        weeklyPerformanceReport: weeklyPerformanceReport ?? true,
        marketingUpdates: marketingUpdates ?? false,
      },
    });

    return NextResponse.json(preferences);
  } catch (error) {
    console.error("Error updating notification preferences:", error);
    return NextResponse.json(
      { error: "Failed to update notification preferences" },
      { status: 500 }
    );
  }
}
