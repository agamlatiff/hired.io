import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const companyId = session.user.id;

    // Get applicant counts grouped by day for the last 16 days (for chart)
    const sixteenDaysAgo = new Date();
    sixteenDaysAgo.setDate(sixteenDaysAgo.getDate() - 16);

    const applicants = await prisma.applicant.findMany({
      where: {
        Job: {
          companyId,
        },
        appliedAt: {
          gte: sixteenDaysAgo,
        },
      },
      select: {
        appliedAt: true,
        source: true,
      },
    });

    // Aggregate by day for chart bars
    const dailyCounts: Record<string, number> = {};
    for (let i = 15; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const key = date.toISOString().split("T")[0];
      dailyCounts[key] = 0;
    }

    applicants.forEach((app) => {
      const key = app.appliedAt.toISOString().split("T")[0];
      if (dailyCounts[key] !== undefined) {
        dailyCounts[key]++;
      }
    });

    // Convert to array for chart (normalize to percentage of max)
    const counts = Object.values(dailyCounts);
    const maxCount = Math.max(...counts, 1); // avoid division by 0
    const chartBars = counts.map((c) => Math.round((c / maxCount) * 100) || 5); // min 5% for visual

    // Aggregate by source for pie chart
    const sourceCounts: Record<string, number> = {
      direct: 0,
      linkedin: 0,
      referral: 0,
      other: 0,
    };

    applicants.forEach((app) => {
      const source = (app.source || "direct").toLowerCase();
      if (source.includes("linkedin")) {
        sourceCounts.linkedin++;
      } else if (source.includes("referral")) {
        sourceCounts.referral++;
      } else if (source === "direct" || source === "") {
        sourceCounts.direct++;
      } else {
        sourceCounts.other++;
      }
    });

    const total = Object.values(sourceCounts).reduce((a, b) => a + b, 0) || 1;
    const candidateSources = {
      direct: Math.round((sourceCounts.direct / total) * 100),
      linkedin: Math.round((sourceCounts.linkedin / total) * 100),
      referral: Math.round((sourceCounts.referral / total) * 100),
      other: Math.round((sourceCounts.other / total) * 100),
    };

    return NextResponse.json({
      chartBars,
      candidateSources,
    });
  } catch (error) {
    console.error("[DASHBOARD_CHART_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
