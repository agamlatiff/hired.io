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

    const companyId = (session.user as any).id;

    // Get active jobs count
    const activeJobs = await prisma.job.count({
      where: {
        companyId,
        status: "active",
      },
    });

    // Get total applicants count
    const totalApplicants = await prisma.applicant.count({
      where: {
        Job: {
          companyId,
        },
      },
    });

    // Get total job views
    const jobViews = await prisma.jobView.count({
      where: {
        job: {
          companyId,
        },
      },
    });

    // Get pending review applicants (new status)
    const pendingReview = await prisma.applicant.count({
      where: {
        Job: {
          companyId,
        },
        status: "new",
      },
    });

    return NextResponse.json({
      activeJobs,
      totalApplicants,
      jobViews,
      pendingReview,
    });
  } catch (error) {
    console.error("[DASHBOARD_STATS_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
