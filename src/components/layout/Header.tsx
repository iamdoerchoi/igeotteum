// src/components/layout/Header.tsx
"use client";
import { Youtube, Search, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* 로고 영역 */}
        <motion.div
          className="flex items-center gap-2 cursor-pointer"
          whileHover={{ scale: 1.1 }} // 마우스 올리면 1.1배 커짐
          whileTap={{ scale: 0.95 }} // 클릭하면 살짝 작아짐
          transition={{ type: "spring", stiffness: 400, damping: 17 }} // 부드러운 튕김 효과
        >
          <Youtube className="h-8 w-8 text-red-600" />
          <span className="text-xl font-bold tracking-tighter">이거뜸!</span>
        </motion.div>

        {/* 검색창 (데스크탑) */}
        <div className="hidden md:flex w-full max-w-sm items-center space-x-2">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="급상승 트렌드 검색..."
              className="w-full rounded-md border border-input bg-background px-9 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>

        {/* 우측 아이콘 영역 */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
