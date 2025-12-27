import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const company = await prisma.company.findUnique({ where: { email: session.user.email }, select: { id: true } });
    if (!company) return NextResponse.json({ error: "Company not found" }, { status: 404 });

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "jobs";

    let csvContent = "";
    let filename = "";

    if (type === "jobs") {
      const jobs = await prisma.job.findMany({
        where: { companyId: company.id },
        select: {
          id: true, roles: true, department: true, location: true, jobType: true,
          salaryFrom: true, salaryTo: true, currency: true, status: true, views: true,
          applicants: true, datePosted: true, dueDate: true,
        },
        orderBy: { datePosted: "desc" },
      });

      csvContent = "ID,Role,Department,Location,Type,Salary From,Salary To,Currency,Status,Views,Applicants,Posted Date,Due Date\n";
      jobs.forEach((job) => {
        csvContent += `"${job.id}","${job.roles}","${job.department || ""}","${job.location || ""}","${job.jobType}","${job.salaryFrom}","${job.salaryTo}","${job.currency}","${job.status}","${job.views}","${job.applicants}","${job.datePosted.toISOString().split("T")[0]}","${job.dueDate.toISOString().split("T")[0]}"\n`;
      });
      filename = `jobs_export_${new Date().toISOString().split("T")[0]}.csv`;

    } else if (type === "applicants") {
      const applicants = await prisma.applicant.findMany({
        where: { Job: { companyId: company.id } },
        include: {
          user: { select: { name: true, email: true } },
          Job: { select: { roles: true } },
        },
        orderBy: { appliedAt: "desc" },
      });

      csvContent = "ID,Name,Email,Job Role,Status,Previous Job,Phone,LinkedIn,Applied Date,Source\n";
      applicants.forEach((app) => {
        csvContent += `"${app.id}","${app.user?.name || ""}","${app.user?.email || ""}","${app.Job?.roles || ""}","${app.status}","${app.previousJobTitle}","${app.phone}","${app.linkedin}","${app.appliedAt.toISOString().split("T")[0]}","${app.source || "Direct"}"\n`;
      });
      filename = `applicants_export_${new Date().toISOString().split("T")[0]}.csv`;

    } else {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    return new Response(csvContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Error exporting:", error);
    return NextResponse.json({ error: "Failed to export" }, { status: 500 });
  }
}
