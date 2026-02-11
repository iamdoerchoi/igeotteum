import { searchVideos } from "@/lib/youtube";
import VideoCard from "@/components/common/VideoCard";
import { YoutubeVideo } from "@/types/video";

interface SearchPageProps {
  searchParams: Promise<{ q: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams; // 쿼리 파라미터에서 검색어 추출

  // 검색어가 없으면 빈 배열
  const videos = q ? ((await searchVideos(q)) as YoutubeVideo[]) : [];

  console.log("videos", videos);

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[600px] px-4 py-6">
        <div className="mb-4">
          <h2 className="text-lg font-bold">
            <span className="text-red-600">{`'${q}'`}</span> 검색 결과
          </h2>
        </div>

        {videos.length > 0 ? (
          <div className="flex flex-col gap-6">
            {videos?.map((video) => (
              // 검색 API는 조회수를 안 주므로 VideoCard에서 조회수 부분이 0으로 나올 수 있음
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-500">검색 결과가 없습니다.</div>
        )}
      </div>
    </div>
  );
}
