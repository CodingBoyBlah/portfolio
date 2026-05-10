"use client";
/*if (typeof document !== "undefined") {
  document.documentElement.classList.add("dark");
  try {
    localStorage.setItem("theme", "dark");
  } catch (e) {
    // ignore
  }
} */

import Link from "next/link";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Cursor from "@/components/cursor";

export default function VynlPage() {
  return (
    <main>
      <Cursor />
      <div className="load-in min-h-screen bg-[#F5F4F1] dark:bg-[#1d1917] text-[#1d1917] dark:text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <Image
            src="/vinyl-full-circle.png"
            alt=""
            width={600}
            height={600}
            className="absolute top-0 left-0 opacity-[0.5] dark:opacity-[0.3] -translate-x-1/2 -translate-y-1/4 invert dark:invert-0"
          />
          <Image
            src="/vinyl-full-circle.png"
            alt=""
            width={900}
            height={900}
            className="absolute bottom-0 right-0 opacity-[0.5] dark:opacity-[0.3] translate-x-1/3 translate-y-1/3 invert dark:invert-0"
          />
        </div>

        <header className="border-b border-[#CCC8BC] dark:border-white/10 bg-[#E5E3DC] dark:bg-[#2D2926] backdrop-blur-sm animate-slide-down relative z-10">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className=" font-extrabold text-lg mr-2 inline-block "
                style={{ color: "#756959" }}
              >
                {"<"}
              </Link>
              <Image
                src="/logo-transparent.png"
                alt="vynl logo"
                width={60}
                height={60}
                className="rounded-full"
              />
              <h1 className="text-2xl font-semibold text-[#1d1917] dark:text-white">
                vynl
              </h1>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12 md:py-20 lg:py-24 relative z-10">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-6 animate-fade-in">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-[#1d1917] dark:text-white text-balance leading-tight">
                Your Spotify Stats,
                <br />
                <span className="italic font-serif text-[#756959] dark:text-[#AFA895]">
                  Beautifully tracked.
                </span>
              </h2>

              <p className="text-sm md:text-base text-[#756959] dark:text-[#AFA895] max-w-3xl mx-auto text-pretty leading-relaxed font-serif">
                Experience your music journey with a vintage vinyl aesthetic.
                Track your listening habits, discover your top artists, and
                visualize your musical evolution.
              </p>

              <div className="flex justify-center pt-2">
                <Link href="https://github.com/CodingBoyBlah/vynl">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="glass-effect-button bg-[#524841]/20 dark:bg-white/5 border border-[#524841]/20 dark:border-white/20 hover:bg-[#524841]/25 dark:hover:bg-white/25 hover:border-[#524841]/30 dark:hover:border-white/30 text-[#1d1917] dark:text-white font-serif text-base rounded-full transition-all duration-300 flex items-center gap-3 h-auto pr-0 pl-6"
                  >
                    Github
                    <div className="p-5 rounded-full border border-[#524841]/20 dark:border-white/20">
                      <ArrowDown className="h-4 w-4" />
                    </div>
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-16 animate-slide-up stagger-2">
              <Card className="glass-effect bg-[#524841]/15 dark:bg-white/5 border-[#524841]/10 dark:border-white/10 p-5 space-y-3 hover:bg-[#524841]/20 dark:hover:bg-white/20 transition-all duration-300 rounded-2xl">
                <h3 className="text-lg font-serif italic text-[#1d1917] dark:text-white">
                  Top Tracks
                </h3>
                <p className="text-xs text-[#756959] dark:text-[#AFA895] leading-relaxed font-serif">
                  Track how much time you've spent with your music. vynl gives
                  you a clear view of your total listening hours and how they
                  grow over days, weeks, and months.
                </p>
              </Card>

              <Card className="glass-effect bg-[#524841]/15 dark:bg-white/5 border-[#524841]/10 dark:border-white/10 p-5 space-y-3 hover:bg-[#524841]/20 dark:hover:bg-white/20 transition-all duration-300 rounded-2xl">
                <h3 className="text-lg font-serif italic text-[#1d1917] dark:text-white">
                  Top Artists
                </h3>
                <p className="text-xs text-[#756959] dark:text-[#AFA895] leading-relaxed font-serif">
                  See which artists defined your sound. From all-time favorites
                  to recent discoveries, vynl highlights who you've been playing
                  the most and when.
                </p>
              </Card>

              <Card className="glass-effect bg-[#524841]/15 dark:bg-white/5 border-[#524841]/10 dark:border-white/10 p-5 space-y-3 hover:bg-[#524841]/20 dark:hover:bg-white/20 transition-all duration-300 rounded-2xl">
                <h3 className="text-lg font-serif italic text-[#1d1917] dark:text-white">
                  Time Listened
                </h3>
                <p className="text-xs text-[#756959] dark:text-[#AFA895] leading-relaxed font-serif">
                  Track how much time you've spent with your music. vynl gives
                  you a clear view of your total listening hours and how they
                  grow over days, weeks, and months.
                </p>
              </Card>

              <Card className="glass-effect bg-[#524841]/15 dark:bg-white/5 border-[#524841]/10 dark:border-white/10 p-5 space-y-3 hover:bg-[#524841]/20 dark:hover:bg-white/20 transition-all duration-300 rounded-2xl">
                <h3 className="text-lg font-serif italic text-[#1d1917] dark:text-white">
                  Top Albums
                </h3>
                <p className="text-xs text-[#756959] dark:text-[#AFA895] leading-relaxed font-serif">
                  Rediscover the albums you've had on repeat. vynl shows the
                  records that made the biggest impact on your listening habits,
                  and how often you returned to them.
                </p>
              </Card>

              <Card className="glass-effect bg-[#524841]/15 dark:bg-white/5 border-[#524841]/10 dark:border-white/10 p-5 space-y-3 hover:bg-[#524841]/20 dark:hover:bg-white/20 transition-all duration-300 rounded-2xl">
                <h3 className="text-lg font-serif italic text-[#1d1917] dark:text-white">
                  Today's Refresh
                </h3>
                <p className="text-xs text-[#756959] dark:text-[#AFA895] leading-relaxed font-serif">
                  Your stats update every day, giving you fresh insights into
                  what you've been loving lately. No more waiting for the end of
                  the year to see your story unfold.
                </p>
              </Card>
            </div>
          </div>
        </main>

        <style jsx global>{`
          .load-in {
            animation: pageEnter 0.6s ease-out forwards;
          }

          @keyframes pageEnter {
            from {
              opacity: 0;
              transform: translateY(12px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </main>
  );
}
