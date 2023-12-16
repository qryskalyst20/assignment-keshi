import { NextRequest, NextResponse } from "next/server";
import { connectPrisma } from "@/lib/prisma";
import client from "@/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  await connectPrisma();
  const { email, password } = await request.json();
  const user = await client.admin.findFirst({
    where: {
      email,
    },
  });

  if (user) {
    return NextResponse.json({ error: "User already exists" }, { status: 401 });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = await client.admin.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ success: true, user: newUser });
}
