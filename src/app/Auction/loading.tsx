import AuctionLoadingCard from "@/components/loading/Auctionloading";
export default function Loading() {
  const loadingCardsCount = 8; // Adjust this count as needed to fill your grid

  return (
    <div className="relative h-full justify-center lg:pl-14 flex items-center lg:pr-16 pt-10 md:pt-5 w-full">
      <div className="grid w-full h-full grid-cols-1 md:grid-cols-4 gap-10 p-4">
        {Array.from({ length: loadingCardsCount }).map((_, index) => (
          <AuctionLoadingCard key={index} />
        ))}
      </div>
    </div>
  );
}
