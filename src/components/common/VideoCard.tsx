"use client";

import Image from "next/image";
import Link from "next/link";
import { YoutubeVideo } from "@/types/video";
import { YOUTUBE_CATEGORY_MAP } from "@/lib/constants";

interface VideoCardProps {
  video: YoutubeVideo;
  rank?: number;
}

export default function VideoCard({ video, rank }: VideoCardProps) {
  const categoryName = YOUTUBE_CATEGORY_MAP[video.snippet.categoryId] || "기타";

  // 조회수 포맷팅
  const formatViewCount = (count: string) => {
    const num = Number(count);
    if (num >= 10000) return `${(num / 10000).toFixed(1)}만`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}천`;
    return num.toLocaleString();
  };

  // 순위 배지 스타일
  const getRankBadgeStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-yellow-400 text-yellow-950 border-2 border-yellow-500";
      case 2:
        return "bg-gray-300 text-gray-800 border-2 border-gray-400";
      case 3:
        return "bg-amber-600 text-white border-2 border-amber-700";
      default:
        return "bg-gray-800 text-white border border-gray-700";
    }
  };

  // 썸네일 URL
  const thumbnailUrl =
    video.snippet.thumbnails.high?.url || video.snippet.thumbnails.medium.url;

  return (
    <article className="group">
      <Link href={`/video/${video.id}`} className="block">
        {/* 썸네일 컨테이너 - 완전히 격리된 포지셔닝 컨텍스트 */}
        <div className="relative w-full mb-2.5 sm:mb-3">
          {/* aspect-ratio 패딩 트릭 사용 */}
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <div className="absolute inset-0 overflow-hidden rounded-lg sm:rounded-xl bg-slate-200 shadow-sm group-hover:shadow-md transition-shadow">
              <Image
                src={thumbnailUrl}
                alt={video.snippet.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                priority={rank ? rank <= 4 : false}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* 순위 배지 */}
            {rank && (
              <div
                className={`absolute left-2 top-2 flex h-6 sm:h-7 min-w-[24px] sm:min-w-[28px] items-center justify-center rounded px-1.5 sm:px-2 text-xs sm:text-sm font-bold shadow-lg z-10 ${getRankBadgeStyle(rank)}`}
              >
                {rank}
              </div>
            )}

            {/* 카테고리 태그 */}
            <div className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 sm:px-2 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-medium text-white backdrop-blur-sm z-10">
              {categoryName}
            </div>
          </div>
        </div>

        {/* 정보 영역 */}
        <div className="flex gap-2.5 sm:gap-3 px-0.5">
          {/* 채널 아바타 */}
          <div className="flex-shrink-0">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-gradient-to-br from-slate-100 to-slate-200 text-xs font-bold text-slate-600 shadow-inner">
              {video.snippet.channelTitle.charAt(0)}
            </div>
          </div>

          <div className="flex flex-col gap-0.5 sm:gap-1 min-w-0 flex-1">
            <h3 className="line-clamp-2 text-sm sm:text-[15px] font-bold leading-snug text-slate-900 group-hover:text-red-600 transition-colors">
              {video.snippet.title}
            </h3>

            <div className="text-xs sm:text-[13px] font-medium text-slate-500">
              <p className="truncate hover:text-slate-700">
                {video.snippet.channelTitle}
              </p>
              <p className="mt-0.5 text-slate-400 font-normal">
                조회수 {formatViewCount(video.statistics.viewCount)}회
              </p>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
