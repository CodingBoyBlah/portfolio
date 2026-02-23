import React from "react";

export default function Head(): React.ReactNode {
  const title = "CodingBoyBlah";
  const description = "The most best developer";
  const canonical = "https://boyblah.dev";
  const ogImage = `${canonical}/og-image.png`;
  const twitterImage = `${canonical}/twitter-image.png`;
  const siteName = "CodingBoyBlah";
  const twitterHandle = "@CodingBoyBlah";

  return (
    <>
      {/* Basic / general */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <meta name="generator" content="CodingBoyBlah" />
      <meta name="robots" content="index, follow" />

      {/* Canonical */}
      <link rel="canonical" href={canonical} />

      {/* Icons (layout.tsx already defines icons, but explicit links help some bots) */}
      <link rel="icon" href="/icon.svg" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/icon-light-32x32.png"
      />
      <link rel="apple-touch-icon" href="/apple-icon.png" />

      {/* Open Graph (Facebook, LinkedIn, general link previews) */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:alt" content={`${siteName} — ${description}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twitterImage} />
      <meta name="twitter:image:alt" content={`${siteName} — ${description}`} />

      {/* Fallback/legacy */}
      <meta name="theme-color" content="#ffffff" />
    </>
  );
}
