import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col bg-[#131418]  items-center justify-center">
      <h2 className="text-2xl text-[#D6D6D6]">Site Under Construction</h2>
      <p className="text-[#D6D6D6]">
        We're working on it. Please check back later!
      </p>
      <div className="mt-4 w-1/2 h-1/2 bg-transparent flex items-center justify-center rounded-[11px] p-[1px] buttonHover">
        <Link href="/" className="w-full h-full">
          <button className="w-full text-[#D6D6D6] rounded-[10px] border-[1px] border-[#262830] hover:border-[0px] hover:bg-[#1B1C22] h-full">
            Return Home
          </button>
        </Link>
      </div>
    </div>
  );
}
