"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import GradualBlur from "@/components/GradualBlur";
import Cursor from "@/components/cursor";

interface BlogClientPageProps {
  blogData: {
    title: string;
    date: string;
    htmlContent: string;
  };
}

export default function BlogClientPage({ blogData }: BlogClientPageProps) {
  return (
    <main
      className="min-h-screen py-20 px-4 md:px-8 lg:px-16"
      style={{ backgroundColor: "#262629" }}
    >
      <Cursor />
      <article className="max-w-4xl mx-auto page-load">
        <Link
          href="/"
          className="font-mono text-sm mb-8 inline-block hover:underline"
          style={{ color: "#d9d9d6" }}
        >
          ← Back to home
        </Link>

        <header className="mb-12">
          <h1
            className="font-mono text-4xl md:text-6xl font-bold mb-4"
            style={{ color: "#d9d9d6" }}
          >
            {blogData.title}
          </h1>
          <p className="font-mono text-sm" style={{ color: "#808080" }}>
            {blogData.date}
          </p>
        </header>

        <div
          className="prose prose-invert max-w-none font-mono"
          style={{ color: "#d9d9d6" }}
          dangerouslySetInnerHTML={{ __html: blogData.htmlContent }}
        />
      </article>
      <GradualBlur
        target="page"
        position="bottom"
        height="4rem"
        strength={1}
        divCount={2}
        curve="bezier"
        exponential={false}
        opacity={1}
      />
      <GradualBlur
        target="page"
        position="top"
        height="4rem"
        strength={1}
        divCount={2}
        curve="bezier"
        exponential={false}
        opacity={1}
      />

      <style jsx global>{`
        .page-load {
          animation: pageEnter 0.6s ease-out forwards;
        }

        @keyframes pageEnter {
          from {
            opacity: 1;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .prose {
          color: #d9d9d6;
        }

        . .prose h1,
        .prose h2,
        .prose h3,
        .prose h4,
        .prose h5,
        .prose h6 {
          color: #d9d9d6;
          font-weight: bold;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .prose h1 {
          font-size: 2.5rem;
        }
        .prose h2 {
          font-size: 2rem;
        }
        .prose h3 {
          font-size: 1.5rem;
        }
        .prose p {
          margin-bottom: 1.5rem;
          line-height: 1.75;
        }
        .prose a {
          color: #d9d9d6;
          text-decoration: underline;
        }
        .prose a:hover {
          opacity: 0.8;
        }
        .prose code {
          background-color: #3a3a3f;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
        }
        .prose pre {
          background-color: #3a3a3f;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin-bottom: 1.5rem;
        }
        .prose pre code {
          background-color: transparent;
          padding: 0;
        }
        .prose ul,
        .prose ol {
          margin-left: 2rem;
          margin-bottom: 1.5rem;
        }
        .prose li {
          margin-bottom: 0.5rem;
        }
        .prose blockquote {
          border-left: 4px solid #d9d9d6;
          padding-left: 1rem;
          margin-left: 0;
          margin-bottom: 1.5rem;
          font-style: italic;
        }
        .prose img {
          max-width: 100%;
          height: auto;
          margin: 2rem 0;
          border-radius: 0.5rem;
        }
        .prose hr {
          border: none;
          border-top: 2px solid #d9d9d6;
          margin: 2rem 0;
        }
      `}</style>
    </main>
  );
}
