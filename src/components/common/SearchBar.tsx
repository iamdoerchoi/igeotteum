// src/components/common/SearchBar.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    router.push(`/search?q=${encodeURIComponent(keyword)}`);
  };

  return (
    // mb-6 제거, max-w 설정 유지
    <form onSubmit={handleSubmit} className="w-full max-w-[400px] flex-1">
      <div className="relative flex items-center">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="검색..."
          // py-1.5로 헤더에 맞게 높이를 살짝 줄임
          className="w-full rounded-full border border-slate-300 bg-slate-100/50 px-4 py-1.5 pl-10 text-sm shadow-inner outline-none focus:border-red-500 focus:bg-white focus:ring-1 focus:ring-red-500 transition-all"
        />
        <div className="absolute left-3 text-slate-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </div>
    </form>
  );
}
