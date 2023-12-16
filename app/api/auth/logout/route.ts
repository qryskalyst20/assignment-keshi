import { connectPrisma } from "@/lib/prisma";
import client from "@/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const body = await request.json();
  await connectPrisma();
  try {
    console.log("updating user: ", body.id);
    await client.admin.update({
      where: {
        id: body.id,
      },
      data: {
        sessionToken: null,
      },
    });

    cookies().delete("sessionToken");
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false });
  } finally {
    await client.$disconnect();
  }
}
