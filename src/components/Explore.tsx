import React, { useEffect, useState } from "react";
import { getBestGamesLastDecade } from "../api";
import { Link } from "react-router-dom";

interface Game {
  id: number;
  name: string;
  image: string;
  metacritic: number | string;
}

const Explore: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [animatedWidths, setAnimatedWidths] = useState<Record<number, number>>({});

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await getBestGamesLastDecade();
        setGames(data);
        // Initialize animated widths to 0
        const widths: Record<number, number> = {};
        data.forEach((game:Game) => (widths[game.id] = 0));
        setAnimatedWidths(widths);

        // Animate bars after a short delay
        setTimeout(() => {
          const newWidths: Record<number, number> = {};
          data.forEach((game:Game) => {
            newWidths[game.id] = typeof game.metacritic === "number" ? game.metacritic : 0;
          });
          setAnimatedWidths(newWidths);
        }, 100); // slight delay to trigger transition
      } catch (error) {
        console.error("Failed to fetch games:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (games.length === 0) return <div>No games found.</div>;

  // Gradient color based on score
  const getScoreGradient = (score: number) => {
    if (score >= 90) return "from-green-600 to-green-400";
    if (score >= 75) return "from-yellow-500 to-yellow-300";
    if (score >= 50) return "from-orange-500 to-orange-300";
    return "from-red-500 to-red-300";
  };

  return (
    <div className="explore-container p-4">
      <h1 className="text-3xl font-bold mb-6">Best Games (2010–2019)</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {/* Safelist all gradient classes so Tailwind generates them */}
        <div className="hidden "></div>

{games.map((game: Game) => (
  <Link key={game.id} to={`/game/${game.id}`}>
    <div className="game-card border rounded-lg overflow-hidden shadow hover:shadow-lg transition transform hover:scale-105 cursor-pointer">
      <img
        src={game.image}
        alt={game.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-2">
        <h2 className="font-semibold text-sm mb-1">{game.name}</h2>
        {typeof game.metacritic === "number" ? (
          <div className="flex items-center gap-2">
            <div className="w-full bg-gray-300 h-2 rounded overflow-hidden">
              <div
                className={`h-2 rounded bg-gradient-to-r ${getScoreGradient(
                  game.metacritic
                )} transition-all duration-1000 ease-out`}
                style={{ width: `${animatedWidths[game.id] || 0}%` }}
              ></div>
            </div>
            <span className="text-xs font-semibold">{game.metacritic}</span>
          </div>
        ) : (
          <span className="text-xs text-gray-500">No Score</span>
        )}
      </div>
    </div>
  </Link>
))}


      </div>
    </div>
  );
};

export default Explore;
