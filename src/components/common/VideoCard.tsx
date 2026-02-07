"use client";

import Image from "next/image";
import Link from "next/link";
import { YoutubeVideo } from "@/types/video";
import { YOUTUBE_CATEGORY_MAP } from "@/lib/constants"; // 1번에서 만든 상수 import

interface VideoCardProps {
  video: YoutubeVideo;
  rank?: number; // rank는 선택적 prop으로 추가 (상세페이지 등에서는 안 쓸 수도 있으니까요)
}

export default function VideoCard({ video, rank }: VideoCardProps) {
  // 카테고리 ID를 이용해 한글 이름 찾기 (없으면 '기타')
  const categoryName = YOUTUBE_CATEGORY_MAP[video.snippet.categoryId] || "기타";

  return (
    <Link href={`/video/${video.id}`} className="block">
      <div className="flex flex-col gap-3 w-[320px] mx-auto group cursor-pointer">
        {/* 썸네일 영역 */}
        <div className="relative w-[320px] h-[180px] overflow-hidden rounded-xl bg-slate-100 shadow-sm">
          <Image
            src={
              video.snippet.thumbnails.high?.url ||
              video.snippet.thumbnails.medium.url
            }
            alt={video.snippet.title}
            width={320}
            height={180}
            priority={rank ? rank <= 4 : false} // 1~4위는 LCP 최적화를 위해 priority 적용
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />

          {/* 🔥 순위 배지 (rank가 있을 때만 표시) */}
          {rank && (
            <div className="absolute top-2 left-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded-md backdrop-blur-sm">
              {rank}위
            </div>
          )}

          {/* 🔥 카테고리 배지 (우측 하단) */}
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-medium px-1.5 py-0.5 rounded backdrop-blur-sm">
            {categoryName}
          </div>
        </div>

        {/* 텍스트 정보 */}
        <div className="flex flex-col gap-1 px-1">
          <h3 className="line-clamp-2 text-sm font-bold leading-snug group-hover:text-red-600 transition-colors">
            {video.snippet.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
            <span>{video.snippet.channelTitle}</span>
            <span className="w-0.5 h-0.5 bg-slate-400 rounded-full" />
            <span>
              조회수 {Number(video.statistics.viewCount).toLocaleString()}회
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
