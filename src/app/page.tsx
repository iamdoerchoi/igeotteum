import { getTrendingVideos } from "@/lib/youtube";
import VideoCard from "@/components/common/VideoCard";
import CountryFilter from "@/components/common/CountryFilter"; // 컴포넌트 import

interface HomePageProps {
  // Next.js 15+ 에서는 searchParams가 Promise입니다.
  searchParams: Promise<{ geo?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  // 1. URL에서 geo 파라미터 추출 (없으면 기본값 KR)
  const { geo } = await searchParams;
  const currentGeo = geo || "KR";

  // 2. 선택된 국가 코드로 API 호출
  const videos = await getTrendingVideos(currentGeo);

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="mx-auto max-w-screen-xl px-4 py-8">
        {/* 헤더 영역: 제목과 국가 선택기를 양옆으로 배치 */}
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500">
                이거뜸
              </span>
              <span className="ml-1 text-slate-800">🔥</span>
            </h1>
            <p className="text-slate-500 text-sm">지금 가장 핫한 트렌드를 확인하세요.</p>
          </div>

          {/* 🔥 국가 선택 필터 추가 */}
          <div className="flex justify-center md:justify-end">
            <CountryFilter />
          </div>
        </header>

        {/* 비디오 리스트 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
          {videos.map((video, index) => (
            <VideoCard key={video.id} video={video} rank={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}
