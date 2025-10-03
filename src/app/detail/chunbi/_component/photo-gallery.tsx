"use client";

import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

const galleryImages = [
  {
    url: "https://images.unsplash.com/photo-1667971286475-8ae561e26a9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBzb2p1JTIwZGlzdGlsbGVyeSUyMHRvdXJ8ZW58MXx8fHwxNzU4ODkwOTg3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "양조장 투어",
    size: "large",
  },
  {
    url: "https://images.unsplash.com/photo-1689672726829-9bace31c82c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBhbGNvaG9sJTIwdGFzdGluZyUyMGV4cGVyaWVuY2V8ZW58MXx8fHwxNzU4ODkwOTg4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "시음 체험",
    size: "medium",
  },
  {
    url: "https://images.unsplash.com/photo-1711472302554-0de6058c6e8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGtvcmVhbiUyMGRpc3RpbGxlcnklMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTg4OTA5ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "증류 시설",
    size: "medium",
  },
  {
    url: "https://images.unsplash.com/photo-1708388064424-e7673d7e5959?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBmb29kJTIwZGluaW5nJTIwZXhwZXJpZW5jZXxlbnwxfHx8fDE3NTg4OTA5ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "전통 음식",
    size: "small",
  },
  {
    url: "https://images.unsplash.com/photo-1694763891594-3b19ad17dec1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGFsY29ob2wlMjBib3R0bGVzfGVufDF8fHx8MTc1ODg5MDk4OHww&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "전통주 컬렉션",
    size: "small",
  },
];

interface GalleryImageProps {
  src: string;
  alt: string;
  className?: string;
}

function GalleryImage({ src, alt, className = "" }: GalleryImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && !hasError && (
        <Skeleton className="absolute inset-0 h-full w-full" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
        className={`object-cover transition-all duration-300 group-hover:scale-105 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
        loading="lazy"
      />
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <span className="text-sm text-gray-500">
            이미지를 불러올 수 없습니다
          </span>
        </div>
      )}
      <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/30" />
    </div>
  );
}

export default function PhotoGallery() {
  return (
    <section id="gallery" aria-labelledby="gallery-title">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 id="gallery-title" className="mb-4 text-3xl font-bold">
            투어 미리보기
          </h2>
          <p className="text-gray-600">
            천비향 프라이빗 투어에서 경험할 수 있는 특별한 순간들
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-12 gap-4">
          {/* Large image */}
          <div className="col-span-12 md:col-span-8 lg:col-span-6">
            <div
              className="group cursor-pointer rounded-xl focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none"
              tabIndex={0}
              role="button"
              aria-label={`${galleryImages[0].alt} 이미지 보기`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  // 여기에 이미지 모달 열기 로직 추가 가능
                }
              }}
            >
              <GalleryImage
                src={galleryImages[0].url}
                alt={galleryImages[0].alt}
                className="h-80 rounded-xl"
              />
            </div>
          </div>

          {/* Medium images */}
          <div className="col-span-12 space-y-4 md:col-span-4 lg:col-span-6">
            <div className="grid h-80 grid-cols-2 gap-4">
              {galleryImages.slice(1, 3).map((image, index) => (
                <div
                  key={index}
                  className="group cursor-pointer rounded-xl focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none"
                  tabIndex={0}
                  role="button"
                  aria-label={`${image.alt} 이미지 보기`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      // 여기에 이미지 모달 열기 로직 추가 가능
                    }
                  }}
                >
                  <GalleryImage
                    src={image.url}
                    alt={image.alt}
                    className="h-full rounded-xl"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Small images */}
          <div className="col-span-12 mt-4 grid grid-cols-2 gap-4">
            {galleryImages.slice(3).map((image, index) => (
              <div
                key={index}
                className="group cursor-pointer rounded-xl focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none"
                tabIndex={0}
                role="button"
                aria-label={`${image.alt} 이미지 보기`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    // 여기에 이미지 모달 열기 로직 추가 가능
                  }
                }}
              >
                <GalleryImage
                  src={image.url}
                  alt={image.alt}
                  className="h-48 rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
