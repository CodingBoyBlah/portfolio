import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#262629] text-white">
      <Image src="/not-found.svg" alt="Not Found" width={1100} height={600} className="mx-auto my-16" />
      <Link href="/" className="font-mono font-extrabold text-base md:text-lg lg:text-xl tracking-[0.3em] uppercase text-[#808080] my-0 cursor-pointer underline hover:text-[#d9d9d6] transition-colors duration-300">
        Go Back Home
      </Link>
    </div>
  )
}