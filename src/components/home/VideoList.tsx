import VideoCard from "@/components/common/VideoCard";

import { getTrendingVideos } from "@/lib/youtube";

interface VideoListProps {
  geo: string;
  category: string;
}

export default async function VideoList({ geo, category }: VideoListProps) {
  const { items: videos, lastUpdated } = await getTrendingVideos(geo, category);

  if (videos.length === 0) {
    return (
      <div className="col-span-full py-20 text-center text-slate-500">
        <p>해당 카테고리의 트렌드 영상이 없거나 불러올 수 없습니다. 😢</p>
      </div>
    );
  }

  return (
    <>
      {/* 🔥 업데이트 시간 표시 배지 (리스트 바로 위에 추가) */}
      <div className="col-span-full flex justify-end mb-2">
        <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full text-xs font-medium text-slate-500">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          {lastUpdated} 기준 업데이트
        </div>
      </div>

      {/* 비디오 카드들 */}
      {videos.map((video, index) => (
        <VideoCard key={video.id} video={video} rank={index + 1} />
      ))}
    </>
  );
}
