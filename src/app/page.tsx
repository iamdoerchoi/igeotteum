import { getTrendingVideos } from "@/lib/youtube";
import VideoCard from "@/components/common/VideoCard";
import CountryFilter from "@/components/common/CountryFilter";
import CategoryFilter from "@/components/common/CategoryFilter";
import { YoutubeVideo } from "@/types/video";

interface HomePageProps {
  searchParams: Promise<{ geo?: string; category?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  // URL에서 파라미터 읽기
  const { geo, category } = await searchParams;
  const currentGeo = geo || "KR";
  const currentCategory = category || "0"; // 기본값 0 (전체)

  // 카테고리까지 포함해서 API 호출
  const videos = await getTrendingVideos(currentGeo, currentCategory);

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="mx-auto max-w-screen-xl px-4 py-8">
        {/* 헤더 (제목 + 국가 필터) */}
        <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500">
                이거뜸
              </span>
              <span className="ml-1 text-slate-800">🔥</span>
            </h1>
            <p className="text-slate-500 text-sm">
              지금 가장 핫한 트렌드를 확인하세요.
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            <CountryFilter />
          </div>
        </header>

        {/* 카테고리 필터 추가 (헤더와 리스트 사이) */}
        <section className="mb-8 sticky top-[64px] z-40 bg-slate-50/95 py-2 backdrop-blur-sm -mx-4 px-4 sm:static sm:bg-transparent sm:p-0">
          <CategoryFilter />
        </section>

        {/* 비디오 리스트 */}
        {videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {videos.map((video: YoutubeVideo, index: number) => (
              <VideoCard key={video.id} video={video} rank={index + 1} />
            ))}
          </div>
        ) : (
          // 데이터가 없을 때 표시할 UI
          <div className="py-20 text-center text-slate-500">
            <p>해당 카테고리의 트렌드 영상이 없거나 불러올 수 없습니다. 😢</p>
          </div>
        )}
      </div>
    </div>
  );
}
