import type { Metadata } from "next";
import { cookies } from "next/headers";
import { translations } from "@/locales";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value as "ko" | "en") || "ko";
  const t = translations[locale].my.metadata;

  return {
    title: t.title,
  };
}

export default function MyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
