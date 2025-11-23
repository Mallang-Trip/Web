import type { Metadata } from "next";
import { cookies } from "next/headers";
import { baseUrl } from "@/lib/env";
import { translations } from "@/locales";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value as "ko" | "en") || "ko";
  const t = translations[locale].yeongdong.metadata;

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
      "프라이빗 도어투도어",
      "영동 와이너리 투어",
      "Yeongdong Winery",
      "Korean Wine Tour",
      "Private Wine Tour",
    ],
    openGraph: {
      title: `${t.title} | Mallangtrip`,
      description: t.description,
      images:
        "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1440",
      url: `${baseUrl}/detail/yeongdong`,
    },
  };
}

export default function YeongdongDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
