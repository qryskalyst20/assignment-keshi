import Image from "next/image";
import BG from "@/public/WhatsApp Image 2024-01-05 at 11.30.01 PM.jpeg";
import {
  FaHome,
  FaAddressCard,
  FaClipboardList,
  FaCheckSquare,
  FaStar,
  FaDoorOpen,
} from "react-icons/fa";

const navigations = [
  {
    name: "Home",
    icon: <FaHome />,
    href: "/dashboard",
  },
  {
    name: "Profile",
    icon: <FaAddressCard />,
    href: "/dashboard/profile",
  },
  {
    name: "Todo",
    icon: <FaClipboardList />,
    href: "/dashboard/todo",
  },
  {
    name: "Done",
    icon: <FaCheckSquare />,
    href: "/dashboard/done",
  },
  {
    name: "Starred",
    icon: <FaStar />,
    href: "/dashboard/starred",
  },
  {
    name: "Logout",
    icon: <FaDoorOpen />,
    href: "/auth/logout",
  },
];

const AuthorizedLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="w-screen h-screen relative  flex items-center justify-center p-10">
      <Image src={BG} alt="bg" fill className="bg-cover absolute -z-10" />
      <div className="w-full h-full flex items-center justify-center bg-gray-200 p-10 rounded-[100px] border border-solid border-black">
        <div className="w-full h-full flex flex-row items-center justify-center bg-white p-5 pb-10 rounded-[100px]">
          <div className="flex flex-col gap-5 bg-gray-200 rounded-[100px] p-5 ">
            {navigations.map((nav) => (
              <a
                key={nav.name}
                href={nav.href}
                className="flex items-center justify-center w-14 h-14 text-2xl text-black bg-gray-300 rounded-full hover:text-gray-500"
              >
                {nav.icon}
              </a>
            ))}
          </div>
          <div className="w-full h-full px-10 ">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthorizedLayout;
