"use client";

import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useTranslation } from "@/hooks/use-translation";
import { useEffect, useState } from "react";

interface HeroSectionProps {
  images: string | string[];
}

export default function HeroSection({ images }: HeroSectionProps) {
  const { t } = useTranslation();

  const imageArray = Array.isArray(images) ? images : [images];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (imageArray.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageArray.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [imageArray.length]);

  return (
    <section className="relative flex h-screen items-center justify-center text-white">
      {/* 배경 이미지 캐러셀 */}
      {imageArray.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${image}')`,
          }}
        />
      ))}

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
          {t.jookhwa.hero.badge}
        </Badge>

        <h1 className="mb-6 text-5xl font-bold md:text-6xl">
          {t.jookhwa.hero.title}
        </h1>

        <p className="mb-8 text-xl whitespace-pre-line text-gray-200 md:text-2xl">
          {t.jookhwa.hero.subtitle}
        </p>

        <div className="inline-block rounded-lg bg-white/10 px-6 py-3 backdrop-blur-sm">
          <p className="text-emerald-300">{t.jookhwa.hero.certification}</p>
          <Image
            src="/tour-images/jookhwa/korea-agro-fisheries.svg"
            alt="한국농수산식품공사"
            width={80}
            height={40}
            className="mx-auto mt-3 flex-shrink-0"
            style={{ width: "auto", height: "24px" }}
          />
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
