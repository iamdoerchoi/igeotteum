import { getVideoDetail, getVideosByCategory } from "@/lib/youtube";
import { notFound } from "next/navigation";
import VideoCardSmall from "@/components/common/VideoCardSmall";
import VideoDescription from "@/components/video/VideoDescription"; // 새로 만든 컴포넌트 import
import { YoutubeVideo } from "@/types/video";

interface VideoDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function VideoDetailPage({ params }: VideoDetailPageProps) {
  const { id } = await params;

  const video = await getVideoDetail(id);
  if (!video) notFound();

  const relatedVideos = await getVideosByCategory(video.snippet.categoryId);
  const { snippet, statistics } = video;

  return (
    <div className="mx-auto max-w-[600px] px-4 py-6 flex flex-col gap-6 bg-white min-h-screen">
      <main className="w-full flex flex-col gap-4">
        {/* 영상 플레이어 */}
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-lg ring-1 ring-black/5">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${id}?autoplay=1&modestbranding=1&rel=0`}
            title={snippet.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="border-none"
          />
        </div>

        {/* 영상 제목 */}
        <h1 className="text-xl font-bold leading-tight text-slate-900 md:text-2xl mt-1">{snippet.title}</h1>

        {/* 채널 정보 & 구독 버튼 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 text-white font-bold shadow-sm">
              {snippet.channelTitle.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm text-slate-900">{snippet.channelTitle}</span>
              <span className="text-xs text-slate-500">구독자 120만명</span>
            </div>
          </div>

          <button className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition-transform active:scale-95 hover:bg-slate-800">
            구독
          </button>
        </div>

        {/* 🔥 클라이언트 컴포넌트로 분리된 설명창 */}
        <VideoDescription
          description={snippet.description}
          viewCount={statistics.viewCount}
          publishedAt={snippet.publishedAt}
        />
      </main>

      {/* 추천 영상 리스트 */}
      <aside className="w-full pt-2">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          다음 동영상 <span className="text-sm font-normal text-slate-500">모두 재생</span>
        </h2>
        <div className="flex flex-col gap-4">
          {relatedVideos.length > 0 ? (
            relatedVideos.map((v: YoutubeVideo) => v.id !== id && <VideoCardSmall key={v.id} video={v} />)
          ) : (
            <div className="py-10 text-center text-sm text-muted-foreground bg-slate-50 rounded-xl">
              관련 영상을 찾을 수 없습니다.
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
