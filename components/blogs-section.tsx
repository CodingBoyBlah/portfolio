"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

export function BlogsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Fetch blog list
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Error loading blogs:", err));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen pt-20 px-4 md:px-8 lg:px-16 opacity-0 transition-opacity duration-500"
      style={{ backgroundColor: "#262629" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-20">
          <Image
            src="/blogs.svg"
            alt="BLOGS"
            width={200}
            height={113}
            className="w-full max-w-[243px] h-auto"
            style={{ mixBlendMode: "difference" }}
          />
        </div>

        <div className="grid grid-cols-1 gap-y-8 pb-20">
          {blogs.length === 0 ? (
            <p className="font-mono text-center" style={{ color: "#d9d9d6" }}>
              No blogs yet. Add markdown files to content/blogs/ to get started.
            </p>
          ) : (
            [...blogs].reverse().map((blog, index) => (
              <Link key={index} href={`/blog/${blog.slug}`}>
                <div
                  className="p-8 md:p-12 border-2 hover:scale-101 transform transition-transform duration-300 hoverable"
                  style={{ backgroundColor: "#262629", borderColor: "#d9d9d6" }}
                >
                  <h3
                    className="font-mono text-3xl md:text-4xl font-bold mb-3"
                    style={{ color: "#d9d9d6" }}
                  >
                    {blog.title}
                  </h3>
                  <p
                    className="font-mono text-sm mb-2"
                    style={{ color: "#808080" }}
                  >
                    {blog.date}
                  </p>
                  <p
                    className="font-mono text-sm md:text-base"
                    style={{ color: "#d9d9d6" }}
                  >
                    {blog.excerpt}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
