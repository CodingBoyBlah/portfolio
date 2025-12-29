"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-slide-up");
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#262629]"
    >
      {/* BACKGROUND PATTERN */}
      <div className="absolute inset-0 scale-90 flex items-center justify-center pointer-events-none">
        <Image
          src="/diagonal-pattern.svg"
          alt=""
          width={1642}
          height={870}
          className="w-full h-auto object-contain"
          priority
        />
      </div>

      <div className="relative flex min-h-screen flex-col items-center justify-center px-4">
        <div
          className="w-full max-w-[1100px]  scale-65"
          style={{ mixBlendMode: "difference" }}
        >
          <Image
            src="/codingboyblah.svg"
            alt="CODINGBOYBLAH"
            width={1189}
            height={225}
            className="w-full h-auto"
            priority
          />
        </div>

        
      </div>
      <div className="flex items-center justify-center">
      <p
          className="font-mono font-extrabold text-sm md:text-base lg:text-lg tracking-[0.3em] uppercase text-[#d9d9d6] my-0 "
          style={{ mixBlendMode: "difference" }}
        >
          {"DEV · DESIGN · CHAOS"}
        </p>
      </div>
    </section>
  );
}
