import About from "./pages/About.jsx";
import Register from "./auth/Register.jsx";
import Login from "./auth/Login.jsx";
import Profile from "./pages/Profile.jsx";
import Error404 from "./auth/Error404.jsx";
import { Routes, Route } from "react-router-dom";
import { useRef } from "react";
import { PhaserGame } from "./Phaser.jsx";

export default function App() {
  const phaserRef = useRef(null);

  return (
    <div className="app-container">
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <PhaserGame ref={phaserRef} />
    </div>
  );
}
