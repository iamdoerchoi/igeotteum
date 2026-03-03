import { Suspense } from "react";
import CountryFilter from "@/components/common/CountryFilter";
import CategoryFilter from "@/components/common/CategoryFilter";
import VideoList from "@/components/home/VideoList";
import SkeletonVideoCard from "@/components/common/SkeletonVideoCard";

function VideoListSkeleton() {
  return (
    <>
      {Array.from({ length: 12 }).map((_, i) => (
        <SkeletonVideoCard key={i} />
      ))}
    </>
  );
}

interface HomePageProps {
  searchParams: Promise<{ geo?: string; category?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { geo, category } = await searchParams;
  const currentGeo = geo || "KR";
  const currentCategory = category || "0";

  const suspenseKey = `${currentGeo}-${currentCategory}`;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-screen-xl px-4 py-8">
        {/* 헤더 */}
        <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500">
                이거뜸
              </span>
              <span className="ml-1 text-foreground">🔥</span>
            </h1>
            <p className="text-muted-foreground text-base font-medium">
              지금 가장 핫한 트렌드를 확인하세요.
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <CountryFilter />
          </div>
        </header>

        {/* 카테고리 필터 */}
        <section className="mb-8 sticky top-[64px] z-40 bg-background/95 py-2 backdrop-blur-sm -mx-4 px-4 sm:static sm:bg-transparent sm:p-0">
          <CategoryFilter />
        </section>

        {/* 비디오 리스트 영역 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
          <Suspense key={suspenseKey} fallback={<VideoListSkeleton />}>
            <VideoList geo={currentGeo} category={currentCategory} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
