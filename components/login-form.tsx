"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ANAMUSLIM from "@/public/2a414c5ee1b59d689a334be315d7a8c2.png";
import Image from "next/image";
import { useSessionStore } from "@/hooks/session";
import { useMutation } from "@tanstack/react-query";

const LoginForm = () => {
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });

  const { session, setSession } = useSessionStore();

  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: async () =>
      await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credential),
      }),
    onSuccess: async (data) => {
      const res = await data.json();
      setSession(res.user);
      router.replace("/dashboard");
    },
    onError: () => {
      toast.error("Login Failed");
    },
  });

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    toast.promise(loginMutation.mutateAsync(), {
      loading: "Loading...",
      success: "Login Success",
      error: "Login Failed",
    });
  };
  return (
    <div className="z-10 flex flex-row bg-white rounded-[100px] overflow-hidden border border-solid border-black">
      <div className="flex-1 flex flex-col items-center justify-center p-24 w-[1000px]">
        <div className="flex flex-col items-center justify-center">
          <Image src={ANAMUSLIM} alt="anamuslim" width={100} height={100} />
          <h1 className="text-zinc-900 text-5xl font-bold text-center">
            Welcome Back
          </h1>
        </div>
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <input
            className="w-80 h-12 rounded-xl border-2 border-zinc-900 text-zinc-900 outline-none px-4 py-2 mt-4"
            type="email"
            placeholder="Email Address"
            onChange={(e) =>
              setCredential({ ...credential, email: e.target.value })
            }
          />
          <input
            className="w-80 h-12 rounded-xl border-2 border-zinc-900 text-zinc-900 outline-none px-4 py-2 mt-4"
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setCredential({ ...credential, password: e.target.value })
            }
          />
          <button
            onClick={handleSubmit}
            type="submit"
            disabled={loginMutation.isPending}
            className="w-80 h-12 rounded-md border-2 border-black outline-none px-4 py-2 mt-4 bg-gray-200 hover:bg-gray-300 text-black drop-shadow-md font-bold"
          >
            {loginMutation.isPending ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
      <div className="flex-1 bg-gray-200 rounded-l-[100px] " />
    </div>
  );
};

export default LoginForm;
