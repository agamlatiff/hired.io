import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";

const saveJobSchema = z.object({
  jobId: z.string(),
});

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || session.user.role !== "user") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { jobId } = saveJobSchema.parse(body);

    const existingSave = await prisma.savedJob.findUnique({
      where: {
        userId_jobId: {
          userId: session.user.id,
          jobId: jobId,
        },
      },
    });

    if (existingSave) {
      // Unsave
      await prisma.savedJob.delete({
        where: {
          userId_jobId: {
            userId: session.user.id,
            jobId: jobId,
          },
        },
      });

      return NextResponse.json({ saved: false, message: "Job removed from saved" });
    } else {
      // Save
      await prisma.savedJob.create({
        data: {
          userId: session.user.id,
          jobId: jobId,
        },
      });

      return NextResponse.json({ saved: true, message: "Job saved successfully" });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
    }

    console.error("[JOB_SAVE_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
