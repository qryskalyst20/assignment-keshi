"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSessionStore } from "@/hooks/session";

export default function Home() {
  const router = useRouter();
  const { session } = useSessionStore();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    } else {
      router.push("/auth/login");
    }
  }, [router, session]);
}
