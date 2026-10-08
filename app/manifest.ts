import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CodingBoyBlah — Full-Stack Developer & Designer",
    short_name: "CodingBoyBlah",
    description:
      "Personal portfolio, projects, and writing by CodingBoyBlah (Anshuman).",
    start_url: "/",
    display: "standalone",
    background_color: "#262629",
    theme_color: "#262629",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/icon-light-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
