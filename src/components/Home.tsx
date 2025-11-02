import { useEffect, useState } from "react";
import ContentSections from "./ContentSections";
import { getHighestRated, getNewlyReleased } from "../api";

interface Game {
  id: number; // or number, depending on your API
  name: string;
  image: string;
}

function Home() {
  const [highestRated, setHighestRated] = useState<Game[]>([]);
  const [newlyReleased, setNewlyReleased] = useState<Game[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [ratedGames, newGames] = await Promise.all([
        getHighestRated(),
        getNewlyReleased(),
      ]);
      setHighestRated(ratedGames);
      setNewlyReleased(newGames);
    };

    fetchData();
  }, []);

  return (
    <div className="py-10">
      <ContentSections title="Newly Released" images={newlyReleased} />
      <ContentSections title="Highest Rated" images={highestRated} />
    </div>
  );
}

export default Home;