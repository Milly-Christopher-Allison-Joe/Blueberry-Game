import { useEffect, useRef } from "react";
import StartGame from "./game/main.js";
import { PhaserGame } from "./Phaser.jsx";

export default function App() {
  const phaserRef = useRef(null);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <PhaserGame ref={phaserRef} />
    </div>
  );
}
