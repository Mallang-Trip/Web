import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { XIcon } from "lucide-react";

export interface BreweryInfo {
  id: number;
  number: string;
  name: string;
  tagline: string;
  address?: string;
  story: string;
  experienceTitle: string;
  experienceText: string;
  signatureTitle: string;
  signatureText: string;
  images: string; // e.g. "/tour-images/vip/예산사과와인"
  imagesCount: number; // e.g. 20
}

interface BrewerySectionProps {
  breweries: BreweryInfo[];
}

export default function BrewerySection({ breweries }: BrewerySectionProps) {
  return (
    <>
      {breweries.map((brewery, index) => (
        <BreweryCard key={brewery.id} brewery={brewery} index={index} />
      ))}
    </>
  );
}

function BreweryCard({
  brewery,
  index,
}: {
  brewery: BreweryInfo;
  index: number;
}) {
  const images = Array.from(
    { length: Math.max(0, brewery.imagesCount) },
    (_, i) => {
      const num = String(i + 1).padStart(2, "0");
      return `${brewery.images}/${num}.jpg`;
    },
  );

  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);
  const [lightboxIndex, setLightboxIndex] = React.useState(0);
  const [isLightboxLoading, setIsLightboxLoading] = React.useState(true);

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
    setIsLightboxLoading(true);
    setIsLightboxOpen(true);
  };

  React.useEffect(() => {
    if (!isLightboxOpen) return;
    setIsLightboxLoading(true);
  }, [lightboxIndex, isLightboxOpen]);

  return (
    <Card
      className={`rounded-2xl p-8 ${index % 2 === 0 ? "bg-white" : "bg-gradient-to-r from-slate-50 to-white"}`}
    >
      <CardContent className="mx-auto max-w-5xl p-0">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-amber-400 text-lg text-amber-600">
            {brewery.number}
          </div>
          <h2 className="mb-2 text-3xl font-light text-slate-900">
            {brewery.name}
          </h2>
          <p className="text-lg font-light text-amber-600 italic">
            {brewery.tagline}
          </p>
          {brewery.address && (
            <div className="mt-2 flex items-center justify-center gap-2 text-sm text-slate-600">
              <svg
                className="h-4 w-4 text-amber-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="max-w-[720px] truncate" title={brewery.address}>
                {brewery.address}
              </span>
            </div>
          )}
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <div className="space-y-4">
              {/* 메인 이미지 (01) */}
              <button
                type="button"
                className="relative block aspect-[4/3] w-full overflow-hidden rounded-lg bg-slate-100"
                onClick={() => openLightbox(0)}
                aria-label="메인 이미지 크게 보기"
              >
                {images[0] && (
                  <Image
                    src={images[0]}
                    alt={`${brewery.name} 메인 이미지`}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover"
                    priority={index === 0}
                  />
                )}
              </button>

              {/* 서브 이미지 캐러셀 (02 ~ N) */}
              {images.length > 1 && (
                <Carousel
                  opts={{ align: "start", dragFree: true, skipSnaps: true }}
                  className="w-full"
                >
                  <CarouselContent>
                    {images.slice(1).map((src, i) => (
                      <CarouselItem
                        key={src}
                        className="basis-1/3 sm:basis-1/4 md:basis-1/6"
                      >
                        <button
                          type="button"
                          className="relative block aspect-square w-full overflow-hidden rounded-lg bg-slate-100"
                          onClick={() => openLightbox(i + 1)}
                          aria-label={`서브 이미지 ${i + 2} 크게 보기`}
                        >
                          <Image
                            src={src}
                            alt={`${brewery.name} 이미지 ${i + 2}`}
                            fill
                            sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 16vw"
                            className="object-cover"
                          />
                        </button>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="-left-4" />
                  <CarouselNext className="-right-4" />
                </Carousel>
              )}
            </div>
          </div>

          <div>
            <p className="mb-6 text-lg leading-relaxed font-light text-slate-600">
              {brewery.story}
            </p>

            <div className="mb-6 border-l-4 border-amber-400 bg-white py-4 pl-4">
              <h4 className="mb-2 text-lg font-medium text-slate-900">
                {brewery.experienceTitle}
              </h4>
              <p className="leading-relaxed font-light text-slate-600">
                {brewery.experienceText}
              </p>
            </div>

            <div className="relative overflow-hidden bg-slate-900 p-6">
              <div className="absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400"></div>
              <h4 className="mb-2 text-lg font-medium text-amber-400">
                {brewery.signatureTitle}
              </h4>
              <p className="leading-relaxed font-light text-amber-100">
                {brewery.signatureText}
              </p>
            </div>
          </div>
        </div>
      </CardContent>

      {/* 라이트박스: ESC 또는 X 로 닫기 가능 */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent
          className="border-none bg-transparent p-0 shadow-none sm:max-w-5xl"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">
            {brewery.name} 이미지 보기
          </DialogTitle>
          <DialogDescription className="sr-only">
            확대 보기. ESC 또는 X 버튼으로 닫을 수 있습니다.
          </DialogDescription>
          <div className="relative mx-auto aspect-[4/3] w-full max-w-5xl overflow-hidden rounded-lg bg-black">
            {/* 로딩 스피너 (이미지 뒤 레이어) */}
            {isLightboxLoading && (
              <div className="absolute inset-0 z-[1] flex items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              </div>
            )}

            {images[lightboxIndex] && (
              <Image
                src={images[lightboxIndex]}
                alt={`${brewery.name} 확대 이미지 ${lightboxIndex + 1}`}
                fill
                sizes="100vw"
                className={`object-contain transition-opacity duration-300 ${
                  isLightboxLoading ? "opacity-0" : "opacity-100"
                }`}
                priority
                onLoadingComplete={() => setIsLightboxLoading(false)}
              />
            )}
          </div>
          <DialogClose asChild>
            <button
              type="button"
              aria-label="닫기"
              className="absolute top-3 right-3 z-[60] inline-flex size-10 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg ring-1 ring-black/10 transition hover:bg-white/90 focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
            >
              <XIcon className="size-5" />
            </button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
