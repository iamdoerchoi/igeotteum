import { getTrendingVideos } from "@/lib/youtube";
import VideoCard from "@/components/common/VideoCard";

export default async function HomePage() {
  // 서버 사이드에서 인기 영상 데이터 페칭
  const videos = await getTrendingVideos();

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-10">
      <header className="mb-10">
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
          지금 뜨는 영상 🔥
        </h2>
        <p className="text-sm text-muted-foreground">
          유튜브에서 실시간으로 가장 핫한 트렌드입니다.
        </p>
      </header>

      {/* 320px 너비의 카드를 화면 크기에 맞게 자동으로 배치하는 그리드 */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-x-6 gap-y-12 justify-items-center">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
