"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { VIDEO_CATEGORIES } from "@/lib/constants";

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentGeo = searchParams.get("geo") || "KR";
  const currentCategory = searchParams.get("category") || "0";

  const handleCategoryChange = (categoryId: string) => {
    // 1. 현재 국가 정보는 유지하고
    // 2. 카테고리만 변경해서 URL 이동
    router.push(`/?geo=${currentGeo}&category=${categoryId}`);
  };

  return (
    // 가로 스크롤 컨테이너 (스크롤바 숨김)
    <div className="flex w-full overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
      <div className="flex gap-2 min-w-max">
        {VIDEO_CATEGORIES.map((category) => {
          const isSelected = currentCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`
                px-4 py-1.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap cursor-pointer
                ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                }
              `}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
