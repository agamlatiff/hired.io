import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const applicant = await prisma.applicant.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            headline: true,
            location: true,
            skills: true,
            experience: true,
            education: true,
          },
        },
        Job: {
          include: {
            Company: {
              select: {
                id: true,
                name: true,
                logo: true,
              },
            },
          },
        },
      },
    });

    if (!applicant) {
      return NextResponse.json(
        { error: "Applicant not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(applicant);
  } catch (error) {
    console.error("[APPLICANT_GET_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    const applicant = await prisma.applicant.update({
      where: { id: params.id },
      data,
    });

    // Create activity log for status change
    if (data.status) {
      await prisma.activity.create({
        data: {
          companyId: (session.user as any).id,
          type: "status_change",
          message: `Applicant status changed to ${data.status}`,
          targetId: params.id,
        },
      });
    }

    return NextResponse.json(applicant);
  } catch (error) {
    console.error("[APPLICANT_PATCH_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
