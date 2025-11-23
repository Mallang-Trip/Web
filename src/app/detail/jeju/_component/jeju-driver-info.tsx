"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Camera,
  Award,
  Shield,
  Wifi,
  Battery,
  Droplet,
  Video,
  Baby,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "@/hooks/use-translation";

interface LightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

function ImageLightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
      onClick={onClose}
    >
      {/* 닫기 버튼 */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
        aria-label="닫기"
      >
        <X className="h-6 w-6" />
      </button>

      {/* 이전 버튼 */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
        aria-label="이전 이미지"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>

      {/* 이미지 */}
      <div
        className="relative h-[80vh] w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[currentIndex]}
          alt={`이미지 ${currentIndex + 1}`}
          fill
          className="object-contain"
          sizes="90vw"
          priority
        />
      </div>

      {/* 다음 버튼 */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
        aria-label="다음 이미지"
      >
        <ChevronRight className="h-8 w-8" />
      </button>

      {/* 이미지 카운터 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-sm text-white">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}

export default function JejuDriverInfo() {
  const { t } = useTranslation();
  const tData = t.jeju?.driverInfo || {};

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % lightboxImages.length);
  };

  const prevImage = () => {
    setLightboxIndex(
      (prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length
    );
  };

  const driverGalleryImages = Array.from(
    { length: 20 },
    (_, index) =>
      `/tour-images/jeju/driver/gallery/${(index + 1).toString().padStart(2, "0")}.jpg`,
  );

  const taxiExteriorImages = Array.from(
    { length: 6 },
    (_, index) =>
      `/tour-images/jeju/driver/taxi-exterior/${(index + 1).toString().padStart(2, "0")}.jpg`,
  );

  const taxiInteriorImages = Array.from(
    { length: 8 },
    (_, index) =>
      `/tour-images/jeju/driver/taxi-interior/${(index + 1).toString().padStart(2, "0")}.jpg`,
  );

  const driverFeatures = [
    {
      icon: Shield,
      text: tData.features?.veteranDriver || "30년 무사고 경력의 베테랑 드라이버",
    },
    {
      icon: Award,
      text: tData.features?.modelDriver || "제주도 모범운전자회 소속",
    },
    {
      icon: Camera,
      text:
        tData.features?.photographer ||
        "전국사진촬영대회 금상 수상 경력의 전문 포토그래퍼",
    },
    {
      icon: Camera,
      text:
        tData.features?.droneCamera ||
        "드론 카메라 보유, 항공샷 인생사진 촬영 가능",
    },
    {
      icon: Award,
      text:
        tData.features?.translator ||
        "AI 실시간 번역기 휴대 (간단한 외국어 소통 가능)",
    },
  ];

  const amenities = [
    {
      icon: Wifi,
      text: tData.amenities?.wifi || "무료 Wi-Fi 제공",
    },
    {
      icon: Battery,
      text:
        tData.amenities?.charger || "휴대폰 충전기 (C타입, 8핀, 5핀) 구비",
    },
    {
      icon: Droplet,
      text: tData.amenities?.water || "무료 생수 제공",
    },
    {
      icon: Video,
      text:
        tData.amenities?.dashcam || "내/외부 블랙박스 상시 녹화로 안전 보장",
    },
    {
      icon: Baby,
      text:
        tData.amenities?.carSeat ||
        "유아용 카시트 대여 가능 (사전 문의 필수, 현장 결제 50,000원)",
    },
  ];

  return (
    <Card className="bg-white py-20">
      <div className="mx-auto max-w-4xl px-4">
        <CardTitle className="mb-12 text-center text-3xl font-bold md:text-4xl">
          {tData.sectionTitle || "당신과 함께할 드라이버를 소개합니다"}
        </CardTitle>

        <CardContent className="space-y-16 px-0">
          {/* 기사님 프로필 */}
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            <div className="flex-shrink-0">
              <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-blue-500 shadow-lg">
                <Image
                  src="/tour-images/jeju/driver/jeju-driver-profile.jpg"
                  alt={tData.name || "강윤방 기사님"}
                  fill
                  className="object-cover"
                  sizes="192px"
                />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                {tData.name || "강윤방 기사님"}
              </h3>
              <div className="space-y-3">
                {driverFeatures.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <IconComponent className="mt-1 h-5 w-5 flex-shrink-0 text-blue-500" />
                      <p className="text-gray-700">{feature.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 기사님 포토 갤러리 */}
          <div>
            <h3 className="mb-6 text-center text-2xl font-bold text-gray-900">
              {tData.photoGalleryTitle || "강윤방 기사님의 포토 갤러리"}
            </h3>
            <p className="mb-8 text-center text-gray-600">
              {tData.photoGallerySubtitle ||
                "기사님이 직접 촬영한 제주의 아름다운 순간들"}
            </p>
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
                {driverGalleryImages.map((image, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <Card className="border-0 py-0 shadow-lg">
                      <CardContent className="p-0">
                        <div
                          className="relative aspect-square cursor-pointer overflow-hidden rounded-lg"
                          onClick={() =>
                            openLightbox(driverGalleryImages, index)
                          }
                        >
                          <Image
                            src={image}
                            alt={`기사님 촬영 사진 ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 border-0 bg-white/80 shadow-lg hover:bg-white" />
              <CarouselNext className="right-2 border-0 bg-white/80 shadow-lg hover:bg-white" />
            </Carousel>
          </div>

          {/* 차량 정보 */}
          <div>
            <h3 className="mb-6 text-center text-2xl font-bold text-gray-900">
              {tData.vehicleInfoTitle || "차량 정보"}
            </h3>
            <div className="mb-8 rounded-xl border border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100 p-6 text-center">
              <h4 className="mb-2 text-xl font-bold text-gray-900">
                {tData.vehicleModel || "현대 아이오닉 5"}
              </h4>
              <p className="text-gray-700">
                {tData.vehicleDescription || "넓고 쾌적한 실내, 조용한 승차감"}
              </p>
            </div>

            {/* 차량 외부 */}
            <div className="mb-8">
              <h4 className="mb-4 text-lg font-semibold text-gray-900">
                {tData.vehicleExterior || "차량 외부"}
              </h4>
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
                  {taxiExteriorImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <Card className="border-0 shadow-lg">
                        <CardContent className="p-0">
                          <div
                            className="relative aspect-[16/9] cursor-pointer overflow-hidden rounded-lg"
                            onClick={() =>
                              openLightbox(taxiExteriorImages, index)
                            }
                          >
                            <Image
                              src={image}
                              alt={`차량 외부 ${index + 1}`}
                              fill
                              className="object-cover transition-transform duration-300 hover:scale-105"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 95vw, 1280px"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4 border-0 bg-white/80 shadow-lg hover:bg-white" />
                <CarouselNext className="right-4 border-0 bg-white/80 shadow-lg hover:bg-white" />
              </Carousel>
            </div>

            {/* 차량 내부 */}
            <div>
              <h4 className="mb-4 text-lg font-semibold text-gray-900">
                {tData.vehicleInterior || "차량 내부"}
              </h4>
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
                  {taxiInteriorImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <Card className="border-0 shadow-lg">
                        <CardContent className="p-0">
                          <div
                            className="relative aspect-[16/9] cursor-pointer overflow-hidden rounded-lg"
                            onClick={() =>
                              openLightbox(taxiInteriorImages, index)
                            }
                          >
                            <Image
                              src={image}
                              alt={`차량 내부 ${index + 1}`}
                              fill
                              className="object-cover transition-transform duration-300 hover:scale-105"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 95vw, 1280px"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4 border-0 bg-white/80 shadow-lg hover:bg-white" />
                <CarouselNext className="right-4 border-0 bg-white/80 shadow-lg hover:bg-white" />
              </Carousel>
            </div>
          </div>

          {/* 편의시설 및 안전사항 */}
          <div>
            <h3 className="mb-6 text-center text-2xl font-bold text-gray-900">
              {tData.amenitiesTitle || "편의시설 및 안전사항"}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {amenities.map((amenity, index) => {
                const IconComponent = amenity.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <IconComponent className="mt-1 h-5 w-5 flex-shrink-0 text-blue-500" />
                    <p className="text-sm text-gray-700">{amenity.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </div>

      {/* 라이트박스 */}
      {lightboxOpen && (
        <ImageLightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </Card>
  );
}
