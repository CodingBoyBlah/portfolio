"use client";

import Image from "next/image";
import { User } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

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
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="min-h-screen py-12 px-2.5 sm:px-6 md:py-20 md:px-8 lg:px-16"
      style={{ backgroundColor: "#262629" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-8 sm:mb-10 md:mb-16">
          <div style={{ mixBlendMode: "difference" }}>
            <Image
              src="/beloved-by-all.svg"
              alt="BELOVED BY ALL"
              width={425}
              height={75}
              className="w-full max-w-[260px] sm:max-w-[340px] md:max-w-[425px] h-auto"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="p-2.5 sm:p-4 md:p-6 border-2 flex flex-col justify-between"
              style={{ backgroundColor: "#262629", borderColor: "#d9d9d6" }}
              initial={
                prefersReducedMotion ? undefined : { opacity: 0, y: 20, filter: "blur(4px)" }
              }
              whileInView={
                prefersReducedMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }
              }
              viewport={{ once: false, amount: 0.15 }}
              transition={
                prefersReducedMotion
                  ? undefined
                  : { duration: 0.45, delay: (index % 3) * 0.06, ease: [0.22, 1, 0.36, 1] as const }
              }
            >
              <div>
                <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 mb-2 md:mb-4">
                  <div
                    className="w-5 h-5 sm:w-7 sm:h-7 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "#d9d9d6" }}
                  >
                    <User className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6" style={{ color: "#262629" }} />
                  </div>
                  <span
                    className="font-mono text-[9px] sm:text-xs md:text-sm font-bold uppercase truncate"
                    style={{ color: "#d9d9d6" }}
                  >
                    {testimonial.username}
                  </span>
                </div>
                <p
                  className="font-mono text-[9px] sm:text-xs md:text-sm leading-relaxed"
                  style={{ color: "#d9d9d6" }}
                >
                  {testimonial.quote}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
