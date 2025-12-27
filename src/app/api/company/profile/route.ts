import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const companyId = session.user.id;

    const company = await prisma.company.findUnique({
      where: { id: companyId },
      include: {
        CompanyOverview: true,
        CompanySocialMedia: true,
        CompanyTeam: true,
      },
    });

    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    return NextResponse.json(company);
  } catch (error) {
    console.error("Error fetching company profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch company profile" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const companyId = session.user.id;
    const body = await request.json();

    // Update company basic info
    if (body.name || body.logo || body.plan) {
      await prisma.company.update({
        where: { id: companyId },
        data: {
          name: body.name,
          logo: body.logo,
          plan: body.plan,
        },
      });
    }

    // Update or create company overview
    if (body.overview) {
      const existingOverview = await prisma.companyOverview.findFirst({
        where: { companyId },
      });

      if (existingOverview) {
        await prisma.companyOverview.update({
          where: { id: existingOverview.id },
          data: body.overview,
        });
      } else {
        await prisma.companyOverview.create({
          data: {
            ...body.overview,
            companyId,
          },
        });
      }
    }

    // Update or create company social media
    if (body.socialMedia) {
      const existingSocial = await prisma.companySocialMedia.findFirst({
        where: { companyId },
      });

      if (existingSocial) {
        await prisma.companySocialMedia.update({
          where: { id: existingSocial.id },
          data: body.socialMedia,
        });
      } else {
        await prisma.companySocialMedia.create({
          data: {
            ...body.socialMedia,
            companyId,
          },
        });
      }
    }

    // Return updated company
    const updatedCompany = await prisma.company.findUnique({
      where: { id: companyId },
      include: {
        CompanyOverview: true,
        CompanySocialMedia: true,
        CompanyTeam: true,
      },
    });

    return NextResponse.json(updatedCompany);
  } catch (error) {
    console.error("Error updating company profile:", error);
    return NextResponse.json(
      { error: "Failed to update company profile" },
      { status: 500 }
    );
  }
}
