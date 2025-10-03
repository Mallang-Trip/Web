import HeroSection from "@/app/detail/_component/hero-section";
import BookingSidebar from "@/app/detail/_component/booking-sidebar";
import MobileBottomBar from "@/app/detail/_component/mobile-bottom-bar";
import PickupAreasTabs from "./_component/pickup-areas-tabs";
import IntroGrids from "./_component/intro-grids";
import WineryList from "./_component/winery-list";
import TimelineAlt from "./_component/timeline-alt";
import ReviewsSimple from "./_component/reviews-simple";
import Inclusion from "./_component/inclusion";
import PricingCards from "./_component/pricing-cards";

export default function YeongdongDetailPage() {
  // 갤러리 섹션이 준비되면 아래 이미지 사용
  // const images: string[] = Array.from({ length: 5 }, (_, index) => index + 1).map(
  //   (index) => `/tour-images/yeongdong/${index.toString().padStart(2, "0")}.jpg`,
  // );

  const introItems = [
    {
      title: "완벽한 Door-to-Door",
      description:
        "집 앞에서 출발해 집 앞에 도착하는 완벽한 프라이빗 투어입니다. 운전 걱정은 내려놓고, 오롯이 여행의 즐거움과 와인의 풍미에만 집중하세요.",
    },
    {
      title: "우리만을 위한 시간",
      description:
        "다른 사람 눈치 볼 필요 없는, 오직 당신의 그룹만을 위한 투어입니다. 우리만의 속도로 여유롭게, 더 깊이있는 와이너리 경험을 즐겨보세요.",
    },
    {
      title: "전문가의 큐레이션",
      description:
        "수많은 와이너리 중 가장 특별한 경험을 선사할 두 곳을 엄선했습니다. 와인메이커의 철학과 이야기가 담긴 최고의 와인을 만나보세요.",
    },
  ];

  const wineries = [
    {
      name: "소계리595 와이너리",
      tagline: '"수작업으로 빚어내는 프리미엄 머루 와인"',
      description:
        "머루 특유의 진한 맛과 깊은 바디감이 일품인 프리미엄 와인을 생산합니다. 월류봉의 압도적인 절경을 병풍처럼 두르고 즐기는 와인 시음은 잊지 못할 순간을 선사합니다.",
    },
    {
      name: "시나브로 와이너리",
      tagline: '"온 가족 소믈리에가 빚는 천천히 스며드는 진심"',
      description:
        "HACCP 인증 1호 와이너리로, 온 가족이 소믈리에 자격증을 보유한 전문가 집안입니다. 계절의 정취를 담은 특별한 체험, 포도 수확철에는 나만의 와인을, 겨울에는 따뜻한 뱅쇼를 만들며 특별한 추억을 더합니다.",
    },
    {
      name: "와인코리아",
      tagline: '"국내 최대 규모의 와인 테마파크"',
      description:
        "국내 최대 규모를 자랑하는 와인 양조장이자 복합 문화 공간입니다. 가이드와 함께 전통 토굴 숙성고를 둘러보고, 따뜻한 와인 족욕으로 피로를 풀며 즐기는 이색적인 시음은 여행의 활력을 더합니다.",
    },
  ];

  const timelineAltItems = [
    { time: "09:00", text: "수도권 지정 장소에서 프라이빗 픽업" },
    { time: "11:00", text: "첫 번째 와이너리 도착 (투어 및 시음)" },
    { time: "13:00", text: "말랑트립이 엄선한 맛집에서 즐기는 점심" },
    { time: "14:30", text: "두 번째 와이너리 도착 (체험 및 시음)" },
    { time: "16:30", text: "영동 출발, 편안한 복귀길" },
    { time: "18:30 (예상)", text: "수도권 지정 장소 드랍" },
  ];

  const reviews = [
    {
      text: "Door-to-Door 픽업/샌딩 서비스가 정말 편리했어요. 특히 사는 곳이 다른 친구들과 함께 모여 여행하기에 최고였어요.",
      author: "김지예 님 (팸투어 참가자)",
    },
    {
      text: "운전 걱정 없이 와인을 마음껏 즐길 수 있다는 점이 이 투어의 핵심 가치라고 생각해요. 정말 편안하고 만족스러웠습니다.",
      author: "팸투어 결과 총평 中",
    },
    {
      text: "친구들과 안전하고 프라이빗하게 '나들이'를 즐기고 싶은 50~60대 여성 모임에 이보다 더 좋은 여행은 없을 것 같아요.",
      author: "정하영 님 (팸투어 참가자)",
    },
  ];

  const pricingCards = [
    { title: "2인 그룹", price: "가격문의", subtitle: "1인 기준" },
    { title: "3인 그룹", price: "가격문의", subtitle: "1인 기준" },
    { title: "4인 이상 그룹", price: "가격문의", subtitle: "1인 기준" },
  ];

  // 예약 폼 전달용 인원/가격 구성 (가격문의: null)
  const peopleOptions = [
    { value: "2", label: "2인" },
    { value: "3", label: "3인" },
    { value: "4", label: "4인 이상" },
  ];

  const priceByPeople: Record<string, number | null> = {
    "2": null,
    "3": null,
    "4": null,
  };

  const inquiryDeposit = 10000;

  return (
    <div className="min-h-screen bg-[#F5F5DC]">
      <HeroSection
        title="도어투도어 영동 와이너리 투어"
        description="오직 우리만을 위한 하루, 소중한 사람들과 단독으로 즐기는 프라이빗 와인 여정"
        image="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1440"
      />

      <div className="mx-auto max-w-screen-2xl px-4 py-8 pb-20">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="w-full lg:w-3/4">
            <div className="space-y-8">
              <IntroGrids
                heading="가장 빛나는 오늘을 위한 우리만의 와인 여행"
                items={introItems}
              />

              <WineryList
                heading="영동의 보석, 최고의 와이너리를 만나다"
                items={wineries}
              />

              <TimelineAlt heading="하루의 여정" items={timelineAltItems} />

              <ReviewsSimple
                heading="먼저 경험한 분들의 이야기"
                items={reviews}
              />

              <Inclusion
                heading="투어 포함 및 불포함 내역"
                includeTitle="All Inclusive"
                includeItems={[
                  "프라이빗 차량 및 기사",
                  "와이너리 2곳 투어 및 시음",
                  "말랑트립이 엄선한 맛집에서의 점심 식사",
                  "유류비 및 주차비",
                ]}
                excludeTitle="Not Included"
                excludeItems={[
                  "개인 주류 구매 비용",
                  "저녁 식사",
                  "여행자 보험",
                ]}
              />

              <PickupAreasTabs />

              <PricingCards
                heading="참가 인원별 투어 비용"
                items={pricingCards}
              />
            </div>
          </div>

          <div className="hidden lg:block lg:w-1/4">
            <BookingSidebar
              title="도어투도어 영동 와이너리 투어"
              price="가격문의"
              time="하루"
              subItems={[
                { title: "투어 시간", value: "하루" },
                { title: "포함 사항", value: "프라이빗 차량, 기사, 시음" },
                { title: "취소 정책", value: "3일 전 무료" },
              ]}
              destinationId={504}
              disabled={false}
              peopleOptions={peopleOptions}
              priceByPeople={priceByPeople}
              inquiryDeposit={inquiryDeposit}
            />
          </div>
        </div>
      </div>

      <MobileBottomBar
        title="도어투도어 영동 와이너리 투어"
        price="가격문의"
        time="하루"
        destinationId={504}
        disabled={false}
        peopleOptions={peopleOptions}
        priceByPeople={priceByPeople}
        inquiryDeposit={inquiryDeposit}
      />
    </div>
  );
}
