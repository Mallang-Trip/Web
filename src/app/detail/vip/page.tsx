"use client";

import { useState } from "react";
import BookingSidebar from "@/app/detail/_component/booking-sidebar";
import MobileBottomBar from "@/app/detail/_component/mobile-bottom-bar";
import Hero from "./_component/Hero";
import Features from "./_component/Features";
import BrewerySection from "./_component/BrewerySection";
import Timeline from "./_component/Timeline";
import PricingTable from "./_component/PricingTable";
import FAQ from "./_component/FAQ";
import CTA from "./_component/CTA";
import { Car, ShieldCheck, Gift } from "lucide-react";

const breweries = [
  {
    id: 1,
    number: "1",
    name: "예산사과와인",
    tagline: "대를 잇는 과수원의 유산",
    story:
      "이 이야기는 술이 아닌 땅에서 시작됩니다. 40년 경력의 사과 장인 서정학 명인의 삶이 담긴 과수원, 그 흙의 역사를 이해하는 것이 이곳을 이해하는 첫걸음입니다. 캐나다에서 팜 와이너리 문화를 경험한 그의 사위 정제민 대표는 장인의 완벽한 사과에 새로운 생명을 불어넣기로 결심합니다.",
    experienceTitle: "특별한 체험",
    experienceText:
      "유럽 시골 풍의 아름다운 와이너리에서 서늘한 지하 셀러로 들어서는 순간, 공기를 가득 메운 달콤한 발효향과 오크통의 깊은 향기는 도시의 소음을 잊게 합니다. 배럴에서 직접 추출한 원액을 테이스팅하며 숙성 과정을 체험하고, 전문 바텐더와 함께 애플 브랜디로 수제 칵테일을 만들어보는 특별한 시간을 가질 수 있습니다.",
    signatureTitle: "시그니처: 추사 40",
    signatureText:
      "프랑스 칼바도스의 고귀한 전통 방식으로 두 번 증류하여 오크통에서 3년 이상 숙성한 명품 애플 브랜디. 잘 익은 사과의 농축된 달콤함과 오크의 바닐라, 꿀, 토피 풍미가 어우러집니다.",
  },
  {
    id: 2,
    number: "2",
    name: "신평양조장",
    tagline: "100년의 시간을 맛보다",
    story:
      "1933년에 설립되어 일제강점기의 수탈과 한국전쟁의 포화 속에서도 꿋꿋이 살아남은, 한국에서 가장 오래된 양조장 중 하나입니다. 이곳의 역사는 곧 한국 현대사의 축소판입니다. 2대 김용세 명인은 거친 농주였던 막걸리에 '백련잎'을 더하는 혁신을 통해, 청와대 만찬상에 오르는 세련된 명주로 승화시켰습니다.",
    experienceTitle: "특별한 체험",
    experienceText:
      "1930년대에 지어진 정미소를 개조한 '백련양조문화원'은 살아있는 박물관과 같습니다. 거대한 나무 발효통과 손으로 쓴 빛바랜 장부, 대한민국 정부 수립 이전에 발급된 희귀한 주류 면허증을 직접 볼 수 있으며, 배럴 테이스팅을 통해 숙성 단계별 막걸리의 변화를 체험할 수 있습니다.",
    signatureTitle: "시그니처: 백련 막걸리",
    signatureText:
      "청와대 만찬주로 선정된 프리미엄 막걸리. 백련잎의 은은하고 깨끗한 향이 쌀의 텁텁함을 마법처럼 잡아주어, 놀랍도록 부드럽고 깔끔한 맛을 선사합니다.",
  },
  {
    id: 3,
    number: "3",
    name: "좋은술 천비향",
    tagline: "완벽을 향한 연금술사의 열정",
    story:
      "이 양조장의 시작은 '남편에게 숙취 없는 좋은 술을 만들어주고 싶다'는 창업자 이예령 대표의 개인적인 소망이었습니다. 이 순수한 열정은 다섯 번에 걸쳐 덧술하는 고난도의 전통 방식 '오양주(五釀酒)'를 되살리려는 집념으로 이어졌습니다. 2025 대한민국 우리술 품평회에서 영예의 대통령상을 수상하며 대한민국 최고의 전통주로 공식 인정받았습니다.",
    experienceTitle: "특별한 체험",
    experienceText:
      "이곳은 공장이라기보다 예술가의 아틀리에 같습니다. 소수의 방문객만이 허락된 프라이빗한 공간에서, 창업자나 그녀의 가족이 직접 안내하는 특별한 시음회를 경험할 수 있습니다. 배럴에서 직접 추출한 원액 테이스팅과 함께 대통령상 수상작을 활용한 수제 칵테일 만들기 체험이 가능합니다.",
    signatureTitle: "시그니처: 천비향 약주",
    signatureText:
      "아세안 정상회의 공식 건배주이자 대통령상 수상작. 다섯 번의 발효와 9개월의 저온 숙성을 거쳐 꿀, 버터스카치, 잘 익은 배의 복합적인 향과 비단처럼 부드러운 질감이 완벽한 균형을 이룹니다.",
  },
];

const timeline = [
  {
    time: "10:00",
    activity: "호텔/자택 픽업",
    description: "프라이빗 차량이 문 앞으로 찾아갑니다",
  },
  {
    time: "11:30",
    activity: "첫 번째 양조장",
    description: "체험 1시간 + 자유시간 30분",
  },
  {
    time: "13:00",
    activity: "현지 맛집 점심",
    description: "엄선된 맛집에서 전통주와 함께",
  },
  {
    time: "14:30",
    activity: "두 번째 양조장",
    description: "체험 1시간 + 자유시간 30분",
  },
  {
    time: "18:00",
    activity: "호텔/자택 도착",
    description: "문 앞까지 안전하게",
  },
];

const faqs = [
  {
    question: "식사는 정말 포함되어 있지 않나요?",
    answer:
      "네, 식사 비용은 별도입니다. 고객님의 취향과 식단을 100% 존중하기 위해, 저희가 엄선한 현지 맛집 리스트를 제공합니다. 선택하신 식당을 드라이버가 예약해드리고, 도착하시면 바로 식사를 즐기실 수 있습니다. 포장 가능한 음식을 선택하실 경우, 드라이버가 픽업을 도와드려 양조장에서 페어링하며 드실 수도 있습니다.",
  },
  {
    question: "영어 가이드가 동행하나요?",
    answer:
      "각 양조장에서 전문가가 영어로 프라이빗 투어를 진행합니다. 이동 중에는 드라이버가 기본적인 안내를 도와드리며, 별도의 가이드는 동승하지 않아 프라이빗한 시간을 보장합니다.",
  },
  {
    question: "특정 양조장을 선택할 수 있나요?",
    answer:
      "당일 예약 상황과 양조장 스케줄을 고려하여 말랑트립이 최적의 2곳을 선별해드립니다. 3곳 모두 최고의 양조장이니 믿고 맡겨주세요.",
  },
  {
    question: "취소 및 환불 정책은?",
    answer:
      "투어 4일 전까지 100% 환불 가능합니다. 3일 전부터는 환불이 불가하오니 신중히 예약해주세요. 천재지변의 경우 100% 환불됩니다.",
  },
];

export default function VipDetailPage() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setSelectedFaq(selectedFaq === index ? null : index);
  };

  const courseDetails = {
    vipTour: {
      title: "VIP 프라이빗 양조장 투어",
      route: "픽업 → 1차 양조장 → 점심 → 2차 양조장 → 복귀",
      courseNo: 10001,
    },
  };

  const pricingTable = [
    { people: "2인", total: 1160000, perPerson: 580000, vehicle: "승용차" },
    { people: "3인", total: 1185000, perPerson: 395000, vehicle: "승용차" },
    { people: "4인", total: 1260000, perPerson: 315000, vehicle: "승용차" },
    { people: "5인", total: 1335000, perPerson: 267000, vehicle: "대형 밴" },
    { people: "6인", total: 1520000, perPerson: 253333, vehicle: "대형 밴" },
    { people: "7인", total: 1610000, perPerson: 230000, vehicle: "대형 밴" },
    { people: "8인", total: 1700000, perPerson: 212500, vehicle: "대형 밴" },
  ];

  const features = [
    {
      icon: Car,
      title: "도어투도어 서비스",
      description: "호텔이나 자택에서 픽업하여\n편안하게 다시 모셔다 드립니다",
    },
    {
      icon: Gift,
      title: "올인클루시브",
      description:
        "차량, 기사, 체험비, 시음 모두 포함\n식사만 개인 취향대로 선택",
    },
    {
      icon: ShieldCheck,
      title: "안전한 투어",
      description: "음주운전 걱정 없이\n마음껏 시음을 즐기세요",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <Hero
        titleLines={["프라이빗 도어투도어", "양조장 투어"]}
        subtitleLines={[
          "마음껏 즐기세요, 운전은 저희가 할게요.",
          "한국 전통주 장인의 세계로 떠나는 유일한 올인클루시브 큐레이션 여정",
        ]}
        backgroundImage="https://images.unsplash.com/photo-1585198449001-3c24ac27a8e2?q=80&w=2070&auto=format&fit=crop"
      />

      {/* 메인 콘텐츠 영역 */}
      <div className="mx-auto max-w-screen-2xl px-4 pt-8 pb-20">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* 왼쪽: 상품 설명 (2/3 영역) */}
          <div className="w-full lg:w-3/4">
            <div className="space-y-16">
              <Features
                heading="그날의 가장 완벽한 조합을 선물합니다"
                description={
                  "고객님의 투어는 아래 세 곳의 명품 양조장 중, 당일 예약 가능한 최적의 두 곳을 저희가 직접 큐레이션하여 구성됩니다. 각 양조장의 예약 상황, 계절별 특별 프로그램, 그리고 이동 동선을 종합적으로 고려하여 가장 완벽한 하루를 설계해드립니다."
                }
                items={features}
              />

              {/* 양조장 섹션들 */}
              <BrewerySection breweries={breweries} />

              {/* 타임라인 섹션 */}
              <Timeline
                heading="하루의 여정"
                subheading="오전 9시부터 오후 1시 사이, 원하시는 시간에 출발"
                items={timeline}
              />

              {/* 요금 섹션 (표 형태) */}
              <PricingTable
                heading="투어 요금"
                subheading="인원에 따른 맞춤 요금 체계"
                rows={pricingTable}
              />

              <CTA
                heading="지금 예약하고 특별한 하루를 만들어보세요"
                subheading="한국 전통주의 진수를 경험하는 프리미엄 투어"
              />

              <FAQ
                items={faqs}
                selectedIndex={selectedFaq}
                onToggle={toggleFaq}
              />
            </div>
          </div>

          {/* 오른쪽: 예약 사이드바 (1/3 영역, 데스크톱만) */}
          <div className="hidden lg:block lg:w-1/4">
            <BookingSidebar
              title="VIP 프라이빗 양조장 투어"
              price="1,160,000"
              time="8시간"
              subItems={[
                {
                  title: "투어 시간",
                  value: "8시간",
                },
                {
                  title: "포함 사항",
                  value: "전용차량, 가이드, 시음비",
                },
                {
                  title: "취소 정책",
                  value: "4일 전 무료",
                },
              ]}
              courseDetails={courseDetails}
              variant="vip"
            />
          </div>
        </div>
      </div>

      {/* 모바일용 하단 고정 바 */}
      <MobileBottomBar
        price="1,160,000"
        time="8시간"
        courseDetails={courseDetails}
        variant="vip"
      />
    </div>
  );
}
