import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar"
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
function App() {
  return (
    <>
      <Navbar />
 <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
    </>
  );
}

export default App;
