// src/app/video/[id]/page.tsx
import { getVideoDetail } from "@/lib/youtube";
import { notFound } from "next/navigation";

interface VideoDetailPageProps {
  params: {
    id: string;
  };
}

export default async function VideoDetailPage({
  params,
}: VideoDetailPageProps) {
  const { id } = await params;
  const video = await getVideoDetail(id);

  // 영상 정보가 없으면 404 페이지로 보냅니다.
  if (!video) {
    notFound();
  }

  const { snippet, statistics } = video;

  return (
    <div className="mx-auto max-w-screen-lg px-4 py-10">
      {/* 1. 영상 플레이어 영역 */}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-lg">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          title={snippet.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="border-none"
        ></iframe>
      </div>

      {/* 2. 영상 제목 및 메타 정보 */}
      <div className="mt-8 space-y-6">
        <h1 className="text-2xl font-extrabold leading-tight md:text-3xl">
          {snippet.title}
        </h1>

        <div className="flex items-center justify-between border-b pb-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-red-500 to-orange-400" />
            <div>
              <p className="font-bold text-lg text-foreground">
                {snippet.channelTitle}
              </p>
              <p className="text-sm text-muted-foreground">구독자수 미공개</p>
            </div>
          </div>
          <button className="rounded-full bg-foreground px-6 py-2 text-sm font-bold text-background hover:opacity-90">
            구독
          </button>
        </div>

        {/* 3. 영상 설명란 (더보기 박스 느낌) */}
        <div className="rounded-xl bg-muted p-4">
          <div className="mb-2 flex gap-3 text-sm font-bold">
            <span>
              조회수 {Number(statistics.viewCount).toLocaleString()}회
            </span>
            <span>{new Date(snippet.publishedAt).toLocaleDateString()}</span>
          </div>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
            {snippet.description}
          </p>
        </div>
      </div>
    </div>
  );
}
