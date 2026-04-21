import type { MetadataRoute } from "next"
import fs from "fs"
import path from "path"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dennis-magaki.is-a.dev"

  const postsDir = path.join(process.cwd(), "src", "app", "blog", "posts")

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/business`,
      lastModified: new Date(),
      priority: 0.8,
    },
  ]

  let blogPages: MetadataRoute.Sitemap = []

  if (fs.existsSync(postsDir)) {
    const files = fs
      .readdirSync(postsDir)
      .filter((file) => file.endsWith(".md"))

    blogPages = files.map((file) => ({
      url: `${baseUrl}/blog/${file.replace(".md", "")}`,
      lastModified: new Date(),
      priority: 0.7,
    }))
  }

  return [...staticPages, ...blogPages]
}