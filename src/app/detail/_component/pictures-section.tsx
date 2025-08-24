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

interface PicturesSectionProps {
  images: string[];
  name: string;
}

export default function PicturesSection({
  images,
  name,
}: PicturesSectionProps) {
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
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <Card className="border-0 py-0 shadow-lg">
                    <CardContent className="p-0">
                      <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                        <Image
                          src={image}
                          alt={`${name} 이미지 ${index}`}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 95vw, 1280px"
                          priority={index === 1}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="absolute top-1/2 left-4 -translate-y-1/2 border-0 bg-white/80 shadow-lg hover:bg-white" />
            <CarouselNext className="absolute top-1/2 right-4 -translate-y-1/2 border-0 bg-white/80 shadow-lg hover:bg-white" />
          </Carousel>
        </div>
      </CardContent>
    </Card>
  );
}
