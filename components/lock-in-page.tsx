"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Cursor from "@/components/cursor";


interface BlogPost {
  slug: string;
  title: string;
  
}



export default function LockInPage() {
    
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
 

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Error loading blogs:", err));
  }, []);
    return (
        <div className="p-4 sm:p-8 md:p-20 pb-0 overflow-hidden">
            <div>
            <Image src="/codingboyblah.svg" alt="CodingBoyBlah" width={400} height={400} className="w-full max-w-[260px] sm:max-w-[340px] md:max-w-[400px] h-auto" style={{mixBlendMode: "difference"}} />
            <br />

            <h1 className="text-xl sm:text-2xl md:text-3xl font-sans leading-snug">I'm a web developer, obsessed with software. </h1>

            </div>
            
            <hr className="border-t-3 border-dashed border-[#d9d9d6] my-4 " />

            <div className="mt-8 md:mt-10">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-sans mb-3">Some of my work:</h1>
                <div className="space-y-1 flex flex-col items-start">
                <Link href="/vynl" className="text-lg sm:text-xl md:text-2xl group relative inline-block py-1 min-h-[44px] flex items-center">
                    <span className="relative z-10">-- vynl</span>
                    <span
                        className="absolute left-0 bottom-0 w-full h-[2px] bg-current scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-0"
                        aria-hidden="true"
                    />
                </Link>
                <Link href="/posters" className="text-lg sm:text-xl md:text-2xl group relative inline-block py-1 min-h-[44px] flex items-center">
                    <span className="relative z-10">-- posters</span>
                    <span
                        className="absolute left-0 bottom-0 w-full h-[2px] bg-current scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-0"
                        aria-hidden="true"
                    />
                </Link>
                <Link href="https://codingboyblah.itch.io/circle-pong" className="text-lg sm:text-xl md:text-2xl group relative inline-block py-1 min-h-[44px] flex items-center">
                    <span className="relative z-10">-- circle pong</span>
                    <span
                        className="absolute left-0 bottom-0 w-full h-[2px] bg-current scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-0"
                        aria-hidden="true"
                    />
                </Link>
                </div>

                <div className="mt-8 md:mt-10">

                    <h1 className="text-xl sm:text-2xl md:text-3xl font-sans mb-3">Words:</h1>

                    <div className="flex flex-col items-start">
    {blogs.length === 0 ? (
            <p className="font-mono text-xs sm:text-sm" style={{ color: "#d9d9d6" }}>
              No blogs yet. Im too busy working on success.
            </p>
          ) : (
             [...blogs].reverse().map((blog, index) => (
                <Link key={index} href={`/blog/${blog.slug}`} className="text-lg sm:text-xl md:text-2xl group relative py-1 min-h-[44px] flex items-center">
                    <span className="relative z-10">-- {blog.title.toLowerCase()}</span>
                    <span
                        className="absolute left-0 bottom-0 w-full h-[2px] bg-current scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-0"
                        aria-hidden="true"
                    />
                </Link>
                ))
          )}
          </div>

          <div className="mt-8 md:mt-10 flex flex-col items-start">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-sans mb-3">Contact:</h1>
          <Link href="https://github.com/codingboyblah" className="text-lg sm:text-xl md:text-2xl group relative inline-block py-1 min-h-[44px] flex items-center">
                    <span className="relative z-10">-- github</span>
                    <span
                        className="absolute left-0 bottom-0 w-full h-[2px] bg-current scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-0"
                        aria-hidden="true"
                    />
                </Link>
                <Link href="https://x.com/codingboyblah" className="text-lg sm:text-xl md:text-2xl group relative inline-block py-1 min-h-[44px] flex items-center">
                    <span className="relative z-10">-- twitter</span>
                    <span
                        className="absolute left-0 bottom-0 w-full h-[2px] bg-current scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-0"
                        aria-hidden="true"
                    />
                </Link>
                <Link href="mailto:hi@boyblah.dev" className="text-lg sm:text-xl md:text-2xl group relative inline-block py-1 min-h-[44px] flex items-center">
                    <span className="relative z-10">-- mail</span>
                    <span
                        className="absolute left-0 bottom-0 w-full h-[2px] bg-current scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-0"
                        aria-hidden="true"
                    />
                </Link>

            </div>

                </div>
            </div>
           <Cursor />
        </div>  
    );
}