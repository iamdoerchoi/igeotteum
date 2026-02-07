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

export async function getVideoDetail(id: string) {
  const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=${API_KEY}`;

  try {
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      // API 응답 본문을 읽어서 진짜 이유를 출력합니다.
      const errorData = await res.json();
      console.error("YouTube API Error Details:", errorData.error);
      throw new Error(`API 응답 에러: ${res.status}`);
    }

    const data = await res.json();
    return data.items?.[0] || null;
  } catch (error) {
    console.error("getVideoDetail 함수 내부 에러:", error);
    return null;
  }
}
