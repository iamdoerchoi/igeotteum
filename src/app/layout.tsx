import Header from "@/components/layout/Header";

import "./globals.css";
import { Metadata } from "next";

import { GoogleAnalytics } from "@next/third-parties/google";

import { ToastProvider } from "@/context/ToastContext";
import { ThemeProvider } from "@/components/common/ThemeProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://igeotteum.vercel.app"),
  title: {
    default: "이거뜸 | 실시간 유튜브 인기 급상승 동영상 트렌드",
    template: "%s | 이거뜸",
  },
  description:
    "지금 당장 이거뜸! 한국, 미국, 일본 등 전 세계 유튜브 인기 급상승 동영상(인급동) 순위와 트렌드를 이거뜸에서 가장 빠르게 확인하세요.",
  keywords: [
    "이거뜸",
    "유튜브 인급동",
    "유튜브 인기급상승",
    "유튜브 트렌드",
    "유튜브 순위",
    "실시간 유튜브",
    "글로벌 유튜브",
  ],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "이거뜸 | 실시간 유튜브 인기 급상승 동영상 트렌드",
    description: "지금 당장 이거뜸! 전 세계 유튜브 인급동 순위를 한눈에 확인하세요.",
    url: "https://igeotteum.vercel.app",
    siteName: "이거뜸",
    images: [
      {
        url: "/images/igeotteum_og_image.jpg",
        width: 1200,
        height: 630,
        alt: "이거뜸 - 실시간 유튜브 트렌드",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  verification: {
    google: "AKkadg8OM5gXnZvJVI7wzAVCe13Tpj3Yi1QbmDZdhq0",
  },
  alternates: {
    canonical: "https://igeotteum.vercel.app",
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
    <html lang="ko" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToastProvider>
            <Header />
            <main>{children}</main>
          </ToastProvider>
        </ThemeProvider>
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
