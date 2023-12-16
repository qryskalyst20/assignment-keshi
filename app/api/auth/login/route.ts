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

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  return NextResponse.json({ success: true, user });
}
