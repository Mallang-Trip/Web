import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "강릉 손님 마음대로 투어",
  description:
    "내가 원하는 코스, 친절한 기사님과 함께 강릉의 모든 것을 경험하세요.",
  keywords: [
    "말랑트립",
    "말랑 트립",
    "Mallangtrip",
    "mallangtrip",
    "Mallang trip",
    "mallang trip",
    "강릉 손님 마음대로 투어",
  ],
  openGraph: {
    title: "강릉 손님 마음대로 투어 | 말랑트립",
    description:
      "내가 원하는 코스, 친절한 기사님과 함께 강릉의 모든 것을 경험하세요.",
    images:
      "https://mallang-trip-db.s3.ap-northeast-2.amazonaws.com/profile/4ddb1918-ab15-4d15-ac1b-b54aa1e30a16%EA%B0%95%EB%A6%89.jpg",
    url: "https://mallang-trip.vercel.app/tour/gangneung",
  },
};

export default function GangneungDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
