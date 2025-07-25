import type { Metadata } from "next";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";
import { QueryProvider } from "@/providers/query";

import { CounterStoreProvider } from "@/providers/counter-store-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: {
    template: "%s | 말랑트립",
    default: "말랑트립",
  },
  description:
    "버스보다 빠르고, 택시보다 저렴하게! 택시 카풀 여행 플랫폼 말랑트립",
  keywords: [
    "말랑트립",
    "말랑 트립",
    "Mallangtrip",
    "mallangtrip",
    "Mallang trip",
    "mallang trip",
  ],
  openGraph: {
    title: "말랑트립",
    description:
      "버스보다 빠르고, 택시보다 저렴하게! 택시 카풀 여행 플랫폼 말랑트립",
    images:
      "https://mallang-trip-db.s3.ap-northeast-2.amazonaws.com/profile/9a360955-8f22-4911-9708-53b1065f9b5amallangtrip.png",
    url: "https://mallangtrip.com",
    type: "website",
    siteName: "말랑트립",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          <CounterStoreProvider>
            {children}
            <Toaster />
          </CounterStoreProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

// 모바일 화면 레이아웃
// function layout() {
//   return (
//     <div className="tw-flex tw-justify-center tw-bg-[#F2F4F6]">
//       <main className="tw-min-h-screen tw-w-screen tw-min-w-[320px] tw-max-w-[420px] tw-bg-white">
//         <div className="tw-flex tw-h-full tw-w-full tw-flex-col tw-justify-center">
//           main content
//         </div>
//       </main>
//     </div>
//   );
// }
