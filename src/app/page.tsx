import { getTrendingVideos } from "@/lib/youtube";
import VideoCard from "@/components/common/VideoCard";
import Image from "next/image";

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

        <VideoCardDebug />
      </div>
    </div>
  );
}

function VideoCardDebug() {
  return (
    <div className="border-4 border-red-500 p-4 m-4">
      <p className="text-red-600 font-bold mb-2">카드 경계 (빨간 테두리)</p>

      {/* 이미지 컨테이너 */}
      <div className="border-4 border-blue-500 relative w-full bg-yellow-100">
        <p className="text-blue-600 text-xs mb-1">
          이미지 컨테이너 (파란 테두리)
        </p>

        {/* aspect ratio wrapper */}
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <div className="absolute inset-0 bg-green-200 border-2 border-green-600">
            <p className="text-green-800 text-xs">
              absolute inset-0 영역 (초록)
            </p>

            <Image
              src="https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
              alt="Test thumbnail"
              fill
              className="object-cover"
            />
          </div>

          {/* 배지 테스트 */}
          <div className="absolute left-2 top-2 bg-yellow-400 text-black px-2 py-1 rounded z-10">
            1
          </div>
        </div>
      </div>

      {/* 정보 영역 */}
      <div className="mt-3 border-2 border-purple-500 p-2">
        <p className="text-purple-600">정보 영역 (보라 테두리)</p>
        <p className="text-sm">테스트 제목</p>
      </div>
    </div>
  );
}
