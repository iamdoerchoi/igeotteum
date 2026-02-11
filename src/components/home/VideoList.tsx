import { getTrendingVideos } from "@/lib/youtube";
import VideoCard from "@/components/common/VideoCard";
import { YoutubeVideo } from "@/types/video";

interface VideoListProps {
  geo: string;
  category: string;
}

export default async function VideoList({ geo, category }: VideoListProps) {
  const videos = await getTrendingVideos(geo, category);

  if (videos.length === 0) {
    return (
      <div className="col-span-full py-20 text-center text-slate-500">
        <p>해당 카테고리의 트렌드 영상이 없거나 불러올 수 없습니다. 😢</p>
      </div>
    );
  }

  return (
    <>
      {videos.map((video: YoutubeVideo, index: number) => (
        <VideoCard key={video.id} video={video} rank={index + 1} />
      ))}
    </>
  );
}
