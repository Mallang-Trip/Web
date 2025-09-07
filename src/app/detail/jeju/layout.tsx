import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "제주도 택시 투어",
  description:
    "내가 원하는 코스, 친절한 기사님과 함께 제주의 모든 것을 경험하세요.",
  keywords: [
    "말랑트립",
    "말랑 트립",
    "Mallangtrip",
    "mallangtrip",
    "Mallang trip",
    "mallang trip",
    "제주도 택시 투어",
  ],
  openGraph: {
    title: "제주도 택시 투어 | 말랑트립",
    description:
      "내가 원하는 코스, 친절한 기사님과 함께 제주의 모든 것을 경험하세요.",
    images:
      "https://images.unsplash.com/photo-1579169825453-8d4b4653cc2c?q=80&w=1440",
    url: "https://mallang-trip.vercel.app/detail/jeju",
  },
};

export default function JejuDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
