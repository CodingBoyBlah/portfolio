"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

export function BlogsSection() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const headingY = useTransform(scrollYProgress, [0, 1], [24, -18]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [24, -20]);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Error loading blogs:", err));
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen pt-20 px-4 md:px-8 lg:px-16"
      style={{ backgroundColor: "#262629" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex justify-center mb-8"
          style={
            prefersReducedMotion
              ? { mixBlendMode: "difference" }
              : { y: headingY, mixBlendMode: "difference" }
          }
        >
          <Image
            src="/blogs.svg"
            alt="BLOGS"
            width={200}
            height={113}
            className="w-full max-w-[243px] h-auto"
            style={{ mixBlendMode: "normal" }}
          />
        </motion.div>

        <div
          className="mx-auto mb-14 max-w-2xl border border-[#808080] px-4 py-3 text-center font-mono text-xs uppercase tracking-[0.18em] md:text-sm"
          style={{ color: "#d9d9d6" }}
        >
          notes on shipping, experiments, and dev chaos
        </div>

        <motion.div
          className="grid grid-cols-1 gap-y-8 pb-20"
          style={prefersReducedMotion ? undefined : { y: cardsY }}
        >
          {blogs.length === 0 ? (
            <p className="font-mono text-center" style={{ color: "#d9d9d6" }}>
              No blogs yet. Add markdown files to content/blogs/ to get started.
            </p>
          ) : (
            [...blogs].reverse().map((blog, index) => (
              <Link key={index} href={`/blog/${blog.slug}`}>
                <motion.div
                  className="group hoverable border-2 p-0"
                  style={{ backgroundColor: "#262629", borderColor: "#d9d9d6" }}
                  initial={
                    prefersReducedMotion ? undefined : { opacity: 0, y: 20, filter: "blur(5px)" }
                  }
                  whileInView={
                    prefersReducedMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }
                  }
                  viewport={{ once: false, amount: 0.2 }}
                  transition={
                    prefersReducedMotion
                      ? undefined
                      : {
                          duration: 0.5,
                          delay: Math.min(index * 0.08, 0.24),
                          ease: [0.22, 1, 0.36, 1] as const,
                        }
                  }
                >
                  <div className="px-8 py-8 md:px-12 md:py-10">
                    <div className="mb-6 flex items-center justify-between border-b border-[#808080] pb-3">
                      <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#808080]">
                        entry 0{index + 1}
                      </span>
                      <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#808080]">
                        {blog.date}
                      </span>
                    </div>

                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="mb-3 font-mono text-3xl font-bold md:text-4xl text-[#d9d9d6]">
                          {blog.title}
                        </h3>
                        <p className="font-mono text-sm md:text-base text-[#d9d9d6]">
                          {blog.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 h-[2px] w-full overflow-hidden bg-[#808080]">
                      <motion.div
                        className="h-full bg-[#d9d9d6]"
                        initial={prefersReducedMotion ? undefined : { scaleX: 0, transformOrigin: "left" }}
                        whileInView={prefersReducedMotion ? undefined : { scaleX: 1 }}
                        viewport={{ once: false, amount: 0.5 }}
                        transition={
                          prefersReducedMotion
                            ? undefined
                            : {
                                duration: 0.7,
                                delay: 0.14 + Math.min(index * 0.08, 0.26),
                                ease: [0.22, 1, 0.36, 1] as const,
                              }
                        }
                      />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
}
