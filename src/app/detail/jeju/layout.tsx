import type { Metadata } from "next";
import { baseUrl } from "@/lib/env";
import { cookies } from "next/headers";
import { translations } from "@/locales";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value || "ko") as "ko" | "en" | "zh";
  const t = translations[locale]?.jeju?.metadata || translations.ko.jeju.metadata;

  return {
    title: t.title,
    description: t.description,
    keywords: [
      "말랑트립",
      "말랑 트립",
      "Mallangtrip",
      "mallangtrip",
      "Mallang trip",
      "mallang trip",
      t.title,
    ],
    openGraph: {
      title: `${t.title} | MallangTrip`,
      description: t.description,
      images:
        "https://images.unsplash.com/photo-1579169825453-8d4b4653cc2c?q=80&w=1440",
      url: `${baseUrl}/detail/jeju`,
      type: "website",
      siteName: "MallangTrip",
      locale: locale === "ko" ? "ko_KR" : locale === "zh" ? "zh_CN" : "en_US",
    },
  };
}

export default function JejuDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
