"use client";

import HeroSection from "@/app/detail/_component/hero-section";
import FeaturesSection from "@/app/detail/_component/features-section";
import PricingSection from "@/app/detail/_component/pricing-section";
import ReviewsSection from "@/app/detail/_component/reviews-section";
import PicturesSection from "@/app/detail/_component/pictures-section";
import JejuDriverInfo from "./_component/jeju-driver-info";
import JejuFAQSection from "./_component/jeju-faq-section";
import JejuBookingSidebar from "./_component/jeju-booking-sidebar";
import JejuMobileBottomBar from "./_component/jeju-mobile-bottom-bar";
import { CheckCheck, MapPin, Clock } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export default function JejuDetailPage() {
  const { t, lang } = useTranslation();
  const tData = t.jeju || {};

  // 영어/중국어일 때는 달러 가격 사용
  const isKorean = lang === "ko";
  const currencySymbol = isKorean ? "₩" : "$";

  const features = [
    {
      icon: CheckCheck,
      title: tData.features?.customRoute?.title || "100% 자유로운 코스",
      description:
        tData.features?.customRoute?.description ||
        "가고 싶은 곳 어디든! 원하는 일정대로 자유롭게 여행하세요.",
    },
    {
      icon: MapPin,
      title:
        tData.features?.expertDriver?.title || "제주도 경력 25년 현지 기사님",
      description:
        tData.features?.expertDriver?.description ||
        "안전은 기본, 현지 맛집과 숨은 명소 추천까지! 최고의 여행 파트너",
    },
    {
      icon: Clock,
      title: tData.features?.freeCancellation?.title || "4일 전 무료 취소",
      description:
        tData.features?.freeCancellation?.description ||
        "여행 계획이 변경되어도 걱정 마세요. 위약금 없이 취소 가능합니다.",
    },
  ];

  const heroImages = Array.from({ length: 10 }, (_, index) => index + 1).map(
    (index) =>
      `/tour-images/jeju/hero/${index.toString().padStart(2, "0")}.jpg`,
  );

  const images = Array.from({ length: 17 }, (_, index) => index + 1).map(
    (index) => `/tour-images/jeju/${index.toString().padStart(2, "0")}.jpg`,
  );

  const pricingItems =
    tData.pricing?.items?.map(
      (item: {
        item: string;
        description: string;
        payment: string;
        amount: string;
      }) => ({
        item: item.item,
        description: item.description,
        payment: item.payment,
        amount: item.amount,
      }),
    ) || [];

  const reviews =
    tData.reviews?.items?.map(
      (
        item: { author: string; rating: number; comment: string },
        index: number,
      ) => ({
        image: `/tour-images/jeju/review/${(index + 1).toString().padStart(2, "0")}.jpg`,
        rating: "★".repeat(item.rating || 5),
        author: item.author,
        comment: item.comment,
      }),
    ) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection
        title={tData.hero?.title || "제주도 택시 투어"}
        description={
          tData.hero?.subtitle ||
          "복잡한 렌트카 예약과 낯선 길 찾기는 이제 그만.\n30년 경력의 베테랑 드라이버가 당신만을 위한 최고의 제주를 안내합니다."
        }
        images={heroImages}
      />

      {/* 메인 콘텐츠 영역 */}
      <div className="mx-auto mb-20 max-w-screen-2xl px-4 py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* 왼쪽: 상품 설명 (2/3 영역) */}
          <div className="w-full lg:w-3/4">
            <div className="space-y-8">
              <FeaturesSection features={features} />
              <JejuDriverInfo />
              <PicturesSection
                images={images}
                name={tData.metadata?.title || "제주"}
              />
              <PricingSection pricingItems={pricingItems} />
              <ReviewsSection reviews={reviews} />
              <JejuFAQSection />
            </div>
          </div>

          {/* 오른쪽: 예약 사이드바 (1/3 영역, 데스크톱만) */}
          <div className="hidden lg:block lg:w-1/4">
            <JejuBookingSidebar disabled={false} />
          </div>
        </div>
      </div>

      {/* 모바일용 하단 고정 바 */}
      <JejuMobileBottomBar disabled={false} />
    </div>
  );
}
