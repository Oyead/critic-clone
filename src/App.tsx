import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar"
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Profile from "./components/Profile";
import GameDetails from "./components/GameDetails"
import ProtectedRoute from './ProtectedRoute';
import MyReviews from "./components/MyReviews";
import Explore from './components/Explore';
function App() {
  return (
    <>
      <Navbar />
 <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/game/:id" element={<GameDetails/>} />
      
      <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
              <Route
          path="/reviews"
          element={
            <ProtectedRoute>
              <MyReviews />
            </ProtectedRoute>
          }
        />
    </Routes>
    </>
  );
}

export default App;
