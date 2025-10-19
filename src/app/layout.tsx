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
import { ThemeProvider } from "@/providers/theme-provider";

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
    <html lang="ko" suppressHydrationWarning>
      <body>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
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
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
