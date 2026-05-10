"use client";

import { motion, useReducedMotion } from "motion/react";

export function InterruptSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <div
        className="h-[30vh] scroll-snap-item"
        style={{ backgroundColor: "#d9d9d6" }}
      />

      <motion.section
        className="min-h-[40vh] flex items-center justify-center scroll-snap-item"
        style={{ backgroundColor: "#d9d9d6" }}
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 26, filter: "blur(6px)" }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: false, amount: 0.5 }}
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const }
        }
      >
        <p
          className="font-mono text-2xl md:text-3xl lg:text-4xl tracking-wide"
          style={{ color: "#262629" }}
        >
          oops.. anyways.
        </p>
      </motion.section>

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
