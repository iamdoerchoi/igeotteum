import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://igeotteum.vercel.app",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    // 나중에 /video/[id] 같은 페이지가 생긴다면 여기에 추가하면 됩니다.
  ];
}
