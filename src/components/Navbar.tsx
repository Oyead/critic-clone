import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import type { RootState } from "../store/store";
function Navbar() {
  const [dropList, setDropList] = useState(false);
  const dispatch = useDispatch();
  const { isLoggedIn, username } = useSelector((state: RootState) => state.auth);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handleClickOutside(event:MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropList(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center space-x-2">
        <Link to="/">
          <img
            src="/src/assets/gamepad.png"
            alt="Logo"
            className="w-10 h-10 rounded-full cursor-pointer"
          />
        </Link>
        <div className="hidden md:flex space-x-6 ml-8">
          <a
            href="#"
            className="text-gray-700 hover:text-yellow-800 font-medium"
          >
            Explore
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-yellow-800 font-medium"
          >
            Reviews
          </a>
        </div>
      </div>

      {/* Middle: Search */}
      <div className="hidden md:flex flex-1 justify-center mx-6">
        <input
          type="text"
          placeholder="Search..."
          className="w-[30%] lg:w-[60%] border border-gray-300 rounded-3xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {/* Right: Auth buttons */}
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
          {isLoggedIn && <p>Hello, {username}</p>}
          <div className="relative" ref={dropdownRef}>
            <FaRegUserCircle
              size={40}
              className="cursor-pointer text-yellow-300"
              onClick={() => setDropList(!dropList)}
            />

            {dropList && (
              <div className="absolute top-full right-0 mt-1 bg-gray-100 rounded-lg shadow-lg w-40 p-2 z-50">
                <p className="text-gray-700 hover:text-yellow-800 cursor-pointer py-1">
                  Profile
                </p>
                <p className="text-gray-700 hover:text-yellow-800 cursor-pointer py-1">
                  Settings
                </p>
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
