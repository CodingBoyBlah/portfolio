import Image from "next/image";
import poster1 from "../../content/posters/poster1.png";
import poster2 from "../../content/posters/poster2.png";
import poster3 from "../../content/posters/poster3.png";
import poster4 from "../../content/posters/poster4.png";
import poster5 from "../../content/posters/poster5.png";
import poster6 from "../../content/posters/poster6.png";
import poster7 from "../../content/posters/poster7.png";
import poster8 from "../../content/posters/poster8.png";
import poster9 from "../../content/posters/poster9.png";
import poster10 from "../../content/posters/poster10.png";
import poster11 from "../../content/posters/poster11.png";
import poster12 from "../../content/posters/poster12.png";
import poster13 from "../../content/posters/poster13.png";
import poster14 from "../../content/posters/poster14.png";
import poster15 from "../../content/posters/poster15.png";
import Cursor from "@/components/cursor";

const posters = [
  { title: "Poster 1", image: poster1 },
  { title: "Poster 2", image: poster2 },
  { title: "Poster 3", image: poster3 },
  { title: "Poster 4", image: poster4 },
  { title: "Poster 5", image: poster5 },
  { title: "Poster 6", image: poster6 },
  { title: "Poster 7", image: poster7 },
  { title: "Poster 8", image: poster8 },
  { title: "Poster 9", image: poster9 },
  { title: "Poster 10", image: poster10 },
  { title: "Poster 11", image: poster11 },
  { title: "Poster 12", image: poster12 },
  { title: "Poster 13", image: poster13 },
  { title: "Poster 14", image: poster14 },
  { title: "Poster 15", image: poster15 },
];

export default function PostersPage() {
  return (
    <div className="min-h-screen pt-5 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-20">
          <Image
            src="/posters.svg"
            alt="POSTERS"
            width={400}
            height={113}
            className="w-full max-w-[400px] h-auto"
            style={{ mixBlendMode: "difference" }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {posters.map((poster, index) => (
            <div
              key={index}
              className="border-2 rounded-md transform transition-transform duration-300 hover:scale-101 overflow-hidden relative"
              style={{
                backgroundColor: "#d9d9d6",
                borderColor: "#262629",
                aspectRatio: "148 / 210",
              }}
            >
              <Image
                src={poster.image}
                alt={poster.title}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </div>
      <Cursor />
    </div>
  );
}
