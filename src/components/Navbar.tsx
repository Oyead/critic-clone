import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
function Navbar() {
const dispatch = useDispatch();
const { isLoggedIn, username } = useSelector((state) => state.auth);

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
          <a href="#" className="text-gray-700 hover:text-yellow-800 font-medium">Explore</a>
          <a href="#" className="text-gray-700 hover:text-yellow-800 font-medium">Reviews</a>
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

          <FaRegUserCircle size={40} className="cursor-pointer text-yellow-300" />
          <button
            onClick={() => dispatch(logout())}
            className="text-gray-700 py-2 px-2 rounded-full hover:bg-yellow-800 hover:text-white font-medium cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar
