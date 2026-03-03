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
      className={`rounded-xl bg-muted p-3 text-sm transition-colors cursor-pointer ${isExpanded ? "bg-muted/80" : "hover:bg-muted/70"}`}
      onClick={() => setIsExpanded(!isExpanded)} // 박스 전체 클릭 시 토글
    >
      <div className="mb-2 flex gap-2 font-bold text-foreground">
        <span>조회수 {Number(viewCount).toLocaleString()}회</span>
        <span className="text-muted-foreground/60">•</span>
        <span>{formattedDate}</span>
      </div>

      <div className="relative">
        <p className={`whitespace-pre-wrap leading-relaxed text-foreground/90 ${isExpanded ? "" : "line-clamp-3"}`}>
          {description}
        </p>

        {/* 더보기 버튼 */}
        <button
          className="mt-2 font-bold text-muted-foreground text-xs hover:text-foreground"
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
