import { ChevronDown } from "lucide-react";

interface HeroSectionProps {
  title: string;
  description: string;
  image: string;
}

export default function HeroSection({
  title,
  description,
  image,
}: HeroSectionProps) {
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
        <h1 className="mb-6 text-4xl font-bold md:text-6xl">{title}</h1>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed md:text-xl">
          {description}
        </p>
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
