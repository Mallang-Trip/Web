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

export default function JookhwaDetailPage() {
  const { t, lang } = useTranslation();

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

  const formattedPrice = formatPrice(140000, lang as "ko" | "en");

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection image="/tour-images/jookhwa/00.jpg" />

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
              title={t.jookhwa.sidebar.title}
              price={formattedPrice}
              time={t.jookhwa.sidebar.time}
              subItems={t.jookhwa.sidebar.subItems}
              color="emerald"
              destinationId={1004}
              disabled={false}
              peopleOptions={t.jookhwa.peopleOptions}
              priceByPeople={priceByPeople}
              inquiryDeposit={inquiryDeposit}
            />
          </div>
        </div>
      </div>

      <MobileBottomBar
        title={t.jookhwa.sidebar.title}
        price={formattedPrice}
        time={t.jookhwa.sidebar.time}
        color="emerald"
        destinationId={1004}
        disabled={false}
        peopleOptions={t.jookhwa.peopleOptions}
        priceByPeople={priceByPeople}
        inquiryDeposit={inquiryDeposit}
      />
    </div>
  );
}
