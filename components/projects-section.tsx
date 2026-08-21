"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

const projects = [
  {
    title: "vynl",
    description: "Music analytics & discovery project",
    url: "/vynl",
  },
  {
    title: "Posters",
    description: "Graphic / visual poster work",
    url: "/posters",
  },
  {
    title: "Circle Pong",
    description: "Experimental circular pong game",
    url: "https://codingboyblah.itch.io/circle-pong",
  },
];

export function ProjectsSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const headingY = useTransform(scrollYProgress, [0, 1], [28, -20]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [30, -24]);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen pt-12 md:pt-20 pb-0 px-4 sm:px-6 md:px-8 lg:px-16 flex flex-col justify-between"
      style={{ backgroundColor: "#d9d9d6" }}
    >
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between">
        <div>
          <motion.div
            className="flex justify-center mb-6 md:mb-8"
            style={
              prefersReducedMotion
                ? { mixBlendMode: "difference" }
                : { y: headingY, mixBlendMode: "difference" }
            }
          >
            <Image
              src="/projects.svg"
              alt="PROJECTS"
              width={400}
              height={113}
              className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[400px] h-auto"
              style={{ mixBlendMode: "normal" }}
            />
          </motion.div>

          <div
            className="mx-auto mb-8 md:mb-14 max-w-2xl border border-[#808080] px-3 py-2.5 sm:px-4 sm:py-3 text-center font-mono text-[10px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.18em] md:text-sm"
            style={{ color: "#262629" }}
          >
            shipped ideas, experiments, and playable builds
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 md:gap-8"
            style={prefersReducedMotion ? undefined : { y: cardsY }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="group hoverable-dark border-2 p-0"
                style={{ backgroundColor: "#d9d9d6", borderColor: "#262629" }}
                initial={
                  prefersReducedMotion ? undefined : { opacity: 0, y: 24, filter: "blur(6px)" }
                }
                whileInView={
                  prefersReducedMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }
                }
                viewport={{ once: false, amount: 0.25 }}
                transition={
                  prefersReducedMotion
                    ? undefined
                    : { duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] as const }
                }
              >
                <Link
                  href={project.url}
                  className="block px-4 py-6 sm:px-6 sm:py-8 md:px-12 md:py-10"
                  target={project.url.startsWith("http") ? "_blank" : undefined}
                  rel={project.url.startsWith("http") ? "noreferrer" : undefined}
                >
                  <div className="mb-4 sm:mb-6 flex items-center justify-between border-b border-[#808080] pb-2 sm:pb-3">
                    <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#808080]">
                      0{index + 1}
                    </span>
                    <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#808080]">
                      selected work
                    </span>
                  </div>

                  <div className="flex flex-col gap-3 sm:gap-6 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="mb-2 sm:mb-3 font-mono text-2xl sm:text-3xl font-bold md:text-4xl text-[#262629]">
                        {project.title}
                      </h3>
                      <p className="font-mono text-xs sm:text-sm md:text-base text-[#262629] leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-8 h-[2px] w-full overflow-hidden bg-[#808080]">
                    <motion.div
                      className="h-full bg-[#262629]"
                      initial={prefersReducedMotion ? undefined : { scaleX: 0, transformOrigin: "left" }}
                      whileInView={prefersReducedMotion ? undefined : { scaleX: 1 }}
                      viewport={{ once: false, amount: 0.5 }}
                      transition={
                        prefersReducedMotion
                          ? undefined
                          : { duration: 0.7, delay: 0.1 + index * 0.08, ease: [0.22, 1, 0.36, 1] as const }
                      }
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="relative w-full flex justify-center items-end mt-10 md:mt-20 overflow-hidden leading-none">
          <Image
            src="/globe.svg"
            alt=""
            width={1728}
            height={706}
            className="w-full max-w-[340px] sm:max-w-md md:max-w-300 h-auto block align-bottom mb-0"
            style={{ mixBlendMode: "difference" }}
          />
        </div>
      </div>
    </section>
  );
}
