import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Cursor from "@/components/cursor";

export const metadata: Metadata = {
  title: "Blog & Writing",
  description:
    "Notes on shipping software, project postmortems, experiments, and developer chaos by CodingBoyBlah.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog & Writing | CodingBoyBlah",
    description:
      "Notes on shipping software, project postmortems, experiments, and developer chaos by CodingBoyBlah.",
    url: "https://boyblah.dev/blog",
    siteName: "CodingBoyBlah",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CodingBoyBlah Blog & Writing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & Writing | CodingBoyBlah",
    description:
      "Notes on shipping software, project postmortems, experiments, and developer chaos by CodingBoyBlah.",
    creator: "@boyblahdev",
    images: ["/twitter-image.png"],
  },
};

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

function getBlogPosts(): BlogPost[] {
  try {
    const blogsDirectory = path.join(process.cwd(), "content/blogs");
    if (!fs.existsSync(blogsDirectory)) return [];

    const filenames = fs.readdirSync(blogsDirectory);
    const markdownFiles = filenames.filter((name) => name.endsWith(".md"));

    const posts: BlogPost[] = [];

    for (const filename of markdownFiles) {
      const slug = filename.replace(/\.md$/, "");
      const filePath = path.join(blogsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      if (data && data.hidden === true) continue;

      const excerpt = data.excerpt || content.substring(0, 150).trim() + "...";

      posts.push({
        slug,
        title: data.title || slug,
        date: data.date || "2025-12-01",
        excerpt,
      });
    }

    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  } catch (error) {
    console.error("Error reading blog directory:", error);
    return [];
  }
}

export default function BlogIndexPage() {
  const posts = getBlogPosts();

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 md:pt-16 md:px-8 lg:px-16 bg-[#262629] text-[#d9d9d6]">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-sm tracking-wider uppercase text-[#808080] hover:text-[#d9d9d6] transition-colors mb-8"
          >
            &larr; Back to Home
          </Link>
          <div className="flex justify-center mb-6">
            <Image
              src="/blogs.svg"
              alt="BLOGS"
              width={200}
              height={113}
              className="w-full max-w-[180px] sm:max-w-[210px] md:max-w-[243px] h-auto"
            />
          </div>
          <h1 className="sr-only">CodingBoyBlah - Blog & Writing</h1>
          <p className="mx-auto max-w-2xl border border-[#808080] px-4 py-3 text-center font-mono text-xs sm:text-sm uppercase tracking-[0.16em] text-[#d9d9d6]">
            notes on shipping, experiments, and dev chaos
          </p>
        </header>

        <section className="space-y-6">
          {posts.length === 0 ? (
            <p className="font-mono text-center text-sm text-[#808080]">
              No posts found.
            </p>
          ) : (
            posts.map((post, idx) => (
              <article
                key={post.slug}
                className="border-2 border-[#d9d9d6] bg-[#262629] p-6 sm:p-8 transition-transform duration-300 hover:scale-[1.01]"
              >
                <div className="flex items-center justify-between border-b border-[#808080] pb-3 mb-4">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#808080]">
                    entry 0{idx + 1}
                  </span>
                  <time
                    dateTime={post.date}
                    className="font-mono text-xs uppercase tracking-[0.16em] text-[#808080]"
                  >
                    {post.date}
                  </time>
                </div>
                <h2 className="font-mono text-2xl sm:text-3xl font-bold mb-3 text-[#d9d9d6]">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:underline hover:text-white transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="font-mono text-sm sm:text-base text-[#d9d9d6] leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center font-mono text-xs uppercase tracking-[0.2em] underline text-[#808080] hover:text-[#d9d9d6] transition-colors"
                >
                  Read full entry &rarr;
                </Link>
              </article>
            ))
          )}
        </section>
      </div>
      <Cursor />
    </main>
  );
}
