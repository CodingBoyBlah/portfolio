import React from "react";
import styles from "./contact-section.module.css";
import Image from "next/image";
import Link from "next/link";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

export const ContactSection = () => {
  return (
    <div className="bg-[#d9d9d6] p-4 sm:p-6 md:p-3 flex flex-col md:flex-row gap-6 md:gap-10 w-full items-center md:items-start overflow-hidden">
      <Image
        src="/LWYS.svg"
        alt="LWYS"
        width={900}
        height={113}
        className="w-full max-w-[260px] sm:max-w-md md:max-w-none md:w-auto h-auto"
        style={{ mixBlendMode: "normal" }}
      />
      <div className="w-full md:w-auto text-center md:text-right md:ml-auto flex flex-col items-center md:items-end">
        <Link href="mailto:hi@boyblah.dev" className="min-h-[44px] flex items-center justify-center md:justify-end">
          <h1 className="text-[#262629] text-2xl sm:text-3xl md:text-5xl font-bold hover:opacity-80 transition-opacity">Email</h1>
        </Link>
        <Link href="https://github.com/codingboyblah" className="min-h-[44px] flex items-center justify-center md:justify-end">
          <h1 className="text-[#262629] text-2xl sm:text-3xl md:text-5xl hover:opacity-80 transition-opacity">GitHub</h1>
        </Link>
        <Link href="https://x.com/codingboyblah" className="min-h-[44px] flex items-center justify-center md:justify-end">
          <h1 className="text-[#262629] text-2xl sm:text-3xl md:text-5xl hover:opacity-80 transition-opacity">Twitter</h1>
        </Link>
      </div>
    </div>
  );
};

export default ContactSection;
