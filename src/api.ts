import axios from "axios"
const API_BASE = import.meta.env.VITE_APP_API_URL;
const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
export const getHighestRated = async () => {
  const res = await axios.get(
    `${API_BASE}/games?key=${API_KEY}&ordering=-metacritic&page_size=10`
  );
  return res.data.results
    .filter((game: any) => game.background_image)
    .map((game: any) => ({
      name: game.name,
      image: game.background_image,
    }));
};

// Get newly released games
export const getNewlyReleased = async () => {
  const today=new Date().toISOString().split("T")[0]
  const res = await axios.get(
    `${API_BASE}/games?key=${API_KEY}&dates=2024-01-01,${today}&ordering=-released&page_size=10`
  );
  return res.data.results
    .filter((game: any) => game.background_image)
    .map((game: any) => ({
      name: game.name,
      image: game.background_image,
    }));
};