import { getVideoDetail, getVideosByCategory } from "@/lib/youtube"; // 함수 교체
import { notFound } from "next/navigation";
import VideoCardSmall from "@/components/common/VideoCardSmall";
import { YoutubeVideo } from "@/types/video";

interface VideoDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function VideoDetailPage({
  params,
}: VideoDetailPageProps) {
  const { id } = await params;

  // 1. 먼저 현재 영상의 정보를 가져와서 카테고리 ID를 알아냅니다.
  const video = await getVideoDetail(id);

  if (!video) notFound();

  // 2. 알아낸 categoryId를 이용해 관련 영상을 가져옵니다.
  // (video.snippet.categoryId가 바로 그 정보입니다)
  const relatedVideos = await getVideosByCategory(video.snippet.categoryId);

  const { snippet, statistics } = video;

  return (
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
                <p className="text-xs text-muted-foreground">
                  구독자 정보 없음
                </p>
              </div>
            </div>
            <button className="rounded-full bg-foreground px-4 py-2 text-xs font-bold text-background hover:opacity-90">
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

      {/* 추천 영상 리스트 영역 */}
      <aside className="w-full border-t pt-6">
        <h2 className="text-md font-bold mb-4">
          {`${snippet.title}과(와) 비슷한 영상`}
        </h2>
        <div className="flex flex-col gap-4">
          {relatedVideos.length > 0 ? (
            relatedVideos.map(
              (v: YoutubeVideo) =>
                v.id !== id && <VideoCardSmall key={v.id} video={v} />,
            )
          ) : (
            <p className="text-sm text-muted-foreground">
              관련 영상을 찾을 수 없습니다.
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}
