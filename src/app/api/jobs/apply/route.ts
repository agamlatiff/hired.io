import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { jobApplySchema } from "@/lib/schema";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const role = session.user.role;
    // Enforce 'user' role
    if (role !== "user") {
      return NextResponse.json({ error: "Only job seekers can apply" }, { status: 403 });
    }

    const rawData = await request.json();

    // Validate input with Zod
    const validation = jobApplySchema.safeParse(rawData);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const validated = validation.data;

    // Create applicant with proper Prisma structure
    const result = await prisma.applicant.create({
      data: {
        userId,
        jobId: validated.jobId,
        coverLetter: validated.coverLetter || "",
        resume: validated.resumeUrl || "",
        phone: validated.phone || "",
        linkedin: validated.linkedIn || "",
        portfolio: validated.portfolio || "",
        previousJobTitle: validated.previousJobTitle || "",
      },
    });

    await prisma.job.update({
      where: {
        id: validated.jobId,
      },
      data: {
        applicants: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error applying to job:", error);
    return NextResponse.json({ error: "Failed to apply" }, { status: 500 });
  }
}

