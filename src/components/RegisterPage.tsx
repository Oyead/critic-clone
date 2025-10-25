import React from 'react'
import { Link } from "react-router-dom";
function RegisterPage() {

  return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-lg hover:bg-yellow-600 transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-5">
          Don’t have an account?{" "}
             <Link to="/register">
          <a href="#" className="text-yellow-600 hover:underline font-medium">
            Register
          </a>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage