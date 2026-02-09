import { getTrendingVideos } from "@/lib/youtube";
import VideoCard from "@/components/common/VideoCard";

export default async function HomePage() {
  const videos = await getTrendingVideos();

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="mx-auto max-w-screen-xl px-4 py-8">
        <header className="mb-8 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500">
              이거뜸
            </span>
            <span className="ml-1 text-slate-800">🔥</span>
          </h1>
          <p className="text-slate-500 text-sm">지금 가장 핫한 트렌드를 확인하세요.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
          {videos.map((video, index) => (
            <VideoCard key={video.id} video={video} rank={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}
