"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Link from "next/dist/client/link";

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const patternY = useTransform(scrollY, [0, 800], [0, 80]);
  const titleY = useTransform(scrollY, [0, 800], [0, 0]);

  return (
    <section className="relative h-full overflow-hidden bg-[#262629]">
      {/* BACKGROUND PATTERN */}
      <motion.div
        className="absolute inset-0 scale-90 flex items-center justify-center pointer-events-none"
        style={prefersReducedMotion ? undefined : { y: patternY }}
      >
        <Image
          src="/diagonal-pattern.svg"
          alt=""
          width={1642}
          height={870}
          className="w-full h-full object-contain"
          priority
        />
      </motion.div>

      <div className="relative flex min-h-screen flex-col items-center justify-center px-4">
        <motion.div
          className="w-full max-w-[1100px]  scale-65"
          style={{ mixBlendMode: "difference" }}
          initial={
            prefersReducedMotion
              ? undefined
              : { opacity: 0, y: 32, filter: "blur(8px)" }
          }
          animate={
            prefersReducedMotion
              ? undefined
              : { opacity: 1, y: 0, filter: "blur(0px)" }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
          }
        >
          <Image
            src="/codingboyblah.svg"
            alt="CODINGBOYBLAH"
            width={1189}
            height={225}
            className="w-full h-auto"
            priority
          />
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-12 left-0 right-0 flex items-center justify-center"
        style={prefersReducedMotion ? undefined : { y: titleY }}
      >
        <Link href="https://github.com/codingboyblah" className="cursor-pointer">
        <p
          className="font-mono font-extrabold text-base md:text-lg lg:text-xl tracking-[0.3em] uppercase text-[#808080] my-0  cursor-pointer hover:text-[#d9d9d6] transition-colors duration-300"
          style={{ mixBlendMode: "difference" }}
        >
          {"github·"}
        </p>

        </Link>

        <Link href="https://x.com/codingboyblah" className="cursor-pointer">
         <p
          className="font-mono font-extrabold text-base md:text-lg lg:text-xl tracking-[0.3em] uppercase text-[#808080] my-0  cursor-pointer hover:text-[#d9d9d6] transition-colors duration-300 "
          style={{ mixBlendMode: "difference" }}
        >
          {"twitter·"}
        </p>
        </Link>
        <Link href="mailto:hi@boyblah.dev" className="cursor-pointer">
         <p
          className="font-mono font-extrabold text-base md:text-lg lg:text-xl tracking-[0.3em] uppercase text-[#808080] my-0  cursor-pointer hover:text-[#d9d9d6] transition-colors duration-300"
          style={{ mixBlendMode: "difference" }}
        >
          {"mail"}
        </p>
        </Link>
      </motion.div>
    </section>
  );
}
