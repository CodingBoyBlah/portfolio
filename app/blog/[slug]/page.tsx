import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogClientPage from "./BlogClientPage";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blogsDirectory = path.join(process.cwd(), "content/blogs");
  const filePath = path.join(blogsDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return {
      title: "Blog Post Not Found",
    };
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const title = data.title || slug;
  const cleanExcerpt = content
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/[#*`_\[\]()>-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const description =
    data.excerpt || cleanExcerpt.slice(0, 155) + "...";
  const canonicalUrl = `https://boyblah.dev/blog/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | CodingBoyBlah`,
      description,
      type: "article",
      publishedTime: data.date,
      url: canonicalUrl,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | CodingBoyBlah`,
      description,
      creator: "@boyblahdev",
      images: ["/twitter-image.png"],
    },
  };
}

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

    if (!fs.existsSync(blogsDirectory)) {
      return [];
    }

    const filenames = fs.readdirSync(blogsDirectory);
    const markdownFiles = filenames.filter((name) => name.endsWith(".md"));

    const params = markdownFiles.map((filename) => ({
      slug: filename.replace(/\.md$/, ""),
    }));

    return params;
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;

  const blogsDirectory = path.join(process.cwd(), "content/blogs");
  const filePath = path.join(blogsDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content: rawContent } = matter(fileContents);

  const processedContent = rawContent.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    (match, alt, src) => {
      try {
        const candidatePaths = [
          path.join(path.dirname(filePath), src),
          path.join(process.cwd(), "content", "blogs", src),
          path.join(process.cwd(), "content", "blogimages", src),
          path.join(process.cwd(), "public", src.replace(/^\//, "")),
        ];

        for (const p of candidatePaths) {
          if (fs.existsSync(p) && fs.statSync(p).isFile()) {
            const ext = (path.extname(p) || ".png")
              .replace(".", "")
              .toLowerCase();
            const mime =
              ext === "svg"
                ? "image/svg+xml"
                : `image/${ext === "jpg" ? "jpeg" : ext}`;
            const buffer = fs.readFileSync(p);
            const base64 = buffer.toString("base64");
            const dataUri = `data:${mime};base64,${base64}`;

            return `![${alt}](${dataUri})`;
          }
        }
      } catch (err) {
        console.error("Error embedding image for markdown:", src, err);
      }

      return match;
    },
  );

  const htmlContent = await marked(processedContent);

  const blogData = {
    title: data.title || slug,
    date: data.date || new Date().toISOString().split("T")[0],
    htmlContent,
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blogData.title,
    description: data.excerpt || blogData.title,
    datePublished: blogData.date,
    dateModified: blogData.date,
    url: `https://boyblah.dev/blog/${slug}`,
    author: {
      "@type": "Person",
      name: "CodingBoyBlah",
      url: "https://boyblah.dev",
    },
    publisher: {
      "@type": "Person",
      name: "CodingBoyBlah",
      url: "https://boyblah.dev",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://boyblah.dev/blog/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogClientPage blogData={blogData} />
    </>
  );
}
