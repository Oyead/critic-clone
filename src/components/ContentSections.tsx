import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import GameCard from "../components/gameCard";

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

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current)
      scrollRef.current.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  return (
    <section className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <div className="flex space-x-2">
          <button onClick={() => scroll("left")} className="p-2 bg-gray-200 rounded-full hover:bg-yellow-400">
            <FaChevronLeft />
          </button>
          <button onClick={() => scroll("right")} className="p-2 bg-gray-200 rounded-full hover:bg-yellow-400">
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex overflow-x-hidden space-x-6 scroll-smooth">
        {images.map((game, i) => (
          <GameCard key={i} game={game} />
        ))}
      </div>
    </section>
  );
};

export default ContentSections;
