import { useRef } from "react";
import { PhaserGame } from "./Phaser.jsx";

export default function App() {
  const phaserRef = useRef(null);
  
  return (
    <div className="app-container">
      <div className="game-wrapper">
        <PhaserGame ref={phaserRef} />
      </div>
    </div>
  );
}