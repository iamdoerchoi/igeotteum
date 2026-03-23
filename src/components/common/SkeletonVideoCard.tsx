export default function SkeletonVideoCard() {
  return (
    <div className="flex flex-col gap-3">
      {/* 썸네일 영역 */}
      <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-slate-200 animate-pulse" />

      {/* 정보 영역 */}
      <div className="flex gap-3 px-1">
        {/* 채널 아이콘 */}
        <div className="flex-shrink-0">
          <div className="h-9 w-9 rounded-full bg-slate-200 animate-pulse" />
        </div>

        {/* 텍스트 줄들 */}
        <div className="flex flex-col gap-2 min-w-0 flex-1 pt-1">
          {/* 제목 (긴 줄) */}
          <div className="h-5 w-11/12 bg-slate-200 rounded animate-pulse" />
          {/* 제목 (짧은 줄) */}
          <div className="h-5 w-3/4 bg-slate-200 rounded animate-pulse" />

          {/* 채널명 및 메타데이터 */}
          <div className="mt-1 h-4 w-1/2 bg-slate-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
