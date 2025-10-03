import type { Metadata } from "next";
import { baseUrl } from "@/lib/env";

export const metadata: Metadata = {
  title: "좋은술 천비향 프라이빗 투어",
  description:
    "대통령의 만찬주, 우리 그룹만을 위한 가장 프라이빗한 경험을 가장 편리하게 만나보세요.",
  keywords: [
    "말랑트립",
    "말랑 트립",
    "Mallangtrip",
    "mallangtrip",
    "Mallang trip",
    "mallang trip",
    "좋은술 천비향",
    "프라이빗 투어",
  ],
  openGraph: {
    title: "좋은술 천비향 | 말랑트립",
    description:
      "대통령의 만찬주, 우리 그룹만을 위한 가장 프라이빗한 경험을 가장 편리하게 만나보세요.",
    images:
      "https://images.unsplash.com/photo-1691071103572-d6bee8d998f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0cmFkaXRpb25hbCUyMGJyZXdlcnklMjBidWlsZGluZ3xlbnwxfHx8fDE3NTg4OTA5ODd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    url: `${baseUrl}/detail/chunbi`,
  },
};

export default function ChunbiDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
