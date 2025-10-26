"use client";

import HeroSection from "@/app/detail/_component/hero-section";
import FeaturesSection from "@/app/detail/_component/features-section";
import PricingSection from "@/app/detail/_component/pricing-section";
import BookingSidebar from "@/app/detail/_component/booking-sidebar";
import MobileBottomBar from "@/app/detail/_component/mobile-bottom-bar";
import PicturesSection from "@/app/detail/_component/pictures-section";
import { CheckCheck, MapPin, Clock } from "lucide-react";

export default function GangneungDetailPage() {
  const features = [
    {
      icon: CheckCheck,
      title: "100% 자유로운 코스",
      description: "가고 싶은 곳 어디든! 원하는 일정대로 자유롭게 여행하세요.",
    },
    {
      icon: MapPin,
      title: "강릉 경력 20년 현지 기사님",
      description:
        "안전은 기본, 현지 맛집과 숨은 명소 추천까지! 최고의 여행 파트너",
    },
    {
      icon: Clock,
      title: "3일 전 무료 취소",
      description:
        "여행 계획이 변경되어도 걱정 마세요. 위약금 없이 취소 가능합니다.",
    },
  ];

  const images = Array.from({ length: 2 }, (_, index) => index + 1).map(
    (index) =>
      `/tour-images/gangneung/${index.toString().padStart(2, "0")}.jpg`,
  );

  const pricingItems = [
    {
      item: "기본 대절 (7시간)",
      description: "강릉 전지역 / 전용 기사 / 유류비 포함",
      payment: "선결제 (온라인)",
      amount: "₩ 175,000",
    },
    {
      item: "야간 운행",
      description: "18:00 이후 ~ 22:00 이전 종료",
      payment: "현장 카드 결제",
      amount: "+ ₩ 10,000",
    },
    {
      item: "휴식 시간 4시간",
      description: "이용 시간을 잠시 멈추고 기사님과 4시간 후에 뵙기",
      payment: "현장 카드 결제",
      amount: "+ ₩ 30,000",
    },
    {
      item: "시간 추가",
      description: "기본 5시간 초과 시",
      payment: "현장 카드 결제",
      amount: "+ ₩ 20,000 / 시간",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection
        title="강릉 손님 마음대로 투어"
        description="내가 원하는 코스, 친절한 기사님과 함께 강릉의 모든 것을 경험하세요."
        images="https://mallang-trip-db.s3.ap-northeast-2.amazonaws.com/profile/4ddb1918-ab15-4d15-ac1b-b54aa1e30a16%EA%B0%95%EB%A6%89.jpg"
      />

      {/* 메인 콘텐츠 영역 */}
      <div className="mx-auto mb-20 max-w-screen-2xl px-4 py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* 왼쪽: 상품 설명 (2/3 영역) */}
          <div className="w-full lg:w-3/4">
            <div className="space-y-8">
              <FeaturesSection features={features} />
              <PicturesSection images={images} name="강릉" />
              <PricingSection pricingItems={pricingItems} />
            </div>
          </div>

          {/* 오른쪽: 예약 사이드바 (1/3 영역, 데스크톱만) */}
          <div className="hidden lg:block lg:w-1/4">
            <BookingSidebar
              title="강릉 손님 마음대로 투어"
              price="175,000"
              time="7시간"
              subItems={[
                {
                  title: "투어 시간",
                  value: "7시간",
                },
                {
                  title: "포함 사항",
                  value: "기사님, 유류비",
                },
                {
                  title: "취소 정책",
                  value: "3일 전 무료",
                },
              ]}
              destinationId={503}
              disabled={true}
            />
          </div>
        </div>
      </div>

      {/* 모바일용 하단 고정 바 */}
      <MobileBottomBar
        title="강릉 손님 마음대로 투어"
        price="175,000"
        time="7시간"
        destinationId={503}
        disabled={true}
      />
    </div>
  );
}
