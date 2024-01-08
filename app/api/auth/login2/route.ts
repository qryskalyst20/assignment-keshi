import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (email === "admin@gmail.com") {
    if (password === "password123") {
      return NextResponse.json({ success: true, user: { email } });
    }
  }

  throw new Error("Invalid credentials");
}
