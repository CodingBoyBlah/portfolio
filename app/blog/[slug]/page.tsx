import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { notFound } from "next/navigation";
import BlogClientPage from "./BlogClientPage";

interface BlogPageProps {
  params: { slug: string };
}

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const possiblePaths = [
      path.join(process.cwd(), "content/blogs"),
      path.join(process.cwd(), ".next/server/content/blogs"),
      path.join(__dirname, "../../../content/blogs"),
    ];

    let blogsDirectory = possiblePaths[0];

    for (const dir of possiblePaths) {
      if (fs.existsSync(dir)) {
        blogsDirectory = dir;
        break;
      }
    }

    console.log("  Blogs directory:", blogsDirectory);
    console.log("  Directory exists:", fs.existsSync(blogsDirectory));

    if (!fs.existsSync(blogsDirectory)) {
      console.log("  No blogs directory found, returning empty params");
      return [];
    }

    const filenames = fs.readdirSync(blogsDirectory);
    console.log("Found files:", filenames);

    const markdownFiles = filenames.filter((name) => name.endsWith(".md"));
    console.log("Markdown files:", markdownFiles);

    const params = markdownFiles.map((filename) => ({
      slug: filename.replace(/\.md$/, ""),
    }));

    console.log("Generated static params:", params);
    return params;
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  console.log("  Loading blog with slug:", slug);

  const blogsDirectory = path.join(process.cwd(), "content/blogs");
  const filePath = path.join(blogsDirectory, `${slug}.md`);

  console.log("  Looking for blog at:", filePath);
  console.log("  File exists:", fs.existsSync(filePath));

  if (!fs.existsSync(filePath)) {
    console.log("  Blog not found, returning 404");
    notFound();
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const htmlContent = await marked(content);

  const blogData = {
    title: data.title || slug,
    date: data.date || new Date().toISOString().split("T")[0],
    htmlContent,
  };

  return <BlogClientPage blogData={blogData} />;
}
