"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { User } from "lucide-react";

const testimonials = [
  {
    username: "THESAMGORDON",
    quote: '"PERFECTLY UNSHINY, OFTEN NEEDS POLISHING. TREAT AS A SHOE."',
  },
  {
    username: "NOAH",
    quote: '"HE DELETED THE PROD DATABASE TWICE! IN THE SAME DAY!"',
  },
  {
    username: "LUIGGIONABREAK",
    quote: '"EXTREMELY HIGH INTELLECT... FOR A SNAIL."',
  },
  {
    username: "ANIRUDH",
    quote: '"HE BURNED $100K IN CLAUDE CODE CREDITS! JUST TO CENTER A DIV!"',
  },
  {
    username: "0X5B62656E5D",
    quote: '"HE COMMITED OUR .ENV FILE AND COST US $50K IN AWS COSTS!"',
  },
  {
    username: "PLYGHT",
    quote: '"WORST GAME DEVELOPER EVER, NEVER PLAY HIS GAMES!!"',
  },
  {
    username: "LEO",
    quote: '"INVENTED THREE NEW BUGS WHILE FIXING ONE. CALLS IT INNOVATION."',
  },
  {
    username: "LAURA",
    quote: '"SWEARS IT WORKED YESTERDAY. YESTERDAY DISAGREES."',
  },
  {
    username: "DOMBOM",
    quote: '"OPERATES AS DESIGNED. DESIGN IS QUESTIONABLE."',
  },
  {
    username: "DANCRO",
    quote: '"WISDOM CHASES HIM, BUT HE IS FASTER"',
  },
  {
    username: "BONIK",
    quote:
      "\"HE SLOWED THE APP DOWN, AND CALLED IT A 'SLIGHT NEGATIVE GROWTH IN PERFORMANCE.'\"",
  },
  {
    username: "PAUSED",
    quote: '"CALLS HIMSELF A CODER, CAN\'T EVEN SPELL THE WORD PROJECT."',
  },
];

export function TestimonialsSection() {
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
      className="min-h-screen py-20 px-4 md:px-8 lg:px-16 opacity-0 transition-opacity duration-500"
      style={{ backgroundColor: "#262629" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-16">
          <div style={{ mixBlendMode: "difference" }}>
            <Image
              src="/beloved-by-all.svg"
              alt="BELOVED BY ALL"
              width={425}
              height={75}
              className="w-full max-w-[425px] h-auto"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 border-2"
              style={{ backgroundColor: "#262629", borderColor: "#d9d9d6" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#d9d9d6" }}
                >
                  <User className="w-6 h-6" style={{ color: "#262629" }} />
                </div>
                <span
                  className="font-mono text-sm font-bold uppercase"
                  style={{ color: "#d9d9d6" }}
                >
                  {testimonial.username}
                </span>
              </div>
              <p
                className="font-mono text-xs md:text-sm leading-relaxed"
                style={{ color: "#d9d9d6" }}
              >
                {testimonial.quote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
