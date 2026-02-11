"use client";

import Image from "next/image";
// import Link from "next/link"; // ❌ Link는 사용하지 않습니다.
import { YoutubeVideo } from "@/types/video";
import { YOUTUBE_CATEGORY_MAP } from "@/lib/constants";
import { decode } from "html-entities"; // (선택사항: 특수문자 깨짐 방지용)

interface VideoCardProps {
  video: YoutubeVideo;
  rank?: number;
}

export default function VideoCard({ video, rank }: VideoCardProps) {
  // 카테고리 이름 가져오기
  const categoryName = YOUTUBE_CATEGORY_MAP[video.snippet.categoryId] || "기타";

  // 조회수 포맷팅 (예: 12000 -> 1.2만)
  const formatViewCount = (count: string) => {
    const num = Number(count);
    if (num === 0) return "집계중";
    if (num >= 10000) {
      return (num / 10000).toFixed(1) + "만";
    }
    return num.toLocaleString();
  };

  // 1~3위 랭킹 스타일
  const getRankBadgeStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-red-600 text-white border-red-700";
      case 2:
        return "bg-orange-500 text-white border-orange-600";
      case 3:
        return "bg-yellow-500 text-white border-yellow-600";
      default:
        return "bg-slate-800/80 text-white backdrop-blur-sm border-transparent";
    }
  };

  // 썸네일 URL (고해상도 없으면 중간 해상도 사용)
  const thumbnailUrl =
    video.snippet.thumbnails.high?.url || video.snippet.thumbnails.medium.url;

  return (
    // 🔥 핵심 수정: Link -> a 태그, target="_blank" 추가
    <a
      href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-3 cursor-pointer"
    >
      {/* 썸네일 영역 */}
      <div className="relative w-full overflow-hidden rounded-xl bg-slate-200 shadow-sm group-hover:shadow-md transition-shadow aspect-video">
        <Image
          src={thumbnailUrl}
          alt={video.snippet.title}
          fill
          priority={rank ? rank <= 4 : false}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* 랭킹 배지 */}
        {rank && (
          <div
            className={`absolute top-2 left-2 flex h-7 min-w-[28px] items-center justify-center rounded px-1.5 text-sm font-bold shadow-sm border ${getRankBadgeStyle(rank)}`}
          >
            {rank}
          </div>
        )}

        {/* 카테고리 배지 (우측 하단) */}
        <div className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
          {categoryName}
        </div>
      </div>

      {/* 정보 영역 */}
      <div className="flex gap-3 px-1">
        {/* 채널 아이콘 (임시로 첫 글자 표시) */}
        <div className="flex-shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-slate-100 to-slate-200 text-xs font-bold text-slate-600 shadow-inner">
            {video.snippet.channelTitle.charAt(0)}
          </div>
        </div>

        <div className="flex flex-col gap-1 min-w-0">
          {/* 제목 (2줄 제한) */}
          <h3 className="line-clamp-2 text-[15px] font-bold leading-snug text-slate-900 group-hover:text-red-600 transition-colors">
            {decode(video.snippet.title)}
          </h3>

          {/* 채널명 및 조회수 */}
          <div className="text-[13px] font-medium text-slate-500">
            <p className="truncate hover:text-slate-700">
              {video.snippet.channelTitle}
            </p>
            <p className="mt-0.5 text-slate-400 font-normal">
              조회수 {formatViewCount(video.statistics.viewCount)}회 •{" "}
              {new Date(video.snippet.publishedAt).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
}
