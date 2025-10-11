"use client";

import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useTranslation } from "@/hooks/use-translation";

const galleryImages = [
  {
    url: "https://images.unsplash.com/photo-1667971286475-8ae561e26a9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGtvcmVhbiUyMGRpc3RpbGxlcnklMjBzb2p1fGVufDF8fHx8MTc1ODg5NjQyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    altKey: "imageAlt",
    size: "large",
  },
  {
    url: "https://images.unsplash.com/photo-1689672726829-9bace31c82c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBhbGNvaG9sJTIwdGFzdGluZyUyMGV4cGVyaWVuY2V8ZW58MXx8fHwxNzU4ODkwOTg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    altKey: "imageAlt",
    size: "medium",
  },
  {
    url: "https://images.unsplash.com/photo-1615633949535-9dd97e86d795?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGtvcmVhbiUyMGJyZXdlcnklMjBmZXJtZW50YXRpb258ZW58MXx8fHwxNzU4ODk2NDMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    altKey: "imageAlt",
    size: "medium",
  },
  {
    url: "https://images.unsplash.com/photo-1647939572124-abe7801b98f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBhbGNvaG9sJTIwYm90dGxlc3xlbnwxfHx8fDE3NTg4OTY0MzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    altKey: "imageAlt",
    size: "small",
  },
  {
    url: "https://images.unsplash.com/photo-1752555559453-5dcd151b0efb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGFsY29ob2wlMjBtYWtpbmd8ZW58MXx8fHwxNzU4ODk2NDM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    altKey: "imageAlt",
    size: "small",
  },
];

interface GalleryImageProps {
  src: string;
  alt: string;
  className?: string;
  errorText: string;
}

function GalleryImage({
  src,
  alt,
  className = "",
  errorText,
}: GalleryImageProps) {
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
          <span className="text-sm text-gray-500">{errorText}</span>
        </div>
      )}
      <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/30" />
    </div>
  );
}

export default function PhotoGallery() {
  const { t } = useTranslation();

  return (
    <section id="gallery" aria-labelledby="gallery-title">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 id="gallery-title" className="mb-4 text-3xl font-bold">
            {t.jookhwa.gallery.title}
          </h2>
          <p className="text-gray-600">{t.jookhwa.gallery.subtitle}</p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-12 gap-4">
          {/* Large image */}
          <div className="col-span-12 md:col-span-8 lg:col-span-6">
            <div
              className="group cursor-pointer rounded-xl focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none"
              tabIndex={0}
              role="button"
              aria-label={`${t.jookhwa.gallery.imageAlt} ${t.jookhwa.gallery.viewImage}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  // 여기에 이미지 모달 열기 로직 추가 가능
                }
              }}
            >
              <GalleryImage
                src={galleryImages[0].url}
                alt={t.jookhwa.gallery.imageAlt}
                className="h-80 rounded-xl"
                errorText={t.jookhwa.gallery.errorText}
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
                  aria-label={`${t.jookhwa.gallery.imageAlt} ${t.jookhwa.gallery.viewImage}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      // 여기에 이미지 모달 열기 로직 추가 가능
                    }
                  }}
                >
                  <GalleryImage
                    src={image.url}
                    alt={t.jookhwa.gallery.imageAlt}
                    className="h-full rounded-xl"
                    errorText={t.jookhwa.gallery.errorText}
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
                aria-label={`${t.jookhwa.gallery.imageAlt} ${t.jookhwa.gallery.viewImage}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    // 여기에 이미지 모달 열기 로직 추가 가능
                  }
                }}
              >
                <GalleryImage
                  src={image.url}
                  alt={t.jookhwa.gallery.imageAlt}
                  className="h-48 rounded-xl"
                  errorText={t.jookhwa.gallery.errorText}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
