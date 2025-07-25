import MallangTripCard from "@/components/mallang-trip-card";
import Image from "next/image";

export default function WaitingPage() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-5 bg-[#f4f4f5]">
      <Image src="/logo.png" width={112} height={27} alt="말랑트립" />
      <MallangTripCard />
    </div>
  );
}
