"use client";

import Image from "next/image";
import ANAMUSLIM from "@/public/2a414c5ee1b59d689a334be315d7a8c2.png"
import { GetSession } from "@/lib/session";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

const SessionContext = createContext<
  | {
    session: Admin;
    updateSession: (session: Admin) => void;
  }
  | undefined
>(undefined);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

export const SessionProvider = ({
  children,
}: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Admin>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const pathName = usePathname();

  const router = useRouter();

  const updateSession = (newSession: Admin) => {
    setSession({ ...newSession });
    console.log("session: ", session);
  };

  useEffect(() => {
    (async () => {
      const userSession = await GetSession();
      if (userSession) {
        //@ts-ignore
        setSession({ ...userSession });
        if (pathName === "/auth/login" || pathName === "/auth/register") {
          router.push("/dashboard");
        }
      } else {
        if (pathName !== "/auth/login" && pathName !== "/auth/register") {
          router.push("/auth/login");
        }
        setSession(undefined);
      }

      setIsLoading(false);
    })();
  }, [pathName, router]);

  return isLoading ? (
    <main className="w-screen min-h-screen flex flex-col gap-2 items-center justify-center bg-zinc-900">
      <Image src={ANAMUSLIM} alt="anamuslim" width={200} height={200} />
      <p className="text-white font-bold text-3xl">
        ANA MUSLIM
      </p>
    </main>
  ) : (
    //@ts-ignore
    <SessionContext.Provider value={{ session, updateSession }}>
      {children}
    </SessionContext.Provider>
  );
};
