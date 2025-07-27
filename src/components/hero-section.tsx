import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative flex h-screen items-center justify-center text-white">
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1579169825453-8d4b4653cc2c?q=80&w=1440')`,
        }}
      />

      {/* 컨텐츠 */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <h1 className="mb-6 text-4xl font-bold md:text-6xl">
          제주도 택시 투어 9시간 19만원
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed md:text-xl">
          내가 원하는 코스, 친절한 기사님과 함께 제주의 모든 것을 경험하세요.
        </p>
      </div>

      {/* 스크롤 다운 아이콘 */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 transform">
        <div className="flex flex-col items-center">
          <div className="animate-bounce">
            <ChevronDown className="h-8 w-8 text-white opacity-80" />
          </div>
        </div>
      </div>
    </section>
  );
}
