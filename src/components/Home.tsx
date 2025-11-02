import { useEffect, useState } from "react";
import ContentSections from "./ContentSections";
import { getHighestRated, getNewlyReleased } from "../api";

function Home() {
  const [highestRated, setHighestRated] = useState<{ name: string; image: string }[]>([]);
  const [newlyReleased, setNewlyReleased] = useState<{ name: string; image: string }[]>([]);

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
    <>
    <div className="py-10">  <ContentSections title="Newly Released" images={newlyReleased} />
      <ContentSections title="Highest Rated" images={highestRated} /></div>
    
    </>
  );
}

export default Home;
