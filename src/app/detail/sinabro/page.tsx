"use client";

import { useTranslation } from "@/hooks/use-translation";
import { formatPrice } from "@/utils/currency";
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
  const { t, lang } = useTranslation();

  const peopleOptions = t.sinabro.peopleOptions;

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
              title={t.sinabro.sidebar.title}
              price={formatPrice(140000, lang as "ko" | "en")}
              time={t.sinabro.sidebar.time}
              subItems={t.sinabro.sidebar.subItems}
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
        title={t.sinabro.sidebar.title}
        price={formatPrice(140000, lang as "ko" | "en")}
        time={t.sinabro.sidebar.time}
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
