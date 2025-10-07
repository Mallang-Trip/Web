import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative flex h-screen items-center justify-center text-white">
      {/* 배경 이미지 */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/tour-images/sinabro/hero-video.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,20,25,0.4),rgba(15,20,25,0.6))]" />

      {/* 컨텐츠 */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <Image
          src="/tour-images/brewery_logo.png"
          alt="찾아가는 양조장"
          width={300}
          height={200}
          className="mx-auto mb-4 rounded-lg"
          style={{ width: "auto", height: "auto" }}
        />
        <Badge
          variant="secondary"
          className="mb-4 border-none bg-emerald-500/90 text-white"
        >
          교통 포함 프라이빗 와이너리 체험
        </Badge>

        <h1 className="mb-6 text-5xl font-bold md:text-6xl">
          시나브로 와이너리 프라이빗 체험
        </h1>

        <p className="mb-8 text-xl text-gray-200 md:text-2xl">
          계절별 특별 체험과 수상작 와인, 집같은 따뜻함이 있는
          <br />
          우리 그룹만을 위한 가장 프라이빗한 와인 체험을 만나보세요.
        </p>

        <div className="inline-block rounded-lg bg-white/10 px-6 py-3 backdrop-blur-sm">
          <p className="text-emerald-300">
            아시아·베를린 와인트로피 수상 | 한국농수산식품공사 공식 협력
            와이너리
          </p>
        </div>
      </div>

      {/* 스크롤 다운 아이콘 */}
      <div className="absolute bottom-12 left-1/2 z-10 -translate-x-1/2 transform">
        <div className="flex flex-col items-center">
          <div className="animate-bounce">
            <ChevronDown className="h-8 w-8 text-white opacity-80" />
          </div>
        </div>
      </div>
    </section>
  );
}
