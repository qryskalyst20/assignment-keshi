"use client";

import { Menu, Transition } from "@headlessui/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { useSession } from "@/providers/SessionProvider";

const ProfileDropdown = () => {

  const { session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch("api/auth/logout", {
      method: "DELETE",
      body: JSON.stringify(session),
    });

    const data = await res.json()

    if (data.success) {
      router.push("/auth/login")
    } else {
      toast.error("Logout Failed")
    }
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="-m-1.5 flex items-center p-1.5">
        <span className="sr-only">Open user menu</span>
        <h1 className="font-bold text-neutral-50">Admin</h1>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          onClick={handleLogout}
          className="absolute cursor-pointer px-3 right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md text-zinc-900 bg-white hover:bg-slate-300 py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
        >
          Log out
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileDropdown;
