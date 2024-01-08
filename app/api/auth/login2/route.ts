import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (email === "admin@gmail.com") {
    if (password === "password123") {
      const hashedToken = await bcrypt.hash(email, 10);

      cookies().set({
        name: "sessionToken",
        value: hashedToken as string,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 14,
      });
      return NextResponse.json({ success: true, user: { email } });
    }
  }

  throw new Error("Invalid credentials");
}
