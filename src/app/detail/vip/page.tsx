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
import Link from "next/link";
import CTASection from "./_component/cta-section";
import { Car, ShieldCheck, Gift } from "lucide-react";
import PickupDropoffAreasSection from "../_component/pickup-dropoff-areas";
import { useTranslation } from "@/hooks/use-translation";
import { formatPrice } from "@/utils/currency";
// import ReviewsSection from "../_component/reviews-section";

export default function VipDetailPage() {
  const { t, lang } = useTranslation();
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setSelectedFaq(selectedFaq === index ? null : index);
  };

  const breweries = [
    {
      id: 1,
      number: t.vip.breweries.yesan.number,
      name: t.vip.breweries.yesan.name,
      tagline: t.vip.breweries.yesan.tagline,
      story: t.vip.breweries.yesan.story,
      experienceTitle: t.vip.breweries.yesan.experienceTitle,
      experienceText: t.vip.breweries.yesan.experienceText,
      signatureTitle: t.vip.breweries.yesan.signatureTitle,
      signatureText: t.vip.breweries.yesan.signatureText,
      images: "/tour-images/vip/Yesan",
      imagesCount: 10,
      address: t.vip.breweries.yesan.address,
    },
    {
      id: 2,
      number: t.vip.breweries.sinpyeong.number,
      name: t.vip.breweries.sinpyeong.name,
      tagline: t.vip.breweries.sinpyeong.tagline,
      story: t.vip.breweries.sinpyeong.story,
      experienceTitle: t.vip.breweries.sinpyeong.experienceTitle,
      experienceText: t.vip.breweries.sinpyeong.experienceText,
      signatureTitle: t.vip.breweries.sinpyeong.signatureTitle,
      signatureText: t.vip.breweries.sinpyeong.signatureText,
      images: "/tour-images/vip/Sinpyeong",
      imagesCount: 10,
      address: t.vip.breweries.sinpyeong.address,
    },
    {
      id: 3,
      number: t.vip.breweries.cheonbi.number,
      name: t.vip.breweries.cheonbi.name,
      tagline: t.vip.breweries.cheonbi.tagline,
      story: t.vip.breweries.cheonbi.story,
      experienceTitle: t.vip.breweries.cheonbi.experienceTitle,
      experienceText: t.vip.breweries.cheonbi.experienceText,
      signatureTitle: t.vip.breweries.cheonbi.signatureTitle,
      signatureText: t.vip.breweries.cheonbi.signatureText,
      images: "/tour-images/vip/Cheonbi",
      imagesCount: 10,
      address: t.vip.breweries.cheonbi.address,
    },
  ];

  const timeline = t.vip.timeline.items;

  // const reviews = [
  //   {
  //     image: "/tour-images/vip/Sinpyeong/06.jpg",
  //     rating: "★★★★★",
  //     author: "",
  //     comment:
  //       "양조장 오너 가족을 직접 만나고 소통할 수 있었던 점이 인상 깊었습니다. 비즈니스 접대용으로도 손색이 없는 세련된 경험입니다.",
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
  //       "각 양조장의 개성이 뚜렷해서 지루할 틈이 없었습니다. 특히 마지막 양조장에서 제공된 따뜻한 음식과 술의 조화는 최고였습니다. 친구들과 꼭 다시 오고 싶은 곳입니다.",
  //   },
  // ];

  const faqs = t.vip.faq.items.map((item) => {
    // if (item.linkText) {
    //   return {
    //     question: item.question,
    //     answer: (
    //       <>
    //         {item.answer}
    //         <Link
    //           href="/detail/vip/guide"
    //           className="ml-1 font-semibold text-blue-600 underline underline-offset-4 hover:text-blue-700"
    //         >
    //           {item.linkText}
    //         </Link>
    //         {item.answerCont}
    //         <Link
    //           href="/detail/vip/guide"
    //           className="ml-2 inline-flex items-center gap-1 rounded-md bg-blue-600 px-2 py-1 text-xs font-medium text-white hover:bg-blue-800"
    //         >
    //           {item.buttonText}
    //         </Link>
    //       </>
    //     ),
    //   };
    // }
    return {
      question: item.question,
      answer: item.answer,
    };
  });

  const pricingTable = [
    {
      people: lang === "ko" ? "2인" : "2 people",
      total: 1286000,
      perPerson: 643000,
      vehicle: lang === "ko" ? "승용차" : "Sedan",
    },
    {
      people: lang === "ko" ? "3인" : "3 people",
      total: 1306000,
      perPerson: 435333,
      vehicle: lang === "ko" ? "승용차" : "Sedan",
    },
    {
      people: lang === "ko" ? "4인" : "4 people",
      total: 1491000,
      perPerson: 372750,
      vehicle: lang === "ko" ? "승용차" : "Sedan",
    },
    {
      people: lang === "ko" ? "5인" : "5 people",
      total: 1511000,
      perPerson: 302200,
      vehicle: lang === "ko" ? "대형 밴" : "Large Van",
    },
    {
      people: lang === "ko" ? "6인" : "6 people",
      total: 1542000,
      perPerson: 257000,
      vehicle: lang === "ko" ? "대형 밴" : "Large Van",
    },
    {
      people: lang === "ko" ? "7인" : "7 people",
      total: 1573000,
      perPerson: 224714,
      vehicle: lang === "ko" ? "대형 밴" : "Large Van",
    },
    {
      people: lang === "ko" ? "8인" : "8 people",
      total: 1604000,
      perPerson: 200500,
      vehicle: lang === "ko" ? "대형 밴" : "Large Van",
    },
  ];

  const features = [
    {
      icon: Car,
      title: t.vip.features.doorToDoor.title,
      description: t.vip.features.doorToDoor.description,
    },
    {
      icon: Gift,
      title: t.vip.features.allInclusive.title,
      description: t.vip.features.allInclusive.description,
    },
    {
      icon: ShieldCheck,
      title: t.vip.features.safety.title,
      description: t.vip.features.safety.description,
    },
  ];

  const peopleOptions = t.vip.pricing.peopleOptions;

  const priceByPeople: Record<string, number | null> = {
    "2": 1286000,
    "3": 1306000,
    "4": 1491000,
    "5": 1511000,
    "6": 1542000,
    "7": 1573000,
    "8": 1604000,
  };

  const inquiryDeposit = 10000;

  const includedItems = [
    lang === "ko"
      ? "호텔/자택 등에서 양조장까지 왕복 이동 서비스"
      : "Round-trip transportation service from hotel/residence to breweries",
    lang === "ko"
      ? "[체험] 양조장 두 곳 계절 별 맞춤 체험 클래스"
      : "[Experience] Customized seasonal experience classes at two breweries",
    lang === "ko"
      ? "[시음] 양조장 두 곳 테이스팅"
      : "[Tasting] Tasting sessions at two breweries",
    lang === "ko" ? "점심 식사" : "lunch",
  ];

  const excludedItems = [
    lang === "ko" ? "여행자 보험" : "Travel insurance",
    lang === "ko"
      ? "안내된 픽업/드랍 권역 외 추가 이동 비용"
      : "Additional transportation costs outside designated pickup/drop-off areas",
  ];

  const titleLines = [
    lang === "ko" ? "프라이빗 도어투도어" : "Private Door-to-Door",
    lang === "ko" ? "전통주 투어" : "Brewery & Distillery Tour",
  ];

  const subtitleLines = [
    lang === "ko"
      ? "마음껏 즐기세요, 운전은 저희가 할게요."
      : "Enjoy to your heart's content, we'll take care of the driving.",
    lang === "ko"
      ? "한국 전통주 장인의 세계로 떠나는 유일한 올인클루시브 큐레이션 여정"
      : "The only all-inclusive curated journey into the world of Korean traditional liquor artisans",
  ];

  const sidebarTitle =
    lang === "ko" ? "VIP 프라이빗 양조장 투어" : "VIP Private Brewery Tour";
  const basePrice = formatPrice(1286000, lang as "ko" | "en" | "zh");
  const tourTime = lang === "ko" ? "8시간" : "8 hours";
  const baseMember = lang === "ko" ? "2인" : "2 people";

  const subItems = [
    {
      title: lang === "ko" ? "인원" : "People",
      value: lang === "ko" ? "2인 이상" : "2+ people",
    },
    {
      title: lang === "ko" ? "투어 시간" : "Tour Time",
      value: tourTime,
    },
    {
      title: lang === "ko" ? "포함 사항" : "Included",
      value:
        lang === "ko"
          ? "점심식사, 교통비, 체험비"
          : "Lunch, transportation fees, experience fees",
    },
    {
      title: lang === "ko" ? "취소 정책" : "Cancellation Policy",
      value: lang === "ko" ? "4일 전 무료" : "Free cancellation 4 days prior",
    },
  ];

  const featuresHeading =
    lang === "ko"
      ? "그날의 가장 완벽한 조합을 선물합니다"
      : "We gift you the most perfect combination of the day";

  const featuresDescription =
    lang === "ko"
      ? "고객님의 투어는 아래 세 곳의 명품 양조장 중, 당일 예약 가능한 최적의 두 곳을 저희가 직접 큐레이션하여 구성됩니다. 각 양조장의 예약 상황, 계절별 특별 프로그램, 그리고 이동 동선을 종합적으로 고려하여 가장 완벽한 하루를 설계해드립니다."
      : "Your tour will be composed by us curating the optimal two breweries available for reservation on the day, among the three premium breweries below. We comprehensively consider each brewery's reservation status, seasonal special programs, and travel routes to design the most perfect day.";

  const timelineHeading = lang === "ko" ? "하루의 여정" : "Journey of the Day";
  const timelineSubheading =
    lang === "ko"
      ? "오전 7시부터 10시 사이, 원하시는 시간에 출발"
      : "Depart at your desired time between 7 AM and 10 AM";

  const pricingHeading = lang === "ko" ? "투어 요금" : "Tour Pricing";
  const pricingSubheading =
    lang === "ko"
      ? "인원에 따른 맞춤 요금 체계"
      : "Customized pricing by number of people";

  const ctaHeading =
    lang === "ko"
      ? "지금 예약하고 특별한 하루를 만들어보세요"
      : "Book now and create a special day";

  const ctaSubheading =
    lang === "ko"
      ? "한국 전통주의 진수를 경험하는 프리미엄 투어"
      : "Premium tour experiencing the essence of Korean traditional liquor";

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <HeroSection
        titleLines={titleLines}
        subtitleLines={subtitleLines}
        videoSrc="/tour-images/vip/vip-hero.mp4"
      />

      {/* 메인 콘텐츠 영역 */}
      <div className="mx-auto max-w-screen-2xl px-4 pt-8 pb-20">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* 왼쪽: 상품 설명 (2/3 영역) */}
          <div className="w-full lg:w-3/4">
            <div className="space-y-16">
              <FeaturesSection
                heading={featuresHeading}
                description={featuresDescription}
                items={features}
              />

              {/* 양조장 섹션들 */}
              <BrewerySection breweries={breweries} />

              {/* 타임라인 섹션 */}
              <Timeline
                heading={timelineHeading}
                subheading={timelineSubheading}
                items={timeline}
              />

              {/* 요금 섹션 (표 형태) */}
              <PricingTable
                heading={pricingHeading}
                subheading={pricingSubheading}
                rows={pricingTable}
              />

              <CTASection heading={ctaHeading} subheading={ctaSubheading} />

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
              title={sidebarTitle}
              price={basePrice}
              time={tourTime}
              baseMember={baseMember}
              subItems={subItems}
              destinationId={1000}
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
        title={sidebarTitle}
        price={basePrice}
        time={tourTime}
        baseMember={baseMember}
        destinationId={1000}
        disabled={false}
        peopleOptions={peopleOptions}
        priceByPeople={priceByPeople}
        inquiryDeposit={inquiryDeposit}
        color="amber"
      />
    </div>
  );
}
