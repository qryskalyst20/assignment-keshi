import { NextRequest, NextResponse } from "next/server";
import { connectPrisma } from "@/lib/prisma";
import client from "@/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  await connectPrisma();
  const { email, password } = await request.json();
  const user = await client.admin.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("Invalid credentials");
  }

  const hashedToken = await bcrypt.hash(email, 10);

  try {
    await client.admin.update({
      where: {
        id: user.id,
      },
      data: {
        sessionToken: hashedToken as string,
      },
    });

    cookies().set({
      name: "sessionToken",
      value: hashedToken as string,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 14,
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    throw new Error(error as string);
  } finally {
    await client.$disconnect();
  }
}
