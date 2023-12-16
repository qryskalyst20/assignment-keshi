"use server";

import client from "@/prisma";
import { connectPrisma } from "./prisma";
import { cookies } from "next/headers";

export async function GetSession() {
  await connectPrisma();
  const hashedToken = cookies().get("sessionToken");

  if (!hashedToken) {
    return null;
  }

  try {
    const user = client.admin.findFirst({
      where: {
        sessionToken: hashedToken?.value,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
}
