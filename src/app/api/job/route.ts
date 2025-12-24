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

    const companyId = (session.user as any).id;
    const data = await request.json();

    // Create job with company ID and defaults
    const result = await prisma.job.create({
      data: {
        ...data,
        companyId,
        applicants: 0,
        views: 0,
        status: data.status || "draft",
        currency: data.currency || "USD",
      },
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
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}