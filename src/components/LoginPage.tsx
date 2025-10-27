import { Link, useNavigate } from "react-router-dom";
import { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";

interface Alert {
  msg: string;
  type: "success" | "error" | "";
}

interface StoredUser {
  username: string;
  email: string;
  password: string;
}

function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [alert, setAlert] = useState<Alert>({ msg: "", type: "" });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showAlert = (msg: string, type: "success" | "error") => {
    setAlert({ msg, type });
    setTimeout(() => setAlert({ msg: "", type: "" }), 3000);
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const storedUser: StoredUser | null = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    if (!storedUser) {
      showAlert("No user found. Please register first.", "error");
      return;
    }

    if (storedUser.email === email && storedUser.password === password) {
      localStorage.setItem("isLoggedIn", "true");
      dispatch(login({ username: storedUser.username }));
      showAlert("Login successful", "success");
      setTimeout(() => navigate("/"), 700);
    } else {
      showAlert("Invalid email or password", "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
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

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-lg hover:bg-yellow-600 transition duration-200 cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-5">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-yellow-600 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
