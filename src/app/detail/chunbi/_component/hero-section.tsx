import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HeroSectionProps {
  image: string;
}

export default function HeroSection({ image }: HeroSectionProps) {
  return (
    <section className="relative flex h-screen items-center justify-center text-white">
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${image}')`,
        }}
      />

      {/* 컨텐츠 */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <Badge
          variant="secondary"
          className="mb-4 border-none bg-emerald-500/90 text-white"
        >
          교통 포함 프라이빗 양조장 투어
        </Badge>

        <h1 className="mb-6 text-5xl font-bold md:text-6xl">
          좋은술 천비향 프라이빗 투어
        </h1>

        <p className="mb-8 text-xl text-gray-200 md:text-2xl">
          대통령의 만찬주, 우리 그룹만을 위한 가장 프라이빗한 경험을
          <br />
          가장 편리하게 만나보세요.
        </p>

        <div className="inline-block rounded-lg bg-white/10 px-6 py-3 backdrop-blur-sm">
          <p className="text-emerald-300">
            [찾아가는 양조장] 공식 인증 투어 상품
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
