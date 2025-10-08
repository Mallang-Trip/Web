"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  attachGlobalClickListener,
  collectClientInfo,
  initErrorListeners,
  pageview,
  setUser,
} from "@/lib/analytics";
import { useAuthStore } from "@/stores/auth-store";
import Script from "next/script";

export default function AnalyticsProvider() {
  const pathname = usePathname();
  const search = useSearchParams();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const phoneNumber = useAuthStore((s) => s.phoneNumber);

  useEffect(() => {
    initErrorListeners();
    attachGlobalClickListener();
    collectClientInfo();
    const onUnload = () => {
      try {
        const w = window as unknown as { dataLayer?: unknown[] };
        w.dataLayer = w.dataLayer || [];
        (w.dataLayer as Array<Record<string, unknown>>).push({
          event: "session_end",
        });
      } catch {}
    };
    window.addEventListener("beforeunload", onUnload);
    return () => window.removeEventListener("beforeunload", onUnload);
  }, []);

  useEffect(() => {
    setUser(isAuthenticated ? phoneNumber : undefined);
  }, [isAuthenticated, phoneNumber]);

  useEffect(() => {
    if (!pathname) return;
    const url = pathname + (search?.toString() ? `?${search.toString()}` : "");
    pageview(url);
  }, [pathname, search]);

  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <>
      {gaId ? (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          />
          <Script id="ga4-gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', { send_page_view: false });
            `}
          </Script>
        </>
      ) : null}

      {gtmId ? (
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `}
        </Script>
      ) : null}
    </>
  );
}
