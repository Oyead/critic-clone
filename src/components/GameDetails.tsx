import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState<any>(null);
  const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

  useEffect(() => {
    const fetchGame = async () => {
      const res = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
      setGame(res.data);
    };
    fetchGame();
  }, [id]);

  if (!game) return <p className="text-center text-gray-500 mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full">
        {/* Left column */}
        <div className="flex flex-col items-center md:items-start space-y-6">
          <div className="w-full max-w-sm md:max-w-md aspect-4/3 bg-white border border-gray-300 rounded-xl flex items-center justify-center overflow-hidden shadow-sm">
            <img
              src={game.background_image}
              alt={game.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-full max-w-md bg-white border border-gray-300 rounded-xl p-4 text-center shadow-sm">
            <p className="text-gray-800 font-semibold">Metacritic Score</p>
            <p
              className={`text-lg font-bold mt-1 ${
                game.metacritic >= 75
                  ? "text-green-600"
                  : game.metacritic >= 50
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {game.metacritic ?? "N/A"}
            </p>
          </div>

          <div className="w-full max-w-md bg-white border border-gray-300 rounded-xl p-4 text-center shadow-sm">
            <p className="text-gray-800 font-semibold">Release Date</p>
            <p className="text-gray-600 mt-1">{game.released}</p>
          </div>
        </div>

        {/* Right column */}
        <div className="bg-white border border-gray-300 rounded-xl p-8 flex flex-col justify-center shadow-sm">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{game.name}</h1>
          <p className="text-gray-700 text-base leading-relaxed">
            {game.description_raw}
          </p>
        </div>
      </div>
    </div>
  );
}

export default GameDetails;
