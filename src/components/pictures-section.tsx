"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

const tourImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1440",
    alt: "제주 해안도로 드라이브 풍경",
    title: "아름다운 해안도로",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1579169825453-8d4b4653cc2c?q=80&w=1440",
    alt: "차창 밖으로 보이는 제주 바다",
    title: "차창 밖 파노라마",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1440",
    alt: "성산일출봉 전경",
    title: "성산일출봉의 장관",
  },
];

export default function PicturesSection() {
  return (
    <Card className="bg-white py-20">
      <div className="mx-auto max-w-4xl px-4">
        <CardTitle className="mb-12 text-center text-3xl font-bold md:text-4xl">
          생생한 투어 사진
        </CardTitle>
      </div>

      <CardContent className="relative w-full p-0">
        <div className="mx-auto max-w-4xl px-4">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 3000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {Array.from({ length: 17 }, (_, index) => index + 1).map(
                (index) => (
                  <CarouselItem key={index}>
                    <Card className="border-0 py-0 shadow-lg">
                      <CardContent className="p-0">
                        <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                          <Image
                            src={`/tour-images/${index.toString().padStart(2, "0")}.jpg`}
                            alt={`제주 투어 이미지 ${index}`}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 95vw, 1280px"
                            priority={index === 1}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ),
              )}
            </CarouselContent>

            <CarouselPrevious className="absolute top-1/2 left-4 -translate-y-1/2 border-0 bg-white/80 shadow-lg hover:bg-white" />
            <CarouselNext className="absolute top-1/2 right-4 -translate-y-1/2 border-0 bg-white/80 shadow-lg hover:bg-white" />
          </Carousel>
        </div>

        {/* 하단 설명 텍스트 */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            말랑트립과 함께한 고객님들의 실제 투어 사진입니다. <br />
            아름다운 제주의 모든 순간을 함께 만들어가세요! 📸
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
