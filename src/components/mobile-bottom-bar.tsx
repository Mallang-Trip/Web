"use client";

import { Button } from "@/components/ui/button";
import BookingDrawer from "./booking-drawer";
import { useState, useEffect } from "react";

export default function MobileBottomBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollPercentage = (scrollPosition / windowHeight) * 100;

      // 스크롤이 화면 높이의 50% 이상일 때 보이기
      setIsVisible(scrollPercentage >= 50);
    };

    // 초기 상태 설정
    handleScroll();

    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 클린업
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed right-0 bottom-0 left-0 z-40 border-t border-gray-200 bg-white p-4 transition-transform duration-300 ease-in-out lg:hidden ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-lg font-bold text-blue-600">₩190,000</div>
          <div className="text-sm text-gray-600">9시간 기본 요금</div>
        </div>

        <BookingDrawer>
          <Button className="bg-blue-600 px-8 hover:bg-blue-700" size="lg">
            예약하기
          </Button>
        </BookingDrawer>
      </div>
    </div>
  );
}
