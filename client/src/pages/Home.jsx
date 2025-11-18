import React, { useRef } from "react";
import { PhaserGame } from "../Phaser.jsx";

export default function Home() {
  const phaserRef = useRef(null);
  return (
    <>
      <div className="app-container">
        <PhaserGame ref={phaserRef} />
      </div>
    </>
  );
}
