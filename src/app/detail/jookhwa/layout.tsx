import type { Metadata } from "next";
import { baseUrl } from "@/lib/env";

export const metadata: Metadata = {
  title: "조옥화 안동소주 프라이빗 투어",
  description:
    "3대째 전승하는 전통 양조법과 맞춤형 칵테일 체험, 우리 그룹만을 위한 가장 프라이빗한 안동소주 체험을 만나보세요.",
  keywords: [
    "말랑트립",
    "말랑 트립",
    "Mallangtrip",
    "mallangtrip",
    "Mallang trip",
    "mallang trip",
    "조옥화 안동소주",
    "프라이빗 투어",
  ],
  openGraph: {
    title: "조옥화 안동소주 | 말랑트립",
    description:
      "3대째 전승하는 전통 양조법과 맞춤형 칵테일 체험, 우리 그룹만을 위한 가장 프라이빗한 안동소주 체험을 만나보세요.",
    images: "/tour-images/jookhwa/00.jpg",
    url: `${baseUrl}/detail/jookhwa`,
  },
};

export default function JookhwaDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
