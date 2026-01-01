import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const format = searchParams.get("format") || "csv";

    const company = await prisma.company.findUnique({
      where: { email: session.user.email },
      select: { id: true, name: true },
    });

    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    // Get all jobs for this company
    const jobs = await prisma.job.findMany({
      where: { companyId: company.id },
      select: {
        id: true,
        roles: true,
        views: true,
        applicants: true,
        datePosted: true,
        status: true,
        jobType: true,
        salaryFrom: true,
        salaryTo: true,
      },
    });

    const jobIds = jobs.map((j) => j.id);

    // Get applicants with user info
    const applicants = await prisma.applicant.findMany({
      where: { jobId: { in: jobIds } },
      select: {
        id: true,
        status: true,
        appliedAt: true,
        jobId: true,
        source: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    // Calculate summary
    const totalViews = jobs.reduce((acc, j) => acc + j.views, 0);
    const totalApplications = applicants.length;
    const conversionRate = totalViews > 0 ? ((totalApplications / totalViews) * 100).toFixed(2) : "0";

    const statusCounts = applicants.reduce((acc, a) => {
      acc[a.status] = (acc[a.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    if (format === "csv") {
      // Generate CSV
      const csvLines: string[] = [];

      // Header section
      csvLines.push(`Analytics Report for ${company.name}`);
      csvLines.push(`Generated: ${new Date().toISOString()}`);
      csvLines.push("");

      // Summary section
      csvLines.push("SUMMARY");
      csvLines.push(`Total Views,${totalViews}`);
      csvLines.push(`Total Applications,${totalApplications}`);
      csvLines.push(`Conversion Rate,${conversionRate}%`);
      csvLines.push(`Active Jobs,${jobs.filter(j => j.status === "active").length}`);
      csvLines.push("");

      // Status breakdown
      csvLines.push("APPLICATION STATUS BREAKDOWN");
      csvLines.push("Status,Count");
      Object.entries(statusCounts).forEach(([status, count]) => {
        csvLines.push(`${status},${count}`);
      });
      csvLines.push("");

      // Job performance
      csvLines.push("JOB PERFORMANCE");
      csvLines.push("Job Title,Status,Views,Applications,Conversion Rate,Posted Date");
      jobs.forEach((job) => {
        const jobApplicants = applicants.filter((a) => a.jobId === job.id).length;
        const conv = job.views > 0 ? ((jobApplicants / job.views) * 100).toFixed(2) : "0";
        csvLines.push(`"${job.roles}",${job.status},${job.views},${jobApplicants},${conv}%,${job.datePosted.toISOString().split("T")[0]}`);
      });
      csvLines.push("");

      // Applicants list
      csvLines.push("APPLICANTS");
      csvLines.push("Name,Email,Status,Applied Date,Source");
      applicants.forEach((app) => {
        csvLines.push(`"${app.user?.name || "N/A"}","${app.user?.email || "N/A"}",${app.status},${new Date(app.appliedAt).toISOString().split("T")[0]},${app.source || "Direct"}`);
      });

      const csv = csvLines.join("\n");

      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="analytics-${company.name.replace(/\s+/g, "-")}-${new Date().toISOString().split("T")[0]}.csv"`,
        },
      });
    }

    // JSON format (default fallback)
    return NextResponse.json({
      company: company.name,
      generatedAt: new Date().toISOString(),
      summary: {
        totalViews,
        totalApplications,
        conversionRate: `${conversionRate}%`,
        activeJobs: jobs.filter((j) => j.status === "active").length,
      },
      statusBreakdown: statusCounts,
      jobs: jobs.map((job) => ({
        title: job.roles,
        status: job.status,
        views: job.views,
        applications: applicants.filter((a) => a.jobId === job.id).length,
        postedDate: job.datePosted,
      })),
      applicants: applicants.map((app) => ({
        name: app.user?.name,
        email: app.user?.email,
        status: app.status,
        appliedAt: app.appliedAt,
        source: app.source,
      })),
    });
  } catch (error) {
    console.error("Error exporting analytics:", error);
    return NextResponse.json({ error: "Failed to export analytics" }, { status: 500 });
  }
}
