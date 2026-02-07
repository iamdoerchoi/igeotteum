// src/types/video.ts
export interface YoutubeVideo {
  id: string;
  snippet: {
    title: string;
    channelTitle: string;
    categoryId: string; // <-- 이 부분이 꼭 있어야 합니다!
    publishedAt: string; // 날짜도 있으면 좋습니다
    description: string;
    thumbnails: {
      high: { url: string };
      medium: { url: string };
    };
  };
  statistics: {
    viewCount: string;
  };
}
