import Link from "next/link";
import { useActiveAccount } from "thirdweb/react";
import SignInButton from "./buttoncomponents/SignInButton";
export default function PleaseRegister() {
  const account = useActiveAccount();
  return (
    <div className="flex items-center justify-center rounded-lg w-full h-[300px] bg-slate-700">
      {account ? (
        <div className="flex flex-col gap-2 items-center justify-center">
          <div>
            <h1 className="font-bold text-[24px]">Access Denied.</h1>
            <p className="text-[16px]">
              Please Register to access all features
            </p>
          </div>
          <div>
            <Link href="/Register">
              <div className="bg-neutral-950 text-white rounded-2xl w-[100px] h-[45px]">
                Register
              </div>
            </Link>
          </div>{" "}
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2 items-center justify-center">
            <h1>Please Sign In to access feature</h1>
            <SignInButton />
          </div>
        </>
      )}
    </div>
  );
}
