import React from "react";
import { useLazyLoading } from "../hooks/useLazyLoading";
interface Game {
  name: string;
  image: string;
}

const GameCard: React.FC<{ game: Game }> = ({ game }) => {
  const { ref, isVisible } = useLazyLoading();

  return (
    <div
      ref={ref}
      className="group shrink-0 w-[320px] h-[200px] rounded-2xl overflow-hidden shadow-lg bg-gray-200 relative"
    >
      {isVisible ? (
        <>
          <img
            src={game.image}
            alt={game.name}
            className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110 cursor-pointer"
          />
          {/* overlay on parent, toggled by group-hover */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none" />
        </>
      ) : (
        <div className="w-full h-full bg-gray-300 animate-pulse" />
      )}
      <p className="absolute bottom-2 left-2 text-white text-sm font-semibold bg-black/60 px-2 py-1 rounded">
        {game.name}
      </p>
    </div>
  );
};

export default GameCard;
