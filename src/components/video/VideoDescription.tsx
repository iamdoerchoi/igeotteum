"use client"; // 상태 관리를 위해 클라이언트 컴포넌트 선언

import { useState } from "react";

interface VideoDescriptionProps {
  description: string;
  viewCount: string;
  publishedAt: string;
}

export default function VideoDescription({ description, viewCount, publishedAt }: VideoDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // 날짜 포맷팅
  const formattedDate = new Date(publishedAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className={`rounded-xl bg-slate-100 p-3 text-sm transition-colors ${isExpanded ? "bg-slate-200/50" : "hover:bg-slate-200"}`}
      onClick={() => setIsExpanded(!isExpanded)} // 박스 전체 클릭 시 토글
    >
      <div className="mb-2 flex gap-2 font-bold text-slate-900">
        <span>조회수 {Number(viewCount).toLocaleString()}회</span>
        <span className="text-slate-400">•</span>
        <span>{formattedDate}</span>
      </div>

      <div className="relative">
        <p className={`whitespace-pre-wrap leading-relaxed text-slate-700 ${isExpanded ? "" : "line-clamp-3"}`}>
          {description}
        </p>

        {/* 더보기 버튼 */}
        <button
          className="mt-2 font-bold text-slate-600 text-xs hover:text-slate-900"
          onClick={(e) => {
            e.stopPropagation(); // 버튼 클릭 시 부모 클릭 이벤트 전파 방지 (선택 사항)
            setIsExpanded(!isExpanded);
          }}
        >
          {isExpanded ? "접기" : "더보기..."}
        </button>
      </div>
    </div>
  );
}
