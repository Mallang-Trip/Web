import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "비오는날 서울투어",
  description:
    "내가 원하는 코스, 친절한 기사님과 함께 서울의 모든 것을 경험하세요.",
  keywords: [
    "말랑트립",
    "말랑 트립",
    "Mallangtrip",
    "mallangtrip",
    "Mallang trip",
    "mallang trip",
    "비오는날 서울투어",
  ],
  openGraph: {
    title: "비오는날 서울투어 | 말랑트립",
    description:
      "내가 원하는 코스, 친절한 기사님과 함께 서울의 모든 것을 경험하세요.",
    images:
      "https://mallang-trip-db.s3.ap-northeast-2.amazonaws.com/profile/55e2af66-460e-4dd7-8c1f-97ce194b48fe%EC%96%91%ED%8F%89.jpg",
    url: "https://mallang-trip.vercel.app/tour/seoul",
  },
};

export default function SeoulDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
