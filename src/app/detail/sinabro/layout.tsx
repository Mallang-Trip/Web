import type { Metadata } from "next";
import { cookies } from "next/headers";
import { baseUrl } from "@/lib/env";
import { translations } from "@/locales";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value as "ko" | "en") || "ko";
  const t = translations[locale].sinabro.metadata;

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
      "시나브로 와이너리",
      "프라이빗 투어",
    ],
    openGraph: {
      title: `${t.title} | Mallangtrip`,
      description: t.description,
      images: "/tour-images/sinabro/00.jpg",
      url: `${baseUrl}/detail/sinabro`,
    },
  };
}

export default function SinabroDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
