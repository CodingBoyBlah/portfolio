"use client";

import { useEffect } from "react";
import { HeroSection } from "@/components/hero-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { InterruptSection } from "@/components/interrupt-section";
import { ProjectsSection } from "@/components/projects-section";
import { BlogsSection } from "@/components/blogs-section";
import { ContactSection } from "@/components/contact-section";
import GradualBlur from "@/components/GradualBlur";
import Cursor from "@/components/cursor";

export default function PortfolioPage() {
  useEffect(() => {
    const loadLenis = async () => {
      const Lenis = (await import("@studio-freight/lenis")).default;

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    };

    loadLenis();
  }, []);

  return (
    <main className="scroll-container">
      <HeroSection />
      <TestimonialsSection />
      <InterruptSection />
      <ProjectsSection />
      <BlogsSection />
      {/*<ContactSection />*/}
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
      <Cursor />
    </main>
  );
}
