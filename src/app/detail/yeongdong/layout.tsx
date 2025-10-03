import type { Metadata } from "next";
import { baseUrl } from "@/lib/env";

export const metadata: Metadata = {
  title: "영동 와이너리 투어",
  description:
    "오직 우리만을 위한 하루, 소중한 사람들과 단독으로 즐기는 프라이빗 와인 여정",
  keywords: [
    "말랑트립",
    "말랑 트립",
    "Mallangtrip",
    "mallangtrip",
    "Mallang trip",
    "mallang trip",
    "프라이빗 도어투도어",
    "영동 와이너리 투어",
  ],
  openGraph: {
    title: "영동 와이너리 투어 | 말랑트립",
    description:
      "오직 우리만을 위한 하루, 소중한 사람들과 단독으로 즐기는 프라이빗 와인 여정",
    images:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1440",
    url: `${baseUrl}/detail/yeongdong`,
  },
};

export default function YeongdongDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
