// src/components/layout/Footer.tsx
import { Github, Linkedin, Mail, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          {/* 서비스 소개 영역 */}
          <div className="space-y-4 max-w-md">
            <Link href="/" className="flex items-center gap-2 group">
              <Youtube className="h-6 w-6 text-red-600" />
              <span className="text-xl font-bold tracking-tighter">이거뜸!</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              지금 당장 뜨고 있는 유튜브 트렌드를 가장 빠르게 확인하세요. 
              국가별 인기 급상승 동영상을 한눈에 파악할 수 있는 서비스입니다.
            </p>
          </div>

          {/* 개발자 홍보 영역 */}
          <div className="space-y-4 min-w-[200px]">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Developed by
            </h3>
            <div className="space-y-3">
              <p className="text-sm font-medium">유튜브 트렌드 분석가 & 개발자</p>
              <div className="flex gap-4">
                <Link
                  href="https://github.com/iamdoerchoi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  title="GitHub"
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/joong8812/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  title="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link
                  href="mailto:doerchoi.dev@gmail.com"
                  className="p-2.5 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  title="Contact Email"
                >
                  <Mail className="h-5 w-5" />
                </Link>
              </div>
              <p className="text-xs text-muted-foreground italic">
                &quot;AI와 협업하여 더 가치 있는 서비스를 만듭니다.&quot;
              </p>
            </div>
          </div>
        </div>

        {/* 카피라이트 영역 */}
        <div className="mt-12 pt-8 border-t text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} 이거뜸! All rights reserved.
          </p>
          <p className="text-[10px] text-muted-foreground/60 uppercase tracking-widest font-medium">
            Powered by YouTube Data API v3
          </p>
        </div>
      </div>
    </footer>
  );
}
