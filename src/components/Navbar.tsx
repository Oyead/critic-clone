import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import type { RootState } from "../store/store";
import axios from "axios";

function Navbar() {
  const [dropList, setDropList] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const API_BASE = import.meta.env.VITE_APP_API_URL;
  const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
  const dispatch = useDispatch();
  const { isLoggedIn, username, avatar } = useSelector(
    (state: RootState) => state.auth
  );
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);

  // Search API
  useEffect(() => {
  const timeout = setTimeout(async () => {
    if (query.trim().length > 2) {
      const res = await axios.get(
        `${API_BASE}/games?key=${API_KEY}&search=${query}&page_size=10`
      );

      // Sort locally: first by relevance (RAWG default), then by Metacritic descending
      const ranked = res.data.results
        .filter((game: any) => game.background_image)
        .sort((a: any, b: any) => (b.metacritic || 0) - (a.metacritic || 0));

      setResults(ranked);
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, 400);
  return () => clearTimeout(timeout);
}, [query]);


  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setDropList(false);
      }
      if (searchRef.current && !searchRef.current.contains(target)) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2">
        <Link to="/">
          <img
            src="/src/assets/gamepad.png"
            alt="Logo"
            className="w-10 h-10 rounded-full cursor-pointer"
          />
        </Link>
        <div className="hidden md:flex space-x-6 ml-8">
          <a href="#" className="text-gray-700 hover:text-yellow-800 font-medium">
            Explore
          </a>
          <a href="#" className="text-gray-700 hover:text-yellow-800 font-medium">
            Reviews
          </a>
        </div>
      </div>

      {/* Middle: Search */}
      <div ref={searchRef} className="hidden md:flex flex-1 justify-center mx-6 relative">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-[30%] lg:w-[60%] border border-gray-300 rounded-3xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        {showResults && results.length > 0 && (
          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white border border-gray-200 shadow-lg rounded-lg w-[60%] max-h-80 overflow-y-auto z-50">
            {results.map((game) => (
              <Link
                key={game.id}
                to={`/game/${game.id}`}
                className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setQuery("");
                  setShowResults(false);
                }}
              >
                <img
                  src={game.background_image}
                  alt={game.name}
                  className="w-10 h-10 rounded object-cover"
                />
                <p className="text-gray-800 text-sm font-medium">{game.name}</p>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Right: Auth */}
      {!isLoggedIn ? (
        <div className="flex items-center space-x-4">
          <Link to="/login">
            <button className="text-gray-700 hover:text-yellow-800 font-medium cursor-pointer">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-black text-white px-4 py-2 rounded-full hover:bg-yellow-800 transition cursor-pointer">
              Register
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <p>Hello, {username}</p>
          <div className="relative" ref={dropdownRef}>
            {avatar ? (
              <img
                src={avatar}
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-yellow-400"
                onClick={() => setDropList(!dropList)}
              />
            ) : (
              <FaRegUserCircle
                size={40}
                className="cursor-pointer text-yellow-300"
                onClick={() => setDropList(!dropList)}
              />
            )}
            {dropList && (
              <div className="absolute top-full right-0 mt-1 bg-gray-100 rounded-lg shadow-lg w-40 p-2 z-50">
                <Link to="/profile">
                  <p className="text-gray-700 hover:text-yellow-800 cursor-pointer py-1">
                    Profile
                  </p>
                </Link>
                <button
                  onClick={() => dispatch(logout())}
                  className="w-full text-left text-gray-700 hover:text-red-600 py-1 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
