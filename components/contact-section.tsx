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
    <div className=" bg-[#d9d9d6] p-3 flex gap-10 w-full">
      <Image
        src="/LWYS.svg"
        alt="LWYS"
        width={900}
        height={113}
        className="h-auto"
        style={{ mixBlendMode: "normal" }}
      />
      <div className="ml-auto text-right">
        <Link href="/">
          <h1 className="text-[#262629] text-5xl font-bold">Email</h1>
        </Link>
        <Link href="/">
          <h1 className="text-[#262629] text-5xl">GitHub</h1>
        </Link>
        <Link href="/">
          <h1 className="text-[#262629] text-5xl">Twitter</h1>
        </Link>
      </div>
    </div>
  );
};

export default ContactSection;
