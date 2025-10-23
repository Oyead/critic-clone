import { useState } from "react"
import { FaRegUserCircle } from "react-icons/fa";
import ContentSections from "./ContentSections";
function App() {
const [isLoggedIn,setIsLoggedIn] = useState(false) 

  return (
    <>
  <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between">
      {/*Logo */}
      <div className="flex items-center space-x-2">
        <img
          src="/src/assets/gamepad.png"
          alt="Logo"
          className="w-10 h-10 rounded-full cursor-pointer"
          title="Critic Clone"
        />
       <div className="hidden md:flex space-x-6 ml-8">
  <a href="#" className="text-gray-700 hover:text-yellow-800 font-medium">Explore</a>
  <a href="#" className="text-gray-700 hover:text-yellow-800 font-medium">Reviews</a>
</div>
      </div>
      {/* Middle: Search Bar */}
      <div className="hidden md:flex flex-1 justify-center mx-6">
  <input
    type="text"
    placeholder="Search..."
    className="w-[30%] lg:w-[60%] border border-gray-300 rounded-3xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
  />
</div>


      {/* Right: Auth Buttons */}
      {!isLoggedIn ? <div className="flex items-center space-x-4">
        <button className="text-gray-700 hover:text-yellow-800 font-medium cursor-pointer">
          Login
        </button>
        <button className="bg-black text-white px-4 py-2 rounded-full hover:bg-yellow-800 transition cursor-pointer">
          Register
        </button>
      </div> 
      :
    <FaRegUserCircle size={40} className="cursor-pointer text-yellow-300" />
      }
      
    </nav>
    </>
  )
}

export default App
