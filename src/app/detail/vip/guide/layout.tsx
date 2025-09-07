import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VIP 투어 미식 가이드",
  description: "안목 있는 여행자를 위한 큐레이션 가이드",
  keywords: [
    "말랑트립",
    "말랑 트립",
    "Mallangtrip",
    "mallangtrip",
    "Mallang trip",
    "mallang trip",
    "VIP 투어 미식 가이드",
  ],
  openGraph: {
    title: "VIP 투어 미식 가이드 | 말랑트립",
    description: "안목 있는 여행자를 위한 큐레이션 가이드",
    images:
      "https://mallang-trip-db.s3.ap-northeast-2.amazonaws.com/profile/9a360955-8f22-4911-9708-53b1065f9b5amallangtrip.png",
    url: "https://mallang-trip.vercel.app/detail/vip/guide",
  },
};

export default function VipGuideLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
