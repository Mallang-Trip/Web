/*
  Lightweight GA4/GTM helper. Prefer pushing to dataLayer to work with GTM, while
  also calling gtag if present. All functions are no-ops on server.
*/

export type AnalyticsEventParams = Record<string, unknown>;

const isBrowser = typeof window !== "undefined";

function ensureDataLayer(): any[] | undefined {
  if (!isBrowser) return undefined;
  (window as any).dataLayer = (window as any).dataLayer || [];
  return (window as any).dataLayer as any[];
}

export function pushDataLayer(payload: AnalyticsEventParams) {
  const dl = ensureDataLayer();
  if (!dl) return;
  try {
    dl.push(payload);
  } catch {}
}

export function gtagEvent(event: string, params?: AnalyticsEventParams) {
  if (!isBrowser) return;
  try {
    const gtag = (window as any).gtag as
      | ((...args: unknown[]) => void)
      | undefined;
    if (gtag) gtag("event", event, params || {});
  } catch {}
}

export function track(event: string, params?: AnalyticsEventParams) {
  pushDataLayer({ event, ...(params || {}) });
  gtagEvent(event, params);
}

export function setUser(id?: string | null, properties?: AnalyticsEventParams) {
  if (!isBrowser) return;
  const userId = id || undefined;
  pushDataLayer({ user_id: userId, user_properties: properties || {} });
  try {
    const gtag = (window as any).gtag as
      | ((...args: unknown[]) => void)
      | undefined;
    if (gtag) {
      if (userId) gtag("set", { user_id: userId });
      if (properties) gtag("set", "user_properties", properties);
    }
  } catch {}
}

export function pageview(path: string, title?: string) {
  const params = { page_location: path, page_title: title } as const;
  track("page_view", params as unknown as AnalyticsEventParams);
}

export type EcommerceItem = {
  item_id: string;
  item_name: string;
  price?: number;
  quantity?: number;
};

export function trackAddPaymentInfo(params: {
  currency: string;
  value: number;
  items: EcommerceItem[];
}) {
  track("add_payment_info", { ecommerce: params });
}

export function trackPurchase(params: {
  transaction_id: string | number;
  currency: string;
  value: number;
  items: EcommerceItem[];
}) {
  track("purchase", { ecommerce: params });
}

export function initErrorListeners() {
  if (!isBrowser) return;
  // Global JS error tracking
  window.addEventListener(
    "error",
    (e) => {
      try {
        track("js_error", {
          message: (e as ErrorEvent).message,
          source: (e as ErrorEvent).filename,
          lineno: (e as ErrorEvent).lineno,
          colno: (e as ErrorEvent).colno,
        });
      } catch {}
    },
    { capture: true },
  );
  window.addEventListener(
    "unhandledrejection",
    (e) => {
      try {
        track("promise_rejection", {
          reason: String((e as PromiseRejectionEvent).reason || ""),
        });
      } catch {}
    },
    { capture: true },
  );
}

export function collectClientInfo() {
  if (!isBrowser) return;
  try {
    const nav = window.navigator as any;
    track("client_info", {
      language: nav.language,
      languages: (nav.languages || []).join(","),
      userAgent: nav.userAgent,
      platform: nav.platform,
      screen: `${window.screen.width}x${window.screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  } catch {}
}

export function attachGlobalClickListener() {
  if (!isBrowser) return;
  document.addEventListener(
    "click",
    (e) => {
      try {
        const target = e.target as HTMLElement | null;
        if (!target) return;
        const button = target.closest("[data-slot='button'],button,a");
        if (!button) return;

        // data-ga-event 속성이 있는지 확인 (우선순위 높음)
        const gaEvent = button.getAttribute("data-ga-event");
        const gaCategory = button.getAttribute("data-ga-category");
        const gaLabel = button.getAttribute("data-ga-label");
        const gaParamsStr = button.getAttribute("data-ga-params");

        // 명시적으로 GA 이벤트가 정의된 경우
        if (gaEvent) {
          let params: AnalyticsEventParams = {};

          // JSON 파라미터 파싱
          if (gaParamsStr) {
            try {
              params = JSON.parse(gaParamsStr);
            } catch {
              // 파싱 실패 시 빈 객체 사용
            }
          }

          // category와 label 추가
          if (gaCategory) params.category = gaCategory;
          if (gaLabel) params.label = gaLabel;

          // 버튼 텍스트를 button_text로 추가 (디버깅용)
          const buttonText = (
            button.getAttribute("aria-label") ||
            button.textContent ||
            ""
          )
            .trim()
            .slice(0, 80);
          if (buttonText) params.button_text = buttonText;

          // 명시적 이벤트 전송
          track(gaEvent, params);
          return;
        }

        // data-ga-event가 없는 경우, 기존 fallback 로직 사용
        const name = (
          button.getAttribute("aria-label") ||
          button.textContent ||
          ""
        )
          .trim()
          .slice(0, 80);

        track("ui_button_click", {
          name: name || undefined,
          tag: button.tagName,
          id: (button as HTMLElement).id || undefined,
          classes: (button as HTMLElement).className || undefined,
        });
      } catch {}
    },
    { capture: true },
  );
}

export function getCurrencyByLanguage(lang: string | undefined) {
  return lang === "en" ? "USD" : "KRW";
}
