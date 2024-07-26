import Image from "next/image";
import SignInButton from "@/components/buttoncomponents/SignInButton";
import Hero from "@/components/homepage/Hero";
export default function Home() {
  return (
    <main className="pl-10 pr-10 flex min-h-screen flex-col bg-[#181934] items-center justify-between p-24">
      {/* Hero section */}
      <div className="w-full">
        <Hero />
      </div>
    </main>
  );
}
