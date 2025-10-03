import BookingSidebar from "@/app/detail/_component/booking-sidebar";
import MobileBottomBar from "@/app/detail/_component/mobile-bottom-bar";
import HeroSection from "./_component/hero-section";
import HighlightsSection from "./_component/highlights-section";
import PhotoGallery from "./_component/photo-gallery";
import ItinerarySection from "./_component/itinerary-section";
import PricingSection from "./_component/pricing-section";
import ReviewsSection from "./_component/reviews-section";
import FAQSection from "./_component/FAQ-section";
import PartnersSection from "./_component/partners-section";

export default function ChunbiDetailPage() {
  const peopleOptions = [
    { value: "2", label: "2~5인" },
    { value: "6", label: "6인" },
    { value: "7", label: "7인" },
    { value: "8", label: "8인" },
    { value: "9", label: "9인" },
    { value: "10", label: "10인" },
  ];

  const priceByPeople: Record<string, number | null> = {
    "2": 300000,
    "6": 360000,
    "7": 420000,
    "8": 480000,
    "9": 540000,
    "10": 600000,
  };

  const inquiryDeposit = 10000;

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection image="/tour-images/chunbi/00.jpg" />

      <div className="mx-auto max-w-screen-2xl px-4 py-8 pb-20">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="w-full lg:w-3/4">
            <div className="space-y-24">
              <HighlightsSection />
              <PhotoGallery />
              <ItinerarySection />
              <PricingSection />
              <ReviewsSection />
              <FAQSection />
              <PartnersSection />
            </div>
          </div>

          <div className="hidden lg:block lg:w-1/4">
            <BookingSidebar
              title="좋은술 천비향 프라이빗 투어"
              price="300,000"
              time="2~5인"
              subItems={[
                { title: "", value: "2~20명 완전 프라이빗 투어" },
                { title: "", value: "약 2시간" },
                { title: "", value: "픽업/드랍 서비스 포함" },
                { title: "", value: "매일 운영 (예약 필수)" },
                { title: "", value: "4일 전 100% 취소 가능" },
              ]}
              color="emerald"
              destinationId={505}
              disabled={false}
              peopleOptions={peopleOptions}
              priceByPeople={priceByPeople}
              inquiryDeposit={inquiryDeposit}
            />
          </div>
        </div>
      </div>

      <MobileBottomBar
        title="좋은술 천비향 프라이빗 투어"
        price="300,000"
        time="2~5인"
        color="emerald"
        destinationId={505}
        disabled={false}
        peopleOptions={peopleOptions}
        priceByPeople={priceByPeople}
        inquiryDeposit={inquiryDeposit}
      />
    </div>
  );
}
