import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import type { RootState } from "../store/store";
import axios from "axios";
import { removeReview } from "../features/reviewSlice"; // <- import action

interface Review {
  user: string;
  rating: number;
  comment: string;
  gameId: string;
}

interface GameInfo {
  name: string;
  background_image: string;
}

function MyReviews() {
  const reviews = useSelector((state: RootState) => state.reviews);
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const myReviews = reviews.filter((r: Review) => r.user === auth.username);

  const [games, setGames] = useState<{ [id: string]: GameInfo }>({});
  const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

  useEffect(() => {
    const fetchGames = async () => {
      const idsToFetch = myReviews
        .map((r) => r.gameId)
        .filter((id) => !games[id]);

      await Promise.all(
        idsToFetch.map(async (id) => {
          try {
            const res = await axios.get(
              `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
            );
            setGames((prev) => ({
              ...prev,
              [id]: {
                name: res.data.name,
                background_image: res.data.background_image,
              },
            }));
          } catch (err) {
            console.error("Failed to fetch game:", id, err);
          }
        })
      );
    };

    if (myReviews.length) fetchGames();
  }, [myReviews]);

  if (!auth.isLoggedIn) return <p className="text-center mt-10">Login required</p>;
  if (!myReviews.length) return <p className="text-center mt-10">No reviews yet</p>;

  const handleRemove = (gameId: string) => {
    dispatch(removeReview({ gameId, user: auth.username }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">My Reviews</h1>
      <div className="space-y-4 w-full max-w-2xl">
        {myReviews.map((r, i) => {
          const game = games[r.gameId];
          return (
            <div
              key={i}
              className="bg-white p-4 border rounded-xl shadow-sm flex gap-4 items-start"
            >
              {game && (
                <img
                  src={game.background_image}
                  alt={game.name}
                  className="w-24 h-24 object-cover rounded"
                />
              )}
              <div className="flex flex-col flex-1">
                {game && <p className="font-semibold text-lg">{game.name}</p>}
                <p>Rating: {r.rating}/10</p>
                <p className="text-gray-700">{r.comment}</p>
                <button
                  onClick={() => handleRemove(r.gameId)}
                  className="mt-2 self-start bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyReviews;
