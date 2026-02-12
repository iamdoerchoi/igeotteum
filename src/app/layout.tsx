import Header from "@/components/layout/Header";

import "./globals.css";
import { Metadata } from "next";

import { GoogleAnalytics } from "@next/third-parties/google";

import { ToastProvider } from "@/context/ToastContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://igeotteum.vercel.app"),
  title: {
    default: "이거뜸 - 글로벌 유튜브 트렌드 분석",
    template: "%s | 이거뜸",
  },
  description:
    "한국, 미국, 일본 등 전 세계 유튜브 인기 급상승 동영상을 한눈에 확인하세요.",
  keywords: ["유튜브", "인급동", "인기급상승", "트렌드", "유튜브순위"],
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
  verification: {
    google: "AKkadg8OM5gXnZvJVI7wzAVCe13Tpj3Yi1QbmDZdhq0",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_GA_ID
      : undefined;

  return (
    <html lang="ko">
      <body>
        <ToastProvider>
          <Header />
          <main>{children}</main>
        </ToastProvider>
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
