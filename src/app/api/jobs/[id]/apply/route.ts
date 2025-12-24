import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();

    // Create applicant with all required fields
    const applicant = await prisma.applicant.create({
      data: {
        userId: data.userId,
        jobId: params.id,
        previousJobTitle: data.previousJobTitle || "",
        phone: data.phone || "",
        linkedin: data.linkedin || "",
        portfolio: data.portfolio || "",
        coverLetter: data.coverLetter || "",
        resume: data.resume || "",
        status: "new",
        source: data.source || "direct",
      },
    });

    // Increment applicant count on job
    await prisma.job.update({
      where: { id: params.id },
      data: {
        applicants: {
          increment: 1,
        },
      },
    });

    // Create activity
    const job = await prisma.job.findUnique({
      where: { id: params.id },
      select: { companyId: true, roles: true },
    });

    if (job?.companyId) {
      await prisma.activity.create({
        data: {
          companyId: job.companyId,
          type: "application",
          message: `New application received for ${job.roles}`,
          targetId: applicant.id,
        },
      });
    }

    return NextResponse.json(applicant);
  } catch (error) {
    console.error("[APPLY_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}
