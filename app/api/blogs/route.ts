import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function GET() {
  try {
    const blogsDirectory = path.join(process.cwd(), "content/blogs");

    if (!fs.existsSync(blogsDirectory)) {
      return NextResponse.json([]);
    }

    const filenames = fs.readdirSync(blogsDirectory);
    const markdownFiles = filenames.filter((name) => name.endsWith(".md"));

    const blogs: Array<{ slug: string; title: string; date: string; excerpt: string }> = [];

    for (const filename of markdownFiles) {
      const slug = filename.replace(/\.md$/, "");
      const filePath = path.join(blogsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

     
      if (data && data.hidden === true) {
        continue;
      }

      const excerpt = content.substring(0, 150).trim() + "...";

      blogs.push({
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString().split("T")[0],
        excerpt: data.excerpt || excerpt,
      });
    }

    blogs.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error reading blogs:", error);
    return NextResponse.json([]);
  }
}
