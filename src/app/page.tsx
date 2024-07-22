import Image from "next/image";
import SignInButton from "@/components/buttoncomponents/SignInButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <p className="text-black bg-orange-700"> Hello Daniel </p>
        <SignInButton />
        <br></br>
        <br></br>
      </div>
    </main>
  );
}
