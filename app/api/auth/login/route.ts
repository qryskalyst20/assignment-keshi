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
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const hashedToken = await bcrypt.hash(email, 10);

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
}
