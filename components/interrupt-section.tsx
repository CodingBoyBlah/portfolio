"use client";

import { useEffect, useRef } from "react";

export function InterruptSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("animate-fade-in-up");
            }, 200);
          }
        });
      },
      { threshold: 0.5 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        className="h-[30vh] scroll-snap-item"
        style={{ backgroundColor: "#d9d9d6" }}
      />

      <section
        ref={sectionRef}
        className="min-h-[40vh] flex items-center justify-center scroll-snap-item opacity-0 transition-opacity duration-500"
        style={{ backgroundColor: "#d9d9d6" }}
      >
        <p
          className="font-mono text-2xl md:text-3xl lg:text-4xl tracking-wide"
          style={{ color: "#262629" }}
        >
          oops.. anyways.
        </p>
      </section>

      <div
        className="h-[30vh] scroll-snap-item"
        style={{ backgroundColor: "#d9d9d6" }}
      />
      <style jsx global>{`
        body {
          background-color: #d9d9d6;
        }
      `}</style>
    </>
  );
}
