"use client"

import Image from "next/image"
import Link from "next/link"
import { TextLoop } from "@/components/text-loop"

export function ContactSection() {
  return (
    <div className=" bg-[#d9d9d6] text-[#262629] flex flex-col items-center justify-center py-20">
      <div className="flex justify-center mb-10">
                <Image
                  src="/contact.svg"
                  alt="PROJECTS"
                  width={400}
                  height={113}
                  className="w-full max-w-[400px] h-auto"
                  style={{ mixBlendMode: "difference" }}
                />
        </div>
        <div className="flex flex-col items-center gap-y-3">
          {/*<Link href="mailto:hi@boyblah.dev" className="text-3xl font-semibold hover:scale-105 transition-transform duration-300">
          Email: hi@boyblah.dev
          </Link>
          <Link href="https://x.com/CodingBoyBlah" className="text-3xl font-semibold hover:scale-105 transition-transform duration-300">
          Twitter: @CodingBoyBlah
          </Link>
          <Link href="https://github.com/CodingBoyBlah" className="text-3xl font-semibold hover:scale-105 transition-transform duration-300">
          GitHub: CodingBoyBlah
          </Link>*/}
          <Link href="mailto:hi@boyblah.dev" className="text-3xl font-semibold hover:scale-105 transition-transform duration-300">
          Email
          </Link>
          <Link href="https://x.com/CodingBoyBlah" className="text-3xl font-semibold hover:scale-105 transition-transform duration-300">
          Twitter
          </Link>
          <Link href="https://github.com/CodingBoyBlah" className="text-3xl font-semibold hover:scale-105 transition-transform duration-300">
          GitHub
          </Link>
          <Link href="https://discord.com/users/824955236056563762" className="text-3xl font-semibold hover:scale-105 transition-transform duration-300">
          Discord
          </Link>
        </div>
    </div>
  )
}
