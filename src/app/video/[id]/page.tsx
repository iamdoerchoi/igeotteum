import { getVideoDetail, getTrendingVideos } from "@/lib/youtube";
import { notFound } from "next/navigation";
import VideoCardSmall from "@/components/common/VideoCardSmall";

interface VideoDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function VideoDetailPage({
  params,
}: VideoDetailPageProps) {
  const { id } = await params;

  const [video, recommendVideos] = await Promise.all([
    getVideoDetail(id),
    getTrendingVideos(),
  ]);

  if (!video) notFound();

  const { snippet, statistics } = video;

  return (
    // flex-col로 고정하여 무조건 세로로 나열합니다.
    <div className="mx-auto max-w-[600px] px-4 py-6 flex flex-col gap-8">
      {/* 메인 영상 영역 */}
      <main className="w-full">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-lg">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
            title={snippet.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="border-none"
          />
        </div>

        <div className="mt-6 space-y-4">
          <h1 className="text-xl font-bold line-clamp-2">{snippet.title}</h1>

          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-slate-200" />
              <div>
                <p className="font-bold text-sm">{snippet.channelTitle}</p>
                <p className="text-xs text-muted-foreground">구독자 1.2만명</p>
              </div>
            </div>
            <button className="rounded-full bg-foreground px-4 py-2 text-xs font-bold text-background">
              구독
            </button>
          </div>

          <div className="rounded-xl bg-muted p-3 text-sm">
            <div className="mb-1 font-bold">
              조회수 {Number(statistics.viewCount).toLocaleString()}회
            </div>
            <p className="whitespace-pre-wrap text-slate-600 leading-relaxed">
              {snippet.description}
            </p>
          </div>
        </div>
      </main>

      {/* 추천 영상 리스트 영역 - 영상 바로 아래에 위치 */}
      <aside className="w-full border-t pt-6">
        <h2 className="text-md font-bold mb-4">추천 영상</h2>
        <div className="flex flex-col gap-4">
          {recommendVideos.map(
            (v) => v.id !== id && <VideoCardSmall key={v.id} video={v} />,
          )}
        </div>
      </aside>
    </div>
  );
}
