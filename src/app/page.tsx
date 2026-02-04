import { getTrendingVideos } from "@/lib/youtube";

export default async function HomePage() {
  const videos = await getTrendingVideos();

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-red-600">이거뜸! 🚀</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="border rounded-xl overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              className="w-full"
            />
            <div className="p-4">
              <h2 className="font-semibold line-clamp-2">
                {video.snippet.title}
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                {video.snippet.channelTitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
