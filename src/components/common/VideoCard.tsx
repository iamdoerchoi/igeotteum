"use client";

import Image from "next/image";

import { YoutubeVideo } from "@/types/video";

import clsx from "clsx";
import { decode } from "html-entities"; // (선택사항: 특수문자 깨짐 방지용)
import { YOUTUBE_CATEGORY_MAP } from "@/lib/constants";

import { useToast } from "@/context/ToastContext";

interface VideoCardProps {
  video: YoutubeVideo;
  rank?: number;
}

export default function VideoCard({ video, rank }: VideoCardProps) {
  const { showToast } = useToast();

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

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault(); // 부모 링크 클릭 방지 (중요! ⭐)
    e.stopPropagation(); // 이벤트 전파 방지

    const link = `https://www.youtube.com/watch?v=${video.id}`;

    try {
      await navigator.clipboard.writeText(link);
      showToast("링크가 복사되었습니다!"); // 토스트 띄우기
    } catch (err) {
      showToast("복사에 실패했습니다. 😢");
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
      <div className="relative w-full overflow-hidden rounded-xl bg-muted shadow-sm group-hover:shadow-md transition-shadow aspect-video">
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

        {/*  공유 버튼 추가 (우측 상단) */}
        <button
          onClick={handleShare}
          className={clsx(
            "absolute top-2 right-2 p-2 bg-black/60 text-white rounded-full backdrop-blur-sm z-10 transition-all duration-200",
            "opacity-100 lg:opacity-0 lg:group-hover:opacity-100 hover:bg-black/80 shadow-sm",
          )}
          title="링크 복사"
          aria-label="링크 복사"
        >
          {/* 공유 아이콘 (SVG) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
        </button>
      </div>

      {/* 정보 영역 */}
      <div className="flex gap-3 px-1">
        {/* 채널 아이콘 (임시로 첫 글자 표시) */}
        <div className="flex-shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground shadow-inner">
            {video.snippet.channelTitle.charAt(0)}
          </div>
        </div>

        <div className="flex flex-col gap-1 min-w-0">
          {/* 제목 (2줄 제한) */}
          <h3 className="line-clamp-2 text-[15px] font-bold leading-snug text-foreground group-hover:text-red-600 transition-colors">
            {decode(video.snippet.title)}
          </h3>

          {/* 채널명 및 조회수 */}
          <div className="text-[13px] font-semibold text-foreground/80">
            <p className="truncate hover:text-foreground transition-colors">
              {video.snippet.channelTitle}
            </p>
            <p className="mt-0.5 text-muted-foreground/90 font-medium">
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
