import type { Metadata } from "next";
import { cookies } from "next/headers";
import { baseUrl } from "@/lib/env";
import { translations } from "@/locales";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value as "ko" | "en") || "ko";
  const t = translations[locale].jookhwa.metadata;

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
      "조옥화 안동소주",
      "프라이빗 투어",
      "Jo Ok-hwa",
      "Andong Soju",
      "Private Tour",
      "Korean Traditional Liquor",
    ],
    openGraph: {
      title: `${t.title} | Mallangtrip`,
      description: t.description,
      images: "/tour-images/jookhwa/00.jpg",
      url: `${baseUrl}/detail/jookhwa`,
    },
  };
}

export default function JookhwaDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
