export interface YoutubeVideo {
  id: string;
  snippet: {
    title: string;
    thumbnails: { medium: { url: string } };
    channelTitle: string;
    publishedAt: string;
  };
  statistics: {
    viewCount: string;
  };
}
