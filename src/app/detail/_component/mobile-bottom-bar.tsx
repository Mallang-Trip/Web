"use client";

import { Button } from "@/components/ui/button";
import BookingDrawer from "./booking-drawer";
import { useState, useEffect, useRef } from "react";

interface MobileBottomBarProps {
  title: string;
  price: string;
  time: string;
  baseMember?: string;
  destinationId: number;
  disabled: boolean;
  peopleOptions?: { value: string; label: string }[];
  priceByPeople?: Record<string, number | null | undefined>;
  inquiryDeposit?: number;
  color?: string;
}

export default function MobileBottomBar({
  title,
  price,
  time,
  baseMember,
  destinationId,
  disabled,
  peopleOptions,
  priceByPeople,
  inquiryDeposit,
  color = "blue",
}: MobileBottomBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  let colorClass: { priceColor: string; buttonColor: string };

  switch (color) {
    case "emerald":
      colorClass = {
        priceColor: "text-emerald-600",
        buttonColor: "bg-emerald-500 hover:bg-emerald-600",
      };
      break;
    case "amber":
      colorClass = {
        priceColor: "text-amber-400",
        buttonColor: "bg-amber-400 hover:bg-amber-500",
      };
      break;
    default:
      colorClass = {
        priceColor: "text-blue-600",
        buttonColor: "bg-blue-600 hover:bg-blue-700",
      };
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollPercentage = (scrollPosition / windowHeight) * 100;

      // 스크롤이 화면 높이의 50% 이상일 때 보이기
      const shouldShowFromScroll = scrollPercentage >= 50;

      // footer가 보이지 않고, 스크롤 조건을 만족할 때만 보이기
      setIsVisible(shouldShowFromScroll && !isFooterVisible);
    };

    // 초기 상태 설정
    handleScroll();

    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 클린업
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFooterVisible]);

  useEffect(() => {
    // footer 요소를 찾아서 Intersection Observer 설정
    const footerElement = document.querySelector("footer");

    if (!footerElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsFooterVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1, // footer의 10%가 보이면 감지
        rootMargin: "0px 0px 0px 0px",
      },
    );

    observer.observe(footerElement);

    // 클린업
    return () => {
      observer.disconnect();
    };
  }, []);

  // 가시성 상태가 바뀔 때마다 브라우저 전역에 이벤트를 브로드캐스트 (모바일에서 사용)
  useEffect(() => {
    const height = containerRef.current?.offsetHeight ?? 0;
    const state = { visible: isVisible, height };
    (
      globalThis as unknown as {
        __mobileBottomBarState?: { visible: boolean; height: number };
      }
    ).__mobileBottomBarState = state;
    const event = new CustomEvent("mobile-bottom-bar:visibility", {
      detail: state,
    });
    window.dispatchEvent(event);

    // 언마운트 시 숨김 상태를 알림
    return () => {
      const hideState = { visible: false, height: 0 };
      (
        globalThis as unknown as {
          __mobileBottomBarState?: { visible: boolean; height: number };
        }
      ).__mobileBottomBarState = hideState;
      const hideEvent = new CustomEvent("mobile-bottom-bar:visibility", {
        detail: hideState,
      });
      window.dispatchEvent(hideEvent);
    };
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      id="mobile-bottom-bar"
      className={`fixed right-0 bottom-0 left-0 z-40 border-t border-gray-200 bg-white p-4 transition-transform duration-300 ease-in-out lg:hidden ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className={`text-lg font-bold ${colorClass.priceColor}`}>
            ₩{price}
          </div>
          <div className="text-sm text-gray-600">
            {baseMember || `${time} 기본`} 요금
          </div>
        </div>

        <BookingDrawer
          title={title}
          price={price}
          time={time}
          destinationId={destinationId}
          peopleOptions={peopleOptions}
          priceByPeople={priceByPeople}
          inquiryDeposit={inquiryDeposit}
          color={color}
        >
          <Button
            className={`px-8 text-white ${colorClass.buttonColor}`}
            size="lg"
            disabled={disabled}
          >
            {disabled ? "현재 예약 불가능" : "예약하기"}
          </Button>
        </BookingDrawer>
      </div>
    </div>
  );
}
