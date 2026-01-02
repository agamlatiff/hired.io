import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // No auth check needed for public salary data
    // const session = await getServerSession(authOptions);

    const jobs = await prisma.job.findMany({
      where: {
        status: "published", // Only published jobs
      },
      orderBy: {
        datePosted: "desc",
      },
      include: {
        CategoryJob: true,
      },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
