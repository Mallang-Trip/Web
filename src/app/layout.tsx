import type { Metadata } from "next";
import { Suspense } from "react";
import { cookies } from "next/headers";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";
import { QueryProvider } from "@/providers/query";
import { TokenRefreshProvider } from "@/providers/token-refresh-provider";

import { CounterStoreProvider } from "@/providers/counter-store-provider";
import { FirstEntryProvider } from "@/providers/first-entry-provider";
import { baseUrl } from "@/lib/env";
import LayoutShell from "@/components/layout-shell";
import AnalyticsProvider from "@/providers/analytics-provider";
import Loading from "@/components/loading";
import { LangInitProvider } from "@/providers/lang-init-provider";
import { translations } from "@/locales";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value as "ko" | "en") || "ko";
  const t = translations[locale].common.metadata;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      template: `%s | ${t.title}`,
      default: t.title,
    },
    description: t.description,
    keywords: [
      "말랑트립",
      "말랑 트립",
      "Mallangtrip",
      "mallangtrip",
      "Mallang trip",
      "mallang trip",
    ],
    openGraph: {
      title: t.title,
      description: t.description,
      images:
        "https://mallang-trip-db.s3.ap-northeast-2.amazonaws.com/profile/9a360955-8f22-4911-9708-53b1065f9b5amallangtrip.png",
      url: baseUrl,
      type: "website",
      siteName: t.title,
      locale: locale === "ko" ? "ko_KR" : "en_US",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          <CounterStoreProvider>
            <TokenRefreshProvider>
              <LangInitProvider />
              <FirstEntryProvider />
              <Suspense fallback={<Loading />}>
                <AnalyticsProvider />
              </Suspense>
              <LayoutShell>{children}</LayoutShell>
            </TokenRefreshProvider>
          </CounterStoreProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

// 모바일 화면 레이아웃
// function layout() {
//   return (
//     <div className="tw-flex tw-justify-center tw-bg-[#F2F4F6]">
//       <main className="tw-min-h-screen tw-w-screen tw-min-w-[320px] tw-max-w-[420px] tw-bg-white">
//         <div className="tw-flex tw-h-full tw-w-full tw-flex-col tw-justify-center">
//           main content
//         </div>
//       </main>
//     </div>
//   );
// }
