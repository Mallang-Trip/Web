"use client";

import { useState } from "react";
import BookingSidebar from "@/app/detail/_component/booking-sidebar";
import MobileBottomBar from "@/app/detail/_component/mobile-bottom-bar";
import HeroSection from "./_component/hero-section";
import FeaturesSection from "./_component/features-section";
import BrewerySection from "./_component/brewery-section";
import Timeline from "./_component/time-line";
import PricingTable from "./_component/pricing-table";
import FAQSection from "./_component/faq-section";
import CTASection from "./_component/cta-section";
import PickupDropoffAreasSection from "../_component/pickup-dropoff-areas";
import { Car, ShieldCheck, Gift } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { formatPrice } from "@/utils/currency";

export default function YeongdongDetailPage() {
  const { t, lang } = useTranslation();
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setSelectedFaq(selectedFaq === index ? null : index);
  };

  const breweries = [
    {
      id: 1,
      number: t.yeongdong.breweries.sinabro.number,
      name: t.yeongdong.breweries.sinabro.name,
      tagline: t.yeongdong.breweries.sinabro.tagline,
      story: t.yeongdong.breweries.sinabro.story,
      experienceTitle: t.yeongdong.breweries.sinabro.experienceTitle,
      experienceText: t.yeongdong.breweries.sinabro.experienceText,
      signatureTitle: t.yeongdong.breweries.sinabro.signatureTitle,
      signatureText: t.yeongdong.breweries.sinabro.signatureText,
      images: "/tour-images/yeongdong/Sinabro",
      imagesCount: 9,
      address: t.yeongdong.breweries.sinabro.address,
    },
    {
      id: 2,
      number: t.yeongdong.breweries.sogyeori.number,
      name: t.yeongdong.breweries.sogyeori.name,
      tagline: t.yeongdong.breweries.sogyeori.tagline,
      story: t.yeongdong.breweries.sogyeori.story,
      experienceTitle: t.yeongdong.breweries.sogyeori.experienceTitle,
      experienceText: t.yeongdong.breweries.sogyeori.experienceText,
      signatureTitle: t.yeongdong.breweries.sogyeori.signatureTitle,
      signatureText: t.yeongdong.breweries.sogyeori.signatureText,
      images: "/tour-images/yeongdong/Sogyeori",
      imagesCount: 10,
      address: t.yeongdong.breweries.sogyeori.address,
    },
    {
      id: 3,
      number: t.yeongdong.breweries.winekorea.number,
      name: t.yeongdong.breweries.winekorea.name,
      tagline: t.yeongdong.breweries.winekorea.tagline,
      story: t.yeongdong.breweries.winekorea.story,
      experienceTitle: t.yeongdong.breweries.winekorea.experienceTitle,
      experienceText: t.yeongdong.breweries.winekorea.experienceText,
      signatureTitle: t.yeongdong.breweries.winekorea.signatureTitle,
      signatureText: t.yeongdong.breweries.winekorea.signatureText,
      images: "/tour-images/yeongdong/Winekorea",
      imagesCount: 10,
      address: t.yeongdong.breweries.winekorea.address,
    },
  ];

  const timeline = t.yeongdong.timeline.items;

  // const reviews = [
  //   {
  //     image: "/tour-images/vip/Sinpyeong/06.jpg",
  //     rating: "★★★★★",
  //     author: "",
  //     comment:
  //       "와이너리 오너 가족을 직접 만나고 소통할 수 있었던 점이 인상 깊었습니다. 비즈니스 접대용으로도 손색이 없는 세련된 경험입니다.",
  //   },
  //   {
  //     image: "/tour-images/vip/Sinpyeong/04.jpg",
  //     rating: "★★★★★",
  //     author: "",
  //     comment:
  //       "오크통에서 갓 꺼낸 원액을 맛보고, 나만의 술을 직접 만들어 가져갈 수 있다는 점이 정말 특별했습니다. 단순한 시음 투어가 아니었어요.",
  //   },
  //   {
  //     image: "/tour-images/vip/Cheonbi/05.jpg",
  //     rating: "★★★★★",
  //     author: "",
  //     comment:
  //       "각 와이너리의 개성이 뚜렷해서 지루할 틈이 없었습니다. 특히 마지막 와이너리에서 제공된 따뜻한 음식과 술의 조화는 최고였습니다. 친구들과 꼭 다시 오고 싶은 곳입니다.",
  //   },
  // ];

  const faqs = t.yeongdong.faq.items;

  const pricingTable = [
    {
      people: lang === "ko" ? "2인" : "2 people",
      total: 813000,
      perPerson: 406500,
      vehicle: lang === "ko" ? "승용차" : "Sedan",
    },
    {
      people: lang === "ko" ? "3인" : "3 people",
      total: 866000,
      perPerson: 288667,
      vehicle: lang === "ko" ? "승용차" : "Sedan",
    },
    {
      people: lang === "ko" ? "4인" : "4 people",
      total: 1084000,
      perPerson: 271000,
      vehicle: lang === "ko" ? "승용차" : "Sedan",
    },
    {
      people: lang === "ko" ? "5인" : "5 people",
      total: 1155000,
      perPerson: 231000,
      vehicle: lang === "ko" ? "대형 밴" : "Large Van",
    },
    {
      people: lang === "ko" ? "6인" : "6 people",
      total: 1238000,
      perPerson: 206333,
      vehicle: lang === "ko" ? "대형 밴" : "Large Van",
    },
    {
      people: lang === "ko" ? "7인" : "7 people",
      total: 1321000,
      perPerson: 188714,
      vehicle: lang === "ko" ? "대형 밴" : "Large Van",
    },
    {
      people: lang === "ko" ? "8인" : "8 people",
      total: 1404000,
      perPerson: 175500,
      vehicle: lang === "ko" ? "대형 밴" : "Large Van",
    },
  ];

  const features = [
    {
      icon: Car,
      title: t.yeongdong.features.doorToDoor.title,
      description: t.yeongdong.features.doorToDoor.description,
    },
    {
      icon: Gift,
      title: t.yeongdong.features.allInclusive.title,
      description: t.yeongdong.features.allInclusive.description,
    },
    {
      icon: ShieldCheck,
      title: t.yeongdong.features.safety.title,
      description: t.yeongdong.features.safety.description,
    },
  ];

  const peopleOptions = t.yeongdong.pricing.peopleOptions;

  const priceByPeople: Record<string, number | null> = {
    "2": 813000,
    "3": 866000,
    "4": 1084000,
    "5": 1155000,
    "6": 1238000,
    "7": 1321000,
    "8": 1404000,
  };

  const inquiryDeposit = 10000;

  const includedItems = t.yeongdong.pickupDropoff.includedItems;
  const excludedItems = t.yeongdong.pickupDropoff.excludedItems;

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <HeroSection
        titleLines={t.yeongdong.hero.title.split("\n")}
        subtitleLines={t.yeongdong.hero.subtitle.split("\n")}
        videoSrc="/tour-images/yeongdong/yeongdong-hero.mp4"
      />

      {/* 메인 콘텐츠 영역 */}
      <div className="mx-auto max-w-screen-2xl px-4 pt-8 pb-20">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* 왼쪽: 상품 설명 (2/3 영역) */}
          <div className="w-full lg:w-3/4">
            <div className="space-y-16">
              <FeaturesSection
                heading={
                  lang === "ko"
                    ? "그날의 가장 완벽한 조합을 선물합니다"
                    : "We Present the Perfect Combination of the Day"
                }
                description={
                  lang === "ko"
                    ? "고객님의 투어는 아래 세 곳의 명품 와이너리 중, 당일 예약 가능한 최적의 두 곳을 저희가 직접 큐레이션하여 구성됩니다. 각 와이너리의 예약 상황, 계절별 특별 프로그램, 그리고 이동 동선을 종합적으로 고려하여 가장 완벽한 하루를 설계해드립니다."
                    : "Your tour is curated from the three premium wineries below, with the optimal two available for reservation on that day. We comprehensively consider each winery's reservation status, seasonal special programs, and travel routes to design the most perfect day for you."
                }
                items={features}
              />

              {/* 와이너리 섹션들 */}
              <BrewerySection breweries={breweries} />

              {/* 타임라인 섹션 */}
              <Timeline
                heading={t.yeongdong.timeline.title}
                subheading={t.yeongdong.timeline.subtitle}
                items={timeline}
              />

              {/* 요금 섹션 (표 형태) */}
              <PricingTable
                heading={t.yeongdong.pricing.title}
                subheading={t.yeongdong.pricing.subtitle}
                rows={pricingTable}
              />

              <CTASection
                heading={t.yeongdong.cta.title}
                subheading={t.yeongdong.cta.subtitle}
              />

              {/* <ReviewsSection reviews={reviews} /> */}

              <PickupDropoffAreasSection
                includedItems={includedItems}
                excludedItems={excludedItems}
              />

              <FAQSection
                items={faqs}
                selectedIndex={selectedFaq}
                onToggle={toggleFaq}
              />
            </div>
          </div>

          {/* 오른쪽: 예약 사이드바 (1/3 영역, 데스크톱만) */}
          <div className="hidden lg:block lg:w-1/4">
            <BookingSidebar
              title={t.yeongdong.sidebar.title}
              price={formatPrice(813000, lang as "ko" | "en")}
              time={t.yeongdong.sidebar.time}
              baseMember={t.yeongdong.sidebar.baseMember}
              subItems={t.yeongdong.sidebar.subItems}
              destinationId={1001}
              disabled={false}
              peopleOptions={peopleOptions}
              priceByPeople={priceByPeople}
              inquiryDeposit={inquiryDeposit}
              color="amber"
            />
          </div>
        </div>
      </div>

      {/* 모바일용 하단 고정 바 */}
      <MobileBottomBar
        title={t.yeongdong.sidebar.title}
        price={formatPrice(813000, lang as "ko" | "en")}
        time={t.yeongdong.sidebar.time}
        baseMember={t.yeongdong.sidebar.baseMember}
        destinationId={1001}
        disabled={false}
        peopleOptions={peopleOptions}
        priceByPeople={priceByPeople}
        inquiryDeposit={inquiryDeposit}
        color="amber"
      />
    </div>
  );
}
