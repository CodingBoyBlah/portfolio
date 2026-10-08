import type React from "react";
import type { Metadata } from "next";
import { IBM_Plex_Mono, Bebas_Neue } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import "../styles/globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas-neue",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://boyblah.dev"),
  title: {
    default: "CodingBoyBlah — Full-Stack Developer & Creative Technologist",
    template: "%s | CodingBoyBlah",
  },
  description:
    "Portfolio of CodingBoyBlah (Anshuman). Full-stack developer building open-source projects like Musique, vynl, web experiments, and graphic design posters.",
  keywords: [
    "CodingBoyBlah",
    "Anshuman",
    "Full-Stack Developer",
    "Software Engineer",
    "Musique Spotify client",
    "vynl",
    "Web Developer India",
    "Creative Developer",
    "Graphic Design Posters",
    "Open Source Developer",
  ],
  authors: [{ name: "CodingBoyBlah", url: "https://boyblah.dev" }],
  creator: "CodingBoyBlah",
  publisher: "CodingBoyBlah",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CodingBoyBlah — Full-Stack Developer & Creative Technologist",
    description:
      "Full-stack developer building open-source tools, experimental web apps, and design projects.",
    url: "https://boyblah.dev",
    siteName: "CodingBoyBlah",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CodingBoyBlah — Full-Stack Developer & Creative Technologist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodingBoyBlah — Full-Stack Developer & Creative Technologist",
    description:
      "Full-stack developer building open-source tools, experimental web apps, and design projects.",
    images: ["/twitter-image.png"],
    creator: "@boyblahdev",
    site: "@boyblahdev",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
        sizes: "32x32",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
        sizes: "32x32",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://boyblah.dev/#person",
      name: "Anshuman",
      alternateName: "CodingBoyBlah",
      url: "https://boyblah.dev",
      image: "https://boyblah.dev/og-image.png",
      sameAs: [
        "https://github.com/codingboyblah",
        "https://x.com/boyblahdev",
        "https://codingboyblah.itch.io",
      ],
      jobTitle: "Full-Stack Developer & Creative Technologist",
      description:
        "Full-stack software developer and creative technologist based in India building open source apps, graphic design posters, and games.",
    },
    {
      "@type": "WebSite",
      "@id": "https://boyblah.dev/#website",
      url: "https://boyblah.dev",
      name: "CodingBoyBlah",
      description: "Full-stack developer and creative technologist portfolio",
      publisher: {
        "@id": "https://boyblah.dev/#person",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ibmPlexMono.variable} ${bebasNeue.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-mono antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <Analytics />
      </body>
    </html>
  );
}
