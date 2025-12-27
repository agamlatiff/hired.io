import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const companyId = session.user.id;
    const role = session.user.role;

    if (role !== "company") {
      return NextResponse.json({ error: "Only companies can post jobs" }, { status: 403 });
    }
    const data = await request.json();

    // Transform data for Prisma
    const jobData = {
      roles: data.roles,
      description: data.description || "",
      responsibility: data.responsibility || "",
      whoYouAre: data.whoYouAre || "",
      niceToHaves: data.niceToHaves || "",
      dueDate: new Date(data.dueDate), // Convert string to Date
      jobType: data.jobType || "Remote",
      salaryFrom: data.salaryFrom?.toString() || "0",
      salaryTo: data.salaryTo?.toString() || "0",
      requiredSkills: data.requiredSkills || [],
      benefits: data.benefits || [],
      needs: parseInt(data.needs) || 1, // Convert to integer
      department: data.department || null,
      location: data.location || null,
      experienceLevel: data.experienceLevel || null,
      companyId,
      applicants: 0,
      views: 0,
      status: data.status || "draft",
      currency: data.currency || "USD",
    };

    // Create job
    const result = await prisma.job.create({
      data: jobData,
    });

    // Create activity log
    await prisma.activity.create({
      data: {
        companyId,
        type: "job_created",
        message: `New job posted: ${data.roles}`,
        targetId: result.id,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { error: "Failed to create job", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
