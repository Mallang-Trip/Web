import type { Metadata } from "next";
import { baseUrl } from "@/lib/env";

export const metadata: Metadata = {
  title: "프라이빗 도어투도어 - 양조장 투어",
  description:
    "한국 전통주 장인의 세계로 떠나는 유일한 올인클루시브 큐레이션 여정",
  keywords: [
    "말랑트립",
    "말랑 트립",
    "Mallangtrip",
    "mallangtrip",
    "Mallang trip",
    "mallang trip",
    "프라이빗 도어투도어",
    "양조장 투어",
  ],
  openGraph: {
    title: "양조장 투어 | 말랑트립",
    description:
      "한국 전통주 장인의 세계로 떠나는 유일한 올인클루시브 큐레이션 여정",
    images: "/tour-images/vip/Yesan/01.jpg",
    url: `${baseUrl}/detail/vip`,
  },
};

export default function VipDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
