import Header from "@/components/layout/Header";

import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "이거뜸 - 글로벌 유튜브 트렌드 분석",
  description:
    "한국, 미국, 일본 등 전 세계 유튜브 인기 급상승 동영상을 한눈에 확인하세요.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "이거뜸 - 글로벌 유튜브 트렌드 분석",
    description: "지금 가장 핫한 유튜브 트렌드, 국가별로 비교해보세요.",
    url: "https://igeotteum.vercel.app",
    siteName: "이거뜸",
    images: [
      {
        url: "/images/igeotteum_og_image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
