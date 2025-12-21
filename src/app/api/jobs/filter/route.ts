import type { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const filterCategory =
      searchParams.get("category") !== ""
        ? searchParams.get("category")?.split(",")
        : [];

    const categoryQuery: Prisma.JobWhereInput =
      filterCategory && filterCategory.length > 0
        ? {
          CategoryJob: {
            id: {
              in: filterCategory,
            },
          },
        }
        : {};

    const jobs = await prisma.job.findMany({
      where: { ...categoryQuery },
      include: {
        CategoryJob: true,
        Company: {
          include: {
            CompanyOverview: true,
          },
        },
      },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error filtering jobs:", error);
    return NextResponse.json(
      { error: "Failed to filter jobs" },
      { status: 500 }
    );
  }
}
