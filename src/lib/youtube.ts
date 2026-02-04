import { YoutubeVideo } from "@/types/video";

export async function getTrendingVideos() {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=KR&maxResults=12&key=${API_KEY}`;

  const res = await fetch(url, {
    next: { revalidate: 3600 }, // 1시간마다 데이터 갱신 (할당량 절약 및 성능 최적화)
  });

  if (!res.ok) throw new Error("데이터를 불러오지 못했습니다.");

  const data = await res.json();
  return data.items as YoutubeVideo[];
}
