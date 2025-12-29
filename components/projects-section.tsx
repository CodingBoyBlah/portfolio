"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

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
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen pt-20 px-4 md:px-8 lg:px-16 opacity-0 transition-opacity duration-500"
      style={{ backgroundColor: "#d9d9d6" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-20">
          <Image
            src="/projects.svg"
            alt="PROJECTS"
            width={400}
            height={113}
            className="w-full max-w-[400px] h-auto"
            style={{ mixBlendMode: "difference" }}
          />
        </div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="p-8 md:p-12 border-2 hover:scale-101 transform transition-transform duration-300"
              style={{ backgroundColor: "#d9d9d6", borderColor: "#262629" }}
            >
              <Link href={project.url}>
                <h3
                  className="font-mono text-3xl md:text-4xl font-bold mb-3"
                  style={{ color: "#262629" }}
                >
                  {project.title}
                </h3>
              </Link>
              <p
                className="font-mono text-sm md:text-base"
                style={{ color: "#262629" }}
              >
                {project.description}
              </p>
            </div>
          ))}
        </div>

        <div className="relative w-full flex justify-center mt-20 overflow-hidden">
          <Image
            src="/globe.svg"
            alt=""
            width={1728}
            height={706}
            className="w-full max-w-300 h-auto"
            style={{ mixBlendMode: "difference" }}
          />
        </div>
      </div>
    </section>
  );
}
