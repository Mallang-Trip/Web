"use client";

import { ChevronDown } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

interface HeroSectionProps {
  titleLines: string[];
  subtitleLines: string[];
  backgroundImage?: string;
  videoSrc?: string;
}

export default function HeroSection({
  titleLines,
  subtitleLines,
  backgroundImage,
  videoSrc,
}: HeroSectionProps) {
  const { lang } = useTranslation();
  const brandText =
    lang === "ko" ? "술차오름 근교 by Mallangtrip" : "POURTAL by Mallangtrip";

  return (
    <section className="relative flex min-h-screen items-center justify-center text-white">
      {videoSrc ? (
        <>
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(15,20,25,0.4),rgba(15,20,25,0.6))]" />
        </>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(15,20,25,0.4), rgba(15,20,25,0.6)), url('${backgroundImage ?? ""}')`,
          }}
        />
      )}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <span className="mb-6 inline-block border border-amber-400 px-6 py-2 text-sm tracking-[0.3em] text-amber-300">
          {brandText}
        </span>
        <h1 className="mb-4 text-4xl font-light md:text-6xl">
          {titleLines.map((line, idx) => (
            <span
              key={idx}
              className={idx === 1 ? "text-amber-400" : undefined}
            >
              {idx > 0 ? <br /> : null}
              {line}
            </span>
          ))}
        </h1>
        <p className="text-amber-200 md:text-lg">
          {subtitleLines.map((line, idx) => (
            <span key={idx}>
              {idx > 0 ? <br /> : null}
              {line}
            </span>
          ))}
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
