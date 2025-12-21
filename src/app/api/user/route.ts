import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const hashedPassword = await hashPassword(body.password);

    const result = await prisma.user.create({
      data: {
        ...body,
        password: hashedPassword,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
