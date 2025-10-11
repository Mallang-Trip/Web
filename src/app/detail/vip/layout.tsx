import type { Metadata } from "next";
import { cookies } from "next/headers";
import { baseUrl } from "@/lib/env";
import { translations } from "@/locales";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value as "ko" | "en") || "ko";
  const t = translations[locale].vip.metadata;

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
      "양조장 투어",
    ],
    openGraph: {
      title: `${t.title} | Mallangtrip`,
      description: t.description,
      images: "/tour-images/vip/Yesan/01.jpg",
      url: `${baseUrl}/detail/vip`,
    },
  };
}

export default function VipDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
