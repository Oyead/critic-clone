import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
function RegisterPage() {
const dispatch = useDispatch();
const navigate=useNavigate()
const [username,setUserName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [alert, setAlert] = useState<{ msg: string; type: "success" | "error" | "" }>({ msg: "", type: "" });
const showAlert = (msg: string, type: "success" | "error") => {
    setAlert({ msg, type });
    setTimeout(() => setAlert({ msg: "", type: "" }), 3000);
  };
const handleSubmit= (e:React.SyntheticEvent) =>{
    e.preventDefault();

if (!username || !email || !password){
    showAlert("All fields are required","error")
    return
}
const emailRegex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
      showAlert("Invalid email format.", "error");
      return;
    }
if (password.length < 6) {
      showAlert("Password must be at least 6 characters long.", "error");
      return;
    }
     const existingUser = JSON.parse(localStorage.getItem("user") || "null");
  if (existingUser && existingUser.email === email) {
    showAlert("User already registered with this email.", "error");
    return;
  }
 const userData = { username, email, password };
    localStorage.setItem("user", JSON.stringify(userData));
    dispatch(login({ username }));

    showAlert("User registered successfully!", "success");

    setUserName("");
    setEmail("");
    setPassword("");

    setTimeout(() => navigate("/"), 1000);

localStorage.setItem("user",JSON.stringify(userData))
dispatch(login({ username }));

showAlert("User registered successfully","success");
    setUserName("");
    setEmail("");
    setPassword("");

navigate("/")
}
  return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>
         {alert.msg && (
          <div
            className={`mb-4 rounded-lg px-4 py-2 text-sm font-medium ${
              alert.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {alert.msg}
          </div>
        )}
        <form className="space-y-5"
         onSubmit={handleSubmit}
         >
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e)=>setUserName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}

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
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-lg hover:bg-yellow-600 transition duration-200 cursor-pointer"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage