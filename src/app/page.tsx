import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import PricingSection from "@/components/pricing-section";
import ReviewsSection from "@/components/reviews-section";
import BookingSidebar from "@/components/booking-sidebar";
import MobileBottomBar from "@/components/mobile-bottom-bar";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />

      {/* 메인 콘텐츠 영역 */}
      <div className="mx-auto max-w-screen-2xl px-4 py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* 왼쪽: 상품 설명 (2/3 영역) */}
          <div className="w-full lg:w-3/4">
            <div className="space-y-8">
              <FeaturesSection />
              <PricingSection />
              <ReviewsSection />
            </div>
          </div>

          {/* 오른쪽: 예약 사이드바 (1/3 영역, 데스크톱만) */}
          <div className="hidden lg:block lg:w-1/4">
            <BookingSidebar />
          </div>
        </div>
      </div>

      <Footer />

      {/* 모바일용 하단 고정 바 */}
      <MobileBottomBar />

      {/* 모바일용 하단 바 때문에 추가된 공간 */}
      <div className="h-20 lg:hidden" />
    </div>
  );
}
