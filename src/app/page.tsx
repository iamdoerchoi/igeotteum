import { getTrendingVideos } from "@/lib/youtube";
import VideoCard from "@/components/common/VideoCard";

export default async function HomePage() {
  const videos = await getTrendingVideos();

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="mx-auto max-w-screen-xl px-3 sm:px-4 py-6 sm:py-12">
        {/* 헤더 섹션 */}
        <header className="mb-6 sm:mb-10 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-2 sm:mb-3">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500">
              이거뜸
            </span>
            <span className="ml-2 text-slate-800">🔥</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-500 font-medium">
            지금 유튜브에서 가장 핫한 트렌드를 실시간으로 확인하세요.
          </p>
        </header>

        {/* 그리드 레이아웃 - 모바일 최적화 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {videos.map((video, index) => (
            <VideoCard key={video.id} video={video} rank={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}
