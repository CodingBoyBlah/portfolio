import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "vynl — Spotify Habit & Listening Analytics",
  description:
    "vynl is an open-source Spotify web application that analyzes your music listening habits, taste phases, and patterns over time.",
  alternates: {
    canonical: "/vynl",
  },
  openGraph: {
    title: "vynl — Spotify Habit & Listening Analytics | CodingBoyBlah",
    description:
      "vynl is an open-source Spotify web application that analyzes your music listening habits, taste phases, and patterns over time.",
    url: "https://boyblah.dev/vynl",
    siteName: "CodingBoyBlah",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "vynl by CodingBoyBlah",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "vynl — Spotify Habit & Listening Analytics | CodingBoyBlah",
    description:
      "vynl is an open-source Spotify web application that analyzes your music listening habits, taste phases, and patterns over time.",
    creator: "@boyblahdev",
    images: ["/twitter-image.png"],
  },
};

export default function VynlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
