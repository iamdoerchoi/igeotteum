// src/components/layout/Header.tsx
"use client";
import { Youtube, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import SearchBar from "../common/SearchBar";

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
        <div className="hidden md:flex flex-1 justify-center max-w-[600px]">
          <SearchBar />
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
