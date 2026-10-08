import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://boyblah.dev";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/posters`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/vynl`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = [];

  try {
    const blogsDir = path.join(process.cwd(), "content", "blogs");
    if (fs.existsSync(blogsDir)) {
      const files = fs.readdirSync(blogsDir);
      for (const file of files) {
        if (!file.endsWith(".md")) continue;
        const filePath = path.join(blogsDir, file);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContent);

        // Skip hidden posts
        if (data.hidden === true) continue;

        const slug = file.replace(/\.md$/, "");
        const stat = fs.statSync(filePath);
        const postDate = data.date ? new Date(data.date) : stat.mtime;

        blogRoutes.push({
          url: `${baseUrl}/blog/${slug}`,
          lastModified: isNaN(postDate.getTime()) ? stat.mtime : postDate,
          changeFrequency: "monthly",
          priority: 0.85,
        });
      }
    }
  } catch (error) {
    console.error("Error generating sitemap for blog posts:", error);
  }

  return [...staticRoutes, ...blogRoutes];
}
