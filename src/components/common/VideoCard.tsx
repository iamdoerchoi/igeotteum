"use client";

import Image from "next/image";
import Link from "next/link";
import { YoutubeVideo } from "@/types/video";

interface VideoCardProps {
  video: YoutubeVideo;
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    // 상세 페이지로 연결되는 링크 추가
    <Link href={`/video/${video.id}`} className="block">
      <div className="flex flex-col gap-3 w-[320px] mx-auto group cursor-pointer">
        {/* 썸네일 영역: width/height 고정으로 레이아웃 붕괴 방지 */}
        <div className="relative w-[320px] h-[180px] overflow-hidden rounded-xl bg-slate-100 shadow-sm">
          <Image
            src={
              video.snippet.thumbnails.high?.url ||
              video.snippet.thumbnails.medium.url
            }
            alt={video.snippet.title}
            width={320}
            height={180}
            priority={false}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* 텍스트 정보 */}
        <div className="flex flex-col gap-1 px-1">
          <h3 className="line-clamp-2 text-sm font-bold leading-snug group-hover:text-red-600 transition-colors">
            {video.snippet.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            {video.snippet.channelTitle}
          </p>
          <p className="text-xs text-muted-foreground">
            조회수 {Number(video.statistics.viewCount).toLocaleString()}회
          </p>
        </div>
      </div>
    </Link>
  );
}
