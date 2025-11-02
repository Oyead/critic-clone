import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import type { RootState } from "../store/store";
import { addReview, removeReview } from "../features/reviewSlice";

interface Review {
  user: string;
  rating: number;
  comment: string;
  gameId: string;
}

function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState<any>(null);
  const [rating, setRating] = useState<number>(50);
  const [comment, setComment] = useState<string>("");
  const auth = useSelector((state: RootState) => state.auth);
  const reviews = useSelector((state: RootState) => state.reviews);
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await axios.get(
          `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
        );
        setGame(res.data);
      } catch (err) {
        console.error("Failed to fetch game:", err);
      }
    };
    fetchGame();
  }, [id]);

  if (!game)
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;

  const gameReviews = reviews.filter((r: Review) => r.gameId === id);
  const userReview = gameReviews.find((r) => r.user === auth.username);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.isLoggedIn || userReview) return;

    dispatch(
      addReview({
        gameId: id!,
        user: auth.username,
        rating,
        comment,
      })
    );
    setRating(50);
    setComment("");
    navigate("/reviews")
  };

  const handleRemove = () => {
    if (!auth.isLoggedIn || !userReview) return;
    dispatch(removeReview({ gameId: id!, user: auth.username }));
  };

  const getColor = (score: number) => {
    if (score >= 75) return "text-green-600";
    if (score >= 50) return "text-yellow-500";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full">
        {/* Left Column */}
        <div className="flex flex-col items-center md:items-start space-y-6">
          {/* Game Image */}
          <div className="w-full max-w-sm md:max-w-md aspect-4/3 bg-white border rounded-xl flex items-center justify-center overflow-hidden shadow-sm">
            <img
              src={game.background_image}
              alt={game.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Metacritic Score */}
          <div className="w-full max-w-md bg-white border rounded-xl p-4 text-center shadow-sm">
            <p className="text-gray-800 font-semibold">Metacritic Score</p>
            <p className={`text-lg font-bold mt-1 ${getColor(game.metacritic || 0)}`}>
              {game.metacritic ?? "N/A"}
            </p>
          </div>

          {/* Release Date */}
          <div className="w-full max-w-md bg-white border rounded-xl p-4 text-center shadow-sm">
            <p className="text-gray-800 font-semibold">Release Date</p>
            <p className="text-gray-600 mt-1">{game.released}</p>
          </div>

          {/* Reviews List */}
          <div className="w-full max-w-md bg-white border rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Reviews</h3>
            {gameReviews.length === 0 ? (
              <p className="text-gray-500">No reviews yet.</p>
            ) : (
              <ul className="space-y-2">
                {gameReviews.map((r, i) => (
                  <li
                    key={i}
                    className="border rounded-xl p-2 bg-gray-50 flex flex-col gap-1"
                  >
                    <div className="flex justify-between items-center">
                      <p className={`font-semibold ${getColor(r.rating)}`}>
                        {r.user} rated {r.rating}/100
                      </p>
                      {r.user === auth.username && (
                        <button
                          onClick={handleRemove}
                          className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <p className="text-gray-600">{r.comment}</p>
                    {/* Colored bar */}
                    <div className="h-2 w-full rounded bg-gray-200 mt-1">
                      <div
                        className="h-2 rounded"
                        style={{
                          width: `${r.rating}%`,
                          backgroundColor:
                            r.rating >= 75
                              ? "#16a34a"
                              : r.rating >= 50
                              ? "#ca8a04"
                              : "#dc2626",
                        }}
                      ></div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Right Column: Description + Add Review */}
        <div className="flex flex-col w-full max-w-2xl">
          {/* Description */}
          <div className="bg-white border rounded-xl p-8 shadow-sm">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{game.name}</h1>
            <p className="text-gray-700 text-base leading-relaxed">{game.description_raw}</p>
          </div>

          {/* Add Review Form */}
          {auth.isLoggedIn && !userReview ? (
            <form
              onSubmit={handleSubmit}
              className="mt-6 w-full bg-white border rounded-xl p-4 shadow-sm"
            >
              <h3 className="font-semibold text-lg mb-2">Add a Review</h3>
              <div className="mb-3">
                <label className="block text-gray-700 font-semibold mb-1">
                  Rating: {rating}/100
                </label>
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
<textarea
  value={comment}
  onChange={(e) => setComment(e.target.value)}
  className="border border-gray-300 focus:ring-2 p-3 w-full mb-3 rounded-lg resize-none shadow-sm "
  placeholder="Write your review here..."
  rows={4}
  required
/>

              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded w-full cursor-pointer"
              >
                Submit Review
              </button>
            </form>
          ) : auth.isLoggedIn && userReview ? (
            <p className="mt-4 text-gray-500">
              You have already reviewed this game. You can remove your review using the button above.
            </p>
          ) : (
            <p className="mt-4 text-gray-500">Please log in to add a review.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default GameDetails;
