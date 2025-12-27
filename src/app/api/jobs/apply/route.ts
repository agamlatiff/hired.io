import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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

    const data = await request.json();

    // Override userId from session
    data.userId = userId;

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
