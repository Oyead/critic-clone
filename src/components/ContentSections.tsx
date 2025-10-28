import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Game {
  name: string;
  image: string;
}

interface GameSectionProps {
  title: string;
  images: Game[];
}

const ContentSections: React.FC<GameSectionProps> = ({ title, images }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 bg-gray-200 rounded-full hover:bg-yellow-400 transition"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 bg-gray-200 rounded-full hover:bg-yellow-400 transition"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-hidden space-x-6 scroll-smooth"
      >
        {images.map((game, index) => (
          <div
            key={index}
            className="shrink-0 w-[280px] h-[180px] sm:w-[320px] sm:h-[200px] md:w-[380px] md:h-60 lg:w-[420px] lg:h-[260px] rounded-2xl overflow-hidden shadow-lg bg-gray-100 relative cursor-pointer group"
          >
            <img
              src={game.image}
              alt={game.name}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <p className="absolute bottom-2 left-2 text-white text-sm font-semibold bg-black/60 px-2 py-1 rounded">
              {game.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContentSections;
