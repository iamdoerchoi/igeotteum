export interface YoutubeVideo {
  id: string;
  snippet: {
    title: string;
    thumbnails: { medium: { url: string }; high?: { url: string } };
    channelTitle: string;
    publishedAt: string;
  };
  statistics: {
    viewCount: string;
  };
}
