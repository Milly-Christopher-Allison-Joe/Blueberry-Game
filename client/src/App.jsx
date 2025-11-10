import { Routes, Route } from "react-router-dom";
import { useRef } from "react";
import Navbar from "./components/Navbar.jsx";
import { PhaserGame } from "./Phaser.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Register from "./auth/Register.jsx";
import Login from "./auth/Login.jsx";
import Profile from "./pages/Profile.jsx";
import Error404 from "./auth/Error404.jsx";

export default function App() {
  const gameRef = useRef();

  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="game-wrapper">
              <PhaserGame ref={gameRef} />
            </div>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}
