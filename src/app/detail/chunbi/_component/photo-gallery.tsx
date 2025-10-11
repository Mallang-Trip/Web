"use client";

import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "@/hooks/use-translation";

interface GalleryImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  errorText: string;
}

function GalleryImage({
  src,
  alt,
  className = "",
  priority = false,
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
        priority={priority}
        loading={priority ? undefined : "lazy"}
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
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const galleryImages = [
    {
      url: "/tour-images/chunbi/01.jpg",
      alt: t.chunbi.gallery.imageAlt,
      size: "large",
    },
    {
      url: "/tour-images/chunbi/02.jpg",
      alt: t.chunbi.gallery.imageAlt,
      size: "medium",
    },
    {
      url: "/tour-images/chunbi/03.jpg",
      alt: t.chunbi.gallery.imageAlt,
      size: "medium",
    },
    {
      url: "/tour-images/chunbi/04.jpg",
      alt: t.chunbi.gallery.imageAlt,
      size: "small",
    },
    {
      url: "/tour-images/chunbi/05.jpg",
      alt: t.chunbi.gallery.imageAlt,
      size: "small",
    },
  ];

  const openImageViewer = (index: number) => {
    setCurrentImageIndex(index);
    setViewerOpen(true);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1,
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1,
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
  };

  return (
    <section id="gallery" aria-labelledby="gallery-title">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 id="gallery-title" className="mb-4 text-3xl font-bold">
            {t.chunbi.gallery.title}
          </h2>
          <p className="text-gray-600">{t.chunbi.gallery.subtitle}</p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-12 gap-4">
          {/* Large image */}
          <div className="col-span-12 md:col-span-8 lg:col-span-6">
            <div
              className="group cursor-pointer rounded-xl focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none"
              tabIndex={0}
              role="button"
              aria-label={`${galleryImages[0].alt} ${t.chunbi.gallery.viewImage}`}
              onClick={() => openImageViewer(0)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openImageViewer(0);
                }
              }}
            >
              <GalleryImage
                src={galleryImages[0].url}
                alt={galleryImages[0].alt}
                className="h-80 rounded-xl"
                priority={true}
                errorText={t.chunbi.gallery.errorText}
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
                  aria-label={`${image.alt} ${t.chunbi.gallery.viewImage}`}
                  onClick={() => openImageViewer(index + 1)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openImageViewer(index + 1);
                    }
                  }}
                >
                  <GalleryImage
                    src={image.url}
                    alt={image.alt}
                    className="h-full rounded-xl"
                    errorText={t.chunbi.gallery.errorText}
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
                aria-label={`${image.alt} ${t.chunbi.gallery.viewImage}`}
                onClick={() => openImageViewer(index + 3)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openImageViewer(index + 3);
                  }
                }}
              >
                <GalleryImage
                  src={image.url}
                  alt={image.alt}
                  className="h-48 rounded-xl"
                  errorText={t.chunbi.gallery.errorText}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 이미지 뷰어 */}
        <Dialog open={viewerOpen} onOpenChange={setViewerOpen}>
          <DialogContent
            className="max-w-[95vw] border-none bg-black/95 p-0 sm:max-w-7xl"
            onKeyDown={handleKeyDown}
            aria-describedby={undefined}
          >
            <DialogTitle className="sr-only">
              {t.chunbi.gallery.galleryTitle}
            </DialogTitle>
            <div className="relative flex h-[85vh] items-center justify-center sm:h-[90vh]">
              <button
                onClick={() => setViewerOpen(false)}
                className="absolute top-4 right-4 z-50 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
              >
                <X className="h-6 w-6" />
              </button>

              <button
                onClick={goToPrevious}
                className="absolute left-4 z-50 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 z-50 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <div className="relative h-full w-full">
                <Image
                  src={galleryImages[currentImageIndex].url}
                  alt={galleryImages[currentImageIndex].alt}
                  fill
                  sizes="(max-width: 640px) 95vw, 90vw"
                  className="object-contain"
                  priority
                />
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm text-white">
                {currentImageIndex + 1} / {galleryImages.length}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
