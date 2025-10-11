"use client";

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
import { useTranslation } from "@/hooks/use-translation";
import { formatPrice } from "@/utils/currency";

export default function ChunbiDetailPage() {
  const { t, lang } = useTranslation();

  const peopleOptions = t.chunbi.peopleOptions;

  const priceByPeople: Record<string, number | null> = {
    "2": 300000,
    "6": 360000,
    "7": 420000,
    "8": 480000,
    "9": 540000,
    "10": 600000,
  };

  const inquiryDeposit = 10000;

  const sidebarTitle = t.chunbi.sidebar.title;
  const basePrice = formatPrice(300000, lang as "ko" | "en");
  const time = t.chunbi.sidebar.time;

  const subItems = t.chunbi.sidebar.subItems;

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
              title={sidebarTitle}
              price={basePrice}
              time={time}
              subItems={subItems}
              color="emerald"
              destinationId={1002}
              disabled={false}
              peopleOptions={peopleOptions}
              priceByPeople={priceByPeople}
              inquiryDeposit={inquiryDeposit}
            />
          </div>
        </div>
      </div>

      <MobileBottomBar
        title={sidebarTitle}
        price={basePrice}
        time={time}
        color="emerald"
        destinationId={1002}
        disabled={false}
        peopleOptions={peopleOptions}
        priceByPeople={priceByPeople}
        inquiryDeposit={inquiryDeposit}
      />
    </div>
  );
}
