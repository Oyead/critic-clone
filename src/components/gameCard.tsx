import React from "react";
import { useLazyLoading } from "../hooks/useLazyLoading";
import { Link } from "react-router-dom";
interface Game {
  name: string;
  image: string;
  id:number;
}

const GameCard: React.FC<{ game: Game }> = ({ game }) => {
  const { ref, isVisible } = useLazyLoading();

  return (
  <Link to={`/game/${game.id}`}>
    <div
      ref={ref}
      className="group relative shrink-0 w-[320px] h-[200px] rounded-2xl overflow-hidden shadow-lg bg-gray-200 bg-cover bg-center"
      style={{ backgroundImage: `url(${game.image})` }}
    >
      {isVisible ? (
        <>
          <img
            src={game.image}
            alt={game.name}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110 cursor-pointer"
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
    </Link>
  );
};

export default GameCard;
