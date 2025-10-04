import type { Metadata } from "next";
import { baseUrl } from "@/lib/env";

export const metadata: Metadata = {
  title: "시나브로 와이너리 프라이빗 투어",
  description:
    "계절별 특별 체험과 수상작 와인, 집같은 따뜻함이 있는 우리 그룹만을 위한 가장 프라이빗한 와인 체험을 만나보세요.",
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
    title: "시나브로 와이너리 | 말랑트립",
    description:
      "계절별 특별 체험과 수상작 와인, 집같은 따뜻함이 있는 우리 그룹만을 위한 가장 프라이빗한 와인 체험을 만나보세요.",
    images: "/tour-images/sinabro/00.jpg",
    url: `${baseUrl}/detail/sinabro`,
  },
};

export default function SinabroDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
