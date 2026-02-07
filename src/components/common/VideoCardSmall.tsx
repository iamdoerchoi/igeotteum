"use client";

import Image from "next/image";
import Link from "next/link";
import { YoutubeVideo } from "@/types/video";

interface VideoCardSmallProps {
  video: YoutubeVideo;
}

export default function VideoCardSmall({ video }: VideoCardSmallProps) {
  return (
    <Link href={`/video/${video.id}`} className="flex gap-3 group w-full">
      {/* 썸네일: 160x90 고정 */}
      <div className="relative flex-shrink-0 w-[160px] h-[90px] overflow-hidden rounded-lg bg-slate-100">
        <Image
          src={video.snippet.thumbnails.medium.url}
          alt={video.snippet.title}
          width={160}
          height={90}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* 텍스트 영역 */}
      <div className="flex flex-col gap-1 min-w-0">
        <h3 className="line-clamp-2 text-[13px] font-bold leading-snug">
          {video.snippet.title}
        </h3>
        <p className="text-[11px] text-muted-foreground truncate">
          {video.snippet.channelTitle}
        </p>
        <p className="text-[11px] text-muted-foreground">
          조회수 {Number(video.statistics.viewCount).toLocaleString()}회
        </p>
      </div>
    </Link>
  );
}
