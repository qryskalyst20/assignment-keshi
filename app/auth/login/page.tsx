import Image from "next/image";
import BG from "@/public/WhatsApp Image 2024-01-05 at 11.30.01 PM.jpeg";
import LoginForm from "@/components/login-form";

const Page = () => {
  return (
    <main className="w-full relative flex items-center justify-center flex-row bg-neutral min-h-screen bg-neutral-50">
      <LoginForm />
      <div className="bg-zinc-950/60 w-screen h-screen absolute" />
      <Image src={BG} alt="anamuslim" fill className="bg-cover absolute" />
    </main>
  );
};

export default Page;
