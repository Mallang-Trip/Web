import BookingSidebar from "@/app/detail/_component/booking-sidebar";
import MobileBottomBar from "@/app/detail/_component/mobile-bottom-bar";
import HeroSection from "./_component/hero-section";
import HighlightsSection from "./_component/highlights-section";
import PhotoGallery from "./_component/photo-gallery";
import ItinerarySection from "./_component/itinerary-section";
import PricingSection from "./_component/pricing-section";
// import ReviewsSection from "./_component/reviews-section";
import FAQSection from "./_component/FAQ-section";
// import PartnersSection from "./_component/partners-section";

export default function SinabroDetailPage() {
  const peopleOptions = [
    { value: "2", label: "2인" },
    { value: "3", label: "3인" },
    { value: "4", label: "4인" },
    { value: "5", label: "5인" },
    { value: "6", label: "6인" },
    { value: "7", label: "7인" },
    { value: "8", label: "8인" },
    { value: "9", label: "9인" },
    { value: "10", label: "10인 이상" },
  ];

  const priceByPeople: Record<string, number | null> = {
    "2": 140000,
    "3": 140000,
    "4": 140000,
    "5": 175000,
    "6": 210000,
    "7": 245000,
    "8": 280000,
    "9": 315000,
    "10": null,
  };

  const inquiryDeposit = 10000;

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />

      <div className="mx-auto max-w-screen-2xl px-4 py-8 pb-20">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="w-full lg:w-3/4">
            <div className="space-y-28">
              <HighlightsSection />
              <PhotoGallery />
              <ItinerarySection />
              <PricingSection />
              {/* <ReviewsSection /> */}
              <FAQSection />
              {/* <PartnersSection /> */}
            </div>
          </div>

          <div className="hidden lg:block lg:w-1/4">
            <BookingSidebar
              title="시나브로 와이너리 프라이빗 투어"
              price="140,000"
              time="4인 이하"
              subItems={[
                { title: "", value: "약 2시간" },
                { title: "", value: "픽업/드랍 서비스 포함" },
                { title: "", value: "4일 전 100% 취소 가능" },
                {
                  title: "",
                  value: "상세 체험 내용은 시기 별로 변동될 수 있습니다.",
                },
              ]}
              color="emerald"
              destinationId={1003}
              disabled={false}
              peopleOptions={peopleOptions}
              priceByPeople={priceByPeople}
              inquiryDeposit={inquiryDeposit}
            />
          </div>
        </div>
      </div>

      <MobileBottomBar
        title="시나브로 와이너리 프라이빗 투어"
        price="140,000"
        time="4인 이하"
        color="emerald"
        destinationId={1003}
        disabled={false}
        peopleOptions={peopleOptions}
        priceByPeople={priceByPeople}
        inquiryDeposit={inquiryDeposit}
      />
    </div>
  );
}
