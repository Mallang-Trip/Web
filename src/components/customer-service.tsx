"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { useLangStore } from "@/stores/lang-store";
import Link from "next/link";

export default function CustomerService() {
  const { currentLanguage } = useLangStore();
  const [mobileBottomOffset, setMobileBottomOffset] = useState<number>(24); // bottom-6 기본값(px)

  // Tawk 위젯(iframe) 하단 오프셋 적용 유틸리티
  const applyTawkOffset = (offsetPx: number) => {
    let attempts = 0;
    const tryApply = () => {
      attempts += 1;

      const candidates: (HTMLElement | null)[] = [
        document.getElementById("tawkchat-container") as HTMLElement | null,
        (
          document.getElementById(
            "tawk-messenger-frame",
          ) as HTMLIFrameElement | null
        )?.parentElement as HTMLElement | null,
        document.querySelector(
          "iframe#tawk-messenger-frame",
        ) as HTMLElement | null,
        (
          document.querySelector(
            'iframe[title="chat widget"]',
          ) as HTMLIFrameElement | null
        )?.parentElement as HTMLElement | null,
        document.querySelector(
          'iframe[title="chat widget"]',
        ) as HTMLElement | null,
      ];

      const extra = Array.from(
        document.querySelectorAll<HTMLElement>(
          "#tawkchat-container, .tawk-min-container, .tawk-button",
        ),
      );

      const elements = [
        ...candidates.filter((e): e is HTMLElement => !!e),
        ...extra,
      ];
      if (elements.length === 0) return false;

      const px = `${offsetPx}px`;
      elements.forEach((el: HTMLElement) => {
        el.style.setProperty("bottom", px, "important");
      });
      return true;
    };

    if (tryApply()) return; // 즉시 적용 성공

    const interval = setInterval(() => {
      const ok = tryApply();
      if (ok || attempts > 60) {
        // 최대 약 15초 재시도 (250ms * 60)
        clearInterval(interval);
      }
    }, 250);
  };

  // 언어 변경 시 이미 로드된 위젯을 즉시 토글(표시/숨김)
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const applyToggle = () => {
      const api = (
        globalThis as unknown as {
          Tawk_API?: { showWidget?: () => void; hideWidget?: () => void };
        }
      )?.Tawk_API;
      if (!api) return false;
      if (currentLanguage === "en") {
        if (typeof api.showWidget === "function") api.showWidget();
      } else {
        if (typeof api.hideWidget === "function") api.hideWidget();
      }
      return true;
    };

    // 즉시 시도 후, API 미존재 시 짧게 폴링하여 반영
    if (!applyToggle()) {
      intervalId = setInterval(() => {
        if (applyToggle() && intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
      }, 300);
      // 최대 5초까지만 폴링
      timeoutId = setTimeout(() => {
        if (intervalId) clearInterval(intervalId);
        intervalId = null;
        timeoutId = null;
      }, 5000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [currentLanguage]);

  // 모바일 바텀 바 등장/퇴장에 맞춰 버튼 위치를 동적으로 조정 (모바일 화면에서만)
  useEffect(() => {
    // 초기 동기화: 바텀 바가 이미 보이는 상태로 로드될 수 있으므로, 저장된 전역 상태를 먼저 반영
    const initialState = (
      globalThis as unknown as {
        __mobileBottomBarState?: { visible: boolean; height: number };
      }
    ).__mobileBottomBarState;
    if (initialState) {
      const isMobileInit = window.matchMedia("(max-width: 1023.98px)").matches;
      if (isMobileInit) {
        if (initialState.visible) {
          const offset = Math.max(24, (initialState.height || 0) + 16);
          setMobileBottomOffset(offset);
          if (currentLanguage === "en") applyTawkOffset(offset);
        } else {
          setMobileBottomOffset(24);
          if (currentLanguage === "en") applyTawkOffset(24);
        }
      }
    }

    const onVisibility = (e: Event) => {
      const { visible, height } = (
        e as CustomEvent<{
          visible: boolean;
          height: number;
        }>
      ).detail || { visible: false, height: 0 };

      const isMobile = window.matchMedia("(max-width: 1023.98px)").matches; // < lg
      if (!isMobile) {
        setMobileBottomOffset(24);
        return;
      }

      if (visible) {
        // 바텀 바 높이 + 약간의 여유(16px)
        const offset = Math.max(24, (height || 0) + 16);
        setMobileBottomOffset(offset);
        if (currentLanguage === "en") applyTawkOffset(offset);
      } else {
        setMobileBottomOffset(24);
        if (currentLanguage === "en") applyTawkOffset(24);
      }
    };

    const onResize = () => {
      const isMobile = window.matchMedia("(max-width: 1023.98px)").matches;
      if (!isMobile) setMobileBottomOffset(24);
    };

    window.addEventListener(
      "mobile-bottom-bar:visibility",
      onVisibility as EventListener,
    );
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener(
        "mobile-bottom-bar:visibility",
        onVisibility as EventListener,
      );
      window.removeEventListener("resize", onResize);
    };
  }, [currentLanguage]);

  // Tawk 위젯이 지연 렌더링될 때도 자동 보정: DOM 변화 감시로 등장 즉시 오프셋 적용
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 1023.98px)").matches;
    if (!isMobile || currentLanguage !== "en") return;

    // 최초 한 번 시도
    applyTawkOffset(mobileBottomOffset);

    const observer = new MutationObserver(() => {
      applyTawkOffset(mobileBottomOffset);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // 10초 뒤 자동 해제(부하 방지). 이후 바텀 바 이벤트에서 다시 적용됨
    const timer = setTimeout(() => observer.disconnect(), 10000);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [currentLanguage, mobileBottomOffset]);

  return (
    <>
      {currentLanguage === "en" ? (
        <Script
          id="tawk-embed"
          strategy="afterInteractive"
          onLoad={() => {
            // Tawk API 초기화 대기
            const initTawk = () => {
              const api = (
                globalThis as unknown as {
                  Tawk_API?: {
                    showWidget?: () => void;
                    onChatMessageVisitor?: (callback: () => void) => void;
                    onChatMessageAgent?: (callback: () => void) => void;
                  };
                }
              )?.Tawk_API;

              if (!api) {
                setTimeout(initTawk, 100);
                return;
              }

              if (typeof api.showWidget === "function") api.showWidget();

              // 타이틀 깜빡임 방지: 원본 document.title 보존
              const originalTitle = document.title;
              const titleObserver = new MutationObserver(() => {
                if (document.title !== originalTitle) {
                  document.title = originalTitle;
                }
              });
              titleObserver.observe(
                document.querySelector("title") || document.head,
                {
                  childList: true,
                  characterData: true,
                  subtree: true,
                },
              );

              // 로드 직후 현재 오프셋을 한 번 적용 (모바일일 때)
              if (window.matchMedia("(max-width: 1023.98px)").matches) {
                applyTawkOffset(mobileBottomOffset);
              }
            };

            initTawk();
          }}
        >
          {`
            var Tawk_API = Tawk_API || {};
            var Tawk_LoadStart = new Date();
            (function() {
              var s1 = document.createElement("script"),
                s0 = document.getElementsByTagName("script")[0];
              s1.async = true;
              s1.src = 'https://embed.tawk.to/68b6dea7b4883d192503aeca/1j455bg1m';
              s1.charset = 'UTF-8';
              s1.setAttribute('crossorigin', '*');
              s0.parentNode.insertBefore(s1, s0);
            })();
          `}
        </Script>
      ) : null}

      {currentLanguage === "ko" ? (
        <Link
          href={
            process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL || "https://pf.kakao.com/"
          }
          target="_blank"
          rel="noopener noreferrer"
          aria-label="카카오톡 고객센터 열기"
          className="fixed right-6 bottom-6 z-50 h-14 w-14 flex-col items-center justify-between rounded-xl bg-[#FEE500] pt-1 shadow-lg ring-1 ring-[#FEE500] transition hover:brightness-95"
          style={{ bottom: mobileBottomOffset }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="mx-auto h-8 w-8 text-black"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 3C6.477 3 2 6.507 2 10.83c0 2.49 1.558 4.687 3.946 6.098-.152.58-.552 2.108-.632 2.432-.1.403.148.397.313.289.129-.084 2.05-1.39 2.888-1.96.718.106 1.46.162 2.222.162 5.523 0 10-3.507 10-7.83C20.737 6.507 17.523 3 12 3z" />
          </svg>
          <p className="text-center text-xs font-light">예약 문의</p>
        </Link>
      ) : null}
    </>
  );
}
