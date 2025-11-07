import { useEffect, useRef } from "react";
import StartGame from "./game/main.js";

export default function App() {
  useEffect(() => {
    StartGame("game-container");
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <div id="game-container"></div>
    </div>
  );
}
