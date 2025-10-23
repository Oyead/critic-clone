function App() {

  return (
    <>
  <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between">
      {/*Logo */}
      <div className="flex items-center space-x-2">
        <img
          src="https://via.placeholder.com/40"
          alt="Logo"
          className="w-10 h-10 rounded-full"
        />
        <span className="text-xl font-semibold text-gray-800">MyBrand</span>
      </div>

      {/* Middle: Search Bar */}
      <div className="hidden md:flex flex-1 mx-6">
        <input
          type="text"
          placeholder="Search..."
          className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right: Auth Buttons */}
      <div className="flex items-center space-x-4">
        <button className="text-gray-700 hover:text-blue-600 font-medium">
          Login
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
          Register
        </button>
      </div>
    </nav>
   
    </>
  )
}

export default App
