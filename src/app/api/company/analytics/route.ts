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

    // Get all jobs for this company
    const jobs = await prisma.job.findMany({
      where: { companyId: company.id },
      select: { id: true, roles: true, views: true, applicants: true, datePosted: true, status: true },
    });

    const jobIds = jobs.map((j) => j.id);

    // Get applicants with their status and application date
    const applicants = await prisma.applicant.findMany({
      where: { jobId: { in: jobIds } },
      select: { id: true, status: true, appliedAt: true, jobId: true, source: true },
    });

    // Get job views for trend data
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const jobViews = await prisma.jobView.findMany({
      where: { jobId: { in: jobIds }, viewedAt: { gte: thirtyDaysAgo } },
      select: { viewedAt: true, source: true },
    });

    // Calculate metrics
    const totalViews = jobs.reduce((acc, j) => acc + j.views, 0);
    const totalApplications = applicants.length;
    const conversionRate = totalViews > 0 ? ((totalApplications / totalViews) * 100).toFixed(1) : 0;

    // Status breakdown
    const statusCounts = applicants.reduce((acc, a) => {
      acc[a.status] = (acc[a.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Hired count for time-to-hire
    const hiredApplicants = applicants.filter((a) => a.status === "hired");

    // Source breakdown
    const sourceCounts = applicants.reduce((acc, a) => {
      const source = a.source || "Direct";
      acc[source] = (acc[source] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Views by day (last 30 days)
    const viewsByDay = jobViews.reduce((acc, v) => {
      const day = v.viewedAt.toISOString().split("T")[0];
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Applications by day (last 30 days)
    const recentApplications = applicants.filter((a) => new Date(a.appliedAt) >= thirtyDaysAgo);
    const applicationsByDay = recentApplications.reduce((acc, a) => {
      const day = new Date(a.appliedAt).toISOString().split("T")[0];
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Job performance
    const jobPerformance = jobs.map((job) => {
      const jobApplicants = applicants.filter((a) => a.jobId === job.id);
      return {
        id: job.id,
        title: job.roles,
        views: job.views,
        applications: jobApplicants.length,
        conversion: job.views > 0 ? ((jobApplicants.length / job.views) * 100).toFixed(1) : 0,
        status: job.status,
      };
    }).sort((a, b) => b.applications - a.applications);

    return NextResponse.json({
      overview: {
        totalViews,
        totalApplications,
        conversionRate,
        activeJobs: jobs.filter((j) => j.status === "active").length,
        hiredCount: hiredApplicants.length,
      },
      statusBreakdown: statusCounts,
      sourceBreakdown: sourceCounts,
      trends: { viewsByDay, applicationsByDay },
      jobPerformance: jobPerformance.slice(0, 10),
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
