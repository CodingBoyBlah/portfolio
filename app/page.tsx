"use client";

import { motion, useReducedMotion } from "motion/react";
import { HeroSection } from "@/components/hero-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { InterruptSection } from "@/components/interrupt-section";
import { ProjectsSection } from "@/components/projects-section";
import { BlogsSection } from "@/components/blogs-section";
import { ContactSection } from "@/components/contact-section";
import GradualBlur from "@/components/GradualBlur";
import Cursor from "@/components/cursor";

export default function PortfolioPage() {
  const prefersReducedMotion = useReducedMotion();

  const sectionEnter = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 28, filter: "blur(10px)" },
        whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
        viewport: { once: false, amount: 0.25 },
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <main className="scroll-container">
      <HeroSection />

      <ProjectsSection />

      <motion.div {...sectionEnter}>
        <TestimonialsSection />
      </motion.div>

      <motion.div {...sectionEnter}>
        <InterruptSection />
      </motion.div>

      <motion.div {...sectionEnter}>
        <BlogsSection />
      </motion.div>

      {/*<motion.div {...sectionEnter}>
        <ContactSection />
      </motion.div> */}

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
