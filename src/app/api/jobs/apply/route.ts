import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const result = await prisma.applicant.create({
      data,
    });

    await prisma.job.update({
      where: {
        id: data.jobId,
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
